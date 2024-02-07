import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from '../buildConstants';
import { Database } from './dto/supabase';

export const supabaseClient = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);
