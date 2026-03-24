import { createSupabaseServer } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { TopBar, ProgressBar, CopyBlock } from '../components'

export const dynamic = 'force-dynamic'

export default async function CoworkSetup() {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirect=/welcome/cowork')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      <TopBar email={user.email} avatar={user.user_metadata?.avatar_url} />
      <ProgressBar step={2} />

      <div style={{ maxWidth: 560, margin: '0 auto', padding: '48px 24px 80px' }}>
        <a href="/welcome" style={{ fontSize: 13, color: '#888', textDecoration: 'none' }}>← Back</a>

        <h1 style={{
          fontFamily: "'TWK Lausanne', sans-serif",
          fontSize: 40, fontWeight: 800, color: '#111',
          letterSpacing: '-0.03em', marginTop: 16, marginBottom: 6,
        }}>
          Set up Cowork<span style={{ color: '#FF4F6D' }}>.</span>
        </h1>
        <p style={{ fontSize: 16, color: '#888', marginBottom: 40 }}>
          Five steps. About 2 minutes.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

          {/* Step 1 */}
          <Step num={1} title="Download Claude Desktop" last={false}>
            <p style={{ fontSize: 14, color: '#888', lineHeight: 1.6 }}>
              If you don't have it yet, grab the app.
            </p>
            <a href="https://claude.com/download" target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', marginTop: 10,
                fontSize: 13, fontWeight: 600, color: 'white',
                background: '#111', padding: '8px 20px', borderRadius: 999,
                textDecoration: 'none',
              }}>
              Download Claude ↗
            </a>
          </Step>

          {/* Step 2 */}
          <Step num={2} title="Switch to Cowork" last={false}>
            <p style={{ fontSize: 14, color: '#888', lineHeight: 1.6 }}>
              Open Claude Desktop and click the <strong style={{ color: '#111' }}>Cowork</strong> tab at the top.
            </p>
          </Step>

          {/* Step 3 */}
          <Step num={3} title="Add the Get Clicked marketplace" last={false}>
            <p style={{ fontSize: 14, color: '#888', lineHeight: 1.6, marginBottom: 4 }}>
              Click <strong style={{ color: '#111' }}>Customize</strong> → <strong style={{ color: '#111' }}>Browse plugins</strong> → <strong style={{ color: '#111' }}>Add marketplace</strong> and paste:
            </p>
            <CopyBlock code="Get-Clicked/getclicked-growth" dark={false} />
          </Step>

          {/* Step 4 */}
          <Step num={4} title="Install the plugin" last={false}>
            <p style={{ fontSize: 14, color: '#888', lineHeight: 1.6 }}>
              Find <strong style={{ color: '#111' }}>getclicked-growth</strong> in the list and click <strong style={{ color: '#111' }}>Install</strong>.
            </p>
          </Step>

          {/* Step 5 */}
          <Step num={5} title="Start talking" last={true}>
            <p style={{ fontSize: 14, color: '#888', lineHeight: 1.6 }}>
              Open a new conversation. Tell it about your business. Something like:
            </p>
            <div style={{
              background: '#F5F3EE', borderRadius: 10, padding: '12px 16px',
              fontSize: 14, color: '#666', marginTop: 8, fontStyle: 'italic',
            }}>
              "I run a B2B analytics company targeting startups. Help me figure out my marketing."
            </div>
          </Step>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: 48, padding: '24px 0', borderTop: '1px solid #F0F0F0' }}>
          <p style={{ fontSize: 15, color: '#111', fontWeight: 500, marginBottom: 4 }}>
            Your first deliverable is 10 minutes away.
          </p>
          <p style={{ fontSize: 12, color: '#CCC', marginTop: 12 }}>
            Stuck? <a href="mailto:hello@getclicked.ai" style={{ color: '#999', textDecoration: 'underline' }}>hello@getclicked.ai</a>
          </p>
        </div>
      </div>
    </div>
  )
}

function Step({ num, title, children, last }) {
  return (
    <div style={{ display: 'flex', gap: 20 }}>
      {/* Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 12,
          background: '#111', color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'TWK Lausanne', sans-serif",
          fontSize: 14, fontWeight: 700,
        }}>
          {num}
        </div>
        {!last && <div style={{ width: 2, flex: 1, background: '#F0F0F0', minHeight: 24 }} />}
      </div>

      {/* Content */}
      <div style={{ flex: 1, paddingBottom: last ? 0 : 28 }}>
        <h3 style={{
          fontFamily: "'TWK Lausanne', sans-serif",
          fontSize: 17, fontWeight: 700, color: '#111',
          marginBottom: 6, marginTop: 6,
        }}>
          {title}
        </h3>
        {children}
      </div>
    </div>
  )
}
