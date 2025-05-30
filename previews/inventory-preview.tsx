"use client"

import { useState } from "react"
import { DiscordMessage } from "../components/discord-message"

export function InventoryPreview() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 3

  const inventoryItems = {
    1: [
      {
        name: "🪢 Rope",
        value:
          "A fine rope woven from horsehair and grasses, looks like it can easily hold the weight of a large man or orc.\n💰 3 Value",
        inline: true,
      },
      {
        name: "🧪 Skill Potion",
        value: "Skill +4: Replenishes your skill score\n💰 2 Value",
        inline: true,
      },
      {
        name: "🧪 Stamina Potion",
        value: "Stamina +4: Adds to your stamina score\n💰 3 Value",
        inline: true,
      },
    ],
    2: [
      {
        name: "🧪 Stamina Restorer",
        value: "Stamina +12: Restores a large amount of stamina\n💰 5 Value",
        inline: true,
      },
      {
        name: "🧪 Stamina Restorer",
        value: "Stamina +12: Restores a large amount of stamina\n💰 5 Value",
        inline: true,
      },
      {
        name: "🛡️ Tin armour",
        value: "Armour +1: A set of quite flimsy tin armour\n💰 2 Value",
        inline: true,
      },
    ],
    3: [
      {
        name: "🪓 Tin axe",
        value:
          "Weapon +1: A flimsy tin axe, used throughout the countryside for felling small trees\n🟡 Equipped 💰 5 Value",
        inline: true,
      },
      {
        name: "🔮 Crystal ball",
        value:
          "A fortune tellers crystal ball, old battered and used. Made of glass of course, not real crystal, and probably worthless.\n💰 1 Value",
        inline: true,
      },
    ],
  }

  const embed = {
    title: `📦 Inventory (page ${currentPage} of ${totalPages})`,
    color: 0x2f3136,
    author: {
      name: "Yeonbi's Inventory",
      iconURL: "/placeholder.svg?height=32&width=32",
    },
    thumbnail: "/placeholder.svg?height=80&width=80",
    fields: inventoryItems[currentPage] || [],
    footer: {
      text: `Use items with /use <item> • Page ${currentPage}/${totalPages} • Type /help for commands`,
      iconURL: "/placeholder.svg?height=16&width=16",
    },
    timestamp: true,
  }

  const buttons = [
    {
      label: "◀️ Previous",
      style: "secondary" as const,
      disabled: currentPage === 1,
    },
    {
      label: "Next ▶️",
      style: "secondary" as const,
      disabled: currentPage === totalPages,
    },
    {
      label: "🎒 Use Item",
      style: "primary" as const,
    },
    {
      label: "❌ Close",
      style: "danger" as const,
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white">Inventory Panel Preview</h3>
      <DiscordMessage
        username="PassQuirkRPG"
        avatar="/placeholder.svg?height=40&width=40"
        timestamp="Today at 11:52 AM"
        embeds={[embed]}
        buttons={buttons}
      />
      <div className="flex gap-2">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Previous Page
        </button>
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Next Page
        </button>
      </div>
    </div>
  )
}
