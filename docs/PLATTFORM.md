# Wiederverwendbare Präsentationsplattform

Die Plattform trennt den Präsentationsbaukasten von den Inhalten einzelner Unternehmen:

```text
templates/
  company/                 Unternehmensvorlage
  deck/                    Neutrale Vorlage für neue Präsentationen
companies/
  <unternehmen>/
    company.json           Name, Farben, Schrift, Logo und Fußzeilen
    decks/
      <deck>/
        project.json       Reihenfolge, Phasen und Zeitbudget
        slides/            Sichtbare Folieninhalte
        notes/             Sprechtexte und Hinweise
        assets/            Bilder und Diagramme
        docs/              Deckbezogene Dokumentation
        reference/         Quellen und freigegebene Referenzmaterialien
```

Die vorhandene Meyer-Präsentation bleibt ein vollständiges Referenzdeck unter `companies/meyer/decks/cloud-transformation/`. Neue Unternehmen und Decks erhalten getrennte Ordner und eigenes Branding. Die neutrale Deckvorlage enthält einen 20-minütigen Hauptteil, eine fünfminütige Management Summary und sechs zeitfreie Reservefolien. Ihre Überschriften und Hinweise sind ein allgemeiner Vorschlag und können pro neuem Deck angepasst werden.

Für KI-generierte Entwürfe aus Unternehmensdaten siehe [OLLAMA.md](./OLLAMA.md). Dabei wird für jedes neue Deck die lokale Ollama-API verwendet; vorhandene Decks werden nicht überschrieben.

## Neues Unternehmen und neues Deck

Im Projektordner:

```bash
npm run new:company -- beispiel-gmbh "Beispiel GmbH" --accent "#0a7d3b"
npm run new:deck -- beispiel-gmbh/angebot "Cloud-Konzept für Beispiel GmbH"
npm run list
npm run check -- beispiel-gmbh/angebot
npm run build -- beispiel-gmbh/angebot
```

Ein Logo kann beim Anlegen mit `--logo pfad/zum/logo.svg` angegeben werden. Branding und Logo lassen sich danach in `companies/<unternehmen>/company.json` anpassen.

## Bearbeiten und Erzeugen

- Nur die Inhalte unter `companies/<unternehmen>/decks/<deck>/` gehören zu diesem Deck.
- `project.json` steuert Reihenfolge, Phase und Sprechzeit jeder Folie. Wenn das Zeitbudget angepasst wird, müssen `targets.mainSeconds` und `targets.summarySeconds` dazu passen.
- Vorlagenänderungen unter `templates/deck/` wirken sich nur auf künftig angelegte Decks aus. Bereits erzeugte Decks werden nicht überschrieben.
- `build/` und `dist/` sind generierte Dateien; Änderungen dort gehen beim nächsten Build verloren.
- `npm run preview -- <unternehmen>/<deck>` startet die lokale Vorschau für ein einzelnes Deck. Ohne Auswahl werden alle Decks gebaut.

## Gestaltung und Bewegung

Das gemeinsame Design in `themes/standard.css` gilt für alle Unternehmen. Farben und Schrift stammen aus der jeweiligen `company.json`. Titelfolie, Management Summary und Reservefolien erhalten automatisch ein passendes Layout. Besondere Layouts wie `architecture`, `compact` und `diagram` können in einer Folie mit `<!-- _class: diagram -->` ausgewählt werden.

Bilder und Diagramme werden lokal im Deckordner `assets/` abgelegt und beispielsweise mit `![Beschreibung](assets/grafik.svg)` eingebunden. Für unterschiedliche Unternehmen müssen die Grafiken bei Bedarf an deren Inhalte und Farben angepasst werden.

Der HTML-Export blendet Inhalte beim Folienwechsel dezent ein. Bei aktivierter Systemeinstellung für reduzierte Bewegung sowie in Übersicht und Präsentationsansicht für Vortragende bleibt die Animation ausgeschaltet. PDF und PowerPoint sind statisch; der PowerPoint-Export ist bildbasiert und enthält Sprechernotizen, aber keine einzeln editierbaren Texte.

## Trennung von Kundendaten

Die Meyer-Inhalte sind fallbezogen und werden nicht automatisch in neue Unternehmen kopiert. Für neue Decks nur bestätigte, zur Verwendung freigegebene Informationen eintragen. Kundenvertrauliche Daten nur in freigegebenen Ablagen speichern. Die Plattform erstellt lokale Präsentationsdateien; sie verbindet sich nicht mit Kundensystemen und provisioniert keine Cloud-Ressourcen.
