# Schnellstart auf dem Mac

1. Diesen Projektordner in VS Code öffnen.
2. Node.js LTS ab Version 20 installieren, falls noch nicht vorhanden.
3. Im VS-Code-Terminal ausführen:

   ```bash
   npm ci
   npm run check
   npm run preview
   ```

4. `http://127.0.0.1:8080` im Browser öffnen. **Ctrl+C** beendet die Vorschau.

## Neues Unternehmen und neue Präsentation

```bash
npm run new:company -- beispiel-gmbh "Beispiel GmbH" --accent "#0a7d3b"
npm run new:deck -- beispiel-gmbh/angebot "Cloud-Konzept für Beispiel GmbH"
```

Die neutrale Deckvorlage enthält eine empfohlene Gliederung für Hauptteil, Management Summary und Reservefolien. Fülle sie mit den bestätigten und zur Nutzung freigegebenen Informationen des jeweiligen Unternehmens. Branding wie Farben und Logo steht in `companies/<unternehmen>/company.json`.

Folien bearbeitest du in `companies/<unternehmen>/decks/<deck>/slides/`, Sprechtexte in `…/notes/`. Danach prüfen und exportieren:

```bash
npm run check -- beispiel-gmbh/angebot
npm run build -- beispiel-gmbh/angebot
```

Ausgaben liegen in `dist/<unternehmen>/<deck>/`. Für PDF und PowerPoint braucht Marp einen unterstützten Browser. Weitere Befehle, Ordner und Hinweise zur Trennung von Unternehmen stehen in [README.md](./README.md) und [docs/PLATTFORM.md](./docs/PLATTFORM.md).

## KI-Entwurf aus Unternehmensdaten

Mit einem lokal installierten und laufenden Ollama-Modell kannst du Folien und Notizen aus einer JSON-Datei erstellen lassen. Einrichtung, Beispiel und Datenschutz stehen in [docs/OLLAMA.md](./docs/OLLAMA.md). Der Entwurf muss vor der Verwendung fachlich und visuell geprüft werden.
