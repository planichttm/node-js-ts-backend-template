# Ollama Service

## Overview

The Ollama Service provides a clean, reusable abstraction over the Ollama API, enabling the application to interact with local language models without exposing API-specific details to other application layers. This service handles all communication, error management, and response formatting for Ollama interactions.

## Key Features

- **API Abstraction**: Encapsulates all HTTP communication with the Ollama API
- **Configurable**: Supports customizable model selection and parameters
- **Authentication**: Handles authentication token management
- **Error Handling**: Robust error handling and logging for API interactions
- **Type Safety**: Strongly typed interfaces for requests and responses

## API Interface

### `callOllamaApi`

The primary method for communicating with the Ollama API.

```typescript
public async callOllamaApi(
  prompt: string, 
  options: OllamaRequestOptions = {}
): Promise<OllamaResponse | null>
```

#### Parameters

- **prompt**: (string, required) The text prompt to send to the model
- **options**: (OllamaRequestOptions, optional) Configuration options
  - **authToken**: (string, optional) Authentication token
  - **model**: (string, optional) Model name (default: "gemma2:7b")
  - **temperature**: (number, optional) Sampling temperature (default: 0.7)

#### Returns

- **OllamaResponse | null**: The formatted API response or null on failure

#### Response Format

```typescript
interface OllamaResponse {
  message: {
    content: string;
  };
}
```

## Usage Example

```typescript
import { ollamaService } from '../services/ollama.service';

// Simple usage
const response = await ollamaService.callOllamaApi(
  "What is clean architecture?"
);

// Advanced usage with all options
const response = await ollamaService.callOllamaApi(
  "What is clean architecture?",
  {
    model: "llama3:8b",
    temperature: 0.5,
    authToken: "your-auth-token"
  }
);

if (response) {
  console.log(response.message.content);
}
```

## Error Handling

The service implements comprehensive error handling:

- API connection errors are caught and logged
- Non-200 status codes are detected and logged
- All errors include context and request details for debugging
- Returns null on failure, allowing callers to handle errors appropriately

## Dependencies

- **axios**: For HTTP requests to the Ollama API
- **logger**: For structured logging of API interactions and errors

## Configuration

The service uses the following default configuration:

- **API Endpoint**: http://localhost:11434/api/chat
- **Default Model**: gemma2:7b
- **Default Temperature**: 0.7

These defaults can be overridden per request through the options parameter.

## Implementation Details

- The service maintains a stateless design for better scalability
- All API calls are logged for monitoring and debugging
- Authentication tokens are passed through but not stored in the service
- The service follows singleton pattern for consistent application-wide use

## Requirements

- Ollama running locally on port 11434
- At least one model loaded in Ollama