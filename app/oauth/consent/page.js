import { createSupabaseServer } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function ConsentPage({ searchParams }) {
  const params = await searchParams
  const authorizationId = params.authorization_id
  const autoApprove = params.auto === '1'

  if (!authorizationId) {
    return (
      <div style={{ textAlign: 'center', padding: 40 }}>
        <p>Missing authorization_id</p>
      </div>
    )
  }

  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    const returnPath = '/oauth/consent?authorization_id=' + encodeURIComponent(authorizationId) + '&auto=1'
    redirect('/login?redirect=' + encodeURIComponent(returnPath))
  }

  // Log what we know for debugging
  console.log('[consent] user:', user.email, 'authorization_id:', authorizationId)

  // First try to get authorization details to see if it's still valid
  let detailsResult = null
  try {
    detailsResult = await supabase.auth.oauth.getAuthorizationDetails(authorizationId)
    console.log('[consent] getAuthorizationDetails:', JSON.stringify(detailsResult))
  } catch (e) {
    console.log('[consent] getAuthorizationDetails error:', e.message)
  }

  // If details returned a redirect_url, user already consented — redirect immediately
  if (detailsResult?.data?.redirect_url) {
    redirect(detailsResult.data.redirect_url)
  }

  // Auto-approve server-side
  const { data, error } = await supabase.auth.oauth.approveAuthorization(authorizationId)
  console.log('[consent] approveAuthorization result:', JSON.stringify({ data, error }))

  if (error) {
    return (
      <div style={{
        background: 'white',
        borderRadius: 12,
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        padding: 40,
        maxWidth: 420,
        width: '100%',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>
          get<span style={{ color: '#2d5a87' }}>Clicked</span>
        </div>
        <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Connection Failed</h1>
        <p style={{ color: '#666', fontSize: 14, marginBottom: 16 }}>
          Please try connecting again from Claude. The authorization may have expired during sign-in.
        </p>
        <p style={{ color: '#d33', fontSize: 12 }}>Debug: {error.message || error.code} | User: {user.email} | Auth ID: {authorizationId}</p>
      </div>
    )
  }

  // Redirect back to Claude/Cowork
  // Note: Supabase API returns redirect_url (not redirect_to) — check both
  const redirectUrl = data?.redirect_to || data?.redirect_url
  console.log('[consent] redirect URL:', redirectUrl, 'full data:', JSON.stringify(data))

  if (redirectUrl) {
    redirect(redirectUrl)
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: 12,
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      padding: 40,
      maxWidth: 420,
      width: '100%',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>
        get<span style={{ color: '#2d5a87' }}>Clicked</span>
      </div>
      <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Connected</h1>
      <p style={{ color: '#666', fontSize: 14 }}>You can close this window and return to Claude.</p>
    </div>
  )
}
