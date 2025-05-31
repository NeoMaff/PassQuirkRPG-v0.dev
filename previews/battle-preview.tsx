import { DiscordMessage } from "../components/discord-message"

export function BattlePreview() {
  const embed = {
    title: "⚔️ Forbidden Tomb of the White Baron",
    color: 0xed4245,
    description:
      "**Yeonbi**, in front of you stands a **Monster4**!\n\nWill you fight the Monster4 or run away like a coward?",
    author: {
      name: "PassQuirkRPG Combat System",
      iconURL: "/placeholder.svg?height=32&width=32",
    },
    fields: [
      {
        name: "Yeonbi: 🟢 1",
        value: "❤️ HP 13/24\n💙 MP 7/11",
        inline: true,
      },
      {
        name: "Monster4:",
        value: "❤️ HP 25/25\n💙 MP 25/25",
        inline: true,
      },
    ],
    image: "/placeholder.svg?height=300&width=500",
    footer: {
      text: "Choose your next action by clicking a button below.",
      iconURL: "/placeholder.svg?height=16&width=16",
    },
    timestamp: true,
  }

  const buttons = [
    { label: "🏹 Shoot", style: "primary" as const },
    { label: "💀 Bane", style: "secondary" as const },
    { label: "💚 Heal", style: "success" as const },
    { label: "🧪 Potion", style: "primary" as const },
    { label: "🛡️ Defend", style: "secondary" as const },
    { label: "🏃 Escape", style: "danger" as const },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white">Battle Panel Preview</h3>
      <DiscordMessage
        username="PassQuirkRPG"
        avatar="/placeholder.svg?height=40&width=40"
        timestamp="Today at 11:15 PM"
        embeds={[embed]}
        buttons={buttons}
      />
    </div>
  )
}
