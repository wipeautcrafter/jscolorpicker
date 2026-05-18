import { converter, formatHex, formatHex8, type Color as Culori } from 'culori'
import type { ColorFormat } from './Color'

const fix = (v: number, p: number) => ('' + +Math.max(v, 0).toFixed(p)).replace(/^0\./g, '.')
const chop = (v: number) => Math.max(v, 0).toFixed()

const convertHex = (input: Culori, showAlpha: boolean) => {
  const color = converter('rgb')(input)
  return showAlpha ? formatHex8(color) : formatHex(color)
}

const convertRgb = (input: Culori, showAlpha: boolean) => {
  const {r, g, b, alpha = 1} = converter('rgb')(input)
  const base = `${chop(r * 255)} ${chop(g * 255)} ${chop(b * 255)}`
  return showAlpha ? `rgb(${base} / ${fix(alpha, 2)})` : `rgb(${base})`
}

const convertRgba = (input: Culori, _showAlpha: boolean) => {
  const {r, g, b, alpha = 1} = converter('rgb')(input)
  return `rgba(${chop(r * 255)},${chop(g * 255)},${chop(b * 255)},${fix(alpha, 2)})`
}

const convertHsl = (input: Culori, showAlpha: boolean) => {
  const {h = 0, s, l, alpha = 1} = converter('hsl')(input)
  const base = `${chop(h)} ${chop(s * 100)}% ${chop(l * 100)}%`
  return showAlpha ? `hsl(${base} / ${fix(alpha, 2)})` : `hsl(${base})`
}

const convertHsv = (input: Culori, showAlpha: boolean) => {
  const {h = 0, s, v, alpha = 1} = converter('hsv')(input)
  const base = `${chop(h)} ${chop(s * 100)}% ${chop(v * 100)}%`
  return showAlpha ? `hsv(${base} / ${fix(alpha, 2)})` : `hsv(${base})`
}

const convertOklch = (input: Culori, showAlpha: boolean) => {
  const { l, c, h = 0, alpha = 1 } = converter('oklch')(input)
  const base = `${fix(l * 100, 2)}% ${fix(c, 3)} ${fix(h, 2)}`
  return showAlpha ? `oklch(${base} / ${fix(alpha, 2)})` : `oklch(${base})`
}

const converters = {
  hex: convertHex,
  rgb: convertRgb,
  rgba: convertRgba,
  hsl: convertHsl,
  hsv: convertHsv,
  oklch: convertOklch
}

export const convertColor = (input: Culori, format: ColorFormat): string => {
  const showAlpha = (input.alpha ?? 1) < 1
  return converters[format](input, showAlpha)
}
