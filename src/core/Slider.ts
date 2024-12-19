import EventEmitter from 'events'

export class Slider extends EventEmitter<{
  drag: [x: number, y: number]
}> {
  $track: HTMLElement
  $thumb: HTMLElement

  constructor($element: HTMLElement) {
    super()

    this.$track = $element
    this.$thumb = $element.querySelector('.cp_thumb')!

    this.$track.addEventListener('pointerdown', (e) => {
      this.$track.setPointerCapture(e.pointerId)
      this.handleDrag(e)
    })

    this.$track.addEventListener('pointermove', (e) => {
      if (!this.$track.hasPointerCapture(e.pointerId)) return
      this.handleDrag(e)
    })

    this.$track.addEventListener('pointerup', (e) => {
      this.$track.releasePointerCapture(e.pointerId)
    })
  }

  private handleDrag(e: PointerEvent) {
    const rect = this.$track.getBoundingClientRect()

    let x = (e.clientX - rect.x) / rect.width
    if (x < 0) x = 0
    if (x > 1) x = 1

    let y = (e.clientY - rect.y) / rect.height
    if (y < 0) y = 0
    if (y > 1) y = 1

    this.emit('drag', x, y)
  }

  moveThumb(x?: number, y?: number) {
    if (x !== undefined) this.$thumb.style.left = `${x * 100}%`
    if (y !== undefined) this.$thumb.style.top = `${y * 100}%`
  }
}
