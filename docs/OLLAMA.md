# Präsentationen lokal mit Ollama erzeugen

Die Plattform erstellt einen KI-Entwurf aus strukturierten Unternehmensdaten und der neutralen 18-Folien-Vorlage. Dafür sendet sie die Daten ausschließlich an `http://127.0.0.1:11434`. Pro Folie wird das installierte Modell einmal aufgerufen. Als Cloud-Modelle erkennbare Einträge werden abgelehnt. Ollama bietet selbst Cloud-Funktionen; diese für vertrauliche Daten zusätzlich in Ollama deaktivieren und ausschließlich lokal installierte Modelle einsetzen. Ein anders konfigurierter lokaler Dienst oder Proxy könnte Daten weiterleiten: Prüfe deshalb, dass die Adresse tatsächlich dein lokaler Ollama-Dienst ist. Die lokale Verarbeitung ersetzt keine Prüfung von Firmenrichtlinien, Zugriffsrechten und sicherer Ablage.

## 1. Ollama und ein lokales Modell bereitstellen

Ollama von [ollama.com/download](https://ollama.com/download) installieren und die Anwendung starten. Bei einer Installation über Homebrew kann der lokale Server stattdessen in einem eigenen Terminal gestartet werden:

```bash
OLLAMA_NO_CLOUD=1 ollama serve
```

Dieses Terminal für die Dauer der Verwendung geöffnet lassen. Ein geeigneter lokaler Modell-Download kann, abhängig von Arbeitsspeicher und freiem Speicherplatz, einige Gigabyte benötigen. In einem zweiten Terminal:

```bash
ollama pull qwen3:8b
ollama list
```

Das Herunterladen des Modells benötigt Internet; dabei werden keine Unternehmensdaten übermittelt. Nur einen Modellnamen aus `ollama list` verwenden, der lokal ausgeführt wird. Für lokalen Betrieb kann in `~/.ollama/server.json` die Einstellung `"disable_ollama_cloud": true` gesetzt werden; alternativ unterstützt Ollama `OLLAMA_NO_CLOUD=1` beim Start des Servers. Ollama nach einer Konfigurationsänderung neu starten. Details stehen in der [Ollama-Dokumentation](https://docs.ollama.com/faq#how-do-i-disable-ollama-cloud-features). Der Port ist bei Bedarf mit `OLLAMA_LOCAL_PORT` änderbar; die Anwendung verbindet sich trotzdem nur mit `127.0.0.1`.

## 2. Unternehmen anlegen und Daten vorbereiten

Falls das Unternehmen noch nicht existiert:

```bash
npm run new:company -- beispiel-gmbh "Beispiel GmbH" --accent "#0a7d3b"
```

Die Beispieldatei kopieren und in VS Code bearbeiten:

```bash
cp templates/unternehmensdaten.example.json unternehmensdaten.json
```

`titel` ist ein einzeiliger Text. `zielgruppe`, `ziel`, `ausgangslage`, `herausforderungen` und `ziele` sind nichtleere Listen von Texten. Weitere Felder aus der Beispieldatei sind optional; für unbekannte Angaben leere Listen verwenden. Jeder Listenpunkt darf bis zu 2000 Zeichen lang sein; die Datei insgesamt höchstens 100 KB. Quellen, bestätigte Fakten, Annahmen und offene Fragen klar unterscheiden. Die Beispieldatei enthält Daten aus dem fiktiven Meyer-Fall, keine echten Kundendaten. Für ein anderes Unternehmen alle Angaben einschließlich Titel und Quellen ersetzen.

Die JSON-Datei enthält möglicherweise vertrauliche Informationen. Nur Daten verwenden, die du verarbeiten darfst, und die Datei an einem freigegebenen, geschützten Ort ablegen. Sie wird **nicht automatisch von Git ignoriert**: Vor `git add` und vor jeder Veröffentlichung prüfen, was aufgenommen wird.

## 3. Präsentation erzeugen

```bash
npm run generate -- beispiel-gmbh/ki-entwurf unternehmensdaten.json --model qwen3:8b
```

`beispiel-gmbh` muss bereits bestehen; `ki-entwurf` muss neu sein. Die Erzeugung überschreibt keine vorhandenen Decks. Für einen weiteren Lauf eine neue Deck-ID verwenden. Folien und Notizen werden unter `companies/beispiel-gmbh/decks/ki-entwurf/` gespeichert; HTML, PDF und PPTX unter `dist/beispiel-gmbh/ki-entwurf/`. Der Export von PDF und PPTX benötigt einen unterstützten Browser.

Nur HTML erzeugen:

```bash
npm run generate -- beispiel-gmbh/weiterer-entwurf unternehmensdaten.json --model qwen3:8b --format html
```

Einzelne Formate sind auch `pdf` und `pptx`. Wenn der Export nach erfolgreicher Erstellung fehlschlägt, bleiben die Quelldateien erhalten. Nach Fehlerbehebung kann man den Export wiederholen:

```bash
npm run build -- beispiel-gmbh/ki-entwurf
```

## 4. Prüfen

Die Ausgabe ist ein **KI-Entwurf**, keine verifizierte Beratung. Fakten, Zahlen, Quellen, Vorschläge und offene Punkte mit den Unternehmensdaten abgleichen. Auch Layout, Sprechertexte und die Verständlichkeit aller Folien prüfen. `npm run check -- beispiel-gmbh/ki-entwurf` prüft Struktur und Zeitplan, nicht die sachliche Richtigkeit. Danach können Folien und Notizen wie gewohnt bearbeitet und neu exportiert werden.

Eine fehlerhafte Modellantwort oder ein nicht verfügbares Modell stoppt die Erzeugung mit einer Fehlermeldung. Vor der Erstellung des Decks müssen alle 18 Modellantworten gültig vorliegen; die Laufzeit hängt stark vom Mac und Modell ab.
