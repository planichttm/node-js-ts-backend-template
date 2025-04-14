# Utils Layer

The utils layer provides reusable helper functions and utilities that handle common tasks across the application. It contains pure utility functions for operations like data transformations, validation, logging, error handling, and date manipulation that don't fit into other architectural layers. These utilities follow functional programming principles where possible, focusing on immutability and side-effect-free operations to ensure predictability and testability throughout the codebase.

## Key Components

### HTTP Utilities (`http.utils.ts`)

Standardized functions for HTTP response handling:

```typescript
export function sendSuccessResponse(
  res: Response, 
  data: any, 
  clientInfo?: ClientInfo
): void {
  sendResponse(res, 200, data, clientInfo);
}

export function sendErrorResponse(
  res: Response, 
  status: number, 
  error: string, 
  clientInfo?: ClientInfo
): void {
  sendResponse(res, status, error, clientInfo);
}
```

### Logging Utilities (`logging.utils.ts`)

Structured logging with context and metadata:

```typescript
export const logger = {
  debug(message: unknown, options?: LogOptions): Promise<void> {...},
  info(message: unknown, options?: LogOptions): Promise<void> {...},
  warn(message: unknown, options?: LogOptions): Promise<void> {...},
  error(message: unknown, options?: LogOptions): Promise<void> {...},
  // ...
};
```

### Memory Management (`memory-management.utils.ts`)

Functions to monitor and manage application memory usage:

```typescript
export function getMemoryUsage(): MemoryUsage {
  const used = process.memoryUsage();
  return {
    rss: `${Math.round(used.rss / ONE_MB)}MB`,
    heapTotal: `${Math.round(used.heapTotal / ONE_MB)}MB`,
    heapUsed: `${Math.round(used.heapUsed / ONE_MB)}MB`,
    external: `${Math.round(used.external / ONE_MB)}MB`
  };
}
```

### Validation Utilities (`validation.utils.ts`)

Input validation helpers:

```typescript
export function validateRequestParams(
  params: Record<string, any>,
  required: string[]
): { isValid: boolean; missing: string[] } {
  const missing = required.filter(param => !params[param]);
  return {
    isValid: missing.length === 0,
    missing
  };
}
```

## Best Practices

- Keep utilities pure and side-effect free when possible
- Focus on single responsibility for each utility function
- Use TypeScript for strong typing of inputs and outputs
- Document utilities with JSDoc comments
- Write unit tests for all utility functions
- Avoid business logic in utilities
- Make utilities stateless and reusable across different parts of the application
- Consider performance implications, especially for frequently used utilities