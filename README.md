# Node.js Backend Application Structure

This application follows a clean architecture pattern with clear separation of concerns. The main directory structure is organized as follows:

## Directory Structure

- **`http/`**: HTTP layer for REST API, controllers, routes, and middleware
- **`repositories/`**: Data access layer for database and file operations
- **`services/`**: Core services including external API integrations
- **`shared/`**: Common utilities, configurations, and types
- **`tools/`**: Development and debugging utilities
- **`usecases/`**: Business logic implementation
- **`validators/`**: Input validation logic
- **`index.ts`**: Application entry point

## Key Architectural Features

- **Clean Architecture**: Each layer has specific responsibilities with clear boundaries
- **Dependency Injection**: Services and repositories are instantiated and passed where needed
- **Error Handling**: Centralized error handling in controllers with consistent response formats
- **Logging**: Structured logging throughout the application with context and metadata
- **Configuration**: Environment-based configuration system supporting multiple environments
- **Authentication**: Flexible authentication system supporting multiple auth methods
- **Middleware**: Reusable middleware for cross-cutting concerns
- **Type Safety**: Strong TypeScript typing throughout the codebase

## Layer Responsibilities

### HTTP Layer

The HTTP layer is responsible for handling HTTP requests and responses. It is divided into:

- **Controllers**: Transform HTTP requests into domain objects and vice versa
- **Routes**: Map URLs to controller methods and apply middleware
- **Middleware**: Process requests before they reach controllers (authentication, logging, etc.)

### UseCases Layer

The UseCases layer contains the core business logic of the application:

- Pure business logic without dependencies on HTTP or database specifics
- Orchestrates operations using repositories and services
- Implements business rules and validations
- Returns structured result objects

### Services Layer

The Services layer provides specialized functionality:

- External API integrations (e.g., Ollama AI)
- Complex operations that don't fit into repositories
- Stateless operations that can be reused across multiple use cases

### Repositories Layer

The Repositories layer handles data access and persistence:

- Database operations (CRUD) for entities
- File system operations
- Data transformation between storage and domain formats
- Isolation of database-specific code

### Shared Layer

The Shared layer contains utilities and configurations used across the application:

- Configuration management
- Logging utilities
- HTTP helpers
- Common types and interfaces
- Validation utilities

### Validators Layer

The Validators layer contains input validation logic:

- Validates input data format and structure
- Enforces business rules and constraints
- Provides clear error messages for invalid input

## Architectural Flow

1. HTTP requests enter through routes in the `http/routes/` directory
2. Routes direct requests to controller methods in `http/controllers/`
3. Controllers validate and transform input, then call appropriate use cases
4. Use cases in `usecases/` contain the core business logic
5. Use cases use services and repositories to perform their work
6. Repositories handle data access and persistence
7. Services manage external API communication and complex operations
8. Results flow back through the layers to the client

## Data Flow Example

A typical request flow through the application:

1. Client sends a request to `POST /api/text-generation/generate`
2. The request passes through middleware (cors, authentication, etc.)
3. The route directs the request to `textGenerationController.generateText`
4. The controller extracts and validates parameters from the request
5. The controller calls `generateTextUseCase.execute` with the parameters
6. The use case performs business logic and calls `ollamaService.callOllamaApi`
7. The service makes an API request to the Ollama API
8. The result flows back through the layers
9. The controller transforms the result into an HTTP response
10. The response is sent back to the client

## Error Handling

The application implements a consistent error handling strategy:

- Controller-level try/catch blocks handle all errors
- Errors are logged with appropriate context and metadata
- HTTP-friendly error responses are sent to clients
- Business logic throws domain-specific errors
- Error details are hidden in production mode

## Logging

Structured logging is used throughout the application:

- Context-aware logging with component names
- Different log levels (debug, info, warning, error)
- Request/response logging for debugging
- Performance metrics logging
- Environment-specific log configuration

## Authentication

The application supports multiple authentication methods:

- JSON Web Tokens (JWT) with Supabase
- Static API keys
- Configurable authentication bypass for development

## Configuration

Application configuration is centralized and environment-aware:

- Environment variables for sensitive settings
- Default configurations for development
- Configuration validation at startup
- Type-safe configuration objects

## Starting the Application

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your settings

# Run in development mode
npm run dev

# Build and run in production mode
npm run build
npm start
```

## Development Tools

The application includes several development utilities:

- Debug helpers for troubleshooting
- Performance monitoring tools
- Testing utilities
- Documentation generators

## Adding New Features

When adding new features, follow these steps:

1. Define new routes in the appropriate `http/routes/` file
2. Create controller methods in `http/controllers/`
3. Implement business logic in `usecases/`
4. Add services or repositories if needed
5. Create validators for input validation if necessary
6. Update shared types and configurations as required
7. Add appropriate tests
8. Document the new feature

## Clean Architecture Benefits

- **Separation of Concerns**: Each layer has a clear, specific responsibility
- **Testability**: Business logic can be tested independently of infrastructure
- **Flexibility**: Easy to change infrastructure without affecting business rules
- **Maintainability**: Clear boundaries make the codebase easier to navigate
- **Independence**: Core business logic doesn't depend on frameworks or databases
- **Scalability**: The application can grow without becoming unwieldy
- **Adaptability**: Easy to adapt to changing requirements

## Best Practices

- Follow the Single Responsibility Principle
- Keep business logic in use cases, not controllers or repositories
- Use dependency injection for better testability
- Write unit tests for critical components
- Use TypeScript for type safety throughout the application
- Follow consistent naming conventions
- Document code with JSDoc comments
- Handle errors appropriately at each layer
- Log important events and errors
- Validate input at the boundaries
- Keep controllers thin and focused on HTTP concerns