import { createSupabaseServer } from '@/lib/supabase-server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

// BEE-344 Phase 6b — invite landing page.
// Flow:
//   1. User clicks magic link /invite/{member_id} (from invite_member MCP tool)
//   2. If not signed in, redirect to /login?redirect=/invite/{member_id}
//   3. After Google SSO returns, this page validates:
//        - member_id is a real pending workspace_members row
//        - signed-in email matches workspace_members.email exactly
//        - invited_at within 7d TTL
//   4. On pass: UPDATE workspace_members SET accepted_at = now()
//   5. Render success with workspace name + CTA to open Cowork

const INVITE_TTL_DAYS = 7

async function acceptInvite({ memberId, callerEmail }) {
  const admin = getSupabaseAdmin()

  const { data: member, error: memberErr } = await admin
    .from('workspace_members')
    .select('id, workspace_id, email, role, invited_at, accepted_at')
    .eq('id', memberId)
    .maybeSingle()

  if (memberErr) return { ok: false, reason: 'server_error', detail: memberErr.message }
  if (!member) return { ok: false, reason: 'not_found' }
  if (member.email.toLowerCase() !== callerEmail.toLowerCase()) {
    return { ok: false, reason: 'email_mismatch', expected: member.email }
  }

  const invitedAt = new Date(member.invited_at)
  const ttlMs = INVITE_TTL_DAYS * 24 * 60 * 60 * 1000
  if (Date.now() - invitedAt.getTime() > ttlMs) {
    return { ok: false, reason: 'expired' }
  }

  // Look up workspace name for the success screen
  const { data: ws } = await admin
    .from('client_workspaces')
    .select('client_slug, client_name')
    .eq('id', member.workspace_id)
    .maybeSingle()

  if (!member.accepted_at) {
    const { error: updErr } = await admin
      .from('workspace_members')
      .update({ accepted_at: new Date().toISOString() })
      .eq('id', memberId)
    if (updErr) return { ok: false, reason: 'server_error', detail: updErr.message }
  }

  return {
    ok: true,
    workspaceId: member.workspace_id,
    clientSlug: ws?.client_slug,
    clientName: ws?.client_name,
    role: member.role,
    wasAlreadyAccepted: !!member.accepted_at,
  }
}

export default async function InviteAcceptPage({ params }) {
  const { member_id } = await params
  const supabase = await createSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/login?redirect=/invite/${member_id}`)
  }

  const result = await acceptInvite({ memberId: member_id, callerEmail: user.email })

  return (
    <div style={{ maxWidth: 560, margin: '80px auto', padding: '0 24px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
        Get Clicked<span style={{ color: '#FF4F6D' }}>.</span>
      </div>

      {result.ok ? (
        <>
          <h1 style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.2, margin: '24px 0 12px' }}>
            Welcome to {result.clientName || 'the team'}.
          </h1>
          <p style={{ fontSize: 18, color: '#555', lineHeight: 1.5 }}>
            {result.wasAlreadyAccepted
              ? 'You were already a member of this workspace.'
              : `You're in as an ${result.role} on ${result.clientName || result.clientSlug}. Everything the team has built together is ready for you.`}
          </p>
          <div style={{ marginTop: 32, padding: 20, background: '#F5F5F5', borderRadius: 8 }}>
            <h3 style={{ marginTop: 0, fontSize: 14, fontWeight: 600, textTransform: 'uppercase', color: '#888' }}>Next steps</h3>
            <ol style={{ paddingLeft: 20, lineHeight: 1.8 }}>
              <li>
                Open{' '}
                <a href="https://claude.ai" style={{ color: '#FF4F6D' }}>
                  Claude
                </a>{' '}
                (Cowork or Claude Code) and install the{' '}
                <a href="https://github.com/Get-Clicked/getclicked-growth" style={{ color: '#FF4F6D' }}>
                  getclicked-growth plugin
                </a>
                .
              </li>
              <li>On first session, authenticate with the same Google account: <strong>{user.email}</strong></li>
              <li>
                Ask the agent about {result.clientName || result.clientSlug} — your team's memory + runs will be there
                waiting.
              </li>
            </ol>
          </div>
        </>
      ) : (
        <>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#C94B4B', margin: '24px 0 12px' }}>
            {reasonTitle(result.reason)}
          </h1>
          <p style={{ fontSize: 18, color: '#555', lineHeight: 1.5 }}>{reasonDetail(result, user)}</p>
          <p style={{ marginTop: 24, color: '#888' }}>
            <Link href="/welcome" style={{ color: '#FF4F6D' }}>
              Go to Welcome
            </Link>
            {' · '}
            <Link href="/login" style={{ color: '#FF4F6D' }}>
              Sign in with a different account
            </Link>
          </p>
        </>
      )}
    </div>
  )
}

function reasonTitle(reason) {
  switch (reason) {
    case 'not_found':
      return 'Invite not found'
    case 'email_mismatch':
      return 'Wrong account'
    case 'expired':
      return 'This invite expired'
    default:
      return 'Something went wrong'
  }
}

function reasonDetail(result, user) {
  switch (result.reason) {
    case 'not_found':
      return "This invite link doesn't match any active invitation. Ask whoever sent it to invite you again."
    case 'email_mismatch':
      return `This invite was sent to ${result.expected}. You're signed in as ${user.email}. Sign out and sign in with the right account, or ask for a fresh invite.`
    case 'expired':
      return "Invites expire after 7 days. Ask your teammate to send a new one with invite_member."
    default:
      return result.detail || 'Please try again, or contact your teammate for a fresh invite.'
  }
}
