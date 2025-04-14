// src/http/controllers/text-generation.controller.ts
import { Response } from 'express';
import { BaseController, RequestWithUser } from '../base.controller';
import { generateTextUseCase, TextGenerationRequest } from '../../../usecases/text-generation-usecase/generate-text.usecase';
import { validateRequestParams } from '../../../shared/utils/validation.utils';

export class TextGenerationController extends BaseController {
  /**
   * Generiert Text basierend auf einem Prompt
   */
  async generateText(req: RequestWithUser, res: Response): Promise<void> {
    await this.handleRequest(req, res, async () => {
      const { prompt, model, temperature } = req.body;
      
      // Validierung
      const validation = validateRequestParams(req.body, ['prompt']);
      if (!validation.isValid) {
        throw new Error(`Fehlende Parameter: ${validation.missing.join(', ')}`);
      }
      
      // Token aus dem Request extrahieren
      const authToken = req.headers.authorization;
      
      const request: TextGenerationRequest = {
        prompt,
        model,
        temperature,
        authToken
      };
      
      return await generateTextUseCase.execute(request);
    });
  }
}

export const textGenerationController = new TextGenerationController();