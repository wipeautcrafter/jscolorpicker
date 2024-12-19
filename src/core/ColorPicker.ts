import { createPopper } from '@popperjs/core'
import { Color } from '../lib/Color'

import { Slider } from './Slider'
import { defaultConfig } from './config'
import { parseColor } from '../lib/colorParse'

import caretIcon from '../icon/caret.svg?raw'
import dialogContent from '../html/dialog.html?raw'

import type { PickerConfig } from './config'
import type { ColorFormat } from '../lib/Color'
import type { Instance as PopperInstance } from '@popperjs/core'

export class ColorPicker {
  get open() {
    return this._open
  }
  set open(value: boolean) {
    this.toggle(value)
  }
  get color() {
    return this._color
  }
  set color(value: Color) {
    this.setColor(value)
  }
  get element() {
    return this.$root
  }
  get format() {
    return this._format
  }

  private _open = false
  private _color: Color
  private _format: ColorFormat

  private config: PickerConfig
  private popper?: PopperInstance
  private previousColor: Color

  private $root: HTMLElement
  private $dialog: HTMLElement
  private $button: HTMLButtonElement
  private $input: HTMLInputElement

  private hsvSlider: Slider
  private hueSlider: Slider
  private alphaSlider?: Slider

  private $formats: HTMLElement[]
  private $colorInput: HTMLInputElement

  constructor($from?: HTMLElement | string | null, config: Partial<PickerConfig> = {}) {
    this.config = { ...defaultConfig, ...config }

    // Parse query and ensure element exists
    if (!$from) {
      $from = document.createElement('div')
    } else if (typeof $from === 'string') {
      $from = document.querySelector<HTMLElement>($from)
    }
    if (!$from) throw new Error('Element is null.')

    // Create toggle
    if ($from instanceof HTMLInputElement) {
      this.$input = $from
    } else if ($from instanceof HTMLButtonElement) {
      this.$button = $from
    } else {
      this.$root = $from
    }

    if (!this.$root) {
      const $parent = $from.parentElement!
      $parent.removeChild($from)
      this.$root = document.createElement('div')
      $parent.append(this.$root)
    }
    this.$root.classList.add('cp_root')

    this.$button = this.$button ?? document.createElement('button')
    this.$button.classList.add('cp_toggle')

    this.$input = this.$input ?? document.createElement('input')
    this.$input.tabIndex = -1

    const $caret = document.createElement('div')
    $caret.className = 'cp_caret'
    $caret.innerHTML = caretIcon

    this.$root.append(this.$button)
    this.$button.append(this.$input, $caret)

    // Create dialog
    this.$root.insertAdjacentHTML('afterbegin', dialogContent)
    this.$dialog = this.$root.querySelector('.cp_dialog')!
    this.$colorInput = this.$root.querySelector('.cp_input')!

    this.closeDialog()
    this.populateDialog()
    this.bindDialog()

    // Apply default values
    this.setColor(new Color(this.config.defaultColor))
    this.setFormat(this.config.defaultFormat)

    // Apply config styles
    this.$root.style.setProperty('--cp-delay', `${this.config.animationDuration}ms`)
    if (this.config.toggleStyle === 'input') this.$button.classList.add('cp_wide')

    // Bind events
    this.$button.addEventListener('click', () => this.toggle())

    if (this.config.dismissOnOutsideClick)
      window.addEventListener('pointerdown', (event) => {
        if (!this._open) return
        const $target = event.target as HTMLElement
        if (!$target.closest('.cp_root')) this.closeDialog()
      })
  }

  toggle(value = !this._open) {
    if (value) {
      this.openDialog()
    } else {
      this.closeDialog()
    }
  }

  private openDialog() {
    this._open = true
    this.previousColor = this._color.clone()

    this.$dialog.style.removeProperty('display')
    setTimeout(() => this.$root.classList.add('cp_open'))

    this.popper = createPopper(this.$button, this.$dialog, {
      placement: 'top',
      strategy: 'absolute',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ],
    })
  }

  private populateDialog() {
    // Create swatches based on config and assign event listener
    if (this.config.swatches) {
      const $swatches = this.config.swatches.map((swatch) => {
        const $swatch = document.createElement('button')
        $swatch.className = 'cp_swatch'
        $swatch.style.setProperty('--cp-color', swatch)
        $swatch.dataset.color = swatch

        const color = new Color($swatch.dataset.color!)
        $swatch.addEventListener('click', () => this.setColor(color))

        return $swatch
      })
      this.$root.querySelector('.cp_swatches')!.append(...$swatches)
    }

    // Create formats based on config and assign event listener
    if (this.config.formats) {
      this.$formats = this.config.formats.map((format) => {
        const $format = document.createElement('button')
        $format.className = 'cp_format'
        $format.dataset.format = format
        $format.textContent = format.toUpperCase()

        $format.addEventListener('click', () => this.setFormat(format))
        return $format
      })
      this.$root.querySelector('.cp_formats')!.append(...this.$formats)
    }
  }

  private bindDialog() {
    // Binding to these tracks is very simple :)
    const $hsvTrack = this.$root.querySelector('.cp_area-hsv')
    this.hsvSlider = new Slider($hsvTrack as HTMLElement)
    this.hsvSlider.on('drag', (x, y) => {
      this.setColor(this._color.saturation(x).value(1 - y))
    })

    const $hueTrack = this.$root.querySelector('.cp_slider-hue')
    this.hueSlider = new Slider($hueTrack as HTMLElement)
    this.hueSlider.on('drag', (x) => {
      this.setColor(this._color.hue(x * 360))
    })

    const $alphaTrack = this.$root.querySelector('.cp_slider-alpha') as HTMLElement
    if (this.config.enableAlpha) {
      this.alphaSlider = new Slider($alphaTrack as HTMLElement)
      this.alphaSlider.on('drag', (x) => {
        this.setColor(this._color.alpha(x))
      })
    } else {
      $alphaTrack.remove()
    }

    // When changing the input value, update color
    this.$colorInput.addEventListener('input', () => {
      try {
        const { color, format } = parseColor(this.$colorInput.value)
        this.setColor(new Color(color), false)
        this.setFormat(format, false)
      } catch (error) {
        // do nothing
      }
    })

    // When clicking the eyedropper, the EyeDropper WebAPI will be invoked
    const $eyedrop = this.$root.querySelector('.cp_eyedrop') as HTMLButtonElement
    if (this.config.enableEyedropper && 'EyeDropper' in window) {
      $eyedrop.addEventListener('click', () => {
        new EyeDropper()
          .open()
          .then((result) => {
            const color = new Color(result.sRGBHex)
            this.setColor(color)
          })
          .catch(() => {})
      })
    } else {
      $eyedrop.remove()
    }

    // When clicking cancel, the color should be set to the color chosen prior to opening the modal
    const $cancel = this.$root.querySelector('.cp_cancel') as HTMLButtonElement
    if (this.config.showCancelButton) {
      $cancel.addEventListener('click', () => {
        this.setColor(this.previousColor)
        this.closeDialog()
      })
    } else {
      $cancel.remove()
    }

    // When clicking submit, nothing has to happen: the modal just has to close
    const $submit = this.$root.querySelector('.cp_submit') as HTMLButtonElement
    if (this.config.showSubmitButton) {
      $submit.addEventListener('click', () => this.closeDialog())
    } else {
      $submit.remove()
    }
  }

  private closeDialog() {
    this._open = false
    this.$root.classList.remove('cp_open')

    setTimeout(() => {
      this.$dialog.style.display = 'none'
      this.popper?.destroy()
      this.popper = undefined
    }, this.config.animationDuration)
  }

  private setColor(color: Color, updateInput = true) {
    this._color = color

    this.hsvSlider.moveThumb(this._color.saturation(), 1 - this._color.value())
    this.hueSlider.moveThumb(this._color.hue() / 360)
    this.alphaSlider?.moveThumb(this._color.alpha())

    this.$root.style.setProperty('--cp-color', this._color.toString())
    this.$root.style.setProperty('--cp-hue', this._color.hue().toString())
    this.$root.style.setProperty('--cp-alpha', this._color.alpha().toString())

    this.updatePreview(updateInput)
  }

  private updatePreview(updateInput = true) {
    if (!this._format || !this._color) return

    const value = this._color.string(this._format)

    this.$input.value = value
    if (updateInput) this.$colorInput.value = value
  }

  private setFormat(format: ColorFormat, updatePreview = true) {
    this._format = format
    this.$formats.forEach(($fmt) => $fmt.removeAttribute('aria-checked'))

    const $checked = this.$formats.find(($fmt) => $fmt.dataset.format === format)
    if ($checked) $checked.ariaChecked = 'true'

    if (updatePreview) this.updatePreview()
  }
}
