// inventory_panel_manager.js - Main manager combining all inventory components

const { EmbedBuilder } = require("discord.js")
const { createInventoryHeader } = require("./inventory_panel_header")
const { createInventoryBody } = require("./inventory_panel_body")
const { createInventoryFooter, createInventoryButtons } = require("./inventory_panel_footer")

function createInventoryEmbed(playerData, page = 1, totalPages = 3) {
  const header = createInventoryHeader(playerData, page, totalPages)
  const body = createInventoryBody(page)
  const footer = createInventoryFooter(page, totalPages)
  const buttons = createInventoryButtons(page, totalPages)

  const embed = new EmbedBuilder()
    .setTitle(header.title)
    .setColor(header.color)
    .setAuthor(header.author)
    .setThumbnail(header.thumbnail.url)
    .addFields(body)
    .setFooter(footer)
    .setTimestamp()

  return { embeds: [embed], components: buttons }
}

module.exports = { createInventoryEmbed }
