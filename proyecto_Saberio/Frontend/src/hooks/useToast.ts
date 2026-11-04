import { useCallback, useRef, useState } from 'react'

export function useToast(duration = 3000) {
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showToast = useCallback(
    (text: string) => {
      setMessage(text)
      setVisible(true)
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => setVisible(false), duration)
    },
    [duration],
  )

  return { message, visible, showToast }
}