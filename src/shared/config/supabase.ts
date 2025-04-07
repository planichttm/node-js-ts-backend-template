// src/shared/config/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { appConfig } from './app.config';

// Initialize supabase client conditionally based on config
let supabaseClient = null;

// Only initialize Supabase if validationType is 'supabase' and credentials are present
if (appConfig.auth.validationType === 'supabase') {
  const { url, serviceKey } = appConfig.auth.supabase || {};
  
  if (url && serviceKey) {
    try {
      supabaseClient = createClient(url, serviceKey);
      
      // We can't use the logger here due to circular dependency,
      // so we use console.log for initialization feedback
      console.log(`[SupabaseConfig] Supabase client initialized successfully`);
    } catch (error) {
      console.error('[SupabaseConfig] Failed to initialize Supabase client', 
        error instanceof Error ? error.message : 'Unknown error');
    }
  } else {
    console.warn('[SupabaseConfig] Supabase validation type set but credentials missing');
  }
}

export const supabase = supabaseClient;