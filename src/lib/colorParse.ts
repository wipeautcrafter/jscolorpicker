import type { ColorFormat } from './Color'

// https://stackoverflow.com/a/54070620
const rgb2hsv = ([r, g, b, a]: number[]) => {
  const v = Math.max(r, g, b)
  const c = v - Math.min(r, g, b)
  const h = c && (v == r ? (g - b) / c : v == g ? 2 + (b - r) / c : 4 + (r - g) / c)
  return [60 * (h < 0 ? h + 6 : h), v && c / v, v, a]
}

const strip = (input: string) =>
  input
    .replace(/[^0-9%.,]/g, '')
    .split(',')
    .map((v) => parseFloat(v) / (v.endsWith('%') ? 100 : 1))

const parseCSS = (input: string) => {
  const $el = document.createElement('span')
  $el.style.display = 'none'
  $el.style.color = input
  document.body.append($el)
  const { color } = getComputedStyle($el)
  $el.remove()

  if (!color) return null
  const [r, g, b, a] = strip(color)
  return rgb2hsv([r / 255, g / 255, b / 255, a])
}

const parseHSV = (input: string) => {
  const color = strip(input).map((v, i) => Math.min(v, i ? 1 : 255))
  if (color.length < 3 || color.some((v) => isNaN(v))) return null
  return color
}

export const parseColor = (input: string) => {
  let format: ColorFormat

  if (/^hsva?\(/.test(input)) format = 'hsv'
  else if (/^hsla?\(/.test(input)) format = 'hsl'
  else if (/^rgba?\(/.test(input)) format = 'rgb'
  else format = 'hex'

  const color = format === 'hsv' ? parseHSV(input) : parseCSS(input)
  if (!color) throw new Error('Color could not be parsed!')

  color[3] = color[3] ?? 1

  return { color, format }
}
