# HTTP Controllers Layer

Controllers in this application handle HTTP requests/responses, validate inputs, and manage API endpoints without containing any business logic. They receive requests, validate input parameters, delegate processing to UseCases, and transform the results into appropriate HTTP responses. Their primary responsibility is to act as a thin adapter between the HTTP transport layer and the domain logic, ensuring separation of concerns and keeping HTTP-specific code isolated from the core application.

## Key Responsibilities

- Extract and validate input from HTTP requests (body, query parameters, headers)
- Transform input into appropriate domain objects for use cases
- Invoke the relevant use case with the validated input
- Transform use case results into HTTP responses
- Handle errors and exceptions, mapping them to appropriate HTTP status codes
- Apply consistent response formatting across the API

## Structure

Each controller in the application:
- Extends the `BaseController` to inherit common functionality
- Is organized around a specific domain area or feature
- Contains methods that correspond to specific API actions
- Focuses solely on HTTP concerns, not business rules

## BaseController

The `BaseController` provides a reusable foundation for all controllers:

```typescript
export abstract class BaseController {
  protected async handleRequest(
    req: RequestWithUser,
    res: Response,
    handler: () => Promise<any>
  ): Promise<void> {
    try {
      const result = await handler();
      sendSuccessResponse(res, result, req.clientInfo);
    } catch (error) {
      logger.error('Controller error', {
        context: this.constructor.name,
        error: error instanceof Error ? error.message : 'Unknown error',
        metadata: {
          path: req.path,
          method: req.method,
          query: req.query,
          params: req.params
        }
      });
      
      sendErrorResponse(
        res,
        500,
        error instanceof Error ? error.message : 'Unknown error',
        req.clientInfo
      );
    }
  }
}
```

## Best Practices

- Keep controllers focused only on request/response handling
- Delegate all business logic to use cases
- Use consistent error handling via the BaseController
- Keep controller methods small and focused on a single responsibility
- Apply input validation before invoking use cases
- Return standardized response formats