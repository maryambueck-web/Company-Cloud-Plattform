import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { loadDeck, PHASES, minutes, root, writeCompanyTheme } from './lib/decks.mjs';

export { root };

/** Prüft ein Deck ("<firma>/<deck>") und schreibt build/<firma>/<deck>/presentation.md (außer bei checkOnly). */
export async function compile(deckId, { checkOnly = false } = {}) {
  const deck = await loadDeck(deckId);
  const fail = (msg) => { throw new Error(`[${deck.ref}] ${msg}`); };
  if (!deck.slides.length) fail('Keine Folien in project.json');

  const ids = new Set();
  const totals = Object.fromEntries(PHASES.map((p) => [p, 0]));
  const parts = [];
  const report = [];
  for (const [index, item] of deck.slides.entries()) {
    if (!item.id || ids.has(item.id)) fail(`Fehlende oder doppelte Folien-ID: ${item.id}`);
    ids.add(item.id);
    if (!PHASES.includes(item.phase)) fail(`Ungültige Phase „${item.phase}“ bei ${item.id} (erlaubt: ${PHASES.join(', ')})`);
    if (!Number.isInteger(item.seconds) || item.seconds < 0) fail(`Ungültige Sekundenangabe bei ${item.id}`);
    totals[item.phase] += item.seconds;

    const read = async (file, kind) => {
      try { return (await fs.readFile(file, 'utf8')).trim(); }
      catch { fail(`${kind} fehlt für ${item.id}: ${path.relative(root, file)}`); }
    };
    const body = await read(item.content, 'Folie');
    const notes = await read(item.notes, 'Notiz');
    if (!/^# .+/m.test(body)) fail(`Überschrift („# …“) fehlt: ${item.id}`);
    if (!notes) fail(`Notizen sind leer: ${item.id}`);
    if (/<!--|-->/.test(notes)) fail(`Notizen dürfen keine HTML-Kommentarzeichen enthalten: ${item.id}`);
    if (/^---\s*$/m.test(body)) fail(`Eine Inhaltsdatei muss genau eine Folie enthalten (kein „---“): ${item.id}`);
    for (const [, ref] of body.matchAll(/!\[[^\]]*\]\(([^)\s]+)[^)]*\)/g)) {
      if (/^[a-z]+:/i.test(ref)) continue;
      if (!existsSync(path.resolve(deck.dir, ref))) fail(`Bild nicht gefunden in ${item.id}: ${ref}`);
    }

    const label = item.phase === 'reserve' ? 'Reserve' : `${Math.floor(item.seconds / 60)}:${String(item.seconds % 60).padStart(2, '0')} Minuten`;
    const layout = index === 0 ? 'cover' : item.phase === 'main' ? 'normal' : item.phase;
    parts.push(`<!-- _class: ${layout} -->\n<!-- _footer: ${deck.footers[item.phase]} | ${label} -->\n\n${body}\n\n<!--\n${notes}\n-->`);
    report.push({ slide: index + 1, id: item.id, phase: item.phase, seconds: item.seconds });
  }

  if (deck.targets) {
    const want = { main: deck.targets.mainSeconds, summary: deck.targets.summarySeconds };
    for (const p of ['main', 'summary']) {
      if (Number.isInteger(want[p]) && totals[p] !== want[p]) {
        fail(`Zeitplan stimmt nicht: Konzept ${totals.main}s, Summary ${totals.summary}s. Soll: ${want.main ?? '–'}s / ${want.summary ?? '–'}s.`);
      }
    }
  }

  const all = parts.join('\n\n---\n\n');
  const missing = deck.requiredTerms.filter((t) => !all.includes(t));
  if (missing.length) fail(`Pflichtbegriffe fehlen: ${missing.join(', ')}`);

  if (!checkOnly) {
    await writeCompanyTheme(deck.company);
    await fs.rm(deck.buildDir, { recursive: true, force: true });
    await fs.mkdir(deck.buildDir, { recursive: true });
    if (existsSync(path.join(deck.dir, 'assets'))) await fs.cp(path.join(deck.dir, 'assets'), path.join(deck.buildDir, 'assets'), { recursive: true });
    const header = `---\nmarp: true\ntheme: ${deck.theme}\nsize: 16:9\npaginate: true\ntitle: ${JSON.stringify(deck.title)}\n---\n\n`;
    await fs.writeFile(path.join(deck.buildDir, 'presentation.md'), header + all + '\n');
    await fs.writeFile(path.join(deck.buildDir, 'timing.json'), JSON.stringify({ totals, slides: report }, null, 2) + '\n');
  }
  return { deck, count: deck.slides.length, totals };
}

export function summary({ deck, count, totals }) {
  const parts = [`${minutes(totals.main)} Minuten Konzept`];
  if (totals.summary || deck.targets?.summarySeconds) parts.push(`${minutes(totals.summary)} Minuten Summary`);
  return `OK [${deck.ref}]: ${count} Folien; ${parts.join(' + ')}.`;
}
