'use client'

import { createBrowserClient } from '@supabase/ssr'
import { useState } from 'react'

export default function ApproveButton({ authorizationId }) {
  const [status, setStatus] = useState(null)
  const [error, setError] = useState(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  async function handleApprove() {
    setStatus('Approving...')
    try {
      const { data, error } = await supabase.auth.oauth.approveAuthorization(authorizationId)
      if (error) {
        setError(error.message || error.code)
        setStatus(null)
        return
      }
      if (data && data.redirect_to) {
        window.location.href = data.redirect_to
      } else {
        setStatus('Connected! You can close this window.')
      }
    } catch (err) {
      setError(err.message)
      setStatus(null)
    }
  }

  async function handleDeny() {
    try {
      await supabase.auth.oauth.denyAuthorization(authorizationId)
    } catch (e) {
      // ignore
    }
    setStatus('Access denied. You can close this window.')
  }

  if (error) {
    return <p style={{ color: '#d33', fontSize: 14 }}>Error: {error}</p>
  }

  if (status) {
    return <p style={{ color: '#666', fontSize: 14 }}>{status}</p>
  }

  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <button
        onClick={handleDeny}
        style={{
          flex: 1, padding: 12, borderRadius: 8, fontSize: 15,
          fontWeight: 500, cursor: 'pointer', border: 'none',
          background: '#f0f0f0', color: '#666',
        }}
      >
        Deny
      </button>
      <button
        onClick={handleApprove}
        style={{
          flex: 1, padding: 12, borderRadius: 8, fontSize: 15,
          fontWeight: 500, cursor: 'pointer', border: 'none',
          background: '#2d5a87', color: 'white',
        }}
      >
        Approve
      </button>
    </div>
  )
}
