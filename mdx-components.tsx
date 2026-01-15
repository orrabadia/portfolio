import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl sm:text-4xl font-light mb-6 mt-12 first:mt-0">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl sm:text-3xl font-light mb-4 mt-10">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl sm:text-2xl font-light mb-3 mt-8">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-muted-foreground leading-relaxed mb-6">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside text-muted-foreground mb-6 space-y-2">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="text-muted-foreground">{children}</li>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors">
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-border pl-6 italic text-muted-foreground my-6">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
    ),
    pre: ({ children }) => (
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-6 text-sm">{children}</pre>
    ),
    hr: () => <hr className="border-border my-8" />,
    img: ({ src, alt }) => (
      <img src={src} alt={alt} className="rounded-lg my-6 w-full" />
    ),
    strong: ({ children }) => (
      <strong className="text-foreground font-medium">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
    ...components,
  }
}
