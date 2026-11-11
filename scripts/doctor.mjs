import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import { listCompanies, listDecks } from './lib/decks.mjs';

console.log(`Node.js: ${process.version} (${process.platform}/${process.arch})`);
if (Number(process.versions.node.split('.')[0]) < 20) { console.error('Bitte eine unterstützte Node.js-LTS-Version ab 20 installieren.'); process.exitCode = 1; }
const paths = [process.env.BROWSER_PATH, '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge', '/Applications/Firefox.app/Contents/MacOS/firefox'].filter(Boolean);
const found = paths.filter((p) => fs.existsSync(p));
console.log(found.length ? `Browser gefunden: ${found.join(', ')}` : 'Browser nicht an den üblichen Mac-Pfaden gefunden. Marp prüft weitere Orte beim Export. BROWSER_PATH kann einen konkreten Pfad setzen.');
const git = spawnSync('git', ['--version'], { encoding: 'utf8' });
console.log(git.status === 0 ? git.stdout.trim() : 'Git fehlt. Optional für Versionsverwaltung.');
const companies = await listCompanies();
const decks = await listDecks();
console.log(companies.length ? `Unternehmen: ${companies.join(', ')}  |  Decks: ${decks.join(', ') || '–'}` : 'Keine Unternehmen unter companies/. Anlegen: npm run new:company -- <firma> "Name"');
console.log('Diese Prüfung ist keine Exportgarantie. Tatsächliche Exporte: npm run build.');
