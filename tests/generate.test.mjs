import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

const source = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function fixture(t) {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'praesentations-test-'));
  t.after(() => fs.rm(dir, { recursive: true, force: true }));
  for (const name of ['scripts', 'templates', 'themes']) {
    await fs.cp(path.join(source, name), path.join(dir, name), { recursive: true });
  }
  for (const name of ['package.json', 'marp.config.mjs']) {
    await fs.copyFile(path.join(source, name), path.join(dir, name));
  }
  await fs.symlink(path.join(source, 'node_modules'), path.join(dir, 'node_modules'));
  await fs.mkdir(path.join(dir, 'companies'));
  await fs.copyFile(path.join(source, 'templates/unternehmensdaten.example.json'), path.join(dir, 'daten.json'));
  return dir;
}

function run(dir, args, env = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ['scripts/cli.mjs', ...args], { cwd: dir, env: { ...process.env, ...env } });
    let stdout = '', stderr = '';
    child.stdout.on('data', (data) => { stdout += data; });
    child.stderr.on('data', (data) => { stderr += data; });
    child.once('error', reject);
    child.once('close', (code) => resolve({ code, stdout, stderr }));
  });
}

async function server(t, { invalidSlide = 0, remote = false } = {}) {
  let calls = 0;
  const requests = [];
  const httpServer = http.createServer(async (req, res) => {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const body = chunks.length ? JSON.parse(Buffer.concat(chunks).toString()) : null;
    requests.push({ path: req.url, body });
    res.setHeader('Content-Type', 'application/json');
    if (req.url === '/api/tags') return res.end(JSON.stringify({ models: [{ name: 'local:latest' }] }));
    if (req.url === '/api/show') return res.end(JSON.stringify(remote ? { remote_host: 'example.invalid' } : {}));
    if (req.url === '/api/chat') {
      calls++;
      const content = calls === invalidSlide
        ? '{"title": "Unvollständig"}'
        : JSON.stringify({ title: `Beispielfolie ${calls}`, bullets: ['Bestätigter Ausgangspunkt', 'Offene Frage prüfen'], notes: 'Die Angaben und offenen Fragen vor der Verwendung prüfen.' });
      return res.end(JSON.stringify({ done: true, message: { content } }));
    }
    res.writeHead(404);
    res.end('{}');
  });
  await new Promise((resolve) => httpServer.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise((resolve) => httpServer.close(resolve)));
  return { port: String(httpServer.address().port), requests };
}

test('creates a new 18-slide deck and HTML from a local model without changing existing decks', async (t) => {
  const dir = await fixture(t);
  const mock = await server(t);
  assert.equal((await run(dir, ['new:company', 'demo', 'Demo GmbH'])).code, 0);
  assert.equal((await run(dir, ['new:deck', 'demo/bestehend', 'Bestehend'])).code, 0);
  const existing = await fs.readFile(path.join(dir, 'companies/demo/decks/bestehend/slides/01-einstieg.md'), 'utf8');
  const result = await run(dir, ['generate', 'demo/entwurf', 'daten.json', '--model', 'local', '--format', 'html'], { OLLAMA_LOCAL_PORT: mock.port });
  assert.equal(result.code, 0, result.stderr);
  assert.equal(mock.requests.filter((r) => r.path === '/api/chat').length, 18);
  assert.ok(mock.requests.find((r) => r.path === '/api/chat').body.format.properties.notes);
  const base = path.join(dir, 'companies/demo/decks/entwurf');
  assert.equal((await fs.readdir(path.join(base, 'slides'))).length, 18);
  assert.equal((await fs.readdir(path.join(base, 'notes'))).length, 18);
  assert.match(await fs.readFile(path.join(base, 'slides/01-einstieg.md'), 'utf8'), /Beispielfolie 1/);
  assert.equal(await fs.readFile(path.join(dir, 'companies/demo/decks/bestehend/slides/01-einstieg.md'), 'utf8'), existing);
  const html = await fs.readFile(path.join(dir, 'dist/demo/entwurf/Demo-Entwurf.html'), 'utf8');
  assert.match(html, /id="presentation-motion"/);
  assert.match(html, /prefers-reduced-motion:\s*no-preference/);
  assert.match(html, /data-bespoke-view="overview"/);
  assert.match(html, /data-bespoke-view="presenter"/);
  const compiled = await fs.readFile(path.join(dir, 'build/demo/entwurf/presentation.md'), 'utf8');
  assert.match(compiled, /<!-- _class: cover -->/);
  assert.match(compiled, /<!-- _class: summary -->/);
  assert.match(compiled, /<!-- _class: reserve -->/);
  assert.match(compiled, /Die Angaben und offenen Fragen vor der Verwendung prüfen\./);
  assert.equal((await run(dir, ['check', 'demo/entwurf'])).code, 0);
  const duplicate = await run(dir, ['generate', 'demo/entwurf', 'daten.json', '--model', 'local', '--format', 'html'], { OLLAMA_LOCAL_PORT: mock.port });
  assert.notEqual(duplicate.code, 0);
  assert.match(duplicate.stderr, /existiert bereits/);
  assert.equal(mock.requests.filter((r) => r.path === '/api/chat').length, 18);
});

test('rejects invalid model output before creating a deck', async (t) => {
  const dir = await fixture(t);
  const mock = await server(t, { invalidSlide: 2 });
  await run(dir, ['new:company', 'demo', 'Demo GmbH']);
  const result = await run(dir, ['generate', 'demo/entwurf', 'daten.json', '--model', 'local', '--format', 'html'], { OLLAMA_LOCAL_PORT: mock.port });
  assert.notEqual(result.code, 0);
  assert.match(result.stderr, /gültiges Folienobjekt/);
  await assert.rejects(fs.stat(path.join(dir, 'companies/demo/decks/entwurf')), { code: 'ENOENT' });
});

test('rejects remote model aliases and malformed input before sending company data', async (t) => {
  const dir = await fixture(t);
  const mock = await server(t, { remote: true });
  await run(dir, ['new:company', 'demo', 'Demo GmbH']);
  const env = { OLLAMA_LOCAL_PORT: mock.port };
  const remote = await run(dir, ['generate', 'demo/entwurf', 'daten.json', '--model', 'local', '--format', 'html'], env);
  assert.notEqual(remote.code, 0);
  assert.match(remote.stderr, /Cloud-Modell/);
  assert.equal(mock.requests.filter((r) => r.path === '/api/chat').length, 0);
  await fs.writeFile(path.join(dir, 'daten.json'), '{"titel":"Beispiel"}');
  const invalid = await run(dir, ['generate', 'demo/entwurf', 'daten.json', '--model', 'local'], env);
  assert.notEqual(invalid.code, 0);
  assert.match(invalid.stderr, /zielgruppe/);
  assert.equal(mock.requests.length, 2);
});

test('exports all requested formats after local generation', async (t) => {
  const dir = await fixture(t);
  const mock = await server(t);
  await run(dir, ['new:company', 'demo', 'Demo GmbH']);
  const result = await run(dir, ['generate', 'demo/entwurf', 'daten.json', '--model', 'local'], { OLLAMA_LOCAL_PORT: mock.port });
  assert.equal(result.code, 0, `${result.stdout}\n${result.stderr}`);
  for (const ext of ['html', 'pdf', 'pptx']) {
    const file = path.join(dir, `dist/demo/entwurf/Demo-Entwurf.${ext}`);
    assert.ok((await fs.stat(file)).size > 0, `${ext} export is empty`);
  }
});

test('generates and exports a presentation with an installed Ollama model', { skip: !process.env.TEST_REAL_OLLAMA, timeout: 1_800_000 }, async (t) => {
  const dir = await fixture(t);
  assert.equal((await run(dir, ['new:company', 'demo', 'Demo GmbH'])).code, 0);
  const result = await run(dir, ['generate', 'demo/entwurf', 'daten.json', '--model', process.env.TEST_REAL_OLLAMA]);
  assert.equal(result.code, 0, `${result.stdout}\n${result.stderr}`);
  assert.equal((await run(dir, ['check', 'demo/entwurf'])).code, 0);
  for (const ext of ['html', 'pdf', 'pptx']) {
    assert.ok((await fs.stat(path.join(dir, `dist/demo/entwurf/Demo-Entwurf.${ext}`))).size > 0);
  }
});
