interface EmojiAnimadoProps {
  src: string
  alt?: string
  className?: string
}

export function EmojiAnimado({ src, alt = "emoji", className = "w-5 h-5 inline-block" }: EmojiAnimadoProps) {
  if (!src) return null

  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle" }}
    />
  )
}
