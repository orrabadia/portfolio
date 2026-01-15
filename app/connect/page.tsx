"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ConnectPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/")
    setTimeout(() => {
      document.getElementById("connect")?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }, [router])

  return null
}
