import EventEmitter from 'events'

export class Slider extends EventEmitter<{
  drag: [x: number, y: number]
}> {
  x = 0
  y = 0

  $track: HTMLElement
  $thumb: HTMLElement

  constructor($element: HTMLElement) {
    super()

    this.$track = $element
    this.$thumb = $element.querySelector('.cp_thumb')!

    this.$track.addEventListener('pointerdown', (e) => {
      this.$track.setPointerCapture(e.pointerId)
      this.handleDrag(e)
      e.preventDefault()
    })

    this.$track.addEventListener('pointermove', (e) => {
      if (!this.$track.hasPointerCapture(e.pointerId)) return
      this.handleDrag(e)
      e.preventDefault()
    })

    this.$track.addEventListener('pointerup', (e) => {
      this.$track.releasePointerCapture(e.pointerId)
      this.$thumb.focus() // Allows slider to be controlled by arrow keys on keyboard
      e.preventDefault()
    })

    this.$track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.handleNudge(-1, 0, e.shiftKey)
        e.preventDefault()
      } else if (e.key === 'ArrowRight') {
        this.handleNudge(1, 0, e.shiftKey)
        e.preventDefault()
      } else if (e.key === 'ArrowUp') {
        this.handleNudge(0, -1, e.shiftKey)
        e.preventDefault()
      } else if (e.key === 'ArrowDown') {
        this.handleNudge(0, 1, e.shiftKey)
        e.preventDefault()
      }
    })
  }

  private handleDrag(e: PointerEvent) {
    const rect = this.$track.getBoundingClientRect()
    this.fireDrag((e.clientX - rect.x) / rect.width, (e.clientY - rect.y) / rect.height)
  }

  private handleNudge(x: number, y: number, shift: boolean) {
    const mult = shift ? 0.1 : 0.01
    this.fireDrag(this.x + x * mult, this.y + y * mult)
  }

  private fireDrag(x: number, y: number) {
    if (x < 0) x = 0
    else if (x > 1) x = 1
    if (y < 0) y = 0
    else if (y > 1) y = 1
    this.emit('drag', x, y)
  }

  move(x?: number, y?: number) {
    if (x !== undefined) {
      this.x = x
      this.$thumb.style.left = `${x * 100}%`
    }
    if (y !== undefined) {
      this.y = y
      this.$thumb.style.top = `${y * 100}%`
    }
  }
}
