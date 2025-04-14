// src/usecases/text-generation-usecase/generate-text.usecase.ts
import { ollamaService } from '../../services/ollama/ollama.service';
import { logger } from '../../shared/utils/logging.utils';

export interface TextGenerationRequest {
  prompt: string;
  model?: string;
  temperature?: number;
  authToken?: string;
}

export interface TextGenerationResult {
  generatedText: string;
  model: string;
  prompt: string;
}

export class GenerateTextUseCase {
  /**
   * Generiert Text basierend auf einem Prompt
   * @param request - Die Anfrage mit Prompt und optionalen Parametern
   * @returns Das Generierungsergebnis oder wirft einen Fehler
   */
  public async execute(request: TextGenerationRequest): Promise<TextGenerationResult> {
    if (!request.prompt) {
      throw new Error('Prompt muss angegeben werden');
    }

    const model = request.model || "gemma2:7b";
    const temperature = request.temperature !== undefined ? request.temperature : 0.7;

    logger.info('Starte Textgenerierung...', { 
      context: this.constructor.name,
      metadata: { 
        model,
        promptLength: request.prompt.length,
        temperature
      }
    });
    
    const result = await ollamaService.callOllamaApi(request.prompt, {
      model,
      temperature,
      authToken: request.authToken
    });

    if (!result || !result.message) {
      throw new Error('Keine Antwort von der Ollama API erhalten');
    }

    return {
      generatedText: result.message.content,
      model,
      prompt: request.prompt
    };
  }
}

export const generateTextUseCase = new GenerateTextUseCase();