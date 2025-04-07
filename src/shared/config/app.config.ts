// src/shared/config/app.config.ts
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Validation types
export type AuthValidationType = 'none' | 'supabase' | 'static';

export interface AppConfig {
  server: {
    port: number;
    environment: string;
  };
  auth: {
    validationType: AuthValidationType;
    supabase?: {
      url: string | null;
      key: string | null;
      serviceKey: string | null;
    };
    staticKey?: {
      apiKey: string | null;
    };
  };
  logging: {
    level: string;
    console: {
      enabled: boolean;
      colorized: boolean;
    };
    database: {
      enabled: boolean;
      minLevel: string;
    };
  };
}

// Default configuration with hardcoded non-sensitive values
const defaultConfig: AppConfig = {
  server: {
    port: Number(process.env.PORT) || 3000,
    environment: process.env.NODE_ENV || 'development'
  },
  auth: {
    // Default validation type - can be overridden by env var if needed
    validationType: (process.env.AUTH_VALIDATION_TYPE as AuthValidationType) || 'none',
    
    // Supabase credentials from env (sensitive)
    supabase: {
      url: process.env.SUPABASE_URL || null,
      key: process.env.SUPABASE_KEY || null,
      serviceKey: process.env.SUPABASE_SERVICE_KEY || null
    },
    
    // Static key auth from env (sensitive)
    staticKey: {
      apiKey: process.env.STATIC_API_KEY || null
    }
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    console: {
      enabled: true,
      colorized: true
    },
    database: {
      enabled: process.env.NODE_ENV === 'production',
      minLevel: 'error'
    }
  }
};

// Export the config
export const appConfig: AppConfig = defaultConfig;