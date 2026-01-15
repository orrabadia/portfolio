"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SkillsPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/")
    setTimeout(() => {
      document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }, [router])

  return null
}
