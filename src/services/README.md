# Services Layer

## Overview

Services contain core business logic and orchestrate operations across multiple repositories to handle complex operations. They implement application-specific functionality that doesn't fit cleanly into repositories or controllers, often managing interactions with external APIs and coordinating multi-step processes.

## Directory Structure

- **`ollama.service.ts`**: Integration with Ollama API for AI text generation
- **`other-service/`**: Other service implementations, possibly with their own subdirectories

## Key Components

### OllamaService

The `OllamaService` provides an abstraction over the Ollama API, handling communication with the external AI service. It manages API specifics such as prompts and parameters and isolates the rest of the application from changes in the Ollama API.

### Other Services

Additional services might include:
- External API integrations
- Complex business operations
- Cross-cutting concerns that don't fit in repositories

## Usage Example

```typescript
// Using the OllamaService
import { ollamaService } from '../services/ollama.service';

const prompt = "Write a summary about...";
const result = await ollamaService.callOllamaApi(prompt, {
  model: "gemma2:7b",
  temperature: 0.7
});
```

## Implementation Pattern

Services typically follow this pattern:

```typescript
export class SomeService {
  // Service methods that implement business logic
  public async performOperation(params): Promise<Result> {
    try {
      // Implementation with external API calls, etc.
      return result;
    } catch (error) {
      logger.error('Operation failed', {
        context: this.constructor.name,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error; // or return null/default value depending on requirements
    }
  }
}

// Export singleton instance
export const someService = new SomeService();
```

## Best Practices

- Services should encapsulate external API interactions
- Keep services focused on specific domains or integrations
- Use dependency injection for better testability
- Handle errors appropriately within services
- Log important events and errors for debugging
- Create interfaces for services to allow mock implementations in tests
- Maintain separation from HTTP-specific concerns