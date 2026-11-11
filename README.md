# Meyer Cloud: wiederverwendbare Präsentationsplattform

Mit dieser Plattform lassen sich Präsentationen für mehrere Unternehmen pflegen. Jedes Unternehmen hat eigenes Branding; jedes Deck besitzt eigene Folien, Notizen, Zeitplanung und Materialien. Das bestehende Meyer-Cloud-Deck dient als Referenz. Neue Decks starten mit einer neutralen Vorlage.

**Lokal und manuell:** Das Projekt verbindet sich nicht mit Kundensystemen und legt keine Cloud-Ressourcen an. Kundendaten und Ergebnisse müssen vom Nutzer bereitgestellt und geprüft werden.

## Schnellstart

Voraussetzungen: Node.js LTS ab Version 20 und npm. Für PDF- und PowerPoint-Export braucht Marp einen unterstützten Browser.

```bash
npm ci
npm run doctor
npm run list
npm run check
```

Vorschau aller Unternehmen und Decks:

```bash
npm run preview
```

Danach `http://127.0.0.1:8080` im Browser öffnen. Die Vorschau bindet nur an die lokale Loopback-Adresse. Mit **Ctrl+C** stoppen. Ein einzelnes Deck lässt sich gezielt starten:

```bash
npm run preview -- meyer/cloud-transformation
```

## Ein weiteres Unternehmen und Deck anlegen

Beispiel im integrierten Terminal:

```bash
npm run new:company -- beispiel-gmbh "Beispiel GmbH" --accent "#0a7d3b"
npm run new:deck -- beispiel-gmbh/angebot "Cloud-Konzept für Beispiel GmbH"
```

Optional kann beim Unternehmen ein Logo ergänzt werden:

```bash
npm run new:company -- beispiel-gmbh "Beispiel GmbH" --accent "#0a7d3b" --logo pfad/zum/logo.svg
```

Neue Decks erhalten eine neutrale Struktur mit 20 Minuten Hauptteil, fünf Minuten Management Summary und sechs Reservefolien. Diese Vorgabe kann pro Deck in `companies/<unternehmen>/decks/<deck>/project.json` geändert werden. Die Inhalte sind danach mit den Fakten und freigegebenen Materialien des jeweiligen Unternehmens zu füllen.

### Automatisch mit lokalem Ollama erstellen

Alternativ kann ein **neues** Deck aus einer JSON-Datei als KI-Entwurf erzeugt werden. Ollama muss lokal gestartet sein, ein lokal installiertes Modell muss bereitstehen, und das Unternehmen muss bereits existieren. Beispiel:

```bash
cp templates/unternehmensdaten.example.json unternehmensdaten.json
# unternehmensdaten.json in VS Code mit eigenen freigegebenen Angaben bearbeiten
ollama list
npm run generate -- beispiel-gmbh/ki-entwurf unternehmensdaten.json --model qwen3:8b
```

Wähle bei `--model` einen tatsächlich lokal installierten Modellnamen aus `ollama list`. Der Befehl erzeugt Folien und Sprechtexte und exportiert HTML, PDF und PPTX. Zum Testen nur mit HTML: `--format html`. Bestehende Decks werden nicht überschrieben; für einen weiteren Versuch eine neue Deck-ID wählen. Details zu Einrichtung, Datenschutz, Eingabefeldern und Fehlerbehandlung stehen in [docs/OLLAMA.md](./docs/OLLAMA.md).

**Wichtig:** KI-Ergebnisse können falsch oder unvollständig sein. Inhalte, Quellen, Annahmen und Folienlayout vor jeder Verwendung prüfen. Die technische Prüfung ersetzt keine fachliche Freigabe.

Prüfen und erzeugen:

```bash
npm run list
npm run check -- beispiel-gmbh/angebot
npm run build -- beispiel-gmbh/angebot
```

`npm run build` erstellt HTML, PDF und PPTX. Einzelne Befehle sind `npm run build:web`, `npm run build:pdf` und `npm run build:pptx`. Dateien liegen unter `dist/<unternehmen>/<deck>/`. Bei PDF/PPTX-Problemen Browserinstallation und `BROWSER_PATH` in [docs/FEHLERHILFE.md](./docs/FEHLERHILFE.md) prüfen.

Alle Befehle:

```bash
npm run help
```

## Projektstruktur

| Ordner | Zweck |
|---|---|
| `companies/<unternehmen>/` | Unternehmensname, Branding und zugehörige Decks |
| `companies/<unternehmen>/decks/<deck>/slides/` | Sichtbare Folientexte und Tabellen |
| `companies/<unternehmen>/decks/<deck>/notes/` | Sprechtexte |
| `companies/<unternehmen>/decks/<deck>/assets/` | Deckbezogene Bilder und Diagramme |
| `companies/<unternehmen>/decks/<deck>/project.json` | Titel, Folienreihenfolge, Phasen und Zeitbudget |
| `templates/company/`, `templates/deck/` | Ausgangsvorlagen für künftig angelegte Unternehmen und Decks |
| `scripts/` | Prüfung, Zusammenbau, Vorschau, Export und Erzeugung neuer Inhalte |
| `themes/` | Layout und Basisdesign |
| `build/` | Automatisch erzeugte Zwischenstände; nicht direkt bearbeiten |
| `dist/` | Präsentationsausgaben; werden neu erzeugt |
| `reference/` innerhalb eines Decks | Quell- und Referenzmaterialien für dieses Deck |

Die Vorlage unter `templates/deck/` ist neutral. Änderungen daran betreffen künftig angelegte Decks, nicht bereits vorhandene Decks. Die Meyer-Fallstudie bleibt eigenständig unter `companies/meyer/decks/cloud-transformation/`. Ausführliche Hinweise stehen in [docs/PLATTFORM.md](./docs/PLATTFORM.md).

## Bestehendes Meyer-Referenzdeck

Das Meyer-Deck umfasst 18 Folien: 20 Minuten Konzept, fünf Minuten Management Summary und sechs Reservefolien. Es behandelt ein fiktives Cloud-Transformationsszenario. Die Empfehlungen, Zeitpläne und Beispielkosten sind keine bestätigten Kundenmessungen oder verbindlichen Zusagen. Fachliche Hintergründe und Grenzen stehen im deckeigenen `docs/Gesamtleitfaden.md`.

## Exportdateien

```bash
npm run check -- meyer/cloud-transformation
npm run build -- meyer/cloud-transformation
```

Der normale PPTX-Export enthält Folienbilder und Sprechernotizen, keine editierbaren Textfelder. Änderungen werden in den Markdown-Quelldateien vorgenommen und erneut exportiert. Die erzeugten Dateien nicht als Quelle bearbeiten.

## Änderungen versionieren

Git ist lokal verwendbar, aber es ist kein Remote vorkonfiguriert. Zum Initialisieren und Sichern des Projektstands:

```bash
git init
git add .
git commit -m "Präsentationsplattform initialisieren"
```

Vor einem Upload prüfen, ob alle Quellen und Materialien veröffentlicht werden dürfen. Geheimnisse und sensible Kundendaten gehören nicht in Git.

## Mögliche nächste Ausbaustufen

- CI-Prüfung und reproduzierbare HTML-Erzeugung in einem gewählten Repository.
- Zusätzliche Decklayouts und Vorlagen für verschiedene Präsentationstypen.
- Strukturierte Erfassung freigegebener Anforderungen, Annahmen und Abnahmekriterien.
- Separates Infrastrukturprojekt für tatsächliche Cloud-Ressourcen mit eigener Planung, Freigabe, Identitäten und Kostenkontrolle.

Die Präsentationsplattform selbst führt keine Deployment- oder Cloud-Aktionen aus. Siehe [automation/README.md](./automation/README.md).
