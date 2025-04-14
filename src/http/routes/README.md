# HTTP Routes Layer

Routes define the API endpoints exposed by the application and map HTTP requests to the appropriate controller methods. They establish the routing structure, apply middleware like authentication, and connect the external interface to the controller functions. Routes are kept simple and declarative, focusing solely on defining the API surface without containing any business or validation logic.

## Purpose

The routes layer serves to:
- Define the URL structure of the API
- Map HTTP methods (GET, POST, PUT, DELETE) to controller methods
- Apply middleware to specific routes or route groups
- Organize endpoints in a logical hierarchy

## Implementation Pattern

Routes follow a consistent pattern in this application:

```typescript
import { Router } from 'express';
import { featureController } from '../controllers/feature.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

// Public routes (no authentication)
router.get('/public', (req: any, res) => 
  featureController.publicMethod(req, res)
);

// Protected routes (with authentication)
router.post('/protected', verifyToken, (req: any, res) => 
  featureController.protectedMethod(req, res)
);

export default router;
```

## Organization

Routes are organized by feature or domain area:
- `health.routes.ts`: System health and status endpoints
- `text-generation.routes.ts`: Text generation endpoints
- etc.

## Registration

All routes are registered in the main application file (`index.ts`):

```typescript
app.use('/api/health', healthRoutes);
app.use('/api/text-generation', textGenerationRoutes);
```

## Best Practices

- Keep route definitions simple and declarative
- Apply consistent middleware patterns across similar routes
- Group related endpoints under a common base path
- Use appropriate HTTP methods for each operation
- Follow RESTful URL structure conventions where applicable
- Avoid embedding business logic in route definitions