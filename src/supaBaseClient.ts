import { createClient } from "@supabase/supabase-js";

// Use environment variables for the Supabase URL and Key
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || "";
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || "";

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);
