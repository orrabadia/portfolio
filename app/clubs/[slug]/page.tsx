"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { use } from "react"
import { FormattedText } from "@/components/formatted-text"

interface ClubImage {
  src: string
  caption: string
  description: string
}

interface ClubData {
  name: string
  logo: string
  logoClassName?: string
  website: string
  role: string
  duration: string
  description: string
  involvement: string
  images: ClubImage[]
}

const clubsData: Record<string, ClubData> = {
  hkn: {
    name: "Eta Kappa Nu (HKN)",
    logo: "/logos/clubs/HKN.png",
    website: "https://hkn.ucsd.edu",
    role: "Member",
    duration: "2023 - 2025",
    description: "IEEE-HKN (Eta Kappa Nu) is the premier international honor society for electrical and computer engineers, honoring outstanding students for their academic achievement, leadership, and commitment to service.",
    involvement: "As a member of Eta Kappa Nu (HKN) at UC San Diego, I progressed from Outreach Volunteer to Professional Outreach Chair and ultimately Vice President of Outreach over the course of 2.5 years.\n\nAs Professional Outreach Chair, I coordinated with teachers to host events at 6 distinct elementary, middle, and high schools within socioeconomically disadvantaged communities in the San Diego area. I organized and led 4 UCSD field trips and lab tours, liaising with 12 labs and organizations to present real-world engineering applications to over 80 K-12 students per tour.\n\nAs Vice President of Outreach, I led weekly meetings to ensure team accountability, secured a $1,000 grant to support campus tours for a local Title I school, and fostered collaboration between HKN Outreach and other organizations, establishing the largest engineering outreach coalition at UCSD. I successfully oversaw seven UCSD tours serving over 350 students and was asked by the Director of HKN, Nancy Ostin, to be featured in the IEEE Bridge Magazine (shown below).\n\n![The Bridge, Issue 2, 2025](/images/clubs/HKN/Bridge.jpg)\n\nMy dedication to fostering diversity and inclusion in engineering was recognized with the 2024 CSE Undergraduate Award for Excellence in Contributions to Diversity.\n\n![2024 CSE Undergraduate Award Winners](/images/clubs/HKN/CSEWinners.jpg)\n\nOutside of my outreach duties, I mentored incoming induction classes and helped organize larger-scale events like Hard Hack, the largest MLH-backed hardware hackathon for college students on the West Coast.",
    images: [
      { src: "/images/clubs/HKN/ANA.png", caption: "Army & Navy Academy UCSD Campus Tour", description: "As a Professional Outreach Chair, I organized a campus tour for the students of Army & Navy Academy to showcase STEM clubs and other educational resources available at UCSD.\n\nHere I am showing them Franklin Antonio Hall, home of the Rocket Propulsion Laboratory and Human Powered Submarine @ UCSD.\n\nRead more about it here: https://tinyurl.com/ANATour24LinkedIn" },
      { src: "/images/clubs/HKN/DiversityAward.JPG", caption: "2024 CSE Award for Excellence in Contributions to Diversity, Undergraduate", description: "Honored as one of twenty exceptional undergraduates recognized for achievements beyond academic study. This accolade was awarded for my outstanding contributions to diversity, equity, and inclusion through my position in Eta Kappa Nu's Outreach program.\n\nRead more about it here: https://cse.ucsd.edu/undergraduate/cse-undergraduate-student-awards" },
      { src: "/images/clubs/HKN/SLC.jpg", caption: "2024 HKN Student Leadership Conference", description: "In November 2024, I traveled to Charlotte, NC, to represent UC San Diego at the IEEE-Eta Kappa Nu Student Leadership Conference.\n\nAs the Vice President of Outreach, this was a pivotal opportunity to connect with a global network of engineering leaders. Over three days, I participated in workshops focused on professional development and chapter management, gaining new perspectives on how to bridge the gap between academic excellence and community impact.\n\nThe experience sharpened my ability to lead diverse teams and reinforced the importance of \"Scholarship, Character, and Attitude\" in the engineering profession." },
    ],
  },
  csforeach: {
    name: "CS foreach",
    logo: "/logos/clubs/csforeach.svg",
    logoClassName: "csforeach-logo",
    website: "https://csforeach.org",
    role: "Volunteer Tutor",
    duration: "2022 - 2024",
    description: "CS foreach is dedicated to increasing equity and access in computer science education throughout the San Diego area.\n\nI served as a Developer, an organizer for the largest high school hackathon in San Diego, and the Marketing and Design Director for the organization.",
    involvement: "I joined CS foreach because I didn't want other students to feel the way I did-- underprepared and intimidated by computer science. I started as a workshop volunteer, helping introduce Python and Scratch programming to students who might not otherwise have exposure to these opportunities and concepts.\n\nRecognizing the impact of the club, and its necessity for strong branding, I stepped up as Marketing and Design Director, where I managed our social media presence and designed Figma wireframes for the official website. During this time, I also helped with marketing efforts for TritonHacks 2023, San Diego's largest high school hackathon, helping create a event recap slideshow for social media.\n\n![TritonHacks 2023 Recap](/images/clubs/CSforeach/1.png)\n\n![TritonHacks 2023 Recap](/images/clubs/CSforeach/2.png)\n\nIn 2024, I transitioned to a more abstract design role, focusing primarily on TritonHacks. I designed the sponsorship packet, which helped secure partnerships with Teradata, Melissa, Jane Street, and Northrop Grumman. I also developed the event website and crafted the overall brand identity for the event.\n\n![TritonHacks 2025 Sponsorship Packet](/images/clubs/CSforeach/TRITONHACKS 2025.png)\n\nBeyond design, I contributed to hackathon logistics, helping ensure a smooth experience for over 100 participants.\n\nThrough CS foreach, I've been able to give back and help ensure that the next generation of students feels prepared, supported, and excited about computer science.",
    images: [
      { src: "/images/clubs/CSforeach/Workshop.JPG", caption: "Intro to Web App Design (UI/UX) & Architecture Workshop", description: "During TritonHacks 2025, the largest high school hackathon in San Diego, I ran a workshop to help students learn how to design and build web applications. I taught students how tools like Uvicorn (FastAPI), MongoDB, and JavaScript work together to create full-stack applications. I then taught students UI/UX design principles and how to design wireframes in Figma.\n\nAt the end of the workshop, I did live design critiques of their applications, as well as websites of multi-billion dollar companies." },
      { src: "/images/clubs/CSforeach/Mentor.png", caption: "TritonHacks 2025 Mentor", description: "During TritonHacks 2025, I volunteered as a mentor to help students with their hackathon projects, and debug in real-time.\n\nHere, I am drawing out a database schema refactor plan for the student's project, in order to make the database more scalable and efficient." },
      { src: "/images/clubs/CSforeach/THLanding.png", caption: "TritonHacks 2025 Landing Page", description: "In collaboration with the TritonHacks 2025 Design Team, I coded the official landing page for the hackathon using React and Netlify for hosting.\n\nThis website served as the primary source of information for the hackathon, and was used to register participants, and provide information about the event to over 100+ hackers.\n\nView the website here: https://tritonhacks.org/" },
    ],
  },
}

export default function ClubPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const [expandedImage, setExpandedImage] = useState<ClubImage | null>(null)
  const club = clubsData[resolvedParams.slug]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setExpandedImage(null)
      }
    }

    if (expandedImage) {
      document.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [expandedImage])

  if (!club) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {expandedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center cursor-pointer p-4 sm:p-8"
          onClick={() => setExpandedImage(null)}
        >
          <div className="flex flex-col lg:flex-row items-center lg:items-center gap-4 lg:gap-6 max-w-[90vw] max-h-[90vh]">
            <img
              src={expandedImage.src}
              alt={expandedImage.caption}
              className="max-w-full lg:max-w-[60vw] max-h-[60vh] lg:max-h-[80vh] object-contain rounded-lg"
            />
            <div
              className="bg-card/90 backdrop-blur-sm px-6 py-4 rounded-lg border border-border lg:w-80 lg:max-h-[80vh] lg:overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-foreground text-center lg:text-left text-base sm:text-lg font-medium mb-2">
                {expandedImage.caption}
              </h3>
              <div className="text-muted-foreground text-center lg:text-left text-sm whitespace-pre-wrap">
                <FormattedText text={expandedImage.description} />
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 py-12 sm:py-20">
        <Link
          href="/education"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full aspect-square flex items-center justify-center bg-card border border-border rounded-full p-6">
              <img
                src={club.logo}
                alt={club.name}
                className={`w-full h-full object-contain ${club.logoClassName || ""}`}
              />
            </div>
            {club.images.map((image, index) => (
              <div
                key={index}
                className="group w-full aspect-square bg-card border border-border rounded-lg overflow-hidden cursor-pointer relative"
                onClick={() => setExpandedImage(image)}
              >
                <img
                  src={image.src}
                  alt={image.caption}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    target.parentElement!.classList.add('flex', 'items-center', 'justify-center')
                    target.parentElement!.innerHTML = '<span class="text-muted-foreground text-xs">Add image</span>'
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-light mb-2">{club.name}</h1>
              <div className="text-muted-foreground">{club.role}</div>
              <div className="text-sm text-muted-foreground">{club.duration}</div>
            </div>

            <div className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
              <FormattedText text={club.description} />
            </div>

            <a
              href={club.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Visit Official Website
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-16 space-y-6">
          <h2 className="text-2xl font-light">My Involvement</h2>
          <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
            <FormattedText text={club.involvement} />
          </div>
        </div>
      </main>
    </div>
  )
}
