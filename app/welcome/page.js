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
  const email = user.email

  return (
    <div style={{
      minHeight: '100vh',
      background: '#FAFAFA',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>

      {/* Top bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 32px',
        borderBottom: '1px solid #F0F0F0',
        background: 'white',
      }}>
        <div style={{
          fontFamily: "'TWK Lausanne', sans-serif",
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: '-0.02em',
          color: '#111',
        }}>
          Get Clicked<span style={{ color: '#FF4F6D' }}>.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 12, color: '#999' }}>{email}</span>
          {avatar && (
            <img src={avatar} alt="" style={{
              width: 28, height: 28, borderRadius: '50%',
              border: '2px solid #F0F0F0',
            }} />
          )}
        </div>
      </div>

      {/* Progress */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '24px 32px 0',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: '#111', color: 'white',
            padding: '4px 14px', borderRadius: 999, fontSize: 12, fontWeight: 600,
          }}>
            <span>1</span> Choose path
          </div>
          <div style={{ width: 24, height: 1, background: '#DDD' }}></div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            color: '#CCC', padding: '4px 14px', borderRadius: 999, fontSize: 12, fontWeight: 500,
            border: '1px solid #E8E8E8',
          }}>
            <span>2</span> Install
          </div>
          <div style={{ width: 24, height: 1, background: '#DDD' }}></div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            color: '#CCC', padding: '4px 14px', borderRadius: 999, fontSize: 12, fontWeight: 500,
            border: '1px solid #E8E8E8',
          }}>
            <span>3</span> Start
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{
        maxWidth: 640,
        margin: '0 auto',
        padding: '60px 24px',
      }}>
        {/* Welcome */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          {avatar && (
            <img src={avatar} alt="" style={{
              width: 72, height: 72, borderRadius: '50%',
              marginBottom: 16,
              border: '3px solid white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            }} />
          )}
          <h1 style={{
            fontFamily: "'TWK Lausanne', sans-serif",
            fontSize: 40,
            fontWeight: 800,
            color: '#111',
            letterSpacing: '-0.03em',
            marginBottom: 8,
          }}>
            Welcome, {firstName}.
          </h1>
          <p style={{ fontSize: 16, color: '#888', lineHeight: 1.6 }}>
            How do you want to use Get Clicked?
          </p>
        </div>

        {/* Path cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 16,
          marginBottom: 48,
        }}>
          {/* Cowork */}
          <Link href="/welcome/cowork" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              background: 'white',
              borderRadius: 20,
              padding: '28px 28px 24px',
              border: '2px solid rgba(255,79,109,0.12)',
              cursor: 'pointer',
              height: '100%',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}>
              {/* Mini Claude UI preview */}
              <div style={{
                background: '#F5F3EE',
                borderRadius: 10,
                padding: 12,
                marginBottom: 20,
                height: 80,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: '#D4A574', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, color: 'white',
                  }}>✦</div>
                  <div style={{
                    background: '#E8E6E1', borderRadius: 8, padding: '4px 10px',
                    fontSize: 10, color: '#666',
                  }}>Tell me about your business...</div>
                </div>
              </div>

              <span style={{
                fontSize: 10, fontWeight: 600,
                background: 'rgba(255,79,109,0.08)', color: '#FF4F6D',
                padding: '3px 10px', borderRadius: 999,
              }}>Recommended</span>

              <h2 style={{
                fontFamily: "'TWK Lausanne', sans-serif",
                fontSize: 20, fontWeight: 700,
                marginTop: 12, marginBottom: 6, color: '#111',
              }}>I'm a marketer</h2>

              <p style={{ fontSize: 13, color: '#888', lineHeight: 1.5, marginBottom: 16 }}>
                Use Get Clicked in Claude Desktop. No terminal, no code.
              </p>

              <span style={{ fontSize: 13, fontWeight: 600, color: '#FF4F6D' }}>
                Set up Cowork →
              </span>
            </div>
          </Link>

          {/* Code */}
          <Link href="/welcome/code" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              background: 'white',
              borderRadius: 20,
              padding: '28px 28px 24px',
              border: '1px solid #E8E8E8',
              cursor: 'pointer',
              height: '100%',
            }}>
              {/* Mini terminal preview */}
              <div style={{
                background: '#111',
                borderRadius: 10,
                padding: 12,
                marginBottom: 20,
                height: 80,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
                <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(255,255,255,0.5)' }}>
                  <p>$ claude plugin install getclicked-growth</p>
                  <p style={{ color: 'rgba(123,47,255,0.7)' }}>✓ Plugin installed</p>
                </div>
              </div>

              <span style={{
                fontSize: 10, fontWeight: 600,
                background: 'rgba(123,47,255,0.08)', color: '#7B2FFF',
                padding: '3px 10px', borderRadius: 999,
              }}>For developers</span>

              <h2 style={{
                fontFamily: "'TWK Lausanne', sans-serif",
                fontSize: 20, fontWeight: 700,
                marginTop: 12, marginBottom: 6, color: '#111',
              }}>I'm a developer</h2>

              <p style={{ fontSize: 13, color: '#888', lineHeight: 1.5, marginBottom: 16 }}>
                Install via CLI. Local files, full control.
              </p>

              <span style={{ fontSize: 13, fontWeight: 600, color: '#7B2FFF' }}>
                Set up Code →
              </span>
            </div>
          </Link>
        </div>

        {/* What you'll get */}
        <div style={{
          background: 'white',
          borderRadius: 16,
          padding: 24,
          border: '1px solid #F0F0F0',
        }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>
            What you'll get in your first session
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div>
              <p style={{ fontSize: 24, marginBottom: 4 }}>🔍</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#111', marginBottom: 2 }}>Competitive analysis</p>
              <p style={{ fontSize: 11, color: '#999' }}>Real keyword data and competitor gaps</p>
            </div>
            <div>
              <p style={{ fontSize: 24, marginBottom: 4 }}>📊</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#111', marginBottom: 2 }}>Campaign ready</p>
              <p style={{ fontSize: 11, color: '#999' }}>Ad groups, keywords, and copy you can publish</p>
            </div>
            <div>
              <p style={{ fontSize: 24, marginBottom: 4 }}>🎯</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#111', marginBottom: 2 }}>Brand positioning</p>
              <p style={{ fontSize: 11, color: '#999' }}>Strategy doc your team will actually use</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
