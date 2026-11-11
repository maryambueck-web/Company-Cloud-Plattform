# Fehlerhilfe

Fehlermeldungen beginnen mit Unternehmen und Deck in eckigen Klammern, z. B. `[meyer/cloud-transformation]`.

| Meldung | Ursache / nächster Schritt |
|---|---|
| `npm: command not found` | Node.js LTS installieren und ein neues Terminal öffnen. |
| `ENOENT ... package.json` | Falscher Ordner. Mit `pwd` prüfen und in den Projektordner wechseln. |
| `Marp CLI ist nicht installiert` | Im Projektordner `npm ci` ausführen. |
| Ein `npm run …`-Befehl tut gar nichts | Den Namen prüfen, `npm run help` zeigt alle Befehle. Ohne `--silent` zeigt npm unbekannte Skripte als Fehler an. |
| Paketdownload schlägt fehl | Internet, Unternehmensproxy und npm-Konfiguration prüfen. Keine TLS-Prüfung deaktivieren. |
| PDF/PPTX findet keinen Browser | Unterstützten Browser installieren und ggf. `BROWSER_PATH` mit dem realen Pfad setzen. |
| `Port … belegt` | `PORT=8081 npm run preview` verwenden oder die alte Vorschau mit Ctrl+C beenden. |
| `Unternehmen „…“ nicht gefunden` | `npm run list` zeigt alle Unternehmen. Jedes braucht `companies/<firma>/company.json`. |
| `Deck-Angabe … muss die Form <firma>/<deck> haben` | Decks immer mit Firma angeben, z. B. `meyer/cloud-transformation`. |
| `branding.… muss eine Farbe wie #c00065 sein` | Farbe in `company.json` als `#rrggbb` angeben. |
| `Logo nicht gefunden` / `Logo muss SVG, PNG …` | Logo unter `companies/<firma>/assets/` ablegen und als `assets/<datei>` eintragen, höchstens 1 MB. |
| Logo verdeckt Inhalt | Text kürzen. Das Logo sitzt unten rechts im Fußbereich. |
| `Zeitplan stimmt nicht` | Sekunden in `project.json` mit `targets` abgleichen. Reserve hat 0 Sekunden. Mit `"targets": null` entfällt die Prüfung. |
| `Folie fehlt` / `Notiz fehlt` | Datei unter `slides/<id>.md` bzw. `notes/<id>.md` anlegen. Einfacher geht es mit `npm run new:slide -- <firma>/<deck> <name>`. |
| `Bild nicht gefunden` | Bild unter `…/decks/<deck>/assets/` ablegen und in der Folie als `assets/<datei>` einbinden. |
| `Pflichtbegriffe fehlen` | Begriff in eine Folie aufnehmen oder aus `requiredTerms` entfernen. |
| Schrift sieht anders aus | Die in `branding.font` genannte Schrift ist auf diesem Rechner nicht installiert. Der Browser nimmt dann die nächste Schrift der Liste. |
| Text läuft aus der Folie | Text kürzen oder eine Reservefolie nutzen. Automatische Prüfungen ersetzen keine Sichtprüfung. |

Eine Inhaltsdatei darf keine eigene Folientrennung `---` enthalten, weil jede Datei genau eine Folie bildet.

Die Vorschau beobachtet `companies/`, `themes/` und `marp.config.mjs`, neue Unternehmen und Decks eingeschlossen. Nach Änderungen an `scripts/` die Vorschau neu starten.
