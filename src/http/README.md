# HTTP Layer

## Overview

The HTTP layer handles all request/response cycles, routing, and middleware concerns for the REST API. This layer acts as the entry point for all client interactions, ensuring proper authentication, validation, and error handling before passing control to the appropriate use case.

## Directory Structure

- **`controllers/`**: Handle HTTP requests/responses and delegate to use cases
- **`middleware/`**: Process requests before they reach route handlers
- **`routes/`**: Define API endpoints and map to controller methods

## Key Components

### Controllers

Controllers validate inputs, transform requests, and delegate business logic to use cases without containing significant business logic themselves. Each controller extends the `BaseController` which provides common error handling and response formatting.

### Middleware

Middleware functions process requests before they reach route handlers, performing tasks like:
- Authentication and authorization
- Request information enrichment
- Error handling
- CORS configuration

### Routes

Routes define the API endpoints exposed by the application and map HTTP requests to the appropriate controller methods. They establish the routing structure, apply middleware like authentication, and connect the external interface to the controller functions.

## Usage Example

```typescript
// Define a route
router.post('/generate', verifyToken, (req: any, res) => 
  textGenerationController.generateText(req, res)
);

// Controller method
async generateText(req: RequestWithUser, res: Response): Promise<void> {
  await this.handleRequest(req, res, async () => {
    const { prompt, model, temperature } = req.body;
    
    // Validate and prepare data
    const validation = validateRequestParams(req.body, ['prompt']);
    if (!validation.isValid) {
      throw new Error(`Missing parameters: ${validation.missing.join(', ')}`);
    }
    
    // Get auth token if available
    const authToken = req.headers.authorization;
    
    // Execute use case with validated data
    return await generateTextUseCase.execute({
      prompt,
      model,
      temperature,
      authToken
    });
  });
}
```

## Best Practices

- Controllers should be thin and focused only on HTTP concerns
- Business logic belongs in use cases, not controllers
- Routes should be simple and declarative
- Middleware should be reusable and focused on a single responsibility