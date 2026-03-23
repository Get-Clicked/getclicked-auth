import { createSupabaseServer } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import ApproveButton from './approve-button'

export default async function ConsentPage({ searchParams }) {
  const params = await searchParams
  const authorizationId = params.authorization_id

  if (!authorizationId) {
    return (
      <div style={{ textAlign: 'center', padding: 40 }}>
        <p>Missing authorization_id</p>
      </div>
    )
  }

  const supabase = await createSupabaseServer()

  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    // Redirect to login, preserving authorization_id
    redirect('/login?redirect=/oauth/consent?authorization_id=' + encodeURIComponent(authorizationId))
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
      <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Authorize Access</h1>
      <p style={{ color: '#666', fontSize: 14, marginBottom: 24, lineHeight: 1.5 }}>
        Claude wants to connect to your getClicked account for unlimited research access.
      </p>
      <ApproveButton authorizationId={authorizationId} />
    </div>
  )
}
