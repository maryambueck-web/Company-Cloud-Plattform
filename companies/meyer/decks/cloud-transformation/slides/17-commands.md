# Technische Beispiele für das Assessment

**Wo:** Windows-PowerShell auf einem freigegebenen Kundensystem.

```powershell
Resolve-DnsName gateway.intern.example
Test-NetConnection gateway.intern.example -Port 443

Get-CimInstance Win32_OperatingSystem
Get-CimInstance Win32_ComputerSystem
```

**Warum:** Namensauflösung, Erreichbarkeit und Inventar prüfen.

> `.example` ersetzen. Diese Abfragen beweisen weder ERP-Ursache noch Performance.
