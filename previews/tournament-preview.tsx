import { DiscordMessage } from "../components/discord-message"

export function TournamentPreview() {
  const embed = {
    title: "🏆 Weekly PvP Tournament Ranking",
    color: 0xfee75c,
    author: {
      name: "PassQuirkRPG Tournament System",
      iconURL: "/placeholder.svg?height=32&width=32",
    },
    thumbnail: "/placeholder.svg?height=80&width=80",
    description:
      "**Prize Pool:**\n🥇 **Rank 1:** 20,000 Gold\n🥈 **Rank 2:** 10,000 Gold\n🥉 **Rank 3:** 5,000 Gold\n💰 **Rank 4-10:** 3,000 Gold\n💰 **Rank 11-100:** 1,000 Gold\n\nBelow are the current top 10 ranked players:",
    fields: [
      {
        name: "**1/3**",
        value: "🥇🥈⭐ **Sniper**\n🔵🥈⭐ **Registry**\n🔵🥈⭐ **Mango**\n🔵🥈⭐ **Traverxec**\n🥇🥈⭐ **Control**",
        inline: true,
      },
      {
        name: "**2/3**",
        value:
          "🔵🥈⭐ **Obscurity**\n🔵🥈⭐ **OpenAdmin**\n🥇🥈⭐ **Oouch**\n🥇🥈⭐ **Multimaster**\n🔵🥈⭐ **Traceback**",
        inline: true,
      },
      {
        name: "**3/3**",
        value: "🥇🥈⭐ **Remote**\n🔵🥈⭐ **ForwardSlash**\n🔵🥈⭐ **ServMon**\n🔵🥈⭐ **Quick**\n🔵🥈⭐ **Admirer**",
        inline: true,
      },
    ],
    footer: {
      text: "nick, you currently have 🥇 6 medals.\nType '/pvp tournament' to challenge other players and improve your ranking.",
      iconURL: "/placeholder.svg?height=16&width=16",
    },
    timestamp: true,
  }

  const buttons = [
    { label: "⚔️ Join Tournament", style: "primary" as const },
    { label: "📊 My Ranking", style: "secondary" as const },
    { label: "📋 Rules", style: "secondary" as const },
    { label: "📜 History", style: "secondary" as const },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white">Tournament Panel Preview</h3>
      <DiscordMessage
        username="PassQuirkRPG"
        avatar="/placeholder.svg?height=40&width=40"
        timestamp="Today at 9:12 PM"
        embeds={[embed]}
        buttons={buttons}
      />
    </div>
  )
}
