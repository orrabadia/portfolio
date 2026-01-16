import { getAllThoughts } from "@/lib/thoughts"
import HomeClient from "./home-client"

export default function Home() {
  const thoughts = getAllThoughts().slice(0, 4)

  return <HomeClient thoughts={thoughts} />
}
