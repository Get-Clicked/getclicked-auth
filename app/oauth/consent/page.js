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

  // Auto-approve server-side — the user already clicked Connect in Cowork
  // and signed in with Google. No need for another click.
  const { data, error } = await supabase.auth.oauth.approveAuthorization(authorizationId)

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
          The authorization request expired or was invalid. Please try connecting again from Claude.
        </p>
        <p style={{ color: '#d33', fontSize: 12 }}>{error.message || error.code}</p>
      </div>
    )
  }

  // Redirect back to Claude/Cowork
  if (data && data.redirect_to) {
    redirect(data.redirect_to)
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
