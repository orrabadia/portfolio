"use client"

import React from "react"

interface FormattedTextProps {
    text: string
    className?: string
}

export const FormattedText: React.FC<FormattedTextProps> = ({ text, className }) => {
    // Regex to detect images: ![alt](src)
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g
    // Regex to detect URLs starting with http:// or https://
    const urlRegex = /(https?:\/\/[^\s]+)/g

    // First, split by images
    const imageParts = text.split(imageRegex)
    const imageMatches = [...text.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)]

    const elements: React.ReactNode[] = []
    let imageIndex = 0

    imageParts.forEach((part, i) => {
        // Every 3rd part starting from 0 is text, 1 is alt, 2 is src
        if (i % 3 === 0) {
            // This is text - process for URLs
            const urlParts = part.split(urlRegex)
            urlParts.forEach((urlPart, j) => {
                if (urlPart.match(urlRegex)) {
                    elements.push(
                        <a
                            key={`${i}-${j}`}
                            href={urlPart}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {urlPart}
                        </a>
                    )
                } else if (urlPart) {
                    elements.push(<span key={`${i}-${j}`}>{urlPart}</span>)
                }
            })
        } else if (i % 3 === 1 && imageMatches[imageIndex]) {
            // This is alt text - render the image
            const alt = imageMatches[imageIndex][1]
            const src = imageMatches[imageIndex][2]
            elements.push(
                <img
                    key={`img-${imageIndex}`}
                    src={src}
                    alt={alt}
                    className="inline-block max-w-full h-auto rounded my-2"
                    onClick={(e) => e.stopPropagation()}
                />
            )
            imageIndex++
        }
        // i % 3 === 2 is the src, which we already used above
    })

    return <span className={className}>{elements}</span>
}
