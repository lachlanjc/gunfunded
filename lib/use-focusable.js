import { useState, useEffect } from 'react'

export default (input, label) => {
  const [placeholder, setPlaceholder] = useState(label)

  const focusInput = e => {
    if (e.key === '/') input.current.focus()
  }
  useEffect(() => {
    const ua = navigator.userAgent
    if (!ua.includes('iPhone') && !ua.includes('Android')) {
      setPlaceholder(`${label} (press “/” to focus)`)
    }
    document.addEventListener('keypress', focusInput)
    return () => {
      document.removeEventListener('keypress', focusInput)
    }
  }, [])

  return placeholder
}
