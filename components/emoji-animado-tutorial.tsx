interface EmojiAnimadoTutorialProps {
  src: string
  alt?: string
  className?: string
}

export function EmojiAnimadoTutorial({
  src,
  alt = "emoji",
  className = "w-6 h-6 inline-block",
}: EmojiAnimadoTutorialProps) {
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
