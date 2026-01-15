"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function EducationPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/")
    setTimeout(() => {
      document.getElementById("education")?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }, [router])

  return null
}
