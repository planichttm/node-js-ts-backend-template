# Node.js TypeScript REST API Template

Ein schlankes und modernes Template für Node.js REST APIs mit TypeScript, das eine saubere Architekturstruktur und Best Practices implementiert.

## Projektstruktur

```
api/
├── http/                      # HTTP-Schicht (Controller, Routes, Middleware)
│   ├── controllers/           # API Controller
│   ├── middleware/            # Express Middleware
│   └── routes/                # API Routes
├── repositories/              # Datenbank-Zugriff
│   ├── base/                  # Basis-Repository-Klassen
│   ├── public/                # Repositories für Lesezugriffe
│   └── sync/                  # Repositories für Schreibzugriffe
├── services/                  # Business-Logik und Service-Layer
│   ├── shared/                # Gemeinsame Dienste
│   └── sync/                  # Synchronisierungs-Services
├── shared/                    # Gemeinsam genutzte Module
│   ├── config/                # Konfigurationen
│   ├── types/                 # TypeScript Interfaces und Types
│   └── utils/                 # Hilfsklassen und -funktionen
├── usecases/                  # Anwendungsfälle (Business Logic)
│   └── base/                  # Basis-UseCase-Klassen
├── validators/                # Validierungslogik
├── index.ts                   # Anwendungseinstiegspunkt
└── version.ts                 # Versionsinformationen
```

## Features

- **Clean Architecture**: Klare Trennung von Belangen und Abhängigkeiten
- **Repository Pattern**: Abstraktion der Datenbankzugriffe 
- **Dependency Injection**: Erleichtert Testbarkeit und Entkopplung
- **Error Handling**: Zentralisierte Fehlerbehandlung
- **Logging System**: Konfigurierbare Protokollierung
- **Type Safety**: Durchgängige Verwendung von TypeScript-Typen
- **Middleware Pattern**: Wiederverwendbare Express-Middleware
- **Environment Config**: Konfigurierbare Umgebungsvariablen

## Installation

```bash
# Repository klonen
git clone https://github.com/planichttm/nodejs-typescript-template.git my-project

# In das Projektverzeichnis wechseln
cd my-project

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

## Umgebungsvariablen

Erstelle eine `.env`-Datei im Stammverzeichnis mit folgenden Variablen:

```env
PORT=3000
NODE_ENV=development
SUPABASE_URL=deine-supabase-url
SUPABASE_KEY=dein-supabase-anon-key
SUPABASE_SERVICE_KEY=dein-supabase-service-key
```

## Scripts

- `npm run dev`: Startet die Anwendung im Entwicklungsmodus mit automatischem Neuladen
- `npm run build`: Kompiliert TypeScript zu JavaScript
- `npm start`: Startet die kompilierte Anwendung
- `npm test`: Führt Tests aus
- `npm run lint`: Führt ESLint auf dem Code aus