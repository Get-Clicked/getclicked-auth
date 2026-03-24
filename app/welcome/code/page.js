import { createSupabaseServer } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { TopBar, ProgressBar, CopyBlock } from '../components'

export const dynamic = 'force-dynamic'

export default async function CodeSetup() {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirect=/welcome/code')
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
          Set up Claude Code<span style={{ color: '#7B2FFF' }}>.</span>
        </h1>
        <p style={{ fontSize: 16, color: '#888', marginBottom: 40 }}>
          Three commands. About 1 minute.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

          {/* Step 1 */}
          <Step num={1} title="Add the marketplace" last={false}>
            <CopyBlock code="claude plugin marketplace add Get-Clicked/getclicked-growth" />
          </Step>

          {/* Step 2 */}
          <Step num={2} title="Install the plugin" last={false}>
            <CopyBlock code="claude plugin install getclicked-growth" />
          </Step>

          {/* Step 3 */}
          <Step num={3} title="Start Claude and talk" last={true}>
            <CopyBlock code="claude" />
            <p style={{ fontSize: 14, color: '#888', lineHeight: 1.6, marginTop: 10 }}>
              Tell it about your business. Everything outputs as local files.
            </p>
          </Step>

        </div>

        {/* Optional BYOK */}
        <div style={{
          background: '#FAFAFA', borderRadius: 14, padding: 20, marginTop: 32,
        }}>
          <p style={{ fontSize: 13, color: '#888', lineHeight: 1.6 }}>
            <strong style={{ color: '#111' }}>Optional:</strong> The plugin uses our hosted research server by default. You can also bring your own data provider keys for direct access.
          </p>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: 48, padding: '24px 0', borderTop: '1px solid #F0F0F0' }}>
          <a href="https://github.com/Get-Clicked/getclicked-growth" target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', fontSize: 14, fontWeight: 600, color: '#111',
              textDecoration: 'none', border: '1px solid #E8E8E8',
              padding: '10px 24px', borderRadius: 999, marginBottom: 16,
            }}>
            View on GitHub
          </a>
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
