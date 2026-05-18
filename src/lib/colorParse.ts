import { clampRgb, converter, parse } from "culori"
import type { ColorFormat } from './Color'

const getFormat = (input: string): ColorFormat => {
  if(input.match(/^rgb/i)) return 'rgb'
  if(input.match(/^hsl/i)) return 'hsl'
  if(input.match(/^hsv/i)) return 'hsv'
  if(input.match(/^oklch/i)) return 'oklch'
  return 'hex'
}

const hsvRegex =
  /^hsva?\(\s*(?<h>[+-]?(?:\d+(?:\.\d+)?|\.\d+)(?:deg)?)\s*(?:(?:,\s*)|\s+)(?<s>[+-]?(?:\d+(?:\.\d+)?|\.\d+)%)\s*(?:(?:,\s*)|\s+)(?<v>[+-]?(?:\d+(?:\.\d+)?|\.\d+)%)\s*(?:(?:,\s*|\s*\/\s*)(?<a>[+-]?(?:\d+(?:\.\d+)?|\.\d+)%?))?\s*\)$/i;

const parseFallback = (input: string) => {
  const match = input.match(hsvRegex);
  if(!match?.groups) return null;
  
  const {h, s, v, a = '1'} = match.groups;
  const alphaPercentage = a?.match(/%$/);

  return {
    mode: 'hsv',
    h: Number.parseFloat(h),
    s: Number.parseFloat(s) / 100,
    v: Number.parseFloat(v) / 100,
    alpha: Number.parseFloat(a) / (alphaPercentage ? 100 : 1)
  } as const
}

export const parseColor = (raw: string): { color: number[]; format: ColorFormat } => {
  const input = raw.trim()
  const format = getFormat(input)
  const parsed = parse(input) ?? parseFallback(input)

  if(!parsed) throw new Error('Color could not be parsed!')

  const {h = 0, s, v, alpha = 1} = clampRgb(converter('hsv')(parsed))
  const color = [h, s, v, alpha]

  return { color, format }
}
