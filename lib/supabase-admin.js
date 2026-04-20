import { createClient } from '@supabase/supabase-js'

// Service-role Supabase client — server-side only, bypasses RLS.
// Used for workspace member management (invite/accept/remove/role changes)
// because workspace_members has RLS enabled with no public policies.
let _admin = null

export function getSupabaseAdmin() {
  if (_admin) return _admin
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error('Supabase admin client requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  }
  _admin = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return _admin
}
