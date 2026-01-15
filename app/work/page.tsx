"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function WorkPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/")
    setTimeout(() => {
      document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }, [router])

  return null
}
