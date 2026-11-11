import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { assertId, companiesDir, DEFAULT_BRANDING, loadCompany, loadDeck, parseRef, PHASES, root } from './lib/decks.mjs';

const templates = path.join(root, 'templates');
const fill = (text, vars) => text.replace(/\{\{(\w+)\}\}/g, (m, k) => (k in vars ? vars[k] : m));
const jsonText = (s) => JSON.stringify(s).slice(1, -1);

async function copyTemplate(name, target, vars) {
  await fs.cp(path.join(templates, name), target, { recursive: true });
  for (const file of await fs.readdir(target, { recursive: true })) {
    const p = path.join(target, file);
    if ((await fs.stat(p)).isFile() && /\.(md|json)$/.test(p)) await fs.writeFile(p, fill(await fs.readFile(p, 'utf8'), vars));
  }
}

/** Legt companies/<id>/ mit company.json aus templates/company/ an. */
export async function newCompany(id, name, { accent, ink, logo } = {}) {
  assertId(id, 'Unternehmens-ID');
  const dir = path.join(companiesDir, id);
  if (existsSync(dir)) throw new Error(`Unternehmen „${id}“ existiert bereits: ${path.relative(root, dir)}`);
  await copyTemplate('company', dir, {
    NAME: jsonText(name || id),
    ACCENT: accent || DEFAULT_BRANDING.accent,
    INK: ink || DEFAULT_BRANDING.ink,
  });
  if (logo) {
    const ext = path.extname(logo).toLowerCase();
    await fs.copyFile(path.resolve(logo), path.join(dir, 'assets', `logo${ext}`));
    const file = path.join(dir, 'company.json');
    const config = JSON.parse(await fs.readFile(file, 'utf8'));
    config.branding.logo = `assets/logo${ext}`;
    await fs.writeFile(file, JSON.stringify(config, null, 2) + '\n');
  }
  try { await loadCompany(id); } // validiert Farben und Logo
  catch (e) { await fs.rm(dir, { recursive: true, force: true }); throw e; }
  return path.relative(root, dir);
}

/** Legt companies/<firma>/decks/<deck>/ aus templates/deck/ an. */
export async function newDeck(ref, title) {
  const { company: companyId, deck: id } = parseRef(ref);
  const company = await loadCompany(companyId);
  const dir = path.join(company.decksDir, id);
  if (existsSync(dir)) throw new Error(`Deck „${ref}“ existiert bereits: ${path.relative(root, dir)}`);
  const t = title || `${company.name}: ${id}`;
  await copyTemplate('deck', dir, {
    TITLE: t,
    TITLE_JSON: jsonText(t),
    OUTPUT: [companyId, id].join('-').split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join('-'),
  });
  return path.relative(root, dir);
}

/** Legt Folie + Notiz an und trägt sie am Ende ihrer Phase in project.json ein. */
export async function newSlide(ref, slug, { phase = 'reserve', seconds = 0, title } = {}) {
  assertId(slug, 'Folien-Name');
  if (!PHASES.includes(phase)) throw new Error(`Phase muss ${PHASES.join(', ')} sein.`);
  if (!Number.isInteger(seconds) || seconds < 0) throw new Error('Sekunden müssen eine ganze Zahl ≥ 0 sein.');
  const deck = await loadDeck(ref);
  const numbers = deck.slides.map((s) => parseInt(s.id, 10)).filter(Number.isFinite);
  const id = /^\d+-/.test(slug) ? slug : `${String((numbers.length ? Math.max(...numbers) : 0) + 1).padStart(2, '0')}-${slug}`;
  if (deck.slides.some((s) => s.id === id)) throw new Error(`Folie „${id}“ existiert bereits.`);

  const content = path.join(deck.dir, 'slides', `${id}.md`);
  const notes = path.join(deck.dir, 'notes', `${id}.md`);
  for (const f of [content, notes]) if (existsSync(f)) throw new Error(`Datei existiert bereits: ${path.relative(root, f)}`);
  const heading = title || slug.replace(/^\d+-/, '').replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase());
  await fs.mkdir(path.dirname(content), { recursive: true });
  await fs.mkdir(path.dirname(notes), { recursive: true });
  await fs.writeFile(content, `# ${heading}\n\n- Kernaussage\n`);
  await fs.writeFile(notes, `Sprechtext zu „${heading}“.\n`);

  const slides = deck.config.slides || [];
  const lastOfPhase = slides.map((s) => s.phase).lastIndexOf(phase);
  const at = lastOfPhase >= 0 ? lastOfPhase + 1 : PHASES.indexOf(phase) === 0 ? 0 : slides.length;
  slides.splice(at, 0, { id, phase, seconds });
  deck.config.slides = slides;
  await fs.writeFile(deck.file, JSON.stringify(deck.config, null, 2) + '\n');
  return { id, position: at + 1, files: [content, notes].map((f) => path.relative(root, f)) };
}
