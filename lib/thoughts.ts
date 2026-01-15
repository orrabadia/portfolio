import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const thoughtsDirectory = path.join(process.cwd(), 'content/thoughts')

function calculateReadTime(content: string): string {
  // Strip markdown syntax for more accurate word count
  const plainText = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[([^\]]*)\]\(.*?\)/g, '$1') // Replace links with text
    .replace(/[#*_~>`-]/g, '') // Remove markdown symbols
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim()

  const words = plainText.split(/\s+/).filter(word => word.length > 0).length
  const wordsPerMinute = 200
  const minutes = Math.ceil(words / wordsPerMinute)

  return `${minutes} min read`
}

export interface ThoughtMeta {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
}

export function getAllThoughts(): ThoughtMeta[] {
  const fileNames = fs.readdirSync(thoughtsDirectory)
  const allThoughts = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(thoughtsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        readTime: calculateReadTime(content),
      }
    })

  return allThoughts.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getThoughtBySlug(slug: string): { meta: ThoughtMeta; content: string } | null {
  try {
    const fullPath = path.join(thoughtsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      meta: {
        slug,
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        readTime: calculateReadTime(content),
      },
      content,
    }
  } catch {
    return null
  }
}

export function getAllThoughtSlugs(): string[] {
  const fileNames = fs.readdirSync(thoughtsDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''))
}
