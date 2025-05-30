/**
 * Main JavaScript file for Discord Embed Preview
 * Handles initialization, panel switching, and core functionality
 */

class EmbedPreviewApp {
  constructor() {
    this.currentPanel = "inventory"
    this.currentPage = 1
    this.currentTheme = "dark"
    this.currentDevice = "desktop"
    this.isLoading = false

    this.init()
  }

  /**
   * Initialize the application
   */
  async init() {
    this.setupEventListeners()
    this.setupTheme()
    this.setupDeviceView()
    await this.loadPanel(this.currentPanel)

    console.log("🎮 PassQuirkRPG Embed Preview initialized")
  }

  /**
   * Setup event listeners for UI interactions
   */
  setupEventListeners() {
    // Panel selector buttons
    document.querySelectorAll(".panel-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const panel = e.target.dataset.panel
        this.switchPanel(panel)
      })
    })

    // Page selector
    const pageSelector = document.getElementById("page-selector")
    if (pageSelector) {
      pageSelector.addEventListener("change", (e) => {
        this.currentPage = Number.parseInt(e.target.value)
        this.loadPanel(this.currentPanel)
      })
    }

    // Theme selector
    const themeSelector = document.getElementById("theme-selector")
    if (themeSelector) {
      themeSelector.addEventListener("change", (e) => {
        this.currentTheme = e.target.value
        this.applyTheme(this.currentTheme)
      })
    }

    // Device selector
    const deviceSelector = document.getElementById("device-selector")
    if (deviceSelector) {
      deviceSelector.addEventListener("change", (e) => {
        this.currentDevice = e.target.value
        this.applyDeviceView(this.currentDevice)
      })
    }

    // Refresh button
    const refreshBtn = document.getElementById("refresh-btn")
    if (refreshBtn) {
      refreshBtn.addEventListener("click", () => {
        this.loadPanel(this.currentPanel)
      })
    }

    // Export button
    const exportBtn = document.getElementById("export-btn")
    if (exportBtn) {
      exportBtn.addEventListener("click", () => {
        this.openExportModal()
      })
    }

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      this.handleKeyboardShortcuts(e)
    })
  }

  /**
   * Switch to a different panel
   * @param {string} panelName - Name of the panel to switch to
   */
  async switchPanel(panelName) {
    if (this.isLoading || panelName === this.currentPanel) return

    // Update active button
    document.querySelectorAll(".panel-btn").forEach((btn) => {
      btn.classList.remove("active")
      if (btn.dataset.panel === panelName) {
        btn.classList.add("active")
      }
    })

    this.currentPanel = panelName
    this.currentPage = 1 // Reset to first page

    // Update page selector if needed
    this.updatePageSelector(panelName)

    await this.loadPanel(panelName)
    this.updatePanelInfo(panelName)
  }

  /**
   * Load and display a panel
   * @param {string} panelName - Name of the panel to load
   */
  async loadPanel(panelName) {
    this.setLoadingState(true)

    try {
      const embedData = await this.fetchEmbedData(panelName)
      this.renderEmbed(embedData)
      this.setLoadingState(false)
    } catch (error) {
      console.error("Error loading panel:", error)
      this.showError(error.message)
      this.setLoadingState(false)
    }
  }

  /**
   * Fetch embed data from the API
   * @param {string} panelName - Panel name
   * @returns {Promise<Object>} Embed data
   */
  async fetchEmbedData(panelName) {
    const endpoints = {
      inventory: `/api/embeds/inventory/${this.currentPage}`,
      battle: "/api/embeds/battle",
      tournament: "/api/embeds/tournament",
      dungeon: "/api/embeds/dungeon",
      character: "/api/embeds/character-creation",
    }

    const endpoint = endpoints[panelName]
    if (!endpoint) {
      throw new Error(`Unknown panel: ${panelName}`)
    }

    const response = await fetch(endpoint)
    if (!response.ok) {
      throw new Error(`Failed to fetch embed data: ${response.statusText}`)
    }

    return await response.json()
  }

  /**
   * Render the embed in the preview area
   * @param {Object} embedData - Embed data to render
   */
  renderEmbed(embedData) {
    const container = document.getElementById("messages-container")
    if (!container) return

    // Clear existing content
    container.innerHTML = ""

    // Create Discord message structure
    const messageElement = this.createMessageElement(embedData)
    container.appendChild(messageElement)

    // Setup button interactions
    this.setupButtonInteractions(messageElement, embedData)
  }

  /**
   * Create a Discord message element
   * @param {Object} embedData - Embed data
   * @returns {HTMLElement} Message element
   */
  createMessageElement(embedData) {
    const message = document.createElement("div")
    message.className = "discord-message"

    const avatar = document.createElement("img")
    avatar.className = "message-avatar"
    avatar.src = "/assets/avatars/bot-avatar.png"
    avatar.alt = "PassQuirkRPG Bot"

    const content = document.createElement("div")
    content.className = "message-content"

    // Message header
    const header = document.createElement("div")
    header.className = "message-header"
    header.innerHTML = `
      <span class="message-username">PassQuirkRPG</span>
      <span class="bot-tag">BOT</span>
      <span class="message-timestamp">Today at ${new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })}</span>
    `

    // Embed
    const embed = this.createEmbedElement(embedData.embeds[0])

    // Buttons
    const buttons = this.createButtonsElement(embedData.components)

    content.appendChild(header)
    content.appendChild(embed)
    if (buttons) content.appendChild(buttons)

    message.appendChild(avatar)
    message.appendChild(content)

    return message
  }

  /**
   * Create embed element
   * @param {Object} embedData - Embed data
   * @returns {HTMLElement} Embed element
   */
  createEmbedElement(embedData) {
    const embed = document.createElement("div")
    embed.className = "discord-embed"

    // Set border color based on embed color
    if (embedData.color) {
      const color = `#${embedData.color.toString(16).padStart(6, "0")}`
      embed.style.borderLeftColor = color
    }

    let html = ""

    // Author
    if (embedData.author) {
      html += `
        <div class="embed-author">
          ${embedData.author.icon_url ? `<img class="embed-author-icon" src="${embedData.author.icon_url}" alt="">` : ""}
          <span class="embed-author-name">${embedData.author.name}</span>
        </div>
      `
    }

    // Title
    if (embedData.title) {
      html += `<div class="embed-title">${embedData.title}</div>`
    }

    // Description
    if (embedData.description) {
      html += `<div class="embed-description">${embedData.description}</div>`
    }

    // Fields
    if (embedData.fields && embedData.fields.length > 0) {
      html += '<div class="embed-fields">'
      embedData.fields.forEach((field) => {
        html += `
          <div class="embed-field ${field.inline ? "inline" : ""}">
            <div class="embed-field-name">${field.name}</div>
            <div class="embed-field-value">${field.value}</div>
          </div>
        `
      })
      html += "</div>"
    }

    // Image
    if (embedData.image) {
      html += `<img class="embed-image" src="${embedData.image.url}" alt="">`
    }

    // Thumbnail
    if (embedData.thumbnail) {
      html += `<img class="embed-thumbnail" src="${embedData.thumbnail.url}" alt="">`
    }

    // Footer
    if (embedData.footer) {
      html += `
        <div class="embed-footer">
          ${embedData.footer.icon_url ? `<img class="embed-footer-icon" src="${embedData.footer.icon_url}" alt="">` : ""}
          <span class="embed-footer-text">${embedData.footer.text}</span>
          ${embedData.timestamp ? `<span class="embed-timestamp">• ${new Date(embedData.timestamp).toLocaleString()}</span>` : ""}
        </div>
      `
    }

    embed.innerHTML = html
    return embed
  }

  /**
   * Create buttons element
   * @param {Array} components - Button components
   * @returns {HTMLElement|null} Buttons element
   */
  createButtonsElement(components) {
    if (!components || components.length === 0) return null

    const buttonsContainer = document.createElement("div")
    buttonsContainer.className = "discord-buttons"

    components.forEach((row) => {
      const buttonRow = document.createElement("div")
      buttonRow.className = "button-row"

      row.components.forEach((button) => {
        const btn = document.createElement("button")
        btn.className = `discord-button ${this.getButtonStyleClass(button.style)}`
        btn.textContent = button.label
        btn.dataset.customId = button.custom_id
        btn.disabled = button.disabled || false

        buttonRow.appendChild(btn)
      })

      buttonsContainer.appendChild(buttonRow)
    })

    return buttonsContainer
  }

  /**
   * Get CSS class for button style
   * @param {number} style - Discord button style
   * @returns {string} CSS class name
   */
  getButtonStyleClass(style) {
    const styles = {
      1: "primary",
      2: "secondary",
      3: "success",
      4: "danger",
    }
    return styles[style] || "secondary"
  }

  /**
   * Setup button interactions
   * @param {HTMLElement} messageElement - Message element
   * @param {Object} embedData - Embed data
   */
  setupButtonInteractions(messageElement, embedData) {
    const buttons = messageElement.querySelectorAll(".discord-button")

    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        this.handleButtonClick(e.target.dataset.customId, embedData)
      })
    })
  }

  /**
   * Handle button click interactions
   * @param {string} customId - Button custom ID
   * @param {Object} embedData - Current embed data
   */
  async handleButtonClick(customId, embedData) {
    console.log("Button clicked:", customId)

    // Handle pagination for inventory
    if (customId.includes("inventory_prev") || customId.includes("inventory_next")) {
      const isNext = customId.includes("next")
      const newPage = isNext ? this.currentPage + 1 : this.currentPage - 1

      if (newPage >= 1 && newPage <= 3) {
        this.currentPage = newPage
        document.getElementById("page-selector").value = newPage
        await this.loadPanel("inventory")
      }
      return
    }

    // Show interaction feedback
    this.showButtonFeedback(customId)
  }

  /**
   * Show feedback for button interactions
   * @param {string} customId - Button custom ID
   */
  showButtonFeedback(customId) {
    const messages = {
      inventory_use: "🎒 Item usage system coming soon!",
      inventory_search: "🔍 Use /search <item> to find items",
      inventory_sort: "📊 Inventory sorting options available",
      inventory_close: "❌ Inventory closed",
      battle_shoot: "🏹 You shot an arrow at the enemy!",
      battle_heal: "💚 You healed yourself!",
      battle_escape: "🏃 You escaped from battle!",
      tournament_join: "⚔️ Joined the tournament!",
      dungeon_left: "⬅️ You went left!",
      dungeon_straight: "⬆️ You went straight!",
      dungeon_right: "➡️ You went right!",
      start_quest: "🗺️ Starting your first quest...",
      view_character: "👤 Showing character profile...",
    }

    const message = messages[customId] || `Action: ${customId}`
    this.showToast(message)
  }

  /**
   * Show toast notification
   * @param {string} message - Message to show
   */
  showToast(message) {
    // Remove existing toast
    const existingToast = document.querySelector(".toast")
    if (existingToast) {
      existingToast.remove()
    }

    // Create new toast
    const toast = document.createElement("div")
    toast.className = "toast"
    toast.textContent = message
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: var(--discord-bg-secondary);
      color: var(--discord-text-primary);
      padding: 12px 16px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
    `

    document.body.appendChild(toast)

    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.animation = "slideOut 0.3s ease-out"
      setTimeout(() => toast.remove(), 300)
    }, 3000)
  }

  /**
   * Set loading state
   * @param {boolean} loading - Loading state
   */
  setLoadingState(loading) {
    this.isLoading = loading
    const loadingElement = document.getElementById("loading-state")
    const messagesContainer = document.getElementById("messages-container")
    const errorElement = document.getElementById("error-state")

    if (loading) {
      loadingElement.style.display = "flex"
      messagesContainer.style.display = "none"
      errorElement.style.display = "none"
    } else {
      loadingElement.style.display = "none"
      messagesContainer.style.display = "block"
      errorElement.style.display = "none"
    }
  }

  /**
   * Show error state
   * @param {string} message - Error message
   */
  showError(message) {
    const errorElement = document.getElementById("error-state")
    const errorMessage = document.getElementById("error-message")
    const loadingElement = document.getElementById("loading-state")
    const messagesContainer = document.getElementById("messages-container")

    errorMessage.textContent = message
    errorElement.style.display = "flex"
    loadingElement.style.display = "none"
    messagesContainer.style.display = "none"
  }

  /**
   * Setup theme
   */
  setupTheme() {
    this.applyTheme(this.currentTheme)
  }

  /**
   * Apply theme
   * @param {string} theme - Theme name
   */
  applyTheme(theme) {
    document.body.className = theme === "light" ? "light-theme" : ""
  }

  /**
   * Setup device view
   */
  setupDeviceView() {
    this.applyDeviceView(this.currentDevice)
  }

  /**
   * Apply device view
   * @param {string} device - Device type
   */
  applyDeviceView(device) {
    const container = document.querySelector(".discord-channel")
    if (!container) return

    container.classList.remove("device-desktop", "device-tablet", "device-mobile")
    container.classList.add(`device-${device}`)

    // Adjust container width based on device
    const widths = {
      desktop: "100%",
      tablet: "768px",
      mobile: "375px",
    }

    container.style.maxWidth = widths[device]
    container.style.margin = "0 auto"
  }

  /**
   * Update page selector based on panel
   * @param {string} panelName - Panel name
   */
  updatePageSelector(panelName) {
    const pageSelector = document.getElementById("page-selector")
    if (!pageSelector) return

    // Only inventory has multiple pages currently
    if (panelName === "inventory") {
      pageSelector.style.display = "block"
      pageSelector.value = this.currentPage
    } else {
      pageSelector.style.display = "none"
    }
  }

  /**
   * Update panel information
   * @param {string} panelName - Panel name
   */
  updatePanelInfo(panelName) {
    const panelInfo = document.getElementById("panel-info")
    if (!panelInfo) return

    const info = {
      inventory: {
        title: "📦 Inventory Panel",
        description: "Displays player items with pagination, descriptions, and values.",
        features: [
          "Item pagination (3 pages)",
          "Equipment status indicators",
          "Gold value display",
          "Use/Sort/Search actions",
        ],
      },
      battle: {
        title: "⚔️ Battle Panel",
        description: "Shows combat encounters with HP/MP tracking and action buttons.",
        features: [
          "Player vs Enemy stats",
          "HP/MP bars",
          "Battle scene images",
          "Combat actions (Shoot, Heal, Escape)",
        ],
      },
      tournament: {
        title: "🏆 Tournament Panel",
        description: "Displays PvP tournament rankings and rewards.",
        features: ["Weekly rankings", "Prize pool display", "Player medal count", "Tournament participation"],
      },
      dungeon: {
        title: "🏰 Dungeon Panel",
        description: "Handles dungeon exploration with navigation options.",
        features: ["Room descriptions", "Direction choices", "Player stats display", "Dungeon imagery"],
      },
      character: {
        title: "👤 Character Creation Panel",
        description: "Confirms character creation with starting equipment.",
        features: ["Starting equipment list", "Character stats", "Quest start options", "Tutorial access"],
      },
    }

    const panelData = info[panelName]
    if (panelData) {
      panelInfo.innerHTML = `
        <h3>${panelData.title}</h3>
        <p>${panelData.description}</p>
        <h4>Features:</h4>
        <ul>
          ${panelData.features.map((feature) => `<li>${feature}</li>`).join("")}
        </ul>
      `
    }
  }

  /**
   * Handle keyboard shortcuts
   * @param {KeyboardEvent} e - Keyboard event
   */
  handleKeyboardShortcuts(e) {
    // Ctrl/Cmd + R: Refresh
    if ((e.ctrlKey || e.metaKey) && e.key === "r") {
      e.preventDefault()
      this.loadPanel(this.currentPanel)
    }

    // Arrow keys for navigation
    if (e.key === "ArrowLeft" && this.currentPanel === "inventory" && this.currentPage > 1) {
      this.currentPage--
      document.getElementById("page-selector").value = this.currentPage
      this.loadPanel("inventory")
    }

    if (e.key === "ArrowRight" && this.currentPanel === "inventory" && this.currentPage < 3) {
      this.currentPage++
      document.getElementById("page-selector").value = this.currentPage
      this.loadPanel("inventory")
    }

    // Number keys for panel switching
    const panelKeys = {
      1: "inventory",
      2: "battle",
      3: "tournament",
      4: "dungeon",
      5: "character",
    }

    if (panelKeys[e.key]) {
      this.switchPanel(panelKeys[e.key])
    }
  }

  /**
   * Open export modal
   */
  openExportModal() {
    // This would open the export modal
    // Implementation depends on the export manager
    console.log("Opening export modal...")
    this.showToast("📤 Export functionality coming soon!")
  }
}

// Add CSS for toast animations
const style = document.createElement("style")
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  .device-mobile .discord-embed {
    max-width: 100%;
  }

  .device-tablet .discord-embed {
    max-width: 90%;
  }
`
document.head.appendChild(style)

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.embedPreviewApp = new EmbedPreviewApp()
})

// Global function for retry button
window.loadCurrentPanel = () => {
  if (window.embedPreviewApp) {
    window.embedPreviewApp.loadPanel(window.embedPreviewApp.currentPanel)
  }
}
