import { DiscordMessage } from "../components/discord-message"

export function DungeonPreview() {
  const embed = {
    title: "🏰 Forbidden Tomb of the White Baron",
    color: 0x5865f2,
    author: {
      name: "PassQuirkRPG Dungeon Explorer",
      iconURL: "/placeholder.svg?height=32&width=32",
    },
    description:
      "**Yeonbi**, on your left lies your destiny, in front of you, your fate will be revealed, and on the right your future will unfold. Was that helpful?",
    fields: [
      {
        name: "🟢 Level 1",
        value: "❤️ HP 13/24 💙 MP 7/11 💰 CG 2397 🥇 OG 528",
        inline: false,
      },
    ],
    image: "/placeholder.svg?height=300&width=500",
    footer: {
      text: "Click a button below to select your path.",
      iconURL: "/placeholder.svg?height=16&width=16",
    },
    timestamp: true,
  }

  const buttons = [
    { label: "⬅️ Left", style: "success" as const },
    { label: "⬆️ Straight", style: "success" as const },
    { label: "➡️ Right", style: "success" as const },
    { label: "🧪 Potion", style: "primary" as const },
    { label: "🚪 Abandon", style: "danger" as const },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white">Dungeon Panel Preview</h3>
      <DiscordMessage
        username="PassQuirkRPG"
        avatar="/placeholder.svg?height=40&width=40"
        timestamp="Today at 11:52 PM"
        embeds={[embed]}
        buttons={buttons}
      />
    </div>
  )
}
