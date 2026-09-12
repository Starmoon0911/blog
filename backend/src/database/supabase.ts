import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env } from "../config/env";
import logger from "../utils/logger";

const adminClient: SupabaseClient = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_SECRET_KEY,
  {
    auth: { persistSession: false, autoRefreshToken: false },
  },
);
const anonClient: SupabaseClient = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_ANON_KEY,
  {
    auth: { persistSession: false, autoRefreshToken: false },
  },
);

logger.debug({ url: env.SUPABASE_URL }, "supabase clients initialized");

export const supabaseAdmin = adminClient;
export const supabaseAnon = anonClient;
export default adminClient;
