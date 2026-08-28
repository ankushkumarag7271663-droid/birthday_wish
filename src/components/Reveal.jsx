import { useEffect, useRef, useState } from 'react'

export function Reveal({ children, className = '', delay = '0ms' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -30px' })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref} className={`reveal ${visible ? 'is-revealed' : ''} ${className}`} style={{ '--reveal-delay': delay }}>{children}</div>
}
