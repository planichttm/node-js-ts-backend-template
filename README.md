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
- **Repository Pattern**: Abstraction of database access
- **Dependency Injection**: Facilitates testability and decoupling
- **Error Handling**: Centralized error handling
- **Logging System**: Configurable logging
- **Type Safety**: Consistent use of TypeScript types
- **Middleware Pattern**: Reusable Express middleware
- **Environment Config**: Configurable environment variables

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

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
NODE_ENV=development
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-key
```

## Scripts

- `npm run dev`: Starts the application in development mode with automatic reloading
- `npm run build`: Compiles TypeScript to JavaScript
- `npm start`: Starts the compiled application
- `npm test`: Runs tests
- `npm run lint`: Runs ESLint on the code