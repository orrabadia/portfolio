import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { getThoughtBySlug, getAllThoughtSlugs } from "@/lib/thoughts"
import { MDXRemote } from 'next-mdx-remote/rsc'
import { useMDXComponents } from '@/mdx-components'

export async function generateStaticParams() {
  const slugs = getAllThoughtSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function ThoughtPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const thought = getThoughtBySlug(slug)

  if (!thought) {
    notFound()
  }

  const components = useMDXComponents({})

  return (
    <div className="min-h-screen text-foreground">
      <main className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-16 py-12 sm:py-20">
        <Link
          href="/thoughts"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Thoughts
        </Link>

        <article className="space-y-8">
          <header className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-muted-foreground font-mono">
              <span>{new Date(thought.meta.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              <span>·</span>
              <span>{thought.meta.readTime}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light leading-tight">
              {thought.meta.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {thought.meta.excerpt}
            </p>
          </header>

          <hr className="border-border" />

          <div className="mdx-content">
            <MDXRemote source={thought.content} components={components} />
          </div>

          <hr className="border-border" />

          <div className="flex items-center justify-between">
            <Link
              href="/thoughts"
              className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" />
              All thoughts
            </Link>
          </div>
        </article>
      </main>
    </div>
  )
}
