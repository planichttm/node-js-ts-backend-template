// src/services/ollama.service.ts
import axios from 'axios';
import { logger } from '../../shared/utils/logging.utils';

export interface OllamaResponse {
  message: {
    content: string;
  };
}

export interface OllamaRequestOptions {
  authToken?: string;
  model?: string;
  temperature?: number;
}

export class OllamaService {
  /**
   * Ruft die Ollama API auf
   * @param prompt - Der Prompt für das Modell
   * @param options - Optionen für den API-Aufruf (einschließlich Token)
   * @returns Die Antwort der API oder null bei Fehler
   */
  public async callOllamaApi(
    prompt: string, 
    options: OllamaRequestOptions = {}
  ): Promise<OllamaResponse | null> {
    const { authToken, model = "gemma2:7b", temperature = 0.7 } = options;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    
    // Authorization-Header hinzufügen, wenn Token vorhanden
    if (authToken) {
      headers['Authorization'] = authToken;
    }

    const data = {
      model: model,
      messages: [
        { role: "system", content: "Du bist ein hilfreicher Assistent, der klare und präzise Antworten gibt." },
        { role: "user", content: prompt }
      ],
      temperature: temperature,
      stream: false
    };

    try {
      const response = await axios.post("http://localhost:11434/api/chat", data, { headers });

      if (response.status === 200) {
        return response.data;
      } else {
        logger.error('Fehler beim Ollama API-Aufruf', {
          context: this.constructor.name,
          error: `Status ${response.status}`,
          metadata: response.data
        });
        return null;
      }
    } catch (error) {
      logger.error('Fehler bei der API-Anfrage', {
        context: this.constructor.name,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return null;
    }
  }
}

export const ollamaService = new OllamaService();