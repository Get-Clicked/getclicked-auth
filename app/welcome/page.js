import { createSupabaseServer } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function WelcomePage() {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirect=/welcome')
  }

  const firstName = user.user_metadata?.full_name?.split(' ')[0] || 'there'
  const avatar = user.user_metadata?.avatar_url

  return (
    <div style={{
      minHeight: '100vh',
      background: '#FAFAFA',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      <div style={{ maxWidth: 600, width: '100%', textAlign: 'center' }}>

        {/* Logo */}
        <div style={{
          fontFamily: "'TWK Lausanne', sans-serif",
          fontSize: 20,
          fontWeight: 800,
          marginBottom: 40,
          letterSpacing: '-0.02em',
          color: '#111',
        }}>
          Get Clicked<span style={{ color: '#FF4F6D' }}>.</span>
        </div>

        {/* Avatar + Welcome */}
        {avatar && (
          <img
            src={avatar}
            alt=""
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              marginBottom: 16,
              border: '3px solid white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
          />
        )}

        <h1 style={{
          fontFamily: "'TWK Lausanne', sans-serif",
          fontSize: 36,
          fontWeight: 800,
          color: '#111',
          letterSpacing: '-0.03em',
          marginBottom: 8,
        }}>
          Welcome, {firstName}.
        </h1>

        <p style={{
          fontSize: 16,
          color: '#888',
          marginBottom: 48,
          lineHeight: 1.6,
        }}>
          Let's get you set up. How do you want to use Get Clicked?
        </p>

        {/* Two path cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.3fr 1fr',
          gap: 16,
          textAlign: 'left',
        }}>

          {/* Cowork — primary */}
          <Link href="/welcome/cowork" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              background: 'white',
              borderRadius: 20,
              padding: 32,
              border: '2px solid rgba(255,79,109,0.15)',
              cursor: 'pointer',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}
            onMouseOver={undefined}
            >
              <span style={{
                fontSize: 11,
                fontWeight: 600,
                background: 'rgba(255,79,109,0.08)',
                color: '#FF4F6D',
                padding: '3px 10px',
                borderRadius: 999,
              }}>
                Recommended
              </span>

              <h2 style={{
                fontFamily: "'TWK Lausanne', sans-serif",
                fontSize: 22,
                fontWeight: 700,
                marginTop: 16,
                marginBottom: 8,
                color: '#111',
              }}>
                I'm a marketer
              </h2>

              <p style={{
                fontSize: 14,
                color: '#888',
                lineHeight: 1.6,
                marginBottom: 20,
              }}>
                Use Get Clicked in Claude Desktop. No terminal, no code. Just a conversation.
              </p>

              <span style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#FF4F6D',
              }}>
                Set up Cowork →
              </span>
            </div>
          </Link>

          {/* Claude Code — secondary */}
          <Link href="/welcome/code" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              background: 'white',
              borderRadius: 20,
              padding: 32,
              border: '1px solid #E8E8E8',
              cursor: 'pointer',
            }}>
              <span style={{
                fontSize: 11,
                fontWeight: 600,
                background: 'rgba(123,47,255,0.08)',
                color: '#7B2FFF',
                padding: '3px 10px',
                borderRadius: 999,
              }}>
                For developers
              </span>

              <h2 style={{
                fontFamily: "'TWK Lausanne', sans-serif",
                fontSize: 22,
                fontWeight: 700,
                marginTop: 16,
                marginBottom: 8,
                color: '#111',
              }}>
                I'm a developer
              </h2>

              <p style={{
                fontSize: 14,
                color: '#888',
                lineHeight: 1.6,
                marginBottom: 20,
              }}>
                Install via Claude Code CLI. Local files, full control.
              </p>

              <span style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#7B2FFF',
              }}>
                Set up Code →
              </span>
            </div>
          </Link>

        </div>
      </div>
    </div>
  )
}
