import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { compile } from './compile.mjs';
import { generatedThemesDir, listCompanies, listDecks, loadCompany, loadDeck, root } from './lib/decks.mjs';

export const FORMATS = ['html', 'pdf', 'pptx'];

function marp(args) {
  let cli;
  try { cli = createRequire(path.join(root, 'package.json')).resolve('@marp-team/marp-cli/marp-cli.js'); }
  catch { return Promise.reject(new Error('Marp CLI ist nicht installiert. Im Projektordner einmal „npm ci“ ausführen.')); }
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [cli, '--no-stdin', ...args], { cwd: root, stdio: ['ignore', 'inherit', 'inherit'], env: process.env });
    child.once('error', reject);
    child.once('close', (code) => (code === 0 ? resolve() : reject(new Error(`Marp meldet Fehler ${code}. Bei PDF/PPTX: passenden Browser installieren oder BROWSER_PATH setzen.`))));
  });
}

/** Baut ein Deck ("<firma>/<deck>") nach dist/<firma>/<deck>/<output>.<format>. format: html | pdf | pptx | all */
export async function exportDeck(ref, format = 'html', { quiet = false } = {}) {
  if (![...FORMATS, 'all'].includes(format)) throw new Error(`Format muss ${FORMATS.join(', ')} oder all sein.`);
  const { deck } = await compile(ref);
  await fs.mkdir(deck.distDir, { recursive: true });
  const assets = path.join(deck.dir, 'assets');
  if (existsSync(assets)) await fs.cp(assets, path.join(deck.distDir, 'assets'), { recursive: true });
  const outputs = [];
  for (const f of format === 'all' ? FORMATS : [format]) {
    const out = path.join(deck.distDir, `${deck.output}.${f}`);
    const args = [path.join(deck.buildDir, 'presentation.md'), '--config', 'marp.config.mjs', '--theme-set', 'themes', generatedThemesDir, '--output', out];
    if (f !== 'html') args.push(`--${f}`, '--allow-local-files', '--browser', 'chrome,edge,firefox');
    if (process.env.BROWSER_PATH && f !== 'html') args.push('--browser-path', process.env.BROWSER_PATH);
    await marp(args);
    if (f === 'html') {
      const animation = await fs.readFile(path.join(root, 'scripts', 'motion.css'), 'utf8');
      const html = await fs.readFile(out, 'utf8');
      if (!html.includes('</head>')) throw new Error(`HTML-Export ${out} enthält kein schließendes head-Element.`);
      await fs.writeFile(out, html.replace('</head>', `<style id="presentation-motion">\n${animation}\n</style></head>`));
    }
    outputs.push(path.relative(root, out));
    if (!quiet) console.log(`Erstellt: ${path.relative(root, out)}`);
  }
  await writeIndex();
  return outputs;
}

/** dist/index.html: Übersicht aller gebauten Decks, gruppiert nach Unternehmen. */
export async function writeIndex() {
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const sections = [];
  for (const companyId of await listCompanies()) {
    let company;
    try { company = await loadCompany(companyId); } catch { continue; }
    const rows = [];
    for (const ref of await listDecks(companyId)) {
      let deck;
      try { deck = await loadDeck(ref); } catch { continue; }
      const links = FORMATS
        .filter((f) => existsSync(path.join(deck.distDir, `${deck.output}.${f}`)))
        .map((f) => `<a href="${esc(`${ref}/${deck.output}.${f}`)}">${f.toUpperCase()}</a>`);
      if (links.length) rows.push(`<li><strong>${esc(deck.title)}</strong> <code>${esc(ref)}</code> – ${links.join(' · ')}</li>`);
    }
    if (rows.length) sections.push(`<h2 style="border-color:${company.branding.accent}">${esc(company.name)}</h2><ul>${rows.join('')}</ul>`);
  }
  const html = `<!doctype html><html lang="de"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Präsentationen</title>
<style>body{font:16px/1.5 system-ui,sans-serif;max-width:46rem;margin:3rem auto;padding:0 1rem;color:#172b40}h2{font-size:1.1rem;border-left:4px solid;padding-left:.6rem;margin-top:2rem}a{color:inherit}li{margin:.5rem 0}code{color:#526476}</style>
<h1>Präsentationen</h1>${sections.join('') || '<p>Noch nichts gebaut.</p>'}</html>\n`;
  await fs.mkdir(path.join(root, 'dist'), { recursive: true });
  await fs.writeFile(path.join(root, 'dist/index.html'), html);
}
