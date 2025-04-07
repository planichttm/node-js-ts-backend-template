// src/shared/utils/validation.utils.ts
import { Request } from 'express-serve-static-core';
import { appConfig } from '../config/app.config';

export function validateDexName(dexName: string | undefined): boolean {
  return !!dexName;
}

export function validateAuthCredentials(): boolean {
  const { validationType } = appConfig.auth;
  
  switch (validationType) {
    case 'none':
      // No validation required
      return true;
    
    case 'supabase':
      if (!appConfig.auth.supabase?.url || 
          !appConfig.auth.supabase?.key || 
          !appConfig.auth.supabase?.serviceKey) {
        console.warn('Supabase credentials missing or incomplete');
        return false;
      }
      return true;
    
    case 'static':
      if (!appConfig.auth.staticKey?.apiKey) {
        console.warn('Static API key missing');
        return false;
      }
      return true;
    
    default:
      console.warn(`Unknown validation type: ${validationType}`);
      return false;
  }
}

export function validateRequestParams(
  params: Record<string, any>,
  required: string[]
): { isValid: boolean; missing: string[] } {
  const missing = required.filter(param => !params[param]);
  return {
    isValid: missing.length === 0,
    missing
  };
}