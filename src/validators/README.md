# Validators Layer

## Overview

The validators layer contains logic for validating and sanitizing data before it's processed by the application. It ensures that incoming data meets the expected format and business rules, preventing invalid data from reaching the core business logic.

## Purpose

- Validate input data format and structure
- Enforce business rules and constraints
- Sanitize inputs to prevent security vulnerabilities
- Provide clear error messages for invalid input
- Separate validation logic from business logic

## Best Practices

- Keep validators simple and focused on a single responsibility
- Use descriptive error messages that help clients fix invalid inputs
- Implement reusable validation functions for common patterns
- Separate structural validation (is it the right format?) from business validation (is it allowed?)
- Return validation results in a consistent format

## Creating a Validator

When creating a new validator:

1. Create a file named after the entity or operation it validates (e.g., `user.validator.ts`)
2. Export validation functions for different operations
3. Use shared validation utilities when possible
4. Return a standardized validation result object

Example validator structure:

```typescript
import { ValidationError } from '../shared/types/errors';

export function validateUserCreation(data: any): { isValid: boolean; errors?: ValidationError[] } {
  const errors: ValidationError[] = [];
  
  // Required fields
  if (!data.email) {
    errors.push({ field: 'email', message: 'Email is required' });
  }
  
  // Format validation
  if (data.email && !isValidEmail(data.email)) {
    errors.push({ field: 'email', message: 'Invalid email format' });
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  };
}
```

## Integration with Use Cases

Validators should be called at the beginning of use case execution:

```typescript
public async execute(data: UserCreationData): Promise<User> {
  // Validate input
  const validation = validateUserCreation(data);
  if (!validation.isValid) {
    throw new ValidationFailedError('Invalid user data', validation.errors);
  }
  
  // Proceed with business logic...
}
```

## Types of Validation

### Structural Validation

Checks if data has the expected structure, types, and required fields.

### Business Rule Validation

Checks if data meets business requirements, such as:
- Uniqueness constraints
- Relationship requirements
- Status-based validations
- Permission-based validations

### Format Validation

Checks if data format is correct:
- Email formats
- Phone numbers
- Dates
- Numeric ranges
- String lengths

## Error Handling

Validators should:
- Collect all errors rather than failing on the first one
- Provide field-specific error messages
- Return a consistent validation result structure
- Allow the calling code to decide how to handle validation failures