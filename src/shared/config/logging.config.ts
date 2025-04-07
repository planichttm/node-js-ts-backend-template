export interface LogLevelConfig {
    value: number;
    color: string;
    label: string;
  }
  
  export const LogLevel: Record<string, LogLevelConfig> = {
    NONE: {
      value: 0,
      color: "\x1b[0m",
      label: "NONE"
    },
    DEBUG: {
      value: 1,
      color: "\x1b[34m",
      label: "DEBUG"
    },
    INFO: {
      value: 2,
      color: "\x1b[32m",
      label: "INFO"
    },
    WARN: {
      value: 3,
      color: "\x1b[33m",
      label: "WARN"
    },
    ERROR: {
      value: 4,
      color: "\x1b[31m",
      label: "ERROR"
    },
    CRITICAL: {
      value: 5,
      color: "\x1b[35m",
      label: "CRITICAL"
    },
    SYSTEM: {
      value: 6,
      color: "\x1b[36m",
      label: "SYSTEM"
    }
  } as const;
  
  export interface LogConfig {
    minimumSupabaseLogLevel: LogLevelConfig;
    minimumConsoleLogLevel: LogLevelConfig;
    console: {
      enabled: boolean;
      colorized: boolean;
    };
  }
  
  export const loggingConfig: LogConfig = {
    minimumSupabaseLogLevel: LogLevel.ERROR,
    minimumConsoleLogLevel: process.env.NODE_ENV === 'production' ? LogLevel.ERROR : LogLevel.DEBUG,
    console: {
      enabled: true,
      colorized: true
    }
  };