import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const companiesDir = path.join(root, 'companies');
export const generatedThemesDir = path.join(root, 'build', '_themes');
export const PHASES = ['main', 'summary', 'reserve'];
export const DEFAULT_FOOTERS = { main: 'Lösungskonzept', summary: 'Management Summary', reserve: 'Reserve' };
export const DEFAULT_BRANDING = { ink: '#172b40', accent: '#c00065', muted: '#526476', font: 'Arial, Helvetica, sans-serif', logo: null };
const ID = /^[a-z0-9][a-z0-9-]*$/;
const COLOR = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;
const FONT = /^[\w\s,'"-]+$/;
const LOGO_TYPES = { '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp' };

export function assertId(id, what = 'ID') {
  if (typeof id !== 'string' || !ID.test(id)) throw new Error(`Ungültige ${what} „${id}“: nur Kleinbuchstaben, Ziffern und Bindestriche.`);
  return id;
}

/** Löst einen Pfad innerhalb eines Basisordners auf und verhindert Ausbrüche wie ../ */
export function within(base, file) {
  const p = path.resolve(base, file);
  if (!p.startsWith(base + path.sep)) throw new Error(`Pfad außerhalb des Ordners: ${file}`);
  return p;
}

async function readJson(file) {
  try { return JSON.parse(await fs.readFile(file, 'utf8')); }
  catch (e) { throw new Error(`${path.relative(root, file)} ist nicht lesbar oder kein gültiges JSON: ${e.message}`); }
}

async function subdirs(dir, marker) {
  if (!existsSync(dir)) return [];
  return (await fs.readdir(dir, { withFileTypes: true }))
    .filter((e) => e.isDirectory() && existsSync(path.join(dir, e.name, marker)))
    .map((e) => e.name)
    .sort();
}

// ---------- Unternehmen ----------

export const listCompanies = () => subdirs(companiesDir, 'company.json');

export async function loadCompany(id) {
  assertId(id, 'Unternehmens-ID');
  const dir = path.join(companiesDir, id);
  const file = path.join(dir, 'company.json');
  if (!existsSync(file)) throw new Error(`Unternehmen „${id}“ nicht gefunden. Vorhanden: ${(await listCompanies()).join(', ') || '–'}`);
  const config = await readJson(file);
  const branding = { ...DEFAULT_BRANDING, ...(config.branding || {}) };
  for (const key of ['ink', 'accent', 'muted']) {
    if (!COLOR.test(branding[key])) throw new Error(`[${id}] branding.${key} muss eine Farbe wie #c00065 sein, nicht „${branding[key]}“.`);
  }
  if (!FONT.test(branding.font)) throw new Error(`[${id}] branding.font enthält unzulässige Zeichen.`);
  let logo = null;
  if (branding.logo) {
    logo = within(dir, branding.logo);
    if (!LOGO_TYPES[path.extname(logo).toLowerCase()]) throw new Error(`[${id}] Logo muss SVG, PNG, JPG oder WebP sein.`);
    if (!existsSync(logo)) throw new Error(`[${id}] Logo nicht gefunden: ${branding.logo}`);
  }
  return {
    id,
    dir,
    file,
    config,
    name: config.name || id,
    branding: { ...branding, logo },
    footers: { ...DEFAULT_FOOTERS, ...(config.footers || {}) },
    theme: `firma-${id}`,
    decksDir: path.join(dir, 'decks'),
  };
}

/** Erzeugt build/_themes/firma-<id>.css: Basis-Theme + Farben, Schrift und Logo des Unternehmens. */
export async function writeCompanyTheme(company) {
  const b = company.branding;
  const base = company.config.baseTheme || 'standard';
  if (!ID.test(base)) throw new Error(`[${company.id}] baseTheme ungültig: ${base}`);
  let css = `/* @theme ${company.theme} */\n/* Automatisch erzeugt aus ${path.relative(root, company.file)} – nicht bearbeiten. */\n@import '${base}';\n\n`;
  css += `:root { --ink: ${b.ink}; --accent: ${b.accent}; --muted: ${b.muted}; --font: ${b.font}; }\n`;
  if (b.logo) {
    const data = await fs.readFile(b.logo);
    if (data.length > 1024 * 1024) throw new Error(`[${company.id}] Logo ist größer als 1 MB.`);
    const uri = `data:${LOGO_TYPES[path.extname(b.logo).toLowerCase()]};base64,${data.toString('base64')}`;
    css += `section::before { content: ''; position: absolute; right: 62px; bottom: 12px; width: 120px; height: 30px; background: url("${uri}") no-repeat right center / contain; }\n`;
    css += `section::after { right: 198px; }\n`;
  }
  await fs.mkdir(generatedThemesDir, { recursive: true });
  await fs.writeFile(path.join(generatedThemesDir, `${company.theme}.css`), css);
}

// ---------- Decks (Referenz: "<firma>/<deck>") ----------

export async function listDecks(companyId) {
  const companies = companyId ? [companyId] : await listCompanies();
  const refs = [];
  for (const c of companies) for (const d of await subdirs(path.join(companiesDir, c, 'decks'), 'project.json')) refs.push(`${c}/${d}`);
  return refs;
}

export function parseRef(ref) {
  const [company, deck, ...rest] = String(ref).split('/');
  if (!deck || rest.length) throw new Error(`Deck-Angabe „${ref}“ muss die Form <firma>/<deck> haben.`);
  return { company: assertId(company, 'Unternehmens-ID'), deck: assertId(deck, 'Deck-ID') };
}

/** Auswahl: leer = alle Decks, "<firma>" = alle Decks des Unternehmens, "<firma>/<deck>" = genau eines. */
export async function resolveDecks(selector) {
  if (!selector) {
    const all = await listDecks();
    if (!all.length) throw new Error('Keine Decks gefunden. Erst npm run new:company, dann npm run new:deck.');
    return all;
  }
  if (!selector.includes('/')) {
    await loadCompany(selector);
    const refs = await listDecks(selector);
    if (!refs.length) throw new Error(`Unternehmen „${selector}“ hat noch keine Decks. Neues Deck: npm run new:deck -- ${selector}/<deck> "Titel"`);
    return refs;
  }
  const { company, deck } = parseRef(selector);
  const refs = await listDecks(company);
  if (!refs.includes(`${company}/${deck}`)) throw new Error(`Deck „${selector}“ nicht gefunden. Vorhanden: ${refs.join(', ') || '–'}`);
  return [`${company}/${deck}`];
}

export async function loadDeck(ref) {
  const { company: companyId, deck: id } = parseRef(ref);
  const company = await loadCompany(companyId);
  const dir = path.join(company.decksDir, id);
  const file = path.join(dir, 'project.json');
  const config = await readJson(file);
  const slides = (config.slides || []).map((s) => ({
    ...s,
    content: within(dir, s.content || `slides/${s.id}.md`),
    notes: within(dir, s.notes || `notes/${s.id}.md`),
  }));
  return {
    ref: `${companyId}/${id}`,
    id,
    company,
    dir,
    file,
    config,
    title: config.title || id,
    output: config.output || id,
    theme: config.theme || company.theme,
    footers: { ...company.footers, ...(config.footers || {}) },
    targets: config.targets || null,
    requiredTerms: config.requiredTerms || [],
    slides,
    buildDir: path.join(root, 'build', companyId, id),
    distDir: path.join(root, 'dist', companyId, id),
  };
}

export const minutes = (s) => (s % 60 === 0 ? `${s / 60}` : `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`);
