import { createClient } from "@supabase/supabase-js";

// Replace with your Supabase credentials
const supebaseUrl = "https://zjkzmuxgtlgwtiddowlm.supabase.co";
const supabasekey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpqa3ptdXhndGxnd3RpZGRvd2xtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzNTk5NzUsImV4cCI6MjA1NjkzNTk3NX0.Qjloe5PRkbw6yhhNa3IVwEhPubDxoW6sjaxTEmPDxjE";

export const supabase = createClient(supebaseUrl, supabasekey);
