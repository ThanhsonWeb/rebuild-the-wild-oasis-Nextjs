import { createClient } from "@supabase/supabase-js";
//  initialize
export const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_KEY, // secret KEY instead public KEY
);
