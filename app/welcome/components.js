'use client'

import { useState } from 'react'

export function CopyBlock({ code, dark = true }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{
      position: 'relative',
      background: dark ? '#111' : '#F5F3F0',
      borderRadius: 10,
      padding: '12px 16px',
      paddingRight: 60,
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12,
      color: dark ? 'rgba(255,255,255,0.8)' : '#333',
      marginTop: 8,
      lineHeight: 1.6,
    }}>
      {dark && <span style={{ color: 'rgba(255,255,255,0.3)', marginRight: 6 }}>$</span>}
      {code}
      <button
        onClick={handleCopy}
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
          border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.06)',
          borderRadius: 6,
          padding: '4px 10px',
          fontSize: 10,
          fontWeight: 600,
          color: dark ? 'rgba(255,255,255,0.5)' : '#888',
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
          transition: 'all 0.15s ease',
        }}
      >
        {copied ? '✓ Copied' : 'Copy'}
      </button>
    </div>
  )
}

export function TopBar({ email, avatar }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 32px',
      borderBottom: '1px solid #F0F0F0',
      background: 'white',
    }}>
      <a href="/welcome" style={{ textDecoration: 'none' }}>
        <div style={{
          fontFamily: "'TWK Lausanne', sans-serif",
          fontSize: 20, fontWeight: 800,
          letterSpacing: '-0.02em', color: '#111',
        }}>
          Get Clicked<span style={{ color: '#FF4F6D' }}>.</span>
        </div>
      </a>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 12, color: '#999' }}>{email}</span>
        {avatar && <img src={avatar} alt="" style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid #F0F0F0' }} />}
      </div>
    </div>
  )
}

export function ProgressBar({ step }) {
  const steps = ['Choose path', 'Install', 'Start']
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 32px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {steps.map((label, i) => {
          const num = i + 1
          const isComplete = num < step
          const isActive = num === step
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {i > 0 && <div style={{ width: 20, height: 1, background: '#DDD' }} />}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '4px 14px', borderRadius: 999, fontSize: 12, fontWeight: 600,
                ...(isComplete ? {
                  color: '#22C55E',
                  border: '1px solid rgba(34,197,94,0.2)',
                  background: 'rgba(34,197,94,0.05)',
                } : isActive ? {
                  background: '#111',
                  color: 'white',
                } : {
                  color: '#CCC',
                  border: '1px solid #E8E8E8',
                }),
              }}>
                {isComplete ? '✓' : num} {label}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
