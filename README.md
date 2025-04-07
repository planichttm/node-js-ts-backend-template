# Node.js TypeScript REST API Template

A lean and modern template for Node.js REST APIs with TypeScript, implementing a clean architecture structure and best practices.

## Project Structure

```
api/
├── http/                      # HTTP layer (Controllers, Routes, Middleware)
│   ├── controllers/           # API Controllers
│   ├── middleware/            # Express Middleware
│   └── routes/                # API Routes
├── repositories/              # Database access
│   ├── base/                  # Base repository classes
│   ├── public/                # Repositories for read access
│   └── sync/                  # Repositories for write access
├── services/                  # Business logic and service layer
│   ├── shared/                # Shared services
│   └── sync/                  # Synchronization services
├── shared/                    # Shared modules
│   ├── config/                # Configurations
│   ├── types/                 # TypeScript interfaces and types
│   └── utils/                 # Helper classes and functions
├── usecases/                  # Use cases (Business Logic)
│   └── base/                  # Base use case classes
├── validators/                # Validation logic
├── index.ts                   # Application entry point
└── version.ts                 # Version information
```

## Features

- **Clean Architecture**: Clear separation of concerns and dependencies
- **Centralized Configuration**: Default settings in codebase, sensitive data in environment variables
- **Flexible Authentication**: Support for multiple authentication strategies
- **Repository Pattern**: Abstraction of database access
- **Dependency Injection**: Facilitates testability and decoupling
- **Error Handling**: Centralized error handling
- **Logging System**: Configurable logging to console and database
- **Type Safety**: Consistent use of TypeScript types
- **Middleware Pattern**: Reusable Express middleware
- **Environment Config**: Minimal environment variables required to start

## Installation

```bash
# Clone repository
git clone https://github.com/planichttm/node-js-ts-backend-template.git my-project

# Change to project directory
cd my-project

# Install dependencies
npm install

# Start development server
npm run dev
```

## Configuration

The application uses a centralized configuration system with sensible defaults:

- **Default Configuration**: Non-sensitive settings are defined in `src/shared/config/app.config.ts`
- **Environment Variables**: Only sensitive data (credentials, keys) are stored in the `.env` file

### Authentication Options

The application supports multiple authentication strategies:

1. **No Authentication** (`none`): For quick development and testing
2. **Supabase Authentication** (`supabase`): JWT-based authentication with Supabase
3. **Static API Key** (`static`): Simple API key authentication

To change the authentication type, modify `app.config.ts` or set the `AUTH_VALIDATION_TYPE` environment variable.

### Required Environment Variables

Create a `.env` file in the root directory with these variables (only add what you need):

```env
# Server Configuration (Optional - defaults are in app.config.ts)
PORT=3000
NODE_ENV=development

# Authentication Configuration (Optional - defaults are in app.config.ts)
# AUTH_VALIDATION_TYPE=none|supabase|static

# For Supabase Authentication (only if using 'supabase' validation type)
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-key

# For Static Key Authentication (only if using 'static' validation type)
STATIC_API_KEY=your-static-api-key
```

## Scripts

- `npm run dev`: Starts the application in development mode with automatic reloading
- `npm run build`: Compiles TypeScript to JavaScript
- `npm start`: Starts the compiled application
- `npm test`: Runs tests
- `npm run lint`: Runs ESLint on the code