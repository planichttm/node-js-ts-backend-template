import { Request } from 'express';
import { supabase } from '../config/supabase';
import { LogLevel, LogLevelConfig, loggingConfig } from '../config/logging.config';

interface LogEntry {
  log_text: string;
  log_level: number;
  log_category?: string;
  context?: string;
  requestId?: string;
  error?: string;
  url?: string;
  method?: string;
  duration?: number;
  operation?: string;
  created_at: string;
}

interface LogOptions {
  context?: string;
  category?: string;
  requestId?: string;
  error?: string;
  url?: string;
  method?: string;
  duration?: number;
  operation?: string;
  metadata?: Record<string, any>;
}

class Logger {
  private async writeToSupabase(entry: LogEntry): Promise<void> {
    try {
      const { error } = await supabase
        .from('sys_log')
        .insert(entry);

      if (error) {
        console.error('Failed to write to Supabase log:', error);
      }
    } catch (error) {
      console.error('Error writing to Supabase log:', error);
    }
  }

  private formatMessage(
    level: LogLevelConfig,
    message: unknown,
    options?: LogOptions
  ): string {
    const timestamp = new Date().toISOString();
    const levelString = level.label.padEnd(8);
    const context = options?.context ? ` [${options.context}]` : '';
    const category = options?.category ? ` (${options.category})` : '';
    const requestId = options?.requestId ? ` #${options.requestId}` : '';
    const error = options?.error ? ` Error: ${options.error}` : '';
    const url = options?.url ? ` URL: ${options?.url}` : '';
    const method = options?.method ? ` Method: ${options?.method}` : '';
    const duration = options?.duration ? ` Duration: ${options?.duration}ms` : '';
    const operation = options?.operation ? ` Operation: ${options.operation}` : '';
    
    const formattedMessage = typeof message === 'object' 
      ? JSON.stringify({ ...message, ...(options?.metadata || {}) }, null, 2) 
      : String(message);

    return `${timestamp} ${levelString}${context}${category}${operation}${requestId}${url}${method}${duration}${error}: ${formattedMessage}`;
  }

  public async log(
    level: LogLevelConfig,
    message: unknown,
    options?: LogOptions
  ): Promise<void> {
    const formattedMessage = this.formatMessage(level, message, options);

    // Console logging - nur wenn Level über oder gleich minimumConsoleLogLevel
    if (loggingConfig.console.enabled && level.value >= loggingConfig.minimumConsoleLogLevel.value) {
      const output = loggingConfig.console.colorized 
        ? `${level.color}${formattedMessage}${LogLevel.NONE.color}`
        : formattedMessage;
      console.log(output);
    }

    // Supabase logging
    if (level.value >= loggingConfig.minimumSupabaseLogLevel.value) {
      const logEntry: LogEntry = {
        log_text: formattedMessage,
        log_level: level.value,
        log_category: options?.category,
        context: options?.context,
        requestId: options?.requestId,
        error: options?.error,
        url: options?.url,
        method: options?.method,
        duration: options?.duration,
        operation: options?.operation,
        created_at: new Date().toISOString()
      };

      await this.writeToSupabase(logEntry);
    }
  }

  // Hilfsfunktion zum temporären Ändern des Log-Levels
  public setConsoleLogLevel(level: LogLevelConfig): LogLevelConfig {
    const previousLevel = loggingConfig.minimumConsoleLogLevel;
    (loggingConfig as any).minimumConsoleLogLevel = level;
    return previousLevel;
  }

  // Convenience methods
  public debug(message: unknown, options?: LogOptions): Promise<void> {
    return this.log(LogLevel.DEBUG, message, options);
  }

  public info(message: unknown, options?: LogOptions): Promise<void> {
    return this.log(LogLevel.INFO, message, options);
  }

  public warn(message: unknown, options?: LogOptions): Promise<void> {
    return this.log(LogLevel.WARN, message, options);
  }

  public error(message: unknown, options?: LogOptions): Promise<void> {
    const errorMsg = options?.error || (message instanceof Error ? message.message : undefined);
    return this.log(LogLevel.ERROR, message, {
      ...options,
      error: errorMsg
    });
  }

  public critical(message: unknown, options?: LogOptions): Promise<void> {
    return this.log(LogLevel.CRITICAL, message, options);
  }

  public system(message: unknown, options?: LogOptions): Promise<void> {
    return this.log(LogLevel.SYSTEM, message, options);
  }

  // Application specific logging methods
  public logRequest(req: Request): Promise<void> {
    return this.info({
      headers: req.headers,
      url: req.url,
      query: req.query,
      timestamp: new Date().toISOString()
    }, { 
      category: 'HTTP',
      url: req.url,
      method: req.method 
    });
  }
}

export const logger = new Logger();