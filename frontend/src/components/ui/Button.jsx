// src/components/ui/button.jsx
export function Button({ children, ...props }) {
  return (
    <button {...props} style={{ padding: '0.5rem 1rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}>
      {children}
    </button>
  )
}
