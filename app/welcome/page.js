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
    <div className="welcome-page">
      {/* Top bar */}
      <div className="topbar">
        <div className="logo">Get Clicked<span className="dot">.</span></div>
        <div className="user-info">
          <span className="user-email">{email}</span>
          {avatar && <img src={avatar} alt="" className="user-avatar" />}
        </div>
      </div>

      {/* Hero */}
      <div className="hero">
        {avatar && <img src={avatar} alt="" className="hero-avatar" />}
        <h1 className="hero-title">Welcome, {firstName}.</h1>
        <p className="hero-sub">Your account is ready. Let's get you set up.</p>
      </div>

      {/* Path cards */}
      <div className="cards-container">
        <div className="cards">
          {/* Cowork */}
          <Link href="/welcome/cowork" className="card card-primary">
            <div className="card-preview card-preview-cowork">
              <div className="cowork-mock">
                <div className="cowork-avatar">✦</div>
                <div className="cowork-bubble">Tell me about your business...</div>
              </div>
            </div>
            <div className="card-body">
              <span className="badge badge-coral">Recommended</span>
              <h2 className="card-title">I'm a marketer</h2>
              <p className="card-desc">Use Get Clicked in Claude Desktop. No terminal, no code. Just a conversation.</p>
              <span className="card-link card-link-coral">Set up Cowork →</span>
            </div>
          </Link>

          {/* Code */}
          <Link href="/welcome/code" className="card card-secondary">
            <div className="card-preview card-preview-code">
              <div className="code-mock">
                <span className="code-prompt">$</span> claude plugin install getclicked-growth
                <br />
                <span className="code-success">✓ Plugin installed</span>
              </div>
            </div>
            <div className="card-body">
              <span className="badge badge-violet">For developers</span>
              <h2 className="card-title">I'm a developer</h2>
              <p className="card-desc">Install via CLI. Local files, full control.</p>
              <span className="card-link card-link-violet">Set up Code →</span>
            </div>
          </Link>
        </div>

        {/* Value props */}
        <div className="value-bar">
          <div className="value-item">
            <span className="value-icon">🔍</span>
            <div>
              <p className="value-title">Competitive analysis</p>
              <p className="value-desc">Real keyword data and competitor gaps</p>
            </div>
          </div>
          <div className="value-item">
            <span className="value-icon">📊</span>
            <div>
              <p className="value-title">Campaign ready</p>
              <p className="value-desc">Ad groups, keywords, copy you can publish</p>
            </div>
          </div>
          <div className="value-item">
            <span className="value-icon">🎯</span>
            <div>
              <p className="value-title">Brand positioning</p>
              <p className="value-desc">Strategy doc your team will actually use</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .welcome-page {
          min-height: 100vh;
          background: white;
        }

        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 32px;
          border-bottom: 1px solid #F0F0F0;
        }
        .logo {
          font-family: 'TWK Lausanne', sans-serif;
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #111;
        }
        .dot { color: #FF4F6D; }
        .user-info { display: flex; align-items: center; gap: 10px; }
        .user-email { font-size: 12px; color: #999; }
        .user-avatar { width: 28px; height: 28px; border-radius: 50%; border: 2px solid #F0F0F0; }

        .hero {
          text-align: center;
          padding: 64px 24px 48px;
          background: linear-gradient(180deg, #FAFAFA, white);
        }
        .hero-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          margin-bottom: 20px;
          border: 4px solid white;
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
        }
        .hero-title {
          font-family: 'TWK Lausanne', sans-serif;
          font-size: 48px;
          font-weight: 800;
          color: #111;
          letter-spacing: -0.035em;
          margin-bottom: 8px;
        }
        .hero-sub {
          font-size: 18px;
          color: #888;
        }

        .cards-container {
          max-width: 720px;
          margin: 0 auto;
          padding: 0 24px 80px;
        }

        .cards {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }

        .card {
          border-radius: 20px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          display: flex;
          flex-direction: column;
        }
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.08);
        }
        .card-primary { border: 2px solid rgba(255,79,109,0.15); }
        .card-secondary { border: 1px solid #E8E8E8; }

        .card-preview {
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .card-preview-cowork { background: #F5F3EE; }
        .card-preview-code { background: #111; }

        .cowork-mock {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cowork-avatar {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: #D4A574;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; color: white;
        }
        .cowork-bubble {
          background: #E8E6E1;
          border-radius: 12px;
          padding: 8px 14px;
          font-size: 12px;
          color: #666;
        }

        .code-mock {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.5);
          line-height: 1.8;
        }
        .code-prompt { color: rgba(255,255,255,0.3); }
        .code-success { color: rgba(123,47,255,0.7); }

        .card-body { padding: 24px; }

        .badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 999px;
          margin-bottom: 12px;
        }
        .badge-coral { background: rgba(255,79,109,0.08); color: #FF4F6D; }
        .badge-violet { background: rgba(123,47,255,0.08); color: #7B2FFF; }

        .card-title {
          font-family: 'TWK Lausanne', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: #111;
          margin-bottom: 6px;
        }
        .card-desc {
          font-size: 14px;
          color: #888;
          line-height: 1.5;
          margin-bottom: 16px;
        }
        .card-link { font-size: 14px; font-weight: 600; }
        .card-link-coral { color: #FF4F6D; }
        .card-link-violet { color: #7B2FFF; }

        .value-bar {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
          background: #FAFAFA;
          border-radius: 16px;
          padding: 20px;
        }
        .value-item { display: flex; gap: 10px; align-items: flex-start; }
        .value-icon { font-size: 20px; flex-shrink: 0; margin-top: 2px; }
        .value-title { font-size: 13px; font-weight: 600; color: #111; margin-bottom: 2px; }
        .value-desc { font-size: 11px; color: #999; line-height: 1.4; }
      `}</style>
    </div>
  )
}
