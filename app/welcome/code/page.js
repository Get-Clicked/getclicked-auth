import { createSupabaseServer } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function CodeSetup() {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirect=/welcome/code')
  }

  const email = user.email
  const avatar = user.user_metadata?.avatar_url

  const steps = [
    {
      title: 'Add the marketplace',
      code: 'claude plugin marketplace add Get-Clicked/getclicked-growth',
    },
    {
      title: 'Install the plugin',
      code: 'claude plugin install getclicked-growth',
    },
    {
      title: 'Start Claude and talk',
      code: 'claude',
      desc: 'Tell it about your business. Everything outputs as local files.',
    },
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: '#FAFAFA',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>

      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 32px', borderBottom: '1px solid #F0F0F0', background: 'white',
      }}>
        <Link href="/welcome" style={{ textDecoration: 'none' }}>
          <div style={{
            fontFamily: "'TWK Lausanne', sans-serif", fontSize: 18, fontWeight: 800,
            letterSpacing: '-0.02em', color: '#111',
          }}>
            Get Clicked<span style={{ color: '#FF4F6D' }}>.</span>
          </div>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 12, color: '#999' }}>{email}</span>
          {avatar && <img src={avatar} alt="" style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid #F0F0F0' }} />}
        </div>
      </div>

      {/* Progress */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 32px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            color: '#22C55E', padding: '4px 14px', borderRadius: 999, fontSize: 12, fontWeight: 600,
            border: '1px solid rgba(34,197,94,0.2)', background: 'rgba(34,197,94,0.05)',
          }}>✓ Choose path</div>
          <div style={{ width: 24, height: 1, background: '#DDD' }}></div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: '#111', color: 'white',
            padding: '4px 14px', borderRadius: 999, fontSize: 12, fontWeight: 600,
          }}>2 Install</div>
          <div style={{ width: 24, height: 1, background: '#DDD' }}></div>
          <div style={{
            color: '#CCC', padding: '4px 14px', borderRadius: 999, fontSize: 12, fontWeight: 500,
            border: '1px solid #E8E8E8',
          }}>3 Start</div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 520, margin: '0 auto', padding: '48px 24px' }}>
        <Link href="/welcome" style={{ fontSize: 13, color: '#888', textDecoration: 'none' }}>← Back</Link>

        <h1 style={{
          fontFamily: "'TWK Lausanne', sans-serif",
          fontSize: 32, fontWeight: 800, color: '#111',
          letterSpacing: '-0.02em', marginTop: 16, marginBottom: 6,
        }}>
          Set up Claude Code
        </h1>
        <p style={{ fontSize: 14, color: '#888', marginBottom: 32, lineHeight: 1.6 }}>
          Three commands. About 1 minute.
        </p>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {steps.map((step, i) => (
            <div key={i} style={{
              background: 'white', borderRadius: 14, padding: 20,
              border: '1px solid #F0F0F0',
              display: 'flex', gap: 14, alignItems: 'flex-start',
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                border: '2px solid #E8E8E8', display: 'flex',
                alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                fontSize: 12, fontWeight: 700, color: '#CCC',
              }}>
                {i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontFamily: "'TWK Lausanne', sans-serif",
                  fontSize: 15, fontWeight: 700, color: '#111', marginBottom: 8,
                }}>{step.title}</h3>
                <div style={{
                  background: '#111', borderRadius: 8,
                  padding: '10px 14px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12, color: 'rgba(255,255,255,0.7)',
                  userSelect: 'all', cursor: 'text',
                }}>
                  $ {step.code}
                </div>
                {step.desc && (
                  <p style={{ fontSize: 13, color: '#888', lineHeight: 1.5, marginTop: 8 }}>{step.desc}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* BYOK note */}
        <div style={{
          background: 'white', borderRadius: 14, padding: 16, marginTop: 12,
          border: '1px solid #F0F0F0',
        }}>
          <p style={{ fontSize: 13, color: '#888', lineHeight: 1.6 }}>
            <strong style={{ color: '#111' }}>Optional:</strong> The plugin uses our hosted research server by default. You can also add your own research provider keys for direct access.
          </p>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: 40, padding: '24px 0', borderTop: '1px solid #F0F0F0' }}>
          <a href="https://github.com/Get-Clicked/getclicked-growth" target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-block', fontSize: 14, fontWeight: 600, color: '#111',
              textDecoration: 'none', border: '1px solid #E8E8E8',
              padding: '10px 24px', borderRadius: 999, marginBottom: 16,
            }}>
            View on GitHub
          </a>
          <p style={{ fontSize: 12, color: '#CCC' }}>
            Having trouble? <a href="mailto:hello@getclicked.ai" style={{ color: '#999', textDecoration: 'underline' }}>hello@getclicked.ai</a>
          </p>
        </div>
      </div>
    </div>
  )
}
