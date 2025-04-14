# UseCases Layer

## Overview

UseCases encapsulate core business logic and domain rules, serving as the essential coordination layer that connects API controllers with data repositories without being tied to either HTTP or database specifics. They handle the transformation, validation, and orchestration of data flows, implementing the actual intelligence of your application.

## Directory Structure

Each use case or group of related use cases is placed in a dedicated directory:

```
usecases/
  ├── text-generation-usecase/
  │   ├── generate-text.usecase.ts
  │   └── README.md
  └── other-feature-usecase/
      ├── feature-action.usecase.ts
      └── README.md
```

## Key Characteristics

- **Single Responsibility**: Each use case focuses on a specific business operation
- **Framework Independence**: Use cases have no dependencies on HTTP frameworks or database specifics
- **Input/Output Data Transfer Objects**: Well-defined request/result interfaces
- **Error Handling**: Domain-specific errors with meaningful messages
- **Coordination**: Orchestration between multiple services or repositories when needed
- **Logging**: Appropriate logging of business operations

## Implementation Pattern

Use cases follow a consistent implementation pattern:

```typescript
export interface InputDto {
  // Input parameters
}

export interface ResultDto {
  // Output data
}

export class SomeUseCase {
  public async execute(input: InputDto): Promise<ResultDto> {
    // 1. Validate input
    if (!input.requiredField) {
      throw new Error('Required field is missing');
    }

    // 2. Business logic processing
    // ...use services, repositories, etc.

    // 3. Return structured result
    return {
      // formatted result data
    };
  }
}

// Export singleton instance
export const someUseCase = new SomeUseCase();
```

## Usage Example

From a controller:

```typescript
// In controller
async someEndpoint(req: RequestWithUser, res: Response): Promise<void> {
  await this.handleRequest(req, res, async () => {
    // Extract and transform input from HTTP request
    const input = {
      someField: req.body.someField,
      userId: req.user.id
    };
    
    // Call use case with domain input
    return await someUseCase.execute(input);
    
    // Result is automatically sent as HTTP response
  });
}
```

## Best Practices

- Keep use cases focused on business rules, not technical concerns
- Design clear input/output interfaces
- Use dependency injection for services and repositories
- Maintain framework independence
- Implement proper validation and error handling
- Return structured data that can be easily consumed by controllers
- Create separate use cases for different operations rather than one large use case with many methods