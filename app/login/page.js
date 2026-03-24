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
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://auth.getclicked.ai/auth/callback?redirect=' + encodeURIComponent(redirect),
      },
    })
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#FAFAFA',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    }}>
      <div style={{
        background: 'white',
        borderRadius: 24,
        boxShadow: '0 8px 40px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)',
        padding: 48,
        maxWidth: 420,
        width: '100%',
        textAlign: 'center',
      }}>
        {/* Logo */}
        <div style={{
          fontSize: 22,
          fontWeight: 800,
          marginBottom: 32,
          letterSpacing: '-0.02em',
          color: '#111',
        }}>
          Get Clicked<span style={{ color: '#FF4F6D' }}>.</span>
        </div>

        <h1 style={{
          fontSize: 28,
          fontWeight: 700,
          marginBottom: 8,
          color: '#111',
          letterSpacing: '-0.02em',
        }}>
          Create your free account
        </h1>

        <p style={{
          color: '#888',
          fontSize: 15,
          marginBottom: 32,
          lineHeight: 1.6,
        }}>
          Sign in with Google to get started. Your first deliverable is 10 minutes away.
        </p>

        <button
          onClick={handleGoogleSignIn}
          style={{
            width: '100%',
            padding: '14px 32px',
            borderRadius: 999,
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
            border: 'none',
            background: '#111',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            transition: 'transform 0.15s ease',
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign up with Google
        </button>

        <p style={{
          color: '#ccc',
          fontSize: 12,
          marginTop: 20,
          lineHeight: 1.5,
        }}>
          Free forever. No credit card required.
        </p>
      </div>

      <p style={{
        color: '#ccc',
        fontSize: 11,
        marginTop: 24,
      }}>
        By signing up you agree to our{' '}
        <a href="https://getclicked.ai/terms" style={{ color: '#999', textDecoration: 'underline' }}>Terms</a>
        {' '}and{' '}
        <a href="https://getclicked.ai/privacy" style={{ color: '#999', textDecoration: 'underline' }}>Privacy Policy</a>
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, system-ui, sans-serif',
        color: '#ccc',
      }}>
        Loading...
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
