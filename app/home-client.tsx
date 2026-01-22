"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useTheme } from "next-themes"
import { MapPin, Github, Linkedin, Maximize2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  SiPython, SiJavascript, SiTypescript, SiCplusplus, SiHtml5, SiCss3, SiGnubash,
  SiReact, SiNextdotjs, SiVuedotjs, SiNuxtdotjs, SiNodedotjs, SiExpress, SiTailwindcss, SiFastapi,
  SiMongodb, SiPostgresql, SiSupabase,
  SiGit, SiDocker, SiGithubactions, SiAuth0, SiStripe, SiHubspot, SiAirtable, SiOpenai,
  SiJunit5,
  SiC,
  SiVitest
} from "react-icons/si"
import { FaJava, FaDatabase } from "react-icons/fa"
import type { ThoughtMeta } from "@/lib/thoughts"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"

const sections = ["intro", "education", "skills", "work", "thoughts", "connect"]

interface WorkSample {
  src: string
  caption: string
}

interface JobExperience {
  year: string
  role: string
  company: string
  logo: string
  description: string
  tech: string[]
  workSamples: WorkSample[] | null
}

interface HomeClientProps {
  thoughts: ThoughtMeta[]
}

export default function HomeClient({ thoughts }: HomeClientProps) {
  const { theme, setTheme } = useTheme()
  const [activeSection, setActiveSection] = useState("")
  const [experienceTab, setExperienceTab] = useState<"work" | "extracurriculars">("work")
  const [workSamplesOpen, setWorkSamplesOpen] = useState<string | null>(null)
  const [fullscreenImage, setFullscreenImage] = useState<{ src: string; caption: string } | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  // Track client-side mounting for portal
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Close fullscreen image on Escape key (prevent dialog from closing too)
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && fullscreenImage) {
        e.stopPropagation()
        e.preventDefault()
        setFullscreenImage(null)
      }
    }
    document.addEventListener("keydown", handleEscape, true) // Use capture phase
    return () => document.removeEventListener("keydown", handleEscape, true)
  }, [fullscreenImage])
  const isScrollingRef = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            if (!isScrollingRef.current) {
              setActiveSection(entry.target.id)
            }
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      const key = parseInt(e.key)
      if (key >= 1 && key <= 6) {
        const section = sections[key - 1]
        isScrollingRef.current = true
        setActiveSection(section)
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })
        // Re-enable observer updates after scroll completes
        setTimeout(() => {
          isScrollingRef.current = false
        }, 1000)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const jobExperiences: JobExperience[] = [
    {
      year: "July 2025 - Present",
      role: "Founding Software Engineer",
      company: "ServiceAgent",
      logo: "/logos/companies/ServiceAgent.png",
      description: "Building AI-powered customer service automation tools and designing user-centric product interfaces.",
      tech: ["React", "TypeScript", "PostgreSQL", "Tailwind CSS", "Node.js (Express)", "n8n", "Stripe", "Hubspot API", "Airtable"],
      workSamples: [
        {
          src: "/work-samples/ServiceAgent/serviceagent_landing.png",
          caption: "ServiceAgent - Landing Page (Light Mode)",
        },
        {
          src: "/work-samples/ServiceAgent/pricing-cards.png",
          caption: "ServiceAgent - Pricing Cards (Dark Mode)",
        },
        {
          src: "/work-samples/ServiceAgent/hiring-dashboard.png",
          caption: "ServiceAgent - Hiring Dashboard (Light Mode)",
        },
      ],
    },
    {
      year: "June 2024 - Sep 2024",
      role: "Frontend Engineer Intern and Technical Lead",
      company: "Pullscription",
      logo: "/logos/companies/Pullscription.png",
      description: "Built and led the frontend for Pullscription, a platform that lets users discover and pull comics from local comic shops digitally, focusing on scalable architecture, secure authentication, and performance optimization.",
      tech: ["Vue", "TypeScript", "Nuxt.js", "OAuth 2.0", "Docker", "Postman", "State Management", "MapKit JS"],
      workSamples: [
        {
          src: "/work-samples/Pullscription/ps-landing.png",
          caption: "Pullscription - Landing Page",
        },
        {
          src: "/work-samples/Pullscription/pullcard1.png",
          caption: "Pullscription - Default Comic Card (Mobile)",
        },
        {
          src: "/work-samples/Pullscription/pullcard2.png",
          caption: "Pullscription - Active Comic Card (Desktop)",
        },
        {
          src: "/work-samples/Pullscription/NavBar.png",
          caption: "Pullscription - Navigation Bar (Mobile)",
        },
      ],
    },
    {
      year: "Nov 2023 - June 2024",
      role: "Computational Biology and Python Mentor",
      company: "inventXYZ",
      logo: "/logos/companies/inventXYZ.png",
      description: "Mentored students at inventXYZ in computational biology, guiding them through genomic concepts, algorithmic thinking, and real-world applications of data-driven biology using Python. Also led a project that visualized US party affiliation trends over time in Tableau.",
      tech: ["Python", "Tableau"],
      workSamples: null,
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className={`w-2 h-8 rounded-full transition-all duration-500 cursor-pointer ${
                activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        <header
          id="intro"
          ref={(el) => { sectionsRef.current[0] = el }}
          className="min-h-screen py-12 sm:py-16 flex items-center opacity-0"
        >
          <div className="grid lg:grid-cols-5 gap-2 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-wider mt-8 sm:mt-0">PORTFOLIO / 2026</div>
                <div className="flex items-center gap-6">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                    Om
                    <br />
                    <span className="text-muted-foreground">Rabadia</span>
                  </h1>
                  <div className="w-40 h-40 rounded-full border-2 border-border bg-muted flex items-center justify-center overflow-hidden">
                     <img src="/Profile_Pic.jpg" alt="Om Rabadia" className="w-full h-full object-cover" />

                  </div>
                </div>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Developer and designer building <span className="text-foreground">intuitive</span> web experiences that make technology more <span className="text-foreground">accessible</span> and <span className="text-foreground"> impactful</span> for everyone.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Available for work
                  </div>
                  <div className="flex items-center gap-1"><MapPin className="w-3 h-3" />San Diego, CA</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-start space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">CURRENTLY</div>
                <div className="space-y-2">
                  <div className="text-foreground">Founding Software Engineer</div>
                  <div className="text-muted-foreground">@ ServiceAgent</div>
                  <div className="text-xs text-muted-foreground">July 2025 — Present</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
                <div className="flex flex-wrap gap-2">
                  {["Full-Stack Development", "Automation", "API Integration", "UI/UX Design"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <a href="/OmRabadia_Resume.pdf" download>
                <Button variant="outline" className="gap-2">
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
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download Resume
                </Button>
              </a>
            </div>
          </div>
        </header>

        <section id="education" ref={(el) => { sectionsRef.current[1] = el }} className="py-12 sm:py-16 opacity-0">
          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-3xl sm:text-4xl font-light">Education</h2>

            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  year: "2021 - 2025",
                  degree: "B.S. Computer Science with a Specialization in Bioinformatics",
                  minor: "Minor in Economics",
                  school: "University of California, San Diego",
                  description: "Focusing on software engineering, algorithms, and human-computer interaction.",
                  clubs: [
                    { src: "/logos/clubs/HKN.png", alt: "HKN", className: "", slug: "hkn" },
                    { src: "/logos/clubs/csforeach.svg", alt: "CS Foreach", className: "csforeach-logo", slug: "csforeach" },
                  ],
                },
              ].map((edu, index) => (
                <div
                  key={index}
                  className="group flex gap-4 sm:gap-6 py-6 sm:py-8 transition-colors duration-500"
                >
                  <img src="/UCSD.png" alt="UCSD" className="w-14 h-14 object-contain shrink-0" />

                  <div className="flex-1 space-y-2">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium">{edu.degree}</h3>
                      {edu.minor && <div className="text-lg sm:text-xl font-medium">{edu.minor}</div>}
                      <div className="text-muted-foreground">{edu.school}</div>
                      <div className="text-sm text-muted-foreground whitespace-nowrap">{edu.year}</div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg">{edu.description}</p>
                    <div className="flex items-center gap-4 mt-3">
                      {edu.clubs.map((club) => (
                        <Link
                          key={club.alt}
                          href={`/clubs/${club.slug}`}
                          className="hover:scale-110 transition-transform duration-300"
                          title={`My involvement in ${club.alt}`}
                        >
                          <img
                            src={club.src}
                            alt={club.alt}
                            className={`h-10 w-auto object-contain ${club.className}`}
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" ref={(el) => { sectionsRef.current[2] = el }} className="py-12 sm:py-16 opacity-0">
          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-3xl sm:text-4xl font-light">Skills</h2>

            <div className="grid gap-8 sm:gap-10">
              {[
                {
                  category: "Languages",
                  skills: [
                    { name: "Python", icon: SiPython },
                    { name: "JavaScript", icon: SiJavascript },
                    { name: "TypeScript", icon: SiTypescript },
                    { name: "Java", icon: FaJava },
                    { name: "C/C++", icon: SiCplusplus },
                    { name: "SQL", icon: FaDatabase },
                    { name: "HTML", icon: SiHtml5 },
                    { name: "CSS", icon: SiCss3 },
                    { name: "Bash", icon: SiGnubash },
                  ],
                },
                {
                  category: "Frameworks & Libraries",
                  skills: [
                    { name: "React", icon: SiReact },
                    { name: "Next.js", icon: SiNextdotjs },
                    { name: "Vue", icon: SiVuedotjs },
                    { name: "Nuxt.js", icon: SiNuxtdotjs },
                    { name: "Node.js", icon: SiNodedotjs },
                    { name: "Express", icon: SiExpress },
                    { name: "Tailwind CSS", icon: SiTailwindcss },
                    { name: "FastAPI", icon: SiFastapi },
                  ],
                },
                {
                  category: "Databases & Cloud",
                  skills: [
                    { name: "MongoDB", icon: SiMongodb },
                    { name: "PostgreSQL", icon: SiPostgresql },
                    { name: "Supabase", icon: SiSupabase },
                  ],
                },
                {
                  category: "Tools & Integrations",
                  skills: [
                    { name: "Git", icon: SiGit },
                    { name: "Docker", icon: SiDocker },
                    { name: "GitHub Actions", icon: SiGithubactions },
                    { name: "Auth0", icon: SiAuth0 },
                    { name: "Stripe", icon: SiStripe },
                    { name: "HubSpot", icon: SiHubspot },
                    { name: "Airtable", icon: SiAirtable },
                    { name: "OpenAI APIs", icon: SiOpenai },
                  ],
                },
                {
                  category: "Debugging & Testing Tools",
                  skills: [
                    { name: "Vitest", icon: SiVitest },
                    { name: "JUnit", icon: SiJunit5 },
                    { name: "gdb", icon: SiCplusplus },
                    { name: "Valgrind", icon: SiCplusplus },
                  ],
                },

              ].map((group) => (
                <div key={group.category} className="space-y-3">
                  <div className="text-sm text-muted-foreground font-mono">{group.category.toUpperCase()}</div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-lg transition-colors duration-300"
                      >
                        <skill.icon className="w-4 h-4" />
                        {skill.name}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="work"
          ref={(el) => { sectionsRef.current[3] = el }}
          className="min-h-screen py-12 sm:py-16 opacity-0"
        >
          <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2">
                <button
                  onClick={() => setExperienceTab("work")}
                  className={`text-2xl xs:text-3xl sm:text-4xl font-light transition-colors duration-300 cursor-pointer ${
                    experienceTab === "work" ? "text-foreground" : "text-muted-foreground/50 hover:text-muted-foreground"
                  }`}
                >
                  Work Experience
                </button>
                <span className="hidden xs:inline text-2xl xs:text-3xl sm:text-4xl font-light text-muted-foreground/30">|</span>
                <button
                  onClick={() => setExperienceTab("extracurriculars")}
                  className={`text-2xl xs:text-3xl sm:text-4xl font-light transition-colors duration-300 cursor-pointer ${
                    experienceTab === "extracurriculars" ? "text-foreground" : "text-muted-foreground/50 hover:text-muted-foreground"
                  }`}
                >
                  Extracurriculars
                </button>
              </div>
            </div>

            <div>
              {experienceTab === "work" ? (
                <>
                  {jobExperiences.map((job, index) => (
                    <div
                      key={index}
                      className="group flex gap-4 sm:gap-6 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                    >
                      <div className="w-16 h-16 flex items-center justify-center overflow-hidden shrink-0">
                        <img
                          src={job.logo}
                          alt={job.company}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4 mb-0.5 md:mb-0">
                          <div className="space-y-0.5">
                            <h3 className="text-lg sm:text-xl font-medium">{job.role}</h3>
                            <div className="text-muted-foreground">{job.company}</div>
                            <div className="text-sm text-muted-foreground whitespace-nowrap">{job.year}</div>
                          </div>

                          <div className="flex flex-wrap gap-x-3 gap-y-2 md:justify-end md:max-w-[280px] mt-1 md:mt-0">
                            {job.tech.map((tech) => (
                              <span
                                key={tech}
                                className="text-xs text-muted-foreground leading-tight"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <p className="text-muted-foreground leading-relaxed max-w-lg mt-3">{job.description}</p>

                        {job.workSamples && (
                          <Button
                            variant="secondary"
                            className="mt-4 gap-2"
                            onClick={() => setWorkSamplesOpen(job.company)}
                          >
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
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            View work samples
                          </Button>
                        )}

                        <Dialog open={workSamplesOpen === job.company} onOpenChange={(open) => setWorkSamplesOpen(open ? job.company : null)}>
                          <DialogContent
                            className="max-w-3xl max-h-[90vh] overflow-y-auto"
                            showCloseButton={false}
                            onEscapeKeyDown={(e) => {
                              if (fullscreenImage) {
                                e.preventDefault()
                              }
                            }}
                            onInteractOutside={(e) => {
                              if (fullscreenImage) {
                                e.preventDefault()
                              }
                            }}
                          >
                            <DialogClose className="absolute top-4 right-4 p-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors duration-200 cursor-pointer">
                              <X className="w-5 h-5" />
                            </DialogClose>
                            <DialogHeader>
                              <DialogTitle>{job.company} - Work Samples</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6 mt-4">
                              {job.workSamples?.map((sample, sampleIndex) => (
                                <div key={sampleIndex} className="space-y-2">
                                  <div className="relative group/image">
                                    <img
                                      src={sample.src}
                                      alt={sample.caption}
                                      className="w-full rounded-lg border border-border cursor-pointer mb-4"
                                      onClick={() => setFullscreenImage(sample)}
                                    />
                                    <button
                                      onClick={() => setFullscreenImage(sample)}
                                      className="absolute top-2 right-2 p-2 bg-background/80 backdrop-blur-sm border border-border rounded-lg opacity-0 group-hover/image:opacity-100 transition-opacity duration-200 hover:bg-background cursor-pointer"
                                      aria-label="View fullscreen"
                                    >
                                      <Maximize2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <p className="text-sm text-muted-foreground text-center">{sample.caption}</p>
                                </div>
                              ))}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="ghost"
                    className="group mt-8 gap-2 text-lg"
                    onClick={() => setExperienceTab("extracurriculars")}
                  >
                    View Extracurriculars
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Button>
                </>
              ) : (
                <>
                  {[
                    {
                      organization: "IEEE - Eta Kappa Nu (HKN) Honors Society",
                      logo: "/logos/clubs/HKN.png",
                      slug: "hkn",
                      roles: [
                        {
                          year: "June 2024 - June 2025",
                          role: "Vice President of Outreach",
                          description: "Oversaw a team of 10+ outreach coordinators to deliver campus tours and STEM lessons for 500+ underserved students, secured funding, and established UCSD's largest engineering outreach coalition.",
                          tags: ["Leadership", "Team Management", "Event Planning"]
                        },
                        {
                          year: "Mar 2023 - June 2024",
                          role: "Professional Outreach Chair",
                          description: "Coordinated with educators to host STEM events at 6 schools in underserved San Diego communities and organized 4 UCSD field trips, partnering with 12 labs to engage 80+ K-12 students per tour in hands-on engineering experiences.",
                          tags: ["Event Planning", "Partnership Development", "Community Engagement", "Public Speaking"],
                        },
                        {
                          year: "Jan 2023 - Mar 2023",
                          role: "Guest STEM Instructor",
                          description: "Collaborated with a team of student instructors to teach Web Development and AI concepts to K-12 students.",
                          tags: ["Teaching", "Curriculum Development", "Mentorship"],
                        },
                      ],
                    },
                    {
                      organization: "CS foreach",
                      logo: "/logos/clubs/csfe-circle.png",
                      slug: "csforeach",
                      roles: [
                        {
                          year: "June 2024 - June 2025",
                          role: "React Developer and Hackathon Organizer",
                          description: "Co-organized San Diego's largest high school hackathon, designing the website, sponsorship materials, and brand identity to attract 100+ participants.",
                          tags: ["React", "Figma", "Netlify", "Event Organization", "Brand Identity", "Sponsorship Outreach"],
                        },
                        {
                          year: "Apr 2023 - June 2024",
                          role: "Marketing and Design Director",
                          description: "Led marketing and design initiatives, managing social media and designing the official website to expand CS foreach's reach to underserved students.",
                          tags: ["Figma", "Wireframes", "Social Media", "Adobe Photoshop"],
                        },
                      ],
                    },
                  ].map((org, orgIndex) => (
                    <div
                      key={orgIndex}
                      className="group flex gap-4 sm:gap-6 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center overflow-hidden shrink-0">
                        <img
                          src={org.logo}
                          alt={org.organization}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="text-muted-foreground font-medium mb-3">{org.organization}</div>

                        <div className="space-y-6">
                          {org.roles.map((item, roleIndex) => (
                            <div key={roleIndex}>
                              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4">
                                <div className="space-y-0.5">
                                  <h3 className="text-lg sm:text-xl font-medium">{item.role}</h3>
                                  <div className="text-sm text-muted-foreground whitespace-nowrap">{item.year}</div>
                                </div>

                                <div className="flex flex-wrap gap-x-3 gap-y-1 md:justify-end md:max-w-[280px]">
                                  {item.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="text-xs text-muted-foreground leading-tight"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <p className="text-muted-foreground leading-relaxed max-w-lg mt-2 whitespace-pre-wrap">{item.description}</p>
                            </div>
                          ))}
                          <Link
                            href={`/clubs/${org.slug}`}
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                          >
                            <Button variant={theme === "dark" ? "secondary" : "secondary"}>
                            Learn more about my involvement
                            <svg
                              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="ghost"
                    className="group mt-8 gap-2 text-lg"
                    onClick={() => setExperienceTab("work")}
                  >
                    View Work Experience
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Button>
                </>
              )}
            </div>
          </div>
        </section>

        <section
          id="thoughts"
          ref={(el) => { sectionsRef.current[4] = el }}
          className="py-12 sm:py-16 opacity-0"
        >
          <div className="space-y-6 sm:space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl sm:text-4xl font-light">Recent Thoughts</h2>
              <Link
                href="/thoughts"
                className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                View all
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {thoughts.map((post) => (
                <Link key={post.slug} href={`/thoughts/${post.slug}`}>
                  <article className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer h-full">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                        {post.title}
                      </h3>

                      <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        <span>Read more</span>
                        <svg
                          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="connect" ref={(el) => { sectionsRef.current[5] = el }} className="py-12 sm:py-16 opacity-0">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light">Let's Connect</h2>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Always interested in new opportunities, collaborations, and conversations about technology and design.
                </p>

                <div className="space-y-4">
                  <Link
                    href="mailto:orrabadia@gmail.com"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg">orrabadia@gmail.com</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "GitHub", handle: "@orrabadia", url: "#", icon: Github },
                  { name: "LinkedIn", handle: "omrabadia", url: "#", icon: Linkedin },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                      <div className="leading-tight">
                        <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">{social.name}</div>
                        <div className="text-sm text-muted-foreground">{social.handle}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">© 2026 Om Rabadia. All rights reserved.</div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300 cursor-pointer"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>

      {/* Fullscreen Image Overlay - rendered via portal to be on top of dialog */}
      {isMounted && fullscreenImage && createPortal(
        <div className="fixed inset-0 z-[9999]">
          {/* Backdrop - closes on click */}
          <div
            className="absolute inset-0 bg-black/90"
            onClick={() => setFullscreenImage(null)}
          />

          {/* Content - positioned in center, image blocks clicks, background passes through */}
          <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
            <div className="relative max-w-[95vw] max-h-[90vh] flex flex-col items-center gap-4">
              <img
                src={fullscreenImage.src}
                alt={fullscreenImage.caption}
                className="max-w-full max-h-[85vh] object-contain rounded-lg pointer-events-auto"
              />
              <p className="text-white/80 text-center text-sm pointer-events-none">{fullscreenImage.caption}</p>
            </div>
          </div>

          {/* Close button - positioned last in DOM to ensure it's on top */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setFullscreenImage(null)
            }}
            className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200 cursor-pointer pointer-events-auto"
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>,
        document.body
      )}
    </div>
  )
}
