import { parseArgs } from 'node:util';
import { compile, summary } from './compile.mjs';
import { exportDeck, FORMATS } from './export.mjs';
import { generatePresentation } from './generate.mjs';
import { newCompany, newDeck, newSlide } from './scaffold.mjs';
import { listCompanies, listDecks, loadCompany, loadDeck, minutes, resolveDecks } from './lib/decks.mjs';

const HELP = `Befehle (npm run <befehl> -- <argumente>)
<auswahl> = leer (alles) | <firma> (alle Decks eines Unternehmens) | <firma>/<deck>

  list                                   Unternehmen und Decks mit Folienzahl und Zeit
  check [auswahl]                        Inhalte, Bilder, Branding und Zeitplan prüfen
  compile [auswahl]                      build/<firma>/<deck>/presentation.md erzeugen
  build <html|pdf|pptx|all> [auswahl]    Exporte nach dist/<firma>/<deck>/
  generate <firma>/<neues-deck> <daten.json> --model <lokales-modell> [--format all|html|pdf|pptx]
  new:company <firma> "Name" [--accent #c00065] [--ink #172b40] [--logo pfad/logo.svg]
  new:deck <firma>/<deck> ["Titel"]
  new:slide <firma>/<deck> <name> [--phase main|summary|reserve] [--seconds N] [--title "…"]`;

const [cmd, ...rest] = process.argv.slice(2);
const { values: opts, positionals: args } = parseArgs({
  args: rest,
  allowPositionals: true,
  options: Object.fromEntries(['phase', 'seconds', 'title', 'accent', 'ink', 'logo', 'model', 'format'].map((k) => [k, { type: 'string' }])),
});

/** Führt fn für jedes ausgewählte Deck aus; ein fehlerhaftes Deck blockiert die anderen nicht. */
async function eachDeck(selector, fn) {
  let failed = 0;
  for (const ref of await resolveDecks(selector)) {
    try { await fn(ref); } catch (e) { failed++; console.error(`Fehler: ${e.message}`); }
  }
  if (failed) throw new Error(`${failed} Deck(s) fehlgeschlagen.`);
}

const commands = {
  async list() {
    const companies = await listCompanies();
    if (!companies.length) { console.log('Noch keine Unternehmen. Anlegen: npm run new:company -- <firma> "Name"'); return; }
    for (const companyId of companies) {
      const c = await loadCompany(companyId).catch((e) => ({ name: `(Fehler: ${e.message})` }));
      console.log(`\n${companyId}  –  ${c.name}`);
      const refs = await listDecks(companyId);
      if (!refs.length) console.log('  (noch keine Decks)');
      for (const ref of refs) {
        const d = await loadDeck(ref);
        const t = { main: 0, summary: 0 };
        for (const s of d.slides) if (s.phase in t) t[s.phase] += s.seconds || 0;
        const n = (p) => d.slides.filter((s) => s.phase === p).length;
        console.log(`  ${ref.padEnd(32)} ${String(d.slides.length).padStart(3)} Folien  (Konzept ${minutes(t.main)} min, Summary ${minutes(t.summary)} min, ${n('reserve')} Reserve)  ${d.title}`);
      }
    }
  },
  check: () => eachDeck(args[0], async (r) => console.log(summary(await compile(r, { checkOnly: true })))),
  compile: () => eachDeck(args[0], async (r) => { const res = await compile(r); console.log(`${summary(res)} → build/${r}/presentation.md`); }),
  async build() {
    const [format = 'html', selector] = args;
    if (![...FORMATS, 'all'].includes(format)) throw new Error(`Format muss ${FORMATS.join(', ')} oder all sein.`);
    await eachDeck(selector, (r) => exportDeck(r, format));
  },
  async generate() {
    const [ref, input] = args;
    if (!ref || !input || args.length !== 2 || !opts.model) {
      throw new Error('Aufruf: npm run generate -- <firma>/<neues-deck> <daten.json> --model <lokales-modell> [--format all|html|pdf|pptx]');
    }
    await generatePresentation(ref, input, { model: opts.model, format: opts.format || 'all' });
  },
  async 'new:company'() {
    const [id, ...name] = args;
    if (!id) throw new Error('Aufruf: npm run new:company -- <firma> "Name" [--accent #c00065] [--logo pfad/logo.svg]');
    const dir = await newCompany(id, name.join(' ') || undefined, opts);
    console.log(`Angelegt: ${dir}\n  Branding anpassen: ${dir}/company.json\n  Erstes Deck: npm run new:deck -- ${id}/<deck> "Titel"`);
  },
  async 'new:deck'() {
    const [ref, ...title] = args;
    if (!ref) throw new Error('Aufruf: npm run new:deck -- <firma>/<deck> "Titel"');
    const dir = await newDeck(ref, title.join(' ') || undefined);
    console.log(`Angelegt: ${dir}\n  Vorschau: npm run preview -- ${ref}   |   Prüfen: npm run check -- ${ref}`);
  },
  async 'new:slide'() {
    const [ref, name] = args;
    if (!ref || !name) throw new Error('Aufruf: npm run new:slide -- <firma>/<deck> <name> [--phase reserve] [--seconds 0] [--title "…"]');
    const r = await newSlide(ref, name, { phase: opts.phase, seconds: opts.seconds === undefined ? 0 : Number(opts.seconds), title: opts.title });
    console.log(`Angelegt: ${r.id} an Position ${r.position}\n  ${r.files.join('\n  ')}`);
    if (opts.phase && opts.phase !== 'reserve' && Number(opts.seconds) > 0) console.log('Hinweis: Zeitbudget (targets) in project.json anpassen, sonst schlägt die Prüfung fehl.');
  },
  help: () => console.log(HELP),
};

try {
  if (!commands[cmd]) { console.log(HELP); if (cmd) process.exitCode = 1; }
  else await commands[cmd]();
} catch (e) {
  console.error(e.message.startsWith('Fehler') ? e.message : `Fehler: ${e.message}`);
  process.exitCode = 1;
}
