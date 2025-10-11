import React, { useEffect, useMemo } from 'react'
import { useNotice } from 'adminjs'

const ActionDone = (props) => {
  const { action, notice, redirectUrl } = props || {}
  const addNotice = useNotice()

  const msg = useMemo(() => {
    if (notice?.message) return notice.message
    const actionName = action?.name
    switch (actionName) {
      case 'recover': return 'Successfully recovered given record'
      case 'hardDelete': return 'Successfully deleted given record'
      case 'softDelete': return 'Successfully soft-deleted given record'
      default: return 'Action completed successfully'
    }
  }, [notice, action])

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
    try {
      // Tambahkan notifikasi segera
      addNotice({ message: msg, type: (notice?.type || 'success') })
      // Jadwalkan ulang notifikasi agar terlihat lebih lama (tanpa mengganggu kecepatan redirect)
      setTimeout(() => {
        try { addNotice({ message: msg, type: (notice?.type || 'success') }) } catch {}
      }, 1600)
      setTimeout(() => {
        try { addNotice({ message: msg, type: (notice?.type || 'success') }) } catch {}
      }, 3200)
    } catch {}
    const target = redirectUrl || listUrl
    try { window.location.assign(target) } catch {}
  }, [addNotice, msg, notice, redirectUrl, listUrl])

  return null
}

export default ActionDone