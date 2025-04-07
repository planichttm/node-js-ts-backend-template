import { Request } from 'express-serve-static-core';

export function validateDexName(dexName: string | undefined): boolean {
  return !!dexName;
}

export function validateSupabaseConfig(
  supabaseUrl?: string,
  supabaseKey?: string,
  supabaseServiceKey?: string
): void {
  if (!supabaseUrl || !supabaseKey || !supabaseServiceKey) {
    throw new Error('Supabase credentials are missing in environment variables');
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