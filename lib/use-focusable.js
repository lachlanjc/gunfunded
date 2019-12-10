import { useState, useEffect } from 'react'

export default (input, label) => {
  const focusInput = e => {
    if (e.key === '/' && input) input.current.focus()
  }
  useEffect(() => {
    document.addEventListener('keyup', focusInput)
    return () => {
      document.removeEventListener('keyup', focusInput)
    }
  }, [])

  const [placeholder, setPlaceholder] = useState(label)
  useEffect(() => {
    const ua = navigator.userAgent
    if (!ua.includes('iPhone') && !ua.includes('Android')) {
      setPlaceholder([label, '(press “/” to focus)'].filter(Boolean).join(' '))
    }
  }, [])

  return placeholder
}
