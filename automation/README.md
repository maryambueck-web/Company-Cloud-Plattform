# Später weiterentwickeln

Dieser Ordner enthält noch keine produktive Infrastruktur und keine Verbindung zu einer Cloud. Das Präsentationsprojekt dient zunächst der sicheren lokalen Bearbeitung und reproduzierbaren Ausgabe.

Sinnvolle nächste Ausbaustufen:

1. **Inhalte prüfen:** Zeitbudget, vorhandene Quellen, erforderliche Themen und vollständige Notizen automatisch kontrollieren. `npm run check` ist bereits vorhanden.
2. **CI ergänzen:** In einem gewählten Repository `npm ci`, `npm run check` und `npm run build:web` ausführen lassen. Eine Veröffentlichung ist ein zusätzlicher bewusster Schritt.
3. **Anforderungen strukturieren:** Freigegebene Kundenanforderungen, offene Fragen, Annahmen und Abnahmen in versionierten Dateien pflegen. Sensible Kundendaten gehören nur in einen dafür freigegebenen Ablageort.
4. **Separates OTC-Lab aufbauen:** Erst mit Konto, Budget und geprüfter Planung Infrastructure as Code für Netzwerk, Rollen und kleine Testressourcen erstellen. Plan/Review vor jeder Änderung, Kosten und Rückbau berücksichtigen.
5. **Pilot messen:** Anonymisierte Messdaten und fachliche Abnahmen kontrolliert in den Bericht übernehmen. Keine automatische Überschreibung menschlich bestätigter Annahmen.

Präsentationsänderungen führen absichtlich keine Cloud-Aktionen aus. Ein zukünftiges Deployment erhält eigene Konfiguration, Tests, Freigaben und Identitäten. Zugangsdaten nicht in Markdown oder Git speichern.
