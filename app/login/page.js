'use client'

import { createBrowserClient } from '@supabase/ssr'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function LoginForm() {
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/'

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  async function handleGoogleSignIn() {
    const currentOrigin = window.location.origin
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: currentOrigin + '/auth/callback?redirect=' + encodeURIComponent(redirect),
      },
    })
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
      <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Sign in</h1>
      <p style={{ color: '#666', fontSize: 14, marginBottom: 24, lineHeight: 1.5 }}>
        Sign in with your Google account to connect your getClicked research tools.
      </p>
      <button
        onClick={handleGoogleSignIn}
        style={{
          padding: '12px 32px',
          borderRadius: 8,
          fontSize: 15,
          fontWeight: 500,
          cursor: 'pointer',
          border: 'none',
          background: '#2d5a87',
          color: 'white',
        }}
      >
        Sign in with Google
      </button>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}
