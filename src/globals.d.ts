import type { ColorPicker } from './core/ColorPicker'

declare global {
  interface DropperResponse {
    sRGBHex: string
  }

  class EyeDropper {
    constructor()
    open(options?: { signal?: AbortSignal }): Promise<DropperResponse>
  }

  interface Window {
    EyeDropper?: typeof EyeDropper
  }
}

export {}
