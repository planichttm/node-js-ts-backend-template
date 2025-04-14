# Text Generation Controller

## Overview

The Text Generation Controller acts as the HTTP interface for the text generation capability, handling REST API requests for text generation operations. It follows the application's controller pattern by maintaining a clear separation of concerns - handling HTTP specifics while delegating business logic to the appropriate UseCase.

## Responsibilities

- Receive and validate HTTP requests for text generation
- Extract parameters from request body and headers
- Validate required fields before processing
- Pass sanitized request data to the GenerateTextUseCase
- Transform UseCase responses into standardized HTTP responses
- Handle and log errors with appropriate HTTP status codes

## API Endpoints

### Generate Text

```
POST /api/text-generation/generate
```

Generates text based on a provided prompt using the Ollama API.

#### Request Format

```json
{
  "prompt": "Write a paragraph about clean architecture",
  "model": "gemma2:7b",
  "temperature": 0.7
}
```

#### Request Parameters

| Parameter     | Type    | Required | Description                                  | Default    |
|---------------|---------|----------|----------------------------------------------|------------|
| prompt        | string  | Yes      | The text prompt to generate content from     | -          |
| model         | string  | No       | The Ollama model to use                      | "gemma2:7b" |
| temperature   | number  | No       | Creativity temperature (0.0 to 1.0)          | 0.7        |

#### Headers

| Header         | Required | Description                                |
|----------------|----------|--------------------------------------------|
| Authorization  | Yes*     | Authentication token (depends on auth mode) |

#### Response Format

```json
{
  "success": true,
  "data": {
    "generatedText": "Clean architecture is an approach to software design...",
    "model": "gemma2:7b",
    "prompt": "Write a paragraph about clean architecture"
  },
  "timestamp": "2024-04-14T10:15:30.123Z"
}
```

#### Error Responses

```json
{
  "success": false,
  "error": "Missing required parameter: prompt",
  "timestamp": "2024-04-14T10:15:30.123Z"
}
```

## Implementation

The controller uses the BaseController pattern for consistent error handling and response formatting:

```typescript
export class TextGenerationController extends BaseController {
  async generateText(req: RequestWithUser, res: Response): Promise<void> {
    await this.handleRequest(req, res, async () => {
      // Extract parameters from request
      const { prompt, model, temperature } = req.body;
      
      // Validate required parameters
      const validation = validateRequestParams(req.body, ['prompt']);
      if (!validation.isValid) {
        throw new Error(`Missing parameters: ${validation.missing.join(', ')}`);
      }
      
      // Extract authentication token
      const authToken = req.headers.authorization;
      
      // Execute the UseCase
      return await generateTextUseCase.execute({
        prompt,
        model,
        temperature,
        authToken
      });
    });
  }
}
```

## Authentication

The controller uses the application's standard authentication middleware (`verifyToken`) to protect the endpoint based on the configured authentication mode.

## Error Handling

The controller leverages the BaseController's error handling mechanism:

1. All errors from the UseCase are caught
2. Errors are properly logged with request context
3. User-friendly error messages are sent in responses
4. HTTP 500 status is used for unexpected errors

## Dependencies

- **GenerateTextUseCase**: Provides the core text generation functionality
- **BaseController**: Provides standardized request handling and error management
- **validateRequestParams**: Utility for validating request parameters