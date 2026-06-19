// import { createClient } from "@supabase/supabase-js";
// export const supabase = createClient(
// 	process.env.SUPABASE_URL,
// 	process.env.SUPABASE_KEY, // secret KEY instead public KEY
// );

import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_PUBLIC_KEY, // public KEY
);
