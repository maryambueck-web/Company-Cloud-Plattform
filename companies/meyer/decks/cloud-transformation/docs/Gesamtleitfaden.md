# Cloud-Transformation bei Meyer Industrial Solutions

## Lösungsvorschlag und Praxisleitfaden für das Bewerbungsgespräch

**Perspektive:** Sales Consultant Cloud. **Präsentationsziel:** Eine fundierte Entscheidung über Assessment und Pilotierung ermöglichen. **Grundlage:** bereitgestellte HTML-Fallbeschreibung. **Status:** Grobkonzept, keine freigegebene Feinplanung oder verbindliche Leistungszusage.

## 1. Deine Empfehlung in einer Minute

„Ich empfehle eine schrittweise Transformation mit drei Schwerpunkten: den ERP-Betrieb stabilisieren, Zugriffe von der Abhängigkeit zum Hauptsitz lösen und die kleine IT durch verbindlich geregelte Betriebsleistungen entlasten. Zunächst messen wir die Ursachen der Störungen. Anschließend prüfen wir eine betreute Cloud-Infrastruktur für den zusammenhängenden ERP-Verbund. Entwicklung und Test überführen wir wie vorgegeben in die Open Telekom Cloud. Standortvernetzung, Identitäten und Wiederherstellung entwickeln wir parallel weiter. Jede Migrationswelle erhält messbare Abnahmekriterien und einen geprüften Rückfallweg.“

**Warum diese Empfehlung?** Sie berücksichtigt geschäftskritische Altanwendungen, vorhandene SaaS-Nutzung, die begrenzte IT-Kapazität und den ausdrücklich vorgegebenen Einsatz der Open Telekom Cloud für Entwicklung und Test.

## 2. Fakten, offene Punkte und Annahmen

| Gesicherte Information aus dem Fall | Konsequenz für das Konzept |
|---|---|
| Rund 300 Mitarbeitende, davon rund 70 regelmäßig im Außendienst. Fünf Standorte: Hauptverwaltung mit Rechenzentrum, Produktion, Logistik, Vertrieb sowie Service und Entwicklung | Standortübergreifende und mobile Arbeitsfähigkeit ist geschäftskritisch |
| Vier IT-Mitarbeitende übernehmen Betrieb, Support, Security und Projekte | Managed Services müssen konkrete Aufgaben übernehmen |
| Dell, VMware, zentraler Storage und Windows-Dienste im eigenen Rechenzentrum | Kapazitäten, Supportstände, Lizenzen und Ablösefristen prüfen |
| ERP auf mehreren VMs, separate Datenbank, geringe interne Latenz erforderlich. Kurzfristig nicht als SaaS verfügbar | ERP, Datenbank und Terminalserver als zusammenhängende Migrationsgruppe betrachten |
| ERP-Störungen mit unbekannter Ursache | Erst messen, dann eine passende Maßnahme auswählen |
| Hauptsitz ist Netzwerkknoten und teilweise Internet-Ausgang | Ausfall des Hauptsitzes betrifft auch weitere Standorte und SaaS-Zugriffe |
| Microsoft 365 und externes CRM sind bereits SaaS | Dienste behalten, Zugang und Sicherheitsrichtlinien verbessern |
| Backup überwiegend zentral, externe Sicherung unvollständig | Externe, geschützte Sicherung und echte Wiederherstellung priorisieren |
| Entwicklung/Test am Service- und Entwicklungsstandort ist nicht durchgehend ausgelastet und braucht zeitweise kurzfristig mehr Ressourcen. Ziel ist OTC | Elastische Ressourcen und Nutzungsabrechnung mit einem positiven Modernisierungsplan verbinden |

**Transparente Arbeitsannahmen:**

1. **A1 - ERP-Support:** Der Hersteller erlaubt den Betrieb in einer externen virtuellen Umgebung. Ohne schriftliche Freigabe erfolgt keine ERP-Migration. Alternative: lokale Erneuerung und Stabilisierung als Übergang.
2. **A2 - Zeit:** Eine Umsetzung in etwa vier bis sechs Monaten dient nur als Planungshypothese. Leitungsbereitstellung, Datenvolumen, Supportfreigaben und Geschäftsfenster können sie verändern.
3. **A3 - Betrieb:** Ein Dienstleister kann einen klar abgegrenzten Managed-Service-Umfang anbieten. Architektur, Serviceumfang und Preis müssen gemeinsam geprüft werden.
4. **A4 - Wiederanlauf:** ERP-RTO von vier Stunden und ERP-RPO von 15 Minuten sind Diskussionswerte, keine Kundenvorgaben und keine Zusage. Business Impact Analyse und technische Tests entscheiden.
5. **A5 - Datenstandorte:** Für die erste Planung priorisieren wir deutsche Betriebs- und Sicherungsstandorte. Zulässige Länder, Supportzugriffe und Vertragsanforderungen müssen Datenschutz und Kunde bestätigen.

## 3. Analyse: Was ist das eigentliche Kundenproblem?

| Herausforderung | Geschäftliches Risiko | Erste Reaktion |
|---|---|---|
| Unzuverlässige ERP-Nutzung | Verzögerte Aufträge, Produktion, Versand und Abrechnung | Störungen zeitlich erfassen und Ende-zu-Ende messen |
| Konzentration am Hauptsitz | Ein Standort- oder Leitungsausfall beeinträchtigt mehrere Niederlassungen | Alternative Verbindungen und direkte Zugriffe planen |
| Hardware- und Software-Lifecycle | Ungeplante Ausfälle und Investitionen unter Zeitdruck | Fristen und Ersatzbedarf erfassen |
| Vier stark ausgelastete IT-Mitarbeitende | Langsame Entstörung und wenig Zeit für Weiterentwicklung | Aufgaben und Eskalationen vertraglich zuordnen |
| Unvollständige externe Sicherung | Gemeinsamer Verlust von Produktivsystemen und Sicherungen | Getrennte Kopie und Restore-Nachweis schaffen |
| VPN und Security ohne durchgängiges Zugangskonzept | Zu breite Zugriffsrechte und uneinheitlicher Schutz | Identität, Gerätezustand und Anwendungsberechtigung zusammenführen |

**Abhängigkeiten:** Benutzergerät  >  Verbindung  >  DNS/AD  >  Terminalserver  >  ERP  >  Datenbank/Storage. Zusätzlich: Schnittstellen, Drucker, Produktionsgeräte, Zertifikate, Lizenzen, Zeitdienst, Backup und Support des ERP-Herstellers. Ein VM-Umzug allein berücksichtigt diese Kette nicht vollständig.

## 4. Discovery: Diese Fragen stellst du zuerst

### Priorität 1 - entscheidet über Lösungsweg und Investition

| Frage an den Kunden | Gesprächspartner | Warum entscheidend? |
|---|---|---|
| Welche Prozesse stehen bei ERP-Ausfall still und was kostet eine Stunde Unterbrechung? | Geschäftsführung, Produktion, Logistik, Finanzen | Geschäftliche Kritikalität und Budgetrahmen |
| Wie lange darf welcher Prozess ausfallen und wie viele Daten dürfen verloren gehen? | Prozessverantwortliche, IT | RTO/RPO bestimmen Aufwand und Wiederherstellungsmodell |
| Welches ERP, welche Datenbank und Versionen? Welche Hosting-, Lizenz- und Latenzvorgaben hat der Hersteller? | IT, ERP-Anbieter | Ausschluss ungeeigneter Zielplattformen |
| Wer ist wann und wo betroffen? Gibt es Messwerte oder korrelierende Ereignisse? | Service Desk, Fachbereiche, IT | Ursache statt Vermutung |
| Welche Schnittstellen zu Maschinen, Lager, Druckern und anderen Anwendungen bestehen? | Produktion, Logistik, IT | Lokale Abhängigkeiten und Reihenfolge der Migration |
| Wann muss Hardware ersetzt werden und wann darf das ERP umgestellt werden? | IT, Einkauf, Fachbereiche | Zeitdruck und Migrationsfenster |
| Welche Leistungen sollen extern übernommen werden und welche dürfen es nicht? | IT-Leitung, Geschäftsführung | Realistische Entlastung und Verantwortlichkeit |
| Welche Ausgaben bestehen heute und welche Verträge laufen wann aus? | Finanzen, Einkauf, IT | Vergleichbare Wirtschaftlichkeitsrechnung |

### Priorität 2 - konkretisiert die Planung

- **Infrastruktur:** Anzahl und Größe der VMs, echte CPU-/RAM-Auslastung, Storage-Latenz und IOPS, Datenwachstum, Abhängigkeiten von VMware-Funktionen.
- **Netzwerk:** Bandbreite und Auslastung je Standort, Paketverlust, Latenz, zweite Leitungen, physische Trassen, WLAN, DNS, IP-Adressräume und Überschneidungen.
- **Security:** Aktuelle Endpoint-Produkte, Patchstände, Firewalls, Protokolle, Vorfälle, administrative Zugänge und privilegierte Konten.
- **Identitäten:** AD-Struktur, Entra-Anbindung, MFA-Abdeckung, Geräteverwaltung, Rollenmodell, vorhandene Microsoft-Lizenzen.
- **Backup/DR:** Was wird tatsächlich gesichert, wie oft, mit welcher Aufbewahrung und wann zuletzt erfolgreich vollständig wiederhergestellt?
- **Compliance/Datenschutz:** Datenkategorien, betroffene Länder, Aufbewahrung, Löschung, Auftragsverarbeitung, Unterauftragnehmer und kundenseitige Branchenpflichten. Aus dem Fall lässt sich keine konkrete gesetzliche Betroffenheit ableiten.
- **Betrieb/Support:** Servicezeiten, Rufbereitschaft, Eskalation zum ERP-Hersteller, bestehende SLAs und Wissensdokumentation.
- **Entwicklung:** Auslastungsprofile, Daten in Tests, benötigte Plattformdienste, CI/CD und tatsächliche Container-Erfahrung.

**Ergebnis des Assessments:** Inventar, Abhängigkeitskarte, Messbaseline, Kritikalitätsklassen, Herstellerfreigaben, priorisierte Risiken und zwei bewertete Architekturvarianten.

## 5. Zielbild: Welcher Dienst gehört wohin?

| Bereich | Vorschlag | Begründung und Entscheidungsvorbehalt |
|---|---|---|
| Legacy-ERP, Datenbank und Terminalserver | Betreute, geeignete Cloud-Infrastruktur in Deutschland, bevorzugt zunächst mit kompatibler Virtualisierung | Möglichst geringe gleichzeitige Änderungen. VMware-basierte Umgebung nur bei Herstellerfreigabe, passenden Lizenzen und tragfähigem Gesamtpreis |
| Alternative für Legacy | Betrieb auf OTC-IaaS prüfen | Nur nach Nachweis von Kompatibilität, Performance, Migration, Lizenzierung und betreutem Gastbetrieb |
| ERP ohne geeignete Cloud-Freigabe | Befristete lokale Stabilisierung/Erneuerung | Geschäftskontinuität sichern und späteren Modernisierungsweg planen |
| Entwicklung/Test | Open Telekom Cloud mit ECS, EVS und VPC als möglichem Einstieg | Variable Last und Leerlauf passen zu elastischer Bereitstellung. Infrastructure as Code, Vorlagen, Laufzeitpläne und Tags zur Kostensteuerung |
| Container | CCE als zweite Stufe mit einem geeigneten Containerpilot | Reproduzierbares Deployment, Rollback, Security, Monitoring, Betreiber und Kosten vor Ausbau nachweisen |
| M365 und CRM | Bestehendes SaaS behalten | Zugänge optimieren, Identitäten und Geräteschutz verbessern |
| AD/DNS | Unterstützte, standortübergreifend verfügbare Identitätsdienste | Cloud-Anwendungen dürfen nicht allein von einem Domain Controller am Hauptsitz abhängen |
| Files/Print | Nutzungsabhängig entscheiden | Kollaboration kann SharePoint nutzen; SMB-, CAD-, Druck- und Produktionsabhängigkeiten separat bewerten |
| Backup | Geschützte externe Kopie plus lokale/schnell erreichbare Wiederherstellung nach Bedarf | Andere Fehlerdomäne und getrennte Administration. Passende Backup-Lösung je Plattform auswählen |

**Warum der ERP-Verbund zunächst virtuell bleibt:** Das ERP ist kurzfristig nicht als SaaS verfügbar. Eine betreute virtuelle Umgebung ist deshalb ein sinnvoller Prüfpfad, sofern Herstellerfreigabe, Lizenzierung und Leistung passen.

**Wichtig beim ERP:** Datenbank, Applikationsserver und Terminalserver innerhalb einer nachgewiesen latenzgeeigneten Umgebung betreiben. Die Datenbank wird nicht über eine gewöhnliche WAN-Verbindung von ihren Applikationsservern getrennt. Hochverfügbarkeit über mehrere Zonen wird nur gewählt, wenn Hersteller und Messungen die dafür benötigte Replikation und Latenz unterstützen. Eine zweite Region kann als DR-Ziel dienen, ohne Teil eines latenzkritischen aktiven Verbunds zu sein.

### Technische Architektur in verständlichen Worten

1. Die fünf Standorte erhalten ein zentral betreutes SD-WAN mit direktem Weg zur ERP-Hostingumgebung und zur Open Telekom Cloud. Kritische Standorte bekommen unabhängige Zugangswege nach Prüfung von Trassen, Bandbreite und Umschaltverhalten.
2. ERP-Zugriffe laufen über private beziehungsweise verschlüsselte Verbindungen in die Legacy-Umgebung. Für Remote-Nutzer erfolgt der Zugang über geprüfte Anwendungsfreigaben, etwa einen abgesicherten RDS-Zugang oder eine geeignete ZTNA-Lösung. Der konkrete Anbieter muss das verwendete RDS-Protokoll und Gateway-Modell unterstützen. Kein öffentlich freigegebener RDP-Port als Zugangskonzept.
3. M365 nutzt einen geeigneten lokalen Internet-Ausgang und lokale Namensauflösung. Teams benötigt insbesondere für Sprache und Video kurze Wege mit geringen Verzögerungen und möglichst wenig Jitter/Paketverlust. Medienpfade und Qualität werden im Pilot geprüft. Die Sicherheitsarchitektur berücksichtigt die Microsoft-Empfehlungen für kurze Wege und vermeidet unnötige Umwege durch Inspektionsdienste. Ausnahmen werden anhand aktueller Endpunktkategorien und abgestimmter Richtlinien verwaltet.
4. CRM erhält einen sicheren direkten Internetzugang. Falls der Anbieter es unterstützt, verbinden wir SSO, MFA und Zugriffsregeln mit dem zentralen Identitätsdienst.
5. Homeoffice und Außendienst erhalten anwendungsbezogene Zugänge mit MFA, Gerätezustandsprüfung und minimalen Rechten. Nicht unterstützte Altanwendungen erhalten einen begrenzten Übergangszugang.
6. AD-Domänendienste bleiben für Legacy-Anwendungen verfügbar. Entra ID unterstützt Cloud-Identitäten und SaaS-Anmeldung, ersetzt aber nicht automatisch alle AD-Funktionen. Synchronisation und Abhängigkeiten werden geprüft.
7. Management, Entwicklung/Test, ERP und Backup werden durch Netzsegmente und Rollen getrennt. Produktionsmaschinen kommunizieren nur über benötigte, kontrollierte Übergänge. Lokale Produktionsanforderungen können lokale Komponenten erfordern.
8. Zentrales Monitoring erfasst nicht nur Serverzustände, sondern auch ERP-Anmeldung und geschäftliche Testtransaktionen aus mehreren Standorten.

### Stufenplan für Entwicklung, Automatisierung und Container

Der Ausgangspunkt ist konkret: Am Service- und Entwicklungsstandort besteht zeitweise Leerlauf, gelegentlich aber kurzfristiger Mehrbedarf. OTC kann dafür passende Ressourcen nach Bedarf bereitstellen. Die Skalierbarkeit ist zu planen und zu testen; eine einzelne Legacy-Anwendung skaliert nicht automatisch horizontal.

| Stufe | Umsetzung | Kriterien vor Ausbau |
|---|---|---|
| 1. Standardisierte virtuelle Server | Vorlagen und versionierte Infrastructure as Code, automatisierter Aufbau, Laufzeitpläne, Quoten und Tags | Reproduzierbarkeit, genehmigte Ressourcen und Kostenbericht |
| 2. Containerpilot in CCE | Geeignete Entwicklungsanwendung, CI/CD, geprüfte Images und Rollback | Deployment und Rollback funktionieren, Security und Monitoring sind abgenommen, Betreiber ist benannt |
| 3. Weitere Plattformdienste | Geeigneter Objekt- oder Datenbankdienst und weitere Automatisierung | Kompatibilität, Datenschutz, Wiederherstellung und wirtschaftlicher Nutzen nachgewiesen |

**Wirtschaftlicher Nutzen:** Zusätzliche Ressourcen zeitweise bereitstellen und unnötige Laufzeiten reduzieren. Pay-as-you-go bedeutet nutzungsabhängige Abrechnung nach Dienst und Tarif. Beim Stoppen können unter anderem Speicher-, IP-, Lizenz-, Reservierungs- und Clusterkosten bestehen bleiben. Keine pauschale Nullkosten- oder Einsparzusage. Passende Ausprägungen und Quoten sind vorab zu prüfen.

### Zero Trust, SASE und moderner Geräteschutz als ausdrückliches Ziel

**Zero Trust** ist das Zugriffsprinzip: Identität und Gerätezustand prüfen, minimale Rechte vergeben und relevante Risiken während des Zugriffs berücksichtigen. **SASE** führt Standortvernetzung und zentral gesteuerte Sicherheitsfunktionen zusammen. **SD-WAN** steuert Netzwege. **ZTNA** begrenzt den Zugang auf benötigte Anwendungen. Diese Begriffe sind keine austauschbaren Produktnamen und garantieren allein keine bessere ERP-Performance.

Die heutigen breiten Firmen-VPN-Zugänge werden nach erfolgreichen Anwendungstests in Nutzer- und Anwendungswellen durch ein zentral gesteuertes Secure-Access-Modell ersetzt. Für nicht unterstützte Legacy-Anwendungen bleibt ein begrenzter und überwachter Übergangspfad. Verschlüsselte Standortverbindungen sind davon gesondert zu betrachten.

Die klassische Endpoint-Security wird zu einer geeigneten modernen Schutzplattform mit **EDR (Endpoint Detection and Response)** weiterentwickelt beziehungsweise durch eine passende Lösung ersetzt. Prävention bleibt erhalten. Der beauftragte Betrieb überwacht Endgeräte, bewertet Alarme, isoliert Geräte nach Runbook und eskaliert Vorfälle. Lizenzen, Gerätekompatibilität und Betriebsaufwand werden geprüft, bevor ein Produkt ausgewählt wird.

**Zusätzliche Discovery-Frage:** Welche Microsoft-365-Sicherheitsfunktionen sind lizenziert, tatsächlich aktiviert und regelmäßig überwacht? Konkret: MFA, Conditional Access, Geräteverwaltung, E-Mail-/Kollaborationsschutz und EDR. Aus dem Case ergibt sich keine vollständige Abdeckung. Vorhandene passende Lizenzen nutzen und Doppelkäufe vermeiden.

## 6. Ursachenanalyse und Erfolgsmessung

### Messplan vor Architekturfreigabe

- Mindestens einen repräsentativen Geschäftszyklus einschließlich Spitzenlast beobachten, als Startvorschlag etwa zwei Wochen.
- Uhrzeit, Benutzerstandort, betroffenen Prozess, Gerätezustand und Fehlerbild zu jeder Störung erfassen.
- Netzwerk: Latenz, Paketverlust, Jitter, Auslastung und Pfadwechsel messen.
- Terminalserver: Anmeldezeit, Profil-/GPO-Verarbeitung, Sitzungsabbrüche, CPU/RAM und gleichzeitige Nutzer prüfen.
- VMware/Storage: CPU Ready, Überbelegung, Datastore-Latenz, Queueing, Host-Ereignisse und Backup-Zeitfenster untersuchen.
- Datenbank/ERP: Sperren, langsame Abfragen, Jobs und Herstellerlogs mit den Störungszeiten korrelieren.
- Fachlichen Ablauf testen: Anmeldung, Auftrag öffnen, Auftrag speichern, Lagerbuchung, Druck und Abrechnung. Kritische Produktionsschnittstellen separat abnehmen.

### Beispiele für gemeinsam festzulegende Abnahmekriterien

| Messgröße | Arbeitsziel, ausdrücklich noch abzustimmen |
|---|---|
| ERP-Anmeldung | p95 um mindestens 30 % gegenüber gleicher Baseline verbessern |
| Geschäftsabläufe | Herstelleranforderung und mit Fachbereich vereinbarte Antwortzeiten bei repräsentativer Last erfüllen |
| Sitzungsabbrüche | Im Pilot gegenüber dokumentierter Baseline senken, Ziel nach Ursachenanalyse |
| Standortausfall | Definierte Zweitverbindung übernehmen lassen und tatsächliche Umschaltzeit dokumentieren |
| Wiederanlauf ERP | Den freigegebenen RTO/RPO in vollständigem Test inklusive AD, DNS, Zugang und Schnittstellen erreichen |
| IT-Entlastung | Routineaufwand vor/nach Übergabe messen und vereinbarte Reduktion nachweisen |
| Kosten | Monatlicher Bericht zu Verbrauch, Forecast und Abweichungen mit benanntem Verantwortlichen |

**p95 bedeutet:** 95 % der Messungen sind gleich schnell oder schneller. Mittelwerte allein verbergen langsame Einzelfälle. Vorher und nachher werden mit vergleichbarer Last, Nutzergruppe und Messmethode verglichen.

## 7. Backup, Hochverfügbarkeit und Wiederanlauf

**RTO:** Wie lange darf ein Geschäftsprozess ausfallen? **RPO:** Wie viel zeitlicher Datenverlust ist akzeptabel? Eine Sicherung alle 24 Stunden erfüllt kein RPO von 15 Minuten.

| Ebene | Ziel | Umsetzung im Grobkonzept |
|---|---|---|
| Hochverfügbarkeit | Einzelne Fehler ohne lange Unterbrechung überstehen | Redundante Komponenten und Dienste nach Herstellerfreigabe, keine bloße Annahme aufgrund einer Cloud-Plattform |
| Backup | Frühere, konsistente Datenstände erhalten | Anwendungs-/datenbankkonsistente Sicherungen, getrennte Kopien, Aufbewahrung, geschützte Administration |
| Disaster Recovery | Nach größerem Ausfall vollständigen Betrieb wiederherstellen | Zweiter geeigneter Standort/Region, Kapazitätsplan, Ablaufplan, Prioritäten und regelmäßig geübter Wiederanlauf |

Für das beispielhafte ERP-RPO von 15 Minuten wären beispielsweise unterstützte Datenbank-Logsicherungen oder geeignete Replikation nötig. Verfahren, Kosten und gemessener Wiederherstellungszeitpunkt entscheiden. Replikation allein schützt nicht vor mitübertragenen Löschungen oder Verschlüsselung.

Für lokale beziehungsweise gehostete VMware-Workloads ist eine kompatible Backup-Lösung mit geeigneter externer Zielablage zu prüfen. OTC CBR ist kein pauschaler Ersatz für beliebige VMware-Backups: Der native Leistungsumfang umfasst bestimmte OTC-Ressourcen wie ECS, EVS und SFS Turbo. Backup Lock und regionale Replikation sind ressourcen- und richtlinienabhängig. Die dokumentierten Einschränkungen, darunter die gesonderte Behandlung manueller Backups beim Lock, müssen berücksichtigt werden.

**Restore-Test:** Isolierte Wiederherstellung, Malware-/Integritätsprüfung, AD/DNS und Zugang bereitstellen, ERP und Datenbank starten, Schnittstellen kontrolliert verbinden, Fachbereich bucht einen Testauftrag. Zeitmessung beginnt beim vereinbarten Ausfall-/Incident-Zeitpunkt und endet mit fachlich bestätigtem Betrieb. Nachweis und Probleme dokumentieren.

## 8. Migration mit Freigabepunkten

**Zeitangaben sind Planungshypothesen und hängen vom Assessment ab.** Schutzmaßnahmen und aktuelle Störungsbehebung beginnen sofort und warten nicht auf den Gesamtumzug.

| Phase | Beispielzeitraum | Ergebnis und Freigabekriterium |
|---|---|---|
| Assessment | Woche 1-3 | Inventar, Messbaseline, Abhängigkeiten, BIA, Herstellerfragen und Risiken |
| Lösungsentscheidung | Woche 4-6 | Bewertete Varianten, Kostenkorridor, Supportfreigaben, Verantwortlichkeiten, Pilotauftrag |
| Basis und Pilot | Woche 7-10 | Identitäten, Netzwerk, Protokollierung, Backup und isolierter Dev/Test- bzw. repräsentativer ERP-Pilot |
| Migrationswellen | Woche 11-18 | Geprüfte, voneinander abgegrenzte Umzüge mit Fachbereichsabnahme |
| Stabilisierung und Übergabe | Woche 19-24 | Wiederanlaufprüfung, Dokumentation, Schulung, Regelbetrieb und Abnahme |

**Reihenfolge der Wellen:**

1. Foundation: Adressierung, Netzwege, Identitäten, Berechtigungen, Monitoring und Backups.
2. Entwicklung/Test in OTC und Pilot für direkten SaaS-Zugang an einem Standort. Erkenntnisse für weitere Standorte nutzen.
3. Geeignete unkritische Dienste anhand ihrer Abhängigkeiten umziehen. AD/DNS-Verfügbarkeit rechtzeitig vor abhängigen Anwendungen sicherstellen.
4. ERP mit Datenbank, Terminalservern, benötigten Schnittstellen und Fachbereichen als abgestimmten Verbund umstellen. Produktive Datenübernahme folgt dem Herstellerverfahren.
5. Erst nach stabiler Abnahme Altressourcen und Verträge kontrolliert abbauen. Aufbewahrungs- und Löschvorgaben beachten.

### Beispiel: ERP-Cutover

Vorab Testmigration und Wiederherstellung durchführen. Danach Kommunikationsplan, erreichbare Entscheider, Rückfallfrist und zulässige Unterbrechung festlegen. Zum Cutover Schreibzugriffe stoppen, finalen konsistenten Datenstand übertragen, Ziel prüfen und Nutzerzugänge umstellen. Fachbereiche testen vor produktiver Schreibfreigabe. Erst anschließend den neuen Betrieb freigeben und eng überwachen.

**Rückfall vor Schreibfreigabe:** Altsystem mit dokumentiertem letzten konsistenten Stand reaktivieren und Zugänge zurückschalten. **Rückfall nach neuen produktiven Buchungen:** Es braucht einen ausdrücklich abgestimmten Datenabgleich oder eine Wiederherstellung des neuen Datenstands. Einfaches Zurückschalten würde Buchungen verlieren. Schwellen und Entscheidungsbefugnis vorab festlegen, zum Beispiel kritische Prozessfehler oder Überschreitung der vereinbarten Ausfallzeit.

## 9. Betriebsmodell: Wie die vier IT-Mitarbeitenden entlastet werden

| Leistung | Kunde | Dienstleister | ERP-/Softwareanbieter |
|---|---|---|---|
| Geschäftsprozesse, Prioritäten, Datenfreigaben | Entscheidet und nimmt fachlich ab | Berät | Berät zu Anwendung |
| Benutzerrollen | Genehmigt | Setzt im beauftragten Umfang um | Unterstützt ERP-Rollen |
| Infrastruktur-/Netzbetrieb | Steuert und kontrolliert Vertrag | Betreibt, überwacht, entstört | Bei Supportfällen beteiligt |
| Windows-/Gastbetrieb | Vereinbart Wartungsfenster | Patcht und betreibt nur bei ausdrücklich vereinbartem Umfang | Bestätigt Kompatibilität |
| ERP und Datenbank | Benennt Application Owner und nimmt ab | Integration/DBA nur im vereinbarten Leistungsumfang | Anwendungssupport und Herstellereskalation |
| Backup und Restore | Genehmigt Ziele und bestätigt Nutzbarkeit | Führt Sicherung und Tests durch | Bestätigt Konsistenzverfahren |
| Security Operations | Entscheidet über geschäftskritische Eingriffe | EDR-Überwachung, Alarmbewertung, Geräteisolation und Eskalation nach Runbook | Hilft bei Anwendungsvorfällen |
| Service Desk und Incident | Ein Ansprechpartner für Fachbereiche | Führt Ticket, koordiniert Provider und kommuniziert Status | Bearbeitet zugewiesene Fälle |
| Kosten und Veränderungen | Genehmigt Budgets und Änderungen | Liefert Verbrauch, Prognose und Optimierung | Klärt Lizenzfolgen |

Im Vertrag genau festlegen: Servicezeiten, kritische Vorfälle, Reaktionszeiten, Wiederherstellungsziele, Eskalationen, Rufbereitschaft, Wartungsfenster, Patchverantwortung, Log-Aufbewahrung und Exit-Unterstützung. 24/7 für geschäftskritische Komponenten nach Bedarf bepreisen. Eine schnelle Ticketreaktion ist keine Zusage zur schnellen Wiederherstellung.

**Steuerung:** Monatliches Service Review mit Verfügbarkeit, geschäftlicher Performance, Incidents, Restore-Nachweisen, Patchstatus, Kosten und Verbesserungen. Pro wichtigem Betriebsprozess ein verantwortlicher Service Owner. Sicherheit bleibt eine gemeinsame Aufgabe und braucht klare Entscheidungsbefugnisse.

## 10. Wirtschaftlichkeit und Vertriebsansatz

### Vergleich mit einer realistischen Alternative

Verglichen werden drei Optionen: **lokale Erneuerung**, **betreute Legacy-Cloud plus OTC für Entwicklung/Test** und **OTC-IaaS für geeignete Legacy-Systeme plus Managed Services**. Zuerst Ausschlusskriterien prüfen: Herstellerfreigabe, notwendige Latenz, RTO/RPO und erlaubte Datenverarbeitung. Erst danach bewerten, etwa Betriebsentlastung 25 %, Ausfallsicherheit 25 %, Migrationsrisiko 20 %, Kosten 20 %, Weiterentwicklung/Exit 10 %. Gewichte mit dem Kunden abstimmen, keine künstlichen Punktwerte ohne Nachweise vergeben.

**TCO über drei und fünf Jahre:** Hardware bzw. Cloud-Verbrauch, Lizenzen, Storage/IOPS, Netzwerk und zweite Leitungen, Security-Lizenzen, Identitäten, Managed Services, Monitoring, Backup, DR-Kapazität, Restore-Tests, Datenverkehr, Migration, Parallelbetrieb, Schulung, interne Arbeitszeit, Vertragsabbau und Exit. Bei beiden Varianten denselben Leistungsumfang verwenden und interne Zeit nicht doppelt zählen.

### Rein erfundenes Rechenbeispiel, keine Preisauskunft

| Beispielposition über 36 Monate | Lokale Erneuerung | Betreute Zielarchitektur |
|---|---:|---:|
| Einmalige Erneuerung bzw. Migration | 180.000 € | 120.000 € |
| Parallelbetrieb und Exit, hier pauschal angenommen | In der Beispielpauschale enthalten | 60.000 € |
| Laufender Betrieb, jeweils vergleichbarer Umfang | 36 × 15.000 € = 540.000 € | 36 × 14.000 € = 504.000 € |
| Beispiel-TCO | **720.000 €** | **684.000 €** |

Die rein rechnerische Differenz beträgt 36.000 € bzw. 5 %. Steigen die laufenden Zielkosten auf 16.000 € pro Monat, ergeben sich 756.000 € und damit höhere Kosten als lokal. Damit zeigt das Beispiel Sensitivität und begründet keine Einsparzusage. Reale Daten und Angebote müssen alle Annahmen ersetzen. Vermiedene Ausfallkosten getrennt und mit kundenseitig bestätigter Ausfallhäufigkeit und Kosten pro Stunde bewerten, nicht als sichere Einsparung buchen.

### Vertrieblicher nächster Schritt

Ein klar abgegrenztes Assessment anbieten: abgestimmter Umfang, Zeitbox, beteiligte Personen, benötigte Daten, Ergebnisse, Preis und Entscheidungstermin. Danach ein Pilotangebot mit Budgetgrenze, Abnahmekriterien und transparenten Betriebskosten. Anschließend verbindliche Umsetzung und Betriebsleistungen auf Basis der Pilotnachweise kalkulieren.

**Intern beteiligen:** Account Management führt die Kundenbeziehung. Sales Consultant verbindet Nutzen und Lösung. Solution Architect verantwortet technische Machbarkeit. Netzwerk-/Security-Spezialisten planen Zugang und Schutz. ERP-/Datenbankpartner bestätigt Support. Service Management definiert Betriebsumfang. Migrationsteam plant Umzüge. Einkauf/Lizenzierung und Datenschutz/Vertragsmanagement prüfen Konditionen und Verpflichtungen. Finanzen unterstützt die TCO-Rechnung.

**An die Geschäftsführung:** Arbeitsfähigkeit, Ausfallrisiko, Investitionsbedarf und messbarer Nutzen. **An die IT-Leitung:** Supportfähigkeit, weniger Routineaufwand, klare Zuständigkeiten und realistische Übergabe. **An das Account Management:** Entscheidungsprozess, Beteiligte, qualifizierter Leistungsumfang und belastbarer nächster Auftrag.

## 11. Präsentationsablauf: 20 Minuten plus 5 Minuten Summary

| Folie | Inhalt | Dauer |
|---|---|---:|
| 1 | Empfehlung und Entscheidungsweg | 1:00 |
| 2 | Fallstruktur: Fakten, Einordnung, offene Punkte | 2:00 |
| 3 | Priorisierung nach Geschäftswirkung und Dringlichkeit | 2:00 |
| 4 | ERP-Ursachenanalyse und Nachweise | 2:00 |
| 5 | Vergleich geeigneter Betriebsorte | 2:00 |
| 6 | Zielbild, alle fünf Standorte und OTC-Stufenplan | 3:00 |
| 7 | Zero Trust, SASE, EDR und Wiederanlauf | 2:00 |
| 8 | Migration mit Freigabepunkten und Rückfall | 2:00 |
| 9 | Betriebsmodell und IT-Entlastung | 2:00 |
| 10 | Wirtschaftlichkeit und nächster Auftrag | 2:00 |
| | **Lösungskonzept gesamt** | **20:00** |
| 11-12 | **Management Summary und Handlungsempfehlung** | **5:00** |

Reserve direkt danach: Folie 13 ordnet alle zehn Ziele zu. Folie 14 vertieft den OTC-Stufenplan. Folien 15-18 enthalten Discovery, Abnahme/Rückfall, technische Beispiele und Annahmen. Diese Reserve verlängert den geplanten Hauptvortrag nicht.

## 12. Praxisanhang: Commands mit Ort, Zweck und Bedeutung

### Vorab: Was du selbst ausführst und was die Kunden-IT ausführt

Meyer Industrial ist ein fiktiver Kunde. Ohne dessen Systeme kannst du keine echten Befunde messen. Die folgenden Befehle sind Vorbereitung und Beispiele für ein autorisiertes Assessment, keine bereits durchgeführten Prüfungen. Ersetze `.example`-Namen durch bestätigte interne Namen. Die Endung `.example` dient hier bewusst als Platzhalter. Windows-Befehle gehören in eine Windows-PowerShell auf dem jeweiligen Rechner, nicht in dein Mac-Terminal. Zugangsdaten und Logs werden nicht öffentlich geteilt.

### Schritt A - Arbeitsordner auf deinem Mac

**Wo:** Terminal auf deinem Mac. **Warum:** Unterlagen nachvollziehbar ordnen.

```bash
mkdir -p ~/Documents/Meyer-Cloud/{01_Assessment,02_Zielbild,03_Kosten,04_Migration,05_Praesentation}
cd ~/Documents/Meyer-Cloud
pwd
```

`mkdir -p` erstellt die Ordner. `cd` wechselt hinein. `pwd` zeigt den aktuellen Pfad. Die Befehle buchen keine Cloud-Ressourcen.

### Schritt B - Serverinventar aufnehmen

**Wo:** Windows-PowerShell auf einem untersuchten Windows-Server. **Wer:** Kunden-IT/Assessment-Team mit passenden Leserechten. **Warum:** Ausstattung und Betriebssystem dokumentieren.

```powershell
Get-CimInstance Win32_OperatingSystem |
  Select-Object Caption, Version, LastBootUpTime

Get-CimInstance Win32_ComputerSystem |
  Select-Object Name, NumberOfLogicalProcessors, TotalPhysicalMemory

Get-Volume |
  Select-Object DriveLetter, FileSystemLabel, Size, SizeRemaining
```

Die Speicherausgaben erfolgen in Bytes. Das ist ein Inventar, keine Performanceanalyse. VMware-, Storage- und Lizenzinformationen zusätzlich aus den Verwaltungssystemen beziehen.

### Schritt C - Namensauflösung und TCP-Erreichbarkeit

**Wo:** Windows-PowerShell auf einem betroffenen Standort-PC. **Warum:** Prüfen, ob der richtige Server aufgelöst und der vereinbarte Dienst erreicht wird.

```powershell
Resolve-DnsName rds.intern.example
Test-NetConnection rds.intern.example -Port 3389 -InformationLevel Detailed
Test-NetConnection gateway.intern.example -Port 443 -InformationLevel Detailed
```

3389 ist nur ein Beispiel für direkten internen RDP-Zugriff, falls dieser Weg im Bestand tatsächlich vorgesehen ist. 443 ist ein Beispiel für einen freigegebenen HTTPS-Gateway-Zugang. Den tatsächlich genutzten Verbindungsweg testen. Für Außendienstgeräte folgt der Test dem Gateway-/ZTNA-Modell und öffnet keinen RDP-Port im Internet.

`TcpTestSucceeded: True` bedeutet nur: TCP-Verbindungsaufbau möglich. Es beweist keine korrekte Anmeldung, keine freie Kapazität und keine gesunde ERP-Anwendung. Bei `False` können unter anderem DNS, Routing, Dienst, Firewall oder Zugangsrichtlinie die Ursache sein.

### Schritt D - Netzweg und Schwankungen untersuchen

**Wo:** Windows-Eingabeaufforderung oder Windows-PowerShell am betroffenen Standort.

```powershell
ping -n 50 rds.intern.example
tracert -d rds.intern.example
```

**Mac-Alternative, wo:** Terminal auf deinem Mac, aber nur wenn der Mac im zulässigen Kunden-Netz oder über den passenden Zugang verbunden ist.

```bash
ping -c 50 rds.intern.example
traceroute -n rds.intern.example
nc -vz gateway.intern.example 443
```

**Warum:** Antwortzeitverteilung, Paketverlust und sichtbaren Pfad erfassen. ICMP kann blockiert oder geringer priorisiert sein. Sterne im Traceroute und verlorene Ping-Pakete sind deshalb allein kein Beweis für ERP-Störungen. Verschlüsselte WAN-Pfade können interne Hops verbergen. Ergebnisse mit TCP-/Anwendungsmessungen und WAN-Telemetrie korrelieren.

### Schritt E - Terminalserver-Ereignisse vergleichen

**Wo:** Windows-PowerShell auf dem betroffenen Terminalserver mit notwendigen Log-Leserechten. **Warum:** Sitzungsereignisse mit gemeldeten Abbrüchen abgleichen.

```powershell
Get-WinEvent -FilterHashtable @{
  LogName = 'Microsoft-Windows-TerminalServices-LocalSessionManager/Operational'
  StartTime = (Get-Date).AddHours(-4)
} -MaxEvents 100 |
  Select-Object TimeCreated, Id, LevelDisplayName, Message
```

Falls das Log nicht aktiviert ist oder keine Ereignisse existieren, liefert das keinen Entlastungsbeweis. Fehlende Rechte und fehlendes Logging unterscheiden. Ereignisse enthalten möglicherweise Personenbezüge und werden im vereinbarten geschützten Ablageort ausgewertet.

### Schritt F - Leistungsengpässe nachvollziehen

**Wo:** Terminalserver, Windows-PowerShell.

```powershell
Get-CimInstance Win32_PerfFormattedData_PerfOS_Processor |
  Where-Object Name -eq '_Total' |
  Select-Object Name, PercentProcessorTime

Get-CimInstance Win32_PerfFormattedData_PerfOS_Memory |
  Select-Object AvailableMBytes

Get-CimInstance Win32_PerfFormattedData_PerfDisk_PhysicalDisk |
  Select-Object Name, DiskTransfersPerSec, CurrentDiskQueueLength
```

**Warum:** Erste Momentaufnahme zu CPU, freiem RAM und Datenträgeraktivität. Einzelmessungen beweisen keine Ursache. Über den repräsentativen Lastzeitraum im Monitoring erfassen. Für VMware CPU Ready und Datastore-Latenz direkt in der VMware-/Storage-Verwaltung prüfen. Datenbank-Wartezeiten und ERP-Logs mit Hersteller/DBA analysieren. Keine produktiven Lasttests ohne abgestimmten Ablauf.

### Schritt G - OTC-Umgebung planen und einrichten

**Wo:** Open-Telekom-Cloud-Konsole mit freigegebenem Projektzugang. **Wer:** Beauftragtes Cloud-/Migrationsteam. **Warum:** Standardisierte Grundlage für Entwicklung/Test und spätere Dienste.

1. Projekt und zulässige Region festlegen. Budget, Verantwortliche und minimale IAM-Rollen vereinbaren. Persönliche Konten und MFA nach Unternehmensvorgaben verwenden.
2. IP-Plan mit den fünf Standorten abgleichen. Keine überschneidenden CIDR-Netze. VPC/Subnetze für Dev/Test, Management und bei Bedarf weitere Dienste anlegen.
3. Security Groups nach minimal benötigten Verbindungen konfigurieren. Private Dienste erhalten keine pauschale öffentliche Erreichbarkeit.
4. VPN oder geeignete private Verbindung zum Unternehmen nach Architekturentscheidung bereitstellen, einschließlich DNS und Routen. Redundanz tatsächlich testen.
5. Kleine ECS-Testumgebung mit passendem Image, EVS-Speicher, Logging, Backup und Tags erstellen. Das Anlegen verursacht Kosten und erfolgt erst im vereinbarten Pilotumfang.
6. CCE erst bei geeignetem Container-Anwendungsfall, Betriebsverantwortung und Budget aufbauen. Kubernetes-Version und unterstützte Worker-/Netzoptionen zum Umsetzungszeitpunkt prüfen.
7. Pilot dokumentieren, Laufzeit begrenzen und nicht benötigte Ressourcen nach Freigabe abbauen. Gestoppte VMs können weiterhin Speicher- und andere Kosten verursachen.

Hier ist eine nachvollziehbare Portal-Reihenfolge hilfreicher als ein erfundener universeller Deployment-Befehl. Konkrete IDs, Regionen, Images, Netzbereiche, Rollen und Lizenzen fehlen im Fall. Die Feinplanung erstellt danach geprüfte, versionierte Infrastrukturdefinitionen.

### Schritt H - Container-Pilot kontrollieren

**Wo:** Mac-Terminal mit installiertem `kubectl` und sicher bereitgestellter Kubeconfig für einen bereits freigegebenen Testcluster. **Warum:** Verbindungsziel prüfen und den Zustand bestehender Testressourcen lesen.

```bash
kubectl config current-context
kubectl config get-contexts
kubectl get namespaces
kubectl get deployments,pods,services -n meyer-dev
```

Erst prüfen, dass der aktuelle Kontext der Testcluster ist. `meyer-dev` ist ein Beispiel für einen bereits eingerichteten Namespace. Fehlt er oder fehlen Leserechte, ist die Konfiguration mit dem Cloud-Team zu klären. Diese Abfragen stellen keine neue Anwendung bereit und erzeugen selbst keine Cloud-Ressourcen. Das Fehlen von Pods ist kein Fehler, wenn noch nichts bereitgestellt wurde. Kubeconfig-Dateien vertraulich behandeln.

### Schritt I - Geschäftliche Abnahme und Wiederanlauf

**Wo:** Pilotumgebung, Monitoring, Backup-Konsole und ERP-Anwendung. **Warum:** Die tatsächliche Arbeitsfähigkeit nachweisen. Dafür gibt es keinen herstellerunabhängigen Einzeiler.

1. Wiederherstellung in isoliertem Netz auslösen und Beginn dokumentieren.
2. Identität, Namensauflösung, Datenbank, ERP, Terminaldienste und benötigte Schnittstellen nach Runbook starten.
3. Letzten konsistenten Datenstand feststellen und mit RPO vergleichen.
4. Fachbereich führt vereinbarte Testtransaktionen durch und bestätigt Ergebnis.
5. Wiederherstellungsdauer mit RTO vergleichen, Abweichungen beheben und erneut gezielt prüfen.

## 13. Typische Rückfragen im Gespräch

**Warum nicht alles in die Open Telekom Cloud?** „Entwicklung und Test haben diesen Zielort bereits vorgegeben. Beim ERP entscheide ich anhand Herstellerfreigabe, Latenz, Lizenzierung und Gesamtkosten. Eine Plattformvereinheitlichung ist sinnvoll, wenn sie diese Anforderungen tatsächlich erfüllt.“

**Warum nicht sofort neue Hardware?** „Ich bewerte die lokale Erneuerung als echte Vergleichsoption. Der Kunde möchte aber auch weniger Abhängigkeit vom Hauptsitz und Entlastung im Betrieb. Diese Ziele müssen in die Rechnung eingehen.“

**Was tun Sie zuerst?** „Kritische Sicherungen und aktuelle Betriebsrisiken prüfen, dann Störungsursachen und Abhängigkeiten erfassen. Parallel kläre ich mit den Fachbereichen die Wiederanlaufziele.“

**Löst SD-WAN das ERP-Problem?** „Es kann Netzwege und Ausfallsicherheit verbessern. Ob die konkrete Störung aus dem Netz kommt, muss die Messung zeigen. Engpässe in Profilen, Storage, Datenbank oder Anwendung brauchen andere Maßnahmen.“

**Garantieren Sie eine unterbrechungsfreie Migration?** „Ich plane eine möglichst kurze, abgestimmte Unterbrechung. Das genaue Fenster ergibt sich aus Testmigration, Datenabgleich und fachlicher Abnahme.“

**Wer übernimmt die Verantwortung?** „Der Kunde behält Geschäftsentscheidung und Datenverantwortung. Der Dienstleister übernimmt vertraglich definierte Betriebsaufgaben. Ein benannter Service Owner koordiniert die beteiligten Teams und Hersteller.“

**Woran messen Sie den Erfolg?** „An erreichbaren Geschäftsprozessen, nachgewiesenem Wiederanlauf, weniger Routineaufwand der internen IT und transparenten Gesamtkosten.“

## 14. Fachquellen und Grenzen

Die Kundendaten und Aufgabenanforderungen stammen aus der bereitgestellten Datei `Meyer_Industrial_Aufgabenpraesentation_v3.html`. Alle Architekturentscheidungen sind Vorschläge. Termine, RTO/RPO, Bewertungsgewichte, Zielverbesserungen und Beispielkosten sind ausdrücklich zu validierende Annahmen.

- [Microsoft: Microsoft 365 network connectivity principles](https://learn.microsoft.com/en-us/microsoft-365/enterprise/microsoft-365-network-connectivity-principles?view=o365-worldwide) - lokale Ausgänge, kurze Netzwege und Umgang mit Netzwerkinspektion.
- [Open Telekom Cloud: Cloud Backup and Recovery](https://www.open-telekom-cloud.com/de/produkte-services/core-services/cloud-backup-recovery) - native Sicherungsressourcen und Einschränkungen der regionalen Replikation.
- [Open Telekom Cloud: CBR User Guide](https://docs.otc.t-systems.com/cloud-backup-recovery/cbr-umn.pdf) - Backup Lock, Aufbewahrung und Einschränkungen.
- [Open Telekom Cloud: Cloud Container Engine Turbo](https://www.open-telekom-cloud.com/de/support/release-notes/allgemeine-verfuegbarkeit-der-cloud-container-engine-turbo-cce-turbo) - Kubernetes-basierte CCE-Angebote, keine Empfehlung einer bestimmten Version.
- [Microsoft: Test-NetConnection](https://learn.microsoft.com/en-us/powershell/module/nettcpip/test-netconnection?view=windowsserver2025-ps) - TCP- und Routendiagnose.
- [Microsoft: PowerShell Diagnostics](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.diagnostics/) - Windows-Ereignis- und Leistungsdiagnose.

Produktumfang, regionale Verfügbarkeit, Supportstände, Lizenzen und Preise sind vor einem Angebot anhand der aktuellen Leistungsbeschreibungen zu bestätigen. Aus dem Fall sind keine realen Messwerte, konkreten Angebote oder bereits erreichten Verbesserungen bekannt.

### Ergänzende Fachquellen zur Überarbeitung

- [Microsoft: Zero Trust und SASE-Netzwerkarchitektur](https://learn.microsoft.com/en-us/security/zero-trust/deploy/networks)
- [Microsoft: Endgeräte mit Zero Trust absichern](https://learn.microsoft.com/en-us/security/zero-trust/deploy/endpoints)
- [Microsoft: Netzwerkvorbereitung für Teams](https://learn.microsoft.com/en-us/microsoftteams/prepare-network)
- [Cloud-Preismodelle für Computing und Container](https://www.t-cloud-public.com/de/preise/preismodelle/computing-container)
- [OTC: OpenStack, Automatisierung und Infrastructure as Code](https://www.open-telekom-cloud.com/_Resources/Persistent/e/2/7/f/e27f0be4e20f3598322ead62836264283ac82fbc/open-telekom-cloud-openstack-whitepaper.pdf)

**Quellenprüfung Dell:** In der bereitgestellten HTML-Aufgabe steht unter Rechenzentrum / Virtualisierungsplattform ausdrücklich „Dell-Serverhardware“. Die Angabe ist daher belegt und bleibt im Leitfaden. Die Zielarchitektur hängt nicht von dieser Hardwaremarke ab.

## 15. Begriffe einfach erklärt

### Was bedeutet ERP-Betrieb?

ERP steht für Enterprise Resource Planning. Das ist die zentrale Unternehmenssoftware, mit der ein Unternehmen Aufträge, Einkauf, Materialbedarf, Produktion, Lager, Lieferungen und Abrechnung organisiert.

**ERP-Betrieb bedeutet:** dafür sorgen, dass diese Software und ihre technischen Grundlagen zuverlässig funktionieren. Dazu gehören Anwendung, Server, Datenbank, Benutzerrechte, Updates, Überwachung, Datensicherung und Fehlerbehebung. Wer welche Aufgabe übernimmt, muss ausdrücklich festgelegt werden.

**Beispiel Meyer Industrial:** Ein Mitarbeiter erfasst einen Kundenauftrag. Die Produktion prüft das benötigte Material, das Lager bereitet die Lieferung vor und die Buchhaltung erstellt die Rechnung. Das ERP verbindet diese Arbeitsschritte. Fällt es aus, können mehrere Abteilungen gleichzeitig betroffen sein.

**Merksatz für deine Präsentation:** „Ein stabiler ERP-Betrieb stellt sicher, dass Aufträge, Produktion, Lager und Abrechnung zuverlässig funktionieren.“

| Begriff | Verständliche Erklärung |
|---|---|
| Assessment | Strukturierte Bestandsaufnahme und Bewertung vor einer Entscheidung |
| Discovery | Gezieltes Erfragen von Anforderungen, Problemen und Entscheidungsbedingungen |
| Legacy | Bestehende, oft ältere Anwendung mit besonderen Abhängigkeiten |
| VM | Virtueller Rechner, der auf einer Virtualisierungsplattform läuft |
| IaaS | Gemietete Rechen-, Speicher- und Netzwerkressourcen; Gastbetrieb und Anwendungen brauchen weiterhin Betreuung |
| SaaS | Fertige Software als Dienst, beispielsweise Exchange Online oder das bestehende CRM |
| Terminalserver/RDS | Zentrale Windows-Umgebung, auf der Benutzer ihre Anwendungen über entfernte Sitzungen nutzen |
| AD / DNS | Verzeichnis- und Anmeldedienste / Übersetzung von Namen in Netzwerkadressen |
| SD-WAN | Zentrale Steuerung und Überwachung von Verbindungen zwischen Standorten und Diensten |
| SASE / ZTNA | Konzept für integrierte Netz- und Sicherheitsfunktionen / kontrollierter Zugriff auf einzelne Anwendungen |
| MFA / SSO | Anmeldung mit mehreren Faktoren / Anmeldung an mehreren Diensten über einen gemeinsamen Identitätsdienst |
| RTO / RPO | Maximal tolerierte Ausfallzeit / maximal tolerierter zeitlicher Datenverlust |
| DR | Geplanter und getesteter Wiederanlauf nach einem größeren Ausfall |
| SLA | Vertraglich vereinbarte Servicequalität mit definierten Messgrößen und Bedingungen |
| TCO | Gesamtkosten über einen festgelegten Betrachtungszeitraum |
| OTC / ECS / EVS / VPC / CCE | Open Telekom Cloud / virtuelle Server / Blockspeicher / isoliertes virtuelles Netzwerk / Kubernetes-Plattform |

## 16. Frau Bauers Einladung: Ablauf und Umgang mit Rückfragen

Die Einladung von Sandra Bauer und Thomas Koch erlaubt ausdrücklich Fragen per E-Mail und überlässt dir die Präsentationsform. Bewertet werden besonders deine Strukturierung der Kundensituation, deine Schwerpunktsetzung und deine nachvollziehbare Handlungsempfehlung.

### Verbindliche Zeiteinteilung für deine Vorbereitung

| Uhrzeit | Programmpunkt | Deine Vorbereitung |
|---|---|---|
| 11:00-11:05 | Begrüßung und Vorstellungsrunde | Kurze persönliche Vorstellung vorbereiten |
| 11:05-11:10 | Zielsetzung des Gesprächs | Zuhören und Erwartungen aufnehmen |
| 11:10-11:30 | Präsentation des Lösungskonzeptes | 20 Minuten, Hauptfolien und klare Übergänge |
| 11:30-11:35 | Management Summary und Handlungsempfehlung | Eigener Abschlussblock von fünf Minuten |
| 11:35-11:55 | Fachlicher Austausch, Feedback und Fragen | Technischen Anhang und begründete Alternativen bereithalten |
| 11:55-12:00 | Gemeinsame nächste Schritte | Interesse zeigen und weiteres Vorgehen klären |

**Wichtig:** Die Einladung präzisiert die ursprüngliche Angabe von 20-25 Minuten. Plane 20 Minuten Lösungskonzept und anschließend fünf Minuten Management Summary. Die frühere 24-Minuten-Struktur wurde in diesem Dokument entsprechend ersetzt.

### Sollst du Frau Bauer vorab schreiben?

Du darfst, musst aber nicht schreiben. Zur bereits ausdrücklich unbekannten Ursache der ERP-Störungen ist keine zusätzliche E-Mail nötig. Diese offene Ursachenlage ist Teil der Aufgabe und gehört in deine Analyse und den vorgeschlagenen Discovery-Termin mit dem fiktiven Kunden.

Vorab nachfragen ist sinnvoll, wenn eine fehlende Anlage oder ein Widerspruch deine Bearbeitung wesentlich blockiert. Gezielte Rückfragen sind durch die Einladung ausdrücklich erlaubt. Ob du eine E-Mail schreibst, entscheidet nicht allein über die Qualität deiner Lösung.

**Formulierung im Vortrag:** „Die offenen technischen Punkte behandle ich als Discovery-Fragen für den Kunden. Für das Grobkonzept treffe ich gekennzeichnete Annahmen und zeige, welche Entscheidungen davon abhängen.“

### Wie präsentierst du die unbekannte ERP-Ursache?

**Auf der Folie:**

**ERP-Störungen gefährden zentrale Geschäftsabläufe**

- Aufträge, Produktion und Logistik sind betroffen.
- Die technische Ursache ist noch nicht nachgewiesen.
- Assessment und Pilot liefern die Entscheidungsgrundlage.

**Dazu sagen:** „Die Beschwerden sind bekannt, die technische Ursache ist bislang nicht nachgewiesen. Deshalb würde ich zuerst klären, welche Untersuchungen bereits stattgefunden haben. Vor der Zielentscheidung prüfen wir die gesamte Verbindungskette.“

**Gezielte Kundenfragen:** Seit wann treten die Störungen auf? Sind alle Standorte gleichzeitig betroffen? Zu welchen Uhrzeiten oder Arbeitsschritten passiert es? Welche Messwerte und Fehlermeldungen liegen vor? Gab es vor Beginn Änderungen an Systemen oder Verbindungen?

Der Fall liefert auf diese Fragen keine Antworten. Stelle sie als offene Discovery-Punkte dar und erfinde keine Kundenbefunde.

## 17. Präsentationsform, Aufmerksamkeit und Probe

### Welches Format ist passend?

Empfehlung für dieses Gespräch: eine klare PowerPoint-Präsentation mit PDF als Reserve. Frau Bauer erlaubt auch Whiteboard, Skizzen oder andere Visualisierungen. Eine geprüfte HTML-Präsentation im Browser ist ebenfalls möglich. Entscheidend sind Verständlichkeit, sichere Bedienung und dein roter Faden.

| Format | Sinnvoller Einsatz | Vorher prüfen |
|---|---|---|
| PowerPoint | Geführter Vortrag mit Folien und Sprechernotizen | Bildschirmfreigabe, Schriftgröße, Notizenansicht |
| PDF im Vollbild | Stabile Reserve mit festem Layout | Navigation, Lesbarkeit und lokale Verfügbarkeit |
| HTML im Browser | Vorhandene webbasierte Präsentation | Vollbild, Navigation, lokale Funktion und Darstellung |
| Whiteboard/Skizze | Ergänzende Erklärung im Fachgespräch | Lesbarkeit, Bedienung und Zeitbedarf |

Dieses PDF ist dein ausführliches Vorbereitungsdokument. Für den 20-Minuten-Vortrag nutzt du die Folienstruktur aus Kapitel 11; die vollständigen Texte und Commands dienen der Vorbereitung und dem Anhang.

### So hältst du die Aufmerksamkeit

- Eine zentrale Aussage je Folie.
- Wenig Text, große Schrift und erkennbare Hierarchie.
- Architektur als verständliche Grafik statt Produktliste zeigen.
- Jedes technische Thema mit einer Geschäftsauswirkung verbinden.
- Fakten, Annahmen und Entscheidungsvorbehalte sichtbar unterscheiden.
- Commands und technische Detailtabellen im Anhang lassen.
- Ruhig sprechen, kurze Pausen setzen und Übergänge ankündigen.
- Effekte nur verwenden, wenn sie die Erklärung erleichtern.

**Einstieg mit einem ausdrücklich hypothetischen Beispiel:** „Stellen Sie sich vor: Ein Auftrag ist erfasst, aber das Lager kann ihn wegen einer ERP-Störung nicht weiterbearbeiten. Genau solche Unterbrechungen möchte Meyer Industrial reduzieren. Ich zeige Ihnen heute, wie wir die Ursachen klären, ein geeignetes Zielbild entwickeln und den Übergang kontrolliert umsetzen.“

### Probe auf deinem Mac

1. Präsentation und Reserve-PDF lokal öffnen.
2. Kamera, Mikrofon und Teams-Zugang wie verlangt vorher testen.
3. Bildschirmfreigabe proben. Wenn möglich nur das Präsentationsfenster teilen und Benachrichtigungen pausieren.
4. Hauptvortrag mit Stoppuhr auf 20 Minuten üben. Zu lange Abschnitte kürzen.
5. Management Summary getrennt für fünf Minuten üben.
6. Notizen als Stichwörter bereitlegen und vermeiden, längere Absätze abzulesen.
7. Den technischen Anhang so ordnen, dass du Architektur, Rückfallplan und Kostenannahmen schnell findest.

## 18. Management Summary: eigener Fünf-Minuten-Abschluss

Nach dem Lösungskonzept fasst du die entscheidungsrelevanten Punkte zusammen. Du führst keine neue technische Detailplanung ein. Die folgenden Sprechbausteine sind eine Vorlage; mit den eigenen Erläuterungen und kurzen Pausen auf fünf Minuten üben.

### Minute 0:00-1:00 - Geschäftliche Ausgangslage

„Meyer Industrial möchte seine Arbeitsfähigkeit über fünf Standorte hinweg absichern. Heute bestehen wiederkehrende ERP-Störungen, eine hohe Abhängigkeit vom Hauptsitz und eine stark ausgelastete interne IT. Diese Situation betrifft Auftragsbearbeitung, Produktion, Logistik und Abrechnung. Unsere Priorität ist deshalb die verlässliche Unterstützung dieser Geschäftsprozesse.“

### Minute 1:00-2:30 - Empfehlung und Nutzen

„Ich empfehle eine schrittweise Transformation. Zunächst klären wir die Ursachen der ERP-Störungen und sichern akute Betriebsrisiken ab. Danach prüfen wir eine betreute Zielumgebung für den zusammenhängenden ERP-Verbund. Entwicklung und Test überführen wir wie vorgegeben in die Open Telekom Cloud. Direkte, abgesicherte Zugriffswege und eine modernisierte Standortvernetzung sollen die Abhängigkeit vom Hauptsitz reduzieren. Ein vertraglich geregelter Betrieb übernimmt definierte Routineaufgaben und schafft Kapazität für die interne IT.“

### Minute 2:30-4:00 - Voraussetzungen, Risiken und Wirtschaftlichkeit

„Die ERP-Zielplattform entscheiden wir anhand von Herstellerfreigabe, gemessener Performance, Lizenzierung und Gesamtkosten. Wiederanlaufzeit und tolerierbarer Datenverlust müssen die Fachbereiche bestätigen. Eine Migration erfolgt in getesteten Wellen mit klaren Freigaben und Rückfallwegen. Wirtschaftlich vergleichen wir die vollständigen Kosten mit einer lokalen Erneuerung. Einsparungen oder Leistungsverbesserungen versprechen wir erst auf belastbarer Grundlage.“

### Minute 4:00-5:00 - Konkrete nächste Entscheidung

„Mein Vorschlag ist, ein abgegrenztes Assessment mit Verantwortlichen, Zeitrahmen, Preis und klaren Ergebnissen zu vereinbaren. Es liefert Bestandsaufnahme, Ursachenbewertung, Zielvarianten, Kostenrahmen und einen Pilotplan. Im Pilot prüfen wir die kritischen Annahmen. Damit erhält die Geschäftsführung eine nachvollziehbare Grundlage für die Investitionsentscheidung, und die IT einen umsetzbaren Weg in den zukünftigen Betrieb.“

## 19. HTML-Datei auf dem Mac öffnen und bearbeiten

Die ursprüngliche Aufgabenpräsentation und der zuvor erstellte Leitfaden sind HTML-Dateien. Du kannst sie im Browser ansehen und mit einem Texteditor bearbeiten.

1. Datei herunterladen und im Finder per Doppelklick öffnen.
2. Zum Bearbeiten Visual Studio Code starten und „Datei > Datei öffnen“ wählen.
3. Mit Command + F den gewünschten Text suchen.
4. Den Text zwischen den HTML-Tags ändern und mit Command + S speichern.
5. Im Browser mit Command + R neu laden und die Darstellung prüfen.

```html
<h1>Hier steht deine Überschrift</h1>
```

Für eine reine Textänderung bearbeitest du in diesem Beispiel nur die Wörter zwischen `<h1>` und `</h1>`. Arbeite mit einer Kopie der Aufgabenbeschreibung, damit das Original erhalten bleibt. Änderungen an deinem Lösungsvorschlag gehören in deine eigene Datei.

## 20. Persönliche Abschlusskontrolle

- Kann ich meine Empfehlung in einer Minute erklären?
- Kann ich ERP-Betrieb ohne Fachsprache erläutern?
- Sind unbekannte Ursachen als offen gekennzeichnet?
- Habe ich Annahmen und echte Kundenvorgaben getrennt?
- Ist klar, warum Entwicklung/Test in OTC geht und das ERP gesondert geprüft wird?
- Zeige ich ein technisches Zielbild und einen realistischen Rückfallweg?
- Sind Betriebsaufgaben und Abnahmekriterien zugeordnet?
- Sind Beispielkosten und Beispiel-RTO/RPO deutlich als Annahmen markiert?
- Halte ich 20 Minuten Lösungskonzept plus fünf Minuten Management Summary ein?
- Sind Kamera, Mikrofon, Teams und Bildschirmfreigabe getestet?

**Dein letzter Merksatz:** „Ich strukturiere die Kundensituation, mache Unsicherheit sichtbar und leite daraus einen überprüfbaren nächsten Schritt ab.“

## 21. Reserve: alle zehn Kundenziele, Maßnahmen und Folien

Die folgende Zuordnung bezieht sich auf die überarbeitete 18-Folien-Präsentation. Folien 1-10 dauern zusammen 20 Minuten, Folien 11-12 fünf Minuten. Die Zielübersicht steht als Reserve direkt hinter der Management Summary auf Folie 13.

| Ziel aus dem Fall | Maßnahme im Konzept | Folien |
|---|---|---|
| 1. ERP-Verfügbarkeit verbessern | Ursachenanalyse, geeigneter ERP-Betrieb und getestete Wiederherstellung | 4-8 |
| 2. Performance für Standorte und Außendienst erhöhen | Messbaseline, direkte Zugriffswege und repräsentativer ERP-Pilot | 4, 6-8 |
| 3. Abhängigkeit vom Hauptstandort reduzieren | Direkte Cloud-/SaaS-Verbindungen und verfügbare AD/DNS-Dienste | 6-8 |
| 4. Interne IT entlasten | Beauftragte Managed Services und geregelte Eskalationen | 9 |
| 5. Netzwerkarchitektur modernisieren | Betreutes SD-WAN und SASE-Zielbild | 6-7 |
| 6. Sicheren direkten Zugriff auf Cloud und SaaS ermöglichen | Zero Trust, ZTNA, MFA, EDR und lokale SaaS-Ausgänge | 6-7 |
| 7. OTC für Entwicklung und Cloud-native Dienste nutzen | Automatisierte VMs, elastische Ressourcen, Containerpilot und passende Plattformdienste | 6, 14 |
| 8. Betrieb der Infrastruktur sicherstellen | Definierte Serviceleistungen, Patchen, Monitoring, Backup und Restore | 7-9 |
| 9. Unterbrechungsarme Migration | Pilot, Migrationswellen, fachliche Abnahme und Daten-Rückfallplan | 8 |
| 10. Transparenz über Kosten, Verfügbarkeit, Performance und Verantwortlichkeiten | Vollständige TCO, Kennzahlen, Rollenmodell und Service Reviews | 9-10 |

**So erläuterst du Ziel 7:** „Der Kunde hat schwankende Entwicklungsbedarfe und möchte standardisieren und automatisieren. Deshalb beginne ich mit automatisiert bereitgestellten virtuellen Servern und gesteuerten Laufzeiten. Danach folgt ein Containerpilot mit klarer Abnahme. Weitere Plattformdienste ergänzen wir anhand ihres nachgewiesenen Nutzens.“

**So erläuterst du das Security-Ziel:** „Ich verbinde Zero Trust als Zugriffsprinzip mit zentral gesteuertem SASE und anwendungsbezogenen Zugängen. Die Geräte erhalten modernen Schutz mit EDR und klar geregelter Reaktion auf Vorfälle. Zuerst prüfe ich, welche Microsoft-365-Funktionen bereits lizenziert und aktiviert sind.“
