# HTTP Middleware Layer

Middleware functions process requests before they reach route handlers, performing tasks like authentication, request enrichment, and error handling. They provide cross-cutting functionality that applies to multiple routes, keeping the code DRY and maintaining separation of concerns. This layer ensures proper request validation, security checks, and contextual data enrichment before the controller logic executes.

## Key Components

### Authentication Middleware (`auth.middleware.ts`)

The authentication middleware validates tokens and establishes user identity:

- Supports multiple authentication modes (Supabase JWT, static API key, or none)
- Extracts and validates tokens from request headers
- Adds user information to the request object for downstream use
- Returns appropriate error responses for invalid authentication

```typescript
export function verifyToken(req: Request, res: Response, next: NextFunction) {
  // Token extraction and validation logic
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }
  
  try {
    // Validate token based on auth type
    // Set user information on request
    (req as any).user = { /* user data */ };
    next();
  } catch (error) {
    return res.status(401).json({ 
      error: "Unauthorized: Invalid authentication"
    });
  }
}
```

### Client Information Middleware (`client-info.middleware.ts`)

Enriches requests with client context information:

- Captures IP address, user agent, and other request metadata
- Creates a standardized ClientInfo object
- Attaches the information to the request for use in controllers and logging

```typescript
export const clientInfoMiddleware = (
  req: ExpressRequest,
  res: Response,
  next: NextFunction
) => {
  const clientInfo: ClientInfo = {
    clientIP: req.ip || 'unknown',
    // Other client information
  };

  (req as any).clientInfo = clientInfo;
  next();
};
```

## Usage

Middleware can be applied at different levels:

### Global Application Level

```typescript
// Apply to all routes
app.use(clientInfoMiddleware);
```

### Router Level

```typescript
// Apply to all routes in this router
router.use(verifyToken);
```

### Route Level

```typescript
// Apply to a specific route
router.post('/protected', verifyToken, (req, res) => 
  controller.method(req, res)
);
```

## Best Practices

- Keep middleware functions focused on a single responsibility
- Use middleware to handle cross-cutting concerns
- Avoid embedding business logic in middleware
- Create reusable middleware that can be applied selectively
- Chain middleware in a logical order
- Pass errors to the error handling middleware via next(error)