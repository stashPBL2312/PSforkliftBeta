import React, { useEffect, useMemo, useState } from 'react'

const ActionDone = (props) => {
  const actionName = props?.action?.name
  const msg = useMemo(() => {
    switch (actionName) {
      case 'recover': return 'Successfully recovered given record'
      case 'hardDelete': return 'Successfully deleted given record'
      case 'softDelete': return 'Successfully soft-deleted given record'
      default: return 'Action completed successfully'
    }
  }, [actionName])

  const [visible, setVisible] = useState(true)
  const listUrl = useMemo(() => {
    try {
      const p = window.location.pathname
      const m = p.match(/^(.*?\/admin\/resources\/[^/]+)/)
      return m ? m[1] : '/admin'
    } catch {
      return '/admin'
    }
  }, [])

  useEffect(() => {
    const hide = setTimeout(() => setVisible(false), 1800)
    const nav = setTimeout(() => {
      try { window.location.assign(listUrl) } catch {}
    }, 800)
    return () => { clearTimeout(hide); clearTimeout(nav) }
  }, [listUrl])

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', top: 16, right: 16, zIndex: 10000,
      background: '#d1fae5', color: '#065f46', border: '1px solid #10b981',
      boxShadow: '0 6px 20px rgba(0,0,0,0.15)', borderRadius: 6, padding: '10px 14px',
      fontSize: 14, maxWidth: 360,
    }}>
      {msg}
    </div>
  )
}

export default ActionDone