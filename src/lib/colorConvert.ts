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

export const convertColor = (color: number[], format: ColorFormat) => {
  if (format === 'hsv') return toFn(color, format)
  if (format === 'hsl') return toFn(hsv2hsl(color), format)
  if (format === 'rgb') return toFn(hsv2rgb(color), format)
  // Force rgba, even if color doesn't have alpha
  if (format === 'rgba') return toFn(hsv2rgb(color), format, true)
  return toHex(hsv2rgb(color))
}
