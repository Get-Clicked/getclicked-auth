import Link from 'next/link'

export default function CoworkSetup() {
  const steps = [
    {
      num: '1',
      title: 'Download Claude Desktop',
      desc: 'If you don\'t have it yet, download the Claude app.',
      link: { text: 'Download Claude', href: 'https://claude.com/download' },
    },
    {
      num: '2',
      title: 'Switch to Cowork',
      desc: 'Open Claude Desktop. Click the "Cowork" tab at the top of the app.',
    },
    {
      num: '3',
      title: 'Install Get Clicked',
      desc: 'Click "Customize" in the sidebar, then "Browse plugins." Search for "Get Clicked" and click Install.',
    },
    {
      num: '4',
      title: 'Start talking',
      desc: 'Open a new conversation and tell it about your business. Something like: "I run a SaaS company that does X, help me figure out my marketing."',
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
            Set up Cowork
          </h1>
          <p style={{ fontSize: 15, color: '#888', lineHeight: 1.6 }}>
            Four steps. Takes about 2 minutes.
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
                  background: 'rgba(255,79,109,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontFamily: "'TWK Lausanne', sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  color: '#FF4F6D',
                }}>
                  {step.num}
                </div>
                <div>
                  <h3 style={{
                    fontFamily: "'TWK Lausanne', sans-serif",
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#111',
                    marginBottom: 4,
                  }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: 14, color: '#888', lineHeight: 1.6 }}>
                    {step.desc}
                  </p>
                  {step.link && (
                    <a
                      href={step.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-block',
                        marginTop: 8,
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#FF4F6D',
                        textDecoration: 'none',
                      }}
                    >
                      {step.link.text} ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <p style={{ fontSize: 14, color: '#888', marginBottom: 16 }}>
            Your first deliverable is about 10 minutes away.
          </p>
          <a
            href="https://getclicked.ai"
            style={{
              fontSize: 13,
              color: '#ccc',
              textDecoration: 'none',
            }}
          >
            Back to getclicked.ai
          </a>
        </div>
      </div>
    </div>
  )
}
