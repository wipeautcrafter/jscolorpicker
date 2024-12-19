import '../../src/index'
import Color from 'color'

let color = new Color('red')

const root = document.querySelector<HTMLButtonElement>('.cp_root')!
const dialog = document.querySelector<HTMLElement>('.cp_dialog')!

const hsv = dialog.querySelector<HTMLElement>('.cp_area-hsv')!
const hsvThumb = hsv.querySelector<HTMLElement>('.cp_thumb')!

const hue = dialog.querySelector<HTMLElement>('.cp_slider-hue')!
const hueThumb = hue.querySelector<HTMLElement>('.cp_thumb')!

const alpha = dialog.querySelector<HTMLElement>('.cp_slider-alpha')!
const alphaThumb = alpha.querySelector<HTMLElement>('.cp_thumb')!

// Slider
const sliderHook = (el: HTMLElement, cb: (x: number, y: number) => void) => {
  const handleDrag = (e: PointerEvent) => {
    const rect = el.getBoundingClientRect()
    let x = (e.clientX - rect.x) / rect.width
    if (x < 0) x = 0
    if (x > 1) x = 1
    let y = (e.clientY - rect.y) / rect.height
    if (y < 0) y = 0
    if (y > 1) y = 1
    cb(x, y)
  }
  el.addEventListener('pointerdown', (e) => {
    el.setPointerCapture(e.pointerId)
    handleDrag(e)
  })
  el.addEventListener('pointermove', (e) => {
    if (!el.hasPointerCapture(e.pointerId)) return
    handleDrag(e)
  })
  el.addEventListener('pointerup', (e) => {
    el.releasePointerCapture(e.pointerId)
  })
}

const updateColor = () => {
  const preview = color.hexa()

  root.style.setProperty('--cp-color', preview)
  root.style.setProperty('--cp-hue', color.hue().toString())
  root.style.setProperty('--cp-alpha', color.alpha().toString())

  hsvThumb.style.left = `${color.saturationv()}%`
  hsvThumb.style.top = `${100 - color.value()}%`

  hueThumb.style.left = `${color.hue() / 3.6}%`
  alphaThumb.style.left = `${color.alpha() * 100}%`
}

sliderHook(hsv, (x, y) => {
  color = color.saturationv(x * 100).value(100 - y * 100)
  updateColor()
})

sliderHook(hue, (x) => {
  color = color.hue(x * 359.999)
  updateColor()
})

sliderHook(alpha, (x) => {
  color = color.alpha(x)
  updateColor()
})

updateColor()
