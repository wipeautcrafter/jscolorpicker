interface DropperResponse {
  sRGBHex: string
}

class EyeDropper {
  constructor()
  open(options?: { signal?: AbortSignal }): Promise<DropperResponse>
}

declare global {
  interface Window {
    EyeDropper?: typeof EyeDropper
  }
}
