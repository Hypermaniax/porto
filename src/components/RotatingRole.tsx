import { useEffect, useState } from "react"

export default function RotatingRole({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    if (prefersReduced || roles.length < 2) return

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % roles.length)
    }, 2200)

    return () => window.clearInterval(id)
  }, [roles])

  return (
    <span className="inline-block">
      <span
        key={index}
        className="inline-block animate-role-in border-2 border-ink bg-yellow px-2 py-0.5 text-black"
      >
        {roles[index]}
      </span>
    </span>
  )
}
