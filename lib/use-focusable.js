import { useState, useEffect } from 'react'

const useFocusable = (input, label, inst = '(press “/” to filter)') => {
  const focusInput = e => {
    if (e.key === '/' && input) input.current.focus()
  }
  useEffect(() => {
    document.addEventListener('keyup', focusInput)
    return () => {
      document.removeEventListener('keyup', focusInput)
    }
  }, [])

  // const [placeholder, setPlaceholder] = useState(label)
  // useEffect(() => {
  //   const ua = navigator.userAgent
  //   if (!ua.includes('iPhone') && !ua.includes('Android')) {
  //     setPlaceholder([label, inst].join(' ').trimLeft())
  //   }
  // }, [])

  return label
}

export default useFocusable
