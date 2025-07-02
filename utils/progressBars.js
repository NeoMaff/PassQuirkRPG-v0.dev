// Utilidades avanzadas para barras de progreso
class ProgressBarGenerator {
  static createAdvancedBar(current, max, options = {}) {
    const { length = 20, style = "modern", showPercentage = true, showNumbers = true, colorCode = "36" } = options

    const percentage = Math.min(current / max, 1)
    const filled = Math.floor(percentage * length)
    const empty = length - filled

    const styles = {
      modern: { fill: "▰", empty: "▱" },
      blocks: { fill: "█", empty: "░" },
      dots: { fill: "●", empty: "○" },
      arrows: { fill: "►", empty: "▷" },
      classic: { fill: "=", empty: "-" },
    }

    const s = styles[style] || styles.modern
    const bar = s.fill.repeat(filled) + s.empty.repeat(empty)
    const percent = Math.round(percentage * 100)

    let result = `\u001b[${colorCode}m${bar}\u001b[0m`

    if (showPercentage) {
      result += ` ${percent}%`
    }

    if (showNumbers) {
      result += ` (${current}/${max})`
    }

    return result
  }

  static createMultiColorBar(segments, totalLength = 20) {
    let result = ""
    let currentPos = 0

    segments.forEach((segment) => {
      const segmentLength = Math.floor((segment.value / 100) * totalLength)
      result += `\u001b[${segment.color}m${"█".repeat(segmentLength)}\u001b[0m`
      currentPos += segmentLength
    })

    const remaining = totalLength - currentPos
    if (remaining > 0) {
      result += "░".repeat(remaining)
    }

    return result
  }
}

module.exports = { ProgressBarGenerator }
