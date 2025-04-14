# Shared Layer

## Overview

The shared layer contains utilities, configurations, and types that are used across multiple parts of the application. It provides common functionality like logging, error handling, date manipulation, and API communication utilities that can be reused throughout the codebase.

## Directory Structure

- **`config/`**: Application configuration
  - `app.config.ts`: Main application configuration
  - `environment.ts`: Environment-specific settings
  - `logging.config.ts`: Logging configuration
  - `supabase.ts`: Supabase client initialization
- **`types/`**: Shared type definitions
  - `client-info.ts`: Client information types
- **`utils/`**: Utility functions
  - `http.utils.ts`: HTTP request/response helpers
  - `logging.utils.ts`: Logging functionality
  - `memory-management.utils.ts`: Memory usage monitoring
  - `validation.utils.ts`: Input validation helpers

## Key Components

### Configuration

The configuration files provide centralized settings for the application:
- `app.config.ts`: Main configuration object with all application settings
- `environment.ts`: Environment-specific variables and helpers
- `logging.config.ts`: Logging levels and formats
- `supabase.ts`: Supabase client initialization (if using Supabase)

### Types

Shared type definitions used across the application:
- `ClientInfo`: Information about the client making the request

### Utilities

Common utility functions:
- **HTTP Utilities**: Functions for handling HTTP responses
- **Logging Utilities**: Structured logging with context and metadata
- **Memory Management**: Memory usage monitoring and optimization
- **Validation**: Input validation and credential checking

## Usage Example

```typescript
// Using the logger
import { logger } from '../shared/utils/logging.utils';

logger.info('Operation successful', {
  context: 'MyComponent',
  metadata: { id: 123, status: 'completed' }
});

// Using HTTP utilities
import { sendSuccessResponse } from '../shared/utils/http.utils';

sendSuccessResponse(res, data, req.clientInfo);

// Using configuration
import { appConfig } from '../shared/config/app.config';

const port = appConfig.server.port;
const apiKey = appConfig.auth.staticKey?.apiKey;
```

## Best Practices

- Keep the shared layer focused on truly reusable functionality
- Avoid adding business logic to the shared layer
- Use proper typing for all shared functions and objects
- Document utility functions with JSDoc comments
- Add unit tests for critical shared utilities