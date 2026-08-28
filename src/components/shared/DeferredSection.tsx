import { type ReactNode, useEffect, useRef, useState } from "react"

type DeferredSectionProps = { children: ReactNode; className?: string }

export default function DeferredSection({ children, className }: DeferredSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (!("IntersectionObserver" in window)) {
      requestAnimationFrame(() => setReady(true))
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setReady(true)
        observer.disconnect()
      }
    }, { rootMargin: "500px 0px" })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref} className={className}>{ready ? children : null}</div>
}