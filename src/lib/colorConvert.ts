import type { ColorFormat } from './Color'

const chop = (v: number) => v.toFixed()
const fix = (v: number, p: number) => ('' + +v.toFixed(p)).replace(/^0\./g, '.')

// https://stackoverflow.com/a/54116681
const hsv2hsl = ([h, s, v, a]: number[]) => {
  const l = v - (v * s) / 2
  const m = Math.min(l, 1 - l)
  return [h, m ? (v - l) / m : 0, l, a]
}

// https://stackoverflow.com/a/54024653
const hsv2rgb = ([h, s, v, a]: number[]) => {
  const f = (n: number, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0)
  return [f(5), f(3), f(1), a]
}

const toFn = ([c1, c2, c3, a]: number[], name: string, forceAlpha: boolean = false) => {
  const includeAlpha = forceAlpha || a < 1
  if ('rgb' === name && includeAlpha) {
    name = 'rgba'
  }

  const values = name.startsWith('hs')
    ? [chop(c1), chop(c2 * 100) + '%', chop(c3 * 100) + '%']
    : [chop(c1 * 255), chop(c2 * 255), chop(c3 * 255)]

  if (includeAlpha) values.push(fix(a, 2))
  return `${name}(${values.join()})`
}

const toHex = (color: number[]) =>
  '#' +
  color
    .slice(0, color[3] < 1 ? 4 : 3)
    .map((v) =>
      Math.round(v * 255)
        .toString(16)
        .padStart(2, '0'),
    )
    .join('')

const srgbToLinear = (c: number) =>
  c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)

const hsv2oklch = (hsv: number[]) => {
  const [r, g, b, a] = hsv2rgb(hsv)
  const lr = srgbToLinear(r)
  const lg = srgbToLinear(g)
  const lb = srgbToLinear(b)

  // Linear RGB -> LMS (Oklab M1)
  const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb
  const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb
  const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb

  const l_ = Math.cbrt(l)
  const m_ = Math.cbrt(m)
  const s_ = Math.cbrt(s)

  // LMS^ -> OKLab (Oklab M2)
  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_
  const A = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_
  const B = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_

  const C = Math.sqrt(A * A + B * B)
  const H = ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360

  return [L, C, H, a]
}

const toOklch = ([L, C, H, a]: number[]) => {
  const includeAlpha = a < 1
  const parts = `${fix(L, 3)} ${fix(C, 3)} ${fix(H, 2)}`
  return includeAlpha ? `oklch(${parts} / ${fix(a, 2)})` : `oklch(${parts})`
}

export const convertColor = (color: number[], format: ColorFormat) => {
  if (format === 'hsv') return toFn(color, format)
  if (format === 'hsl') return toFn(hsv2hsl(color), format)
  if (format === 'rgb') return toFn(hsv2rgb(color), format)
  // Force rgba, even if color doesn't have alpha
  if (format === 'rgba') return toFn(hsv2rgb(color), format, true)
  if (format === 'oklch') return toOklch(hsv2oklch(color))
  return toHex(hsv2rgb(color))
}
