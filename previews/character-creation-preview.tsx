import { DiscordMessage } from "../components/discord-message"

export function CharacterCreationPreview() {
  const embed = {
    title: "✅ Confirmation accepted",
    color: 0x57f287,
    author: {
      name: "PassQuirkRPG Character Creation",
      iconURL: "/placeholder.svg?height=32&width=32",
    },
    description: "**Yeonbi**, you successfully created your character in Slot 2!\n\nYour adventure begins with:",
    thumbnail: "/placeholder.svg?height=80&width=80",
    fields: [
      { name: "⚔️ Basic sword", value: "A simple iron sword for beginners", inline: true },
      { name: "❤️ x5 Health potions", value: "Restores 25 HP each", inline: true },
      { name: "💙 x5 Mana potions", value: "Restores 15 MP each", inline: true },
      { name: "🧹 x5 Cleanse potions", value: "Removes negative effects", inline: true },
      {
        name: "📊 Starting Stats",
        value: "**Level:** 1\n**HP:** 50/50\n**MP:** 25/25\n**Gold:** 100\n**Class:** Adventurer",
        inline: false,
      },
    ],
    footer: {
      text: "Take a /quest and then /search to begin your adventure. • Today at 10:24 AM",
      iconURL: "/placeholder.svg?height=16&width=16",
    },
    timestamp: true,
  }

  const buttons = [
    { label: "🗺️ Start Quest", style: "primary" as const },
    { label: "👤 View Character", style: "secondary" as const },
    { label: "📖 Tutorial", style: "secondary" as const },
    { label: "🎨 Customize", style: "secondary" as const },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white">Character Creation Panel Preview</h3>
      <DiscordMessage
        username="PassQuirkRPG"
        avatar="/placeholder.svg?height=40&width=40"
        timestamp="Today at 10:24 AM"
        embeds={[embed]}
        buttons={buttons}
      />
    </div>
  )
}
