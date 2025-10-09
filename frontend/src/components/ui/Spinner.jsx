import React from 'react'

export default function Spinner({ size = 32 }) {
  const s = typeof size === 'number' ? `${size}px` : size
  return (
    <div style={{ width: s, height: s, display: 'inline-block', verticalAlign: 'middle' }}>
      <svg viewBox="0 0 50 50" style={{ width: '100%', height: '100%' }}>
        <circle cx="25" cy="25" r="20" fill="none" stroke="#d1d5db" strokeWidth="4" />
        <path d="M45 25a20 20 0 0 1-20 20" stroke="#111827" strokeWidth="4" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  )
}
