import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { validateSupabaseConfig } from '../utils/validation.utils';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

validateSupabaseConfig(supabaseUrl, supabaseKey, supabaseServiceKey);

export const supabase = createClient(supabaseUrl!, supabaseServiceKey!);