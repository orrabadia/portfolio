import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { getAllThoughts } from "@/lib/thoughts"

export default function ThoughtsPage() {
  const posts = getAllThoughts()

  return (
    <div className="min-h-screen text-foreground">
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 py-12 sm:py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>

        <div className="space-y-12 sm:space-y-16">
          <div>
            <h1 className="text-3xl sm:text-4xl font-light mb-4">All Thoughts</h1>
            <p className="text-muted-foreground">
              Writing about web development, design systems, and software engineering.
            </p>
          </div>

          <div className="space-y-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/thoughts/${post.slug}`}>
                <article className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer mb-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <h2 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                        {post.title}
                        <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-all duration-300 group-hover:text-muted-foreground/50" />
                      </h2>
                      <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1 text-xs text-muted-foreground font-mono shrink-0">
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                      <span className="sm:hidden">·</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
