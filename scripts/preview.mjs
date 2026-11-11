import http from 'node:http';
import fs from 'node:fs/promises';
import { watch } from 'node:fs';
import path from 'node:path';
import { exportDeck, writeIndex } from './export.mjs';
import { companiesDir, resolveDecks, root } from './lib/decks.mjs';

// Optional: npm run preview -- <firma> | <firma>/<deck>  → nur diese Auswahl bauen und beobachten.
const selector = process.argv[2];
const port = Number(process.env.PORT || 8080);
const dist = path.join(root, 'dist');

async function build(refs) {
  for (const ref of refs) {
    try { await exportDeck(ref, 'html', { quiet: true }); console.log(`Aktualisiert: ${ref}`); }
    catch (e) { console.error(`Änderung noch nicht übernommen: ${e.message}`); }
  }
  await writeIndex();
}

await build(await resolveDecks(selector));

const clients = new Set();
const reload = `<script>new EventSource('/__events').onmessage=()=>location.reload();</script>`;
const types = { '.html': 'text/html; charset=utf-8', '.svg': 'image/svg+xml', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp', '.pdf': 'application/pdf' };

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://127.0.0.1');
    if (url.pathname === '/__events') {
      res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
      res.write(': connected\n\n'); clients.add(res); req.on('close', () => clients.delete(res)); return;
    }
    const file = path.resolve(dist, '.' + decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname));
    if (!file.startsWith(dist + path.sep)) { res.writeHead(403); res.end(); return; }
    let body = await fs.readFile(file);
    const ext = path.extname(file);
    if (ext === '.html') body = Buffer.from(body.toString().replace(/<\/body>|<\/html>/, (m) => reload + m));
    res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream', 'Cache-Control': 'no-store' }); res.end(body);
  } catch { res.writeHead(404); res.end('Datei nicht gefunden'); }
});
server.on('error', (e) => { console.error(e.code === 'EADDRINUSE' ? `Port ${port} belegt. Vorschlag: PORT=${port + 1} npm run preview` : e.message); process.exit(1); });
server.listen(port, '127.0.0.1', () => console.log(`Vorschau: http://127.0.0.1:${port}  |  Stoppen: Ctrl+C`));

// Änderungen sammeln und nur Betroffenes neu bauen:
//   companies/<firma>/decks/<deck>/…  → dieses Deck
//   companies/<firma>/… (company.json, assets) → alle Decks des Unternehmens
//   themes/, marp.config.mjs → alles
const dirty = new Set();
let timer, running = false;
function schedule(target) { dirty.add(target); clearTimeout(timer); timer = setTimeout(flush, 250); }
async function flush() {
  if (running) { timer = setTimeout(flush, 250); return; }
  running = true;
  try {
    const all = await resolveDecks(selector).catch(() => []);
    const refs = all.filter((r) => dirty.has('*') || dirty.has(r) || dirty.has(r.split('/')[0]));
    dirty.clear();
    if (refs.length) { await build(refs); for (const c of clients) c.write('data: reload\n\n'); }
  } catch (e) { console.error(e.message); }
  finally { running = false; }
}

const handles = [
  watch(companiesDir, { recursive: true }, (_, file) => {
    if (!file) return;
    const [company, sub, deck] = String(file).split(path.sep);
    schedule(sub === 'decks' && deck ? `${company}/${deck}` : company);
  }),
  watch(path.join(root, 'themes'), { recursive: true }, () => schedule('*')),
  watch(path.join(root, 'marp.config.mjs'), () => schedule('*')),
];
process.on('SIGINT', () => { for (const h of handles) h.close(); for (const c of clients) c.end(); server.close(); process.exit(0); });
