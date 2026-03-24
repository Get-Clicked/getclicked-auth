import Link from 'next/link'

export default function CodeSetup() {
  const steps = [
    {
      num: '1',
      title: 'Add the marketplace',
      code: 'claude plugin marketplace add Get-Clicked/getclicked-growth',
    },
    {
      num: '2',
      title: 'Install the plugin',
      code: 'claude plugin install getclicked-growth',
    },
    {
      num: '3',
      title: 'Start Claude and talk',
      code: 'claude',
      desc: 'Tell it about your business. Everything outputs as local files.',
    },
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: '#FAFAFA',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '48px 24px',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      <div style={{ maxWidth: 520, width: '100%' }}>

        {/* Logo */}
        <div style={{
          fontFamily: "'TWK Lausanne', sans-serif",
          fontSize: 20,
          fontWeight: 800,
          marginBottom: 48,
          letterSpacing: '-0.02em',
          color: '#111',
          textAlign: 'center',
        }}>
          Get Clicked<span style={{ color: '#FF4F6D' }}>.</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <Link href="/welcome" style={{ fontSize: 13, color: '#888', textDecoration: 'none' }}>← Back</Link>
          <h1 style={{
            fontFamily: "'TWK Lausanne', sans-serif",
            fontSize: 32,
            fontWeight: 800,
            color: '#111',
            letterSpacing: '-0.02em',
            marginTop: 16,
            marginBottom: 8,
          }}>
            Set up Claude Code
          </h1>
          <p style={{ fontSize: 15, color: '#888', lineHeight: 1.6 }}>
            Three commands. Takes about 1 minute.
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {steps.map((step) => (
            <div key={step.num} style={{
              background: 'white',
              borderRadius: 16,
              padding: 24,
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  background: 'rgba(123,47,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontFamily: "'TWK Lausanne', sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  color: '#7B2FFF',
                }}>
                  {step.num}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontFamily: "'TWK Lausanne', sans-serif",
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#111',
                    marginBottom: 8,
                  }}>
                    {step.title}
                  </h3>
                  <div style={{
                    background: '#111',
                    borderRadius: 8,
                    padding: '10px 14px',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.7)',
                    overflowX: 'auto',
                  }}>
                    $ {step.code}
                  </div>
                  {step.desc && (
                    <p style={{ fontSize: 13, color: '#888', lineHeight: 1.6, marginTop: 8 }}>
                      {step.desc}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Optional: BYOK */}
        <div style={{
          background: 'white',
          borderRadius: 16,
          padding: 20,
          marginTop: 16,
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}>
          <p style={{ fontSize: 13, color: '#888', lineHeight: 1.6 }}>
            <strong style={{ color: '#111' }}>Optional:</strong> The plugin uses our hosted research server by default. You can also add your own research provider keys for direct access.
          </p>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <a
            href="https://github.com/Get-Clicked/getclicked-growth"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              fontSize: 14,
              fontWeight: 600,
              color: '#111',
              textDecoration: 'none',
              border: '1px solid #E8E8E8',
              padding: '10px 24px',
              borderRadius: 999,
              marginBottom: 16,
            }}
          >
            View on GitHub
          </a>
          <p style={{ fontSize: 13, color: '#ccc' }}>
            <a href="https://getclicked.ai" style={{ color: '#ccc', textDecoration: 'none' }}>Back to getclicked.ai</a>
          </p>
        </div>
      </div>
    </div>
  )
}
