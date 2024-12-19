import { EventEmitter } from 'events'
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

export class ColorPicker extends EventEmitter<{
  open: []
  pick: [Color | null]
  cancel: []
  close: []
}> {
  get isOpen() {
    return this._open
  }
  get color() {
    return this._unset ? null : this._appliedColor
  }
  get selectedColor() {
    return this._color
  }
  get element() {
    return this.$root
  }
  get format() {
    return this._format
  }

  private _open = false
  private _unset = true
  private _format: ColorFormat
  private _color: Color
  private _appliedColor: Color

  private config: PickerConfig
  private popper?: PopperInstance

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
    super()
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
      this.$root = document.createElement('div')
      $from.insertAdjacentElement('beforebegin', this.$root)
      $from.parentElement?.removeChild($from)
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

    this.close()
    this.populateDialog()
    this.bindDialog()

    // Apply default values
    if (this.config.defaultColor) {
      this._setAppliedColor(new Color(this.config.defaultColor))
    }
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
        if (!$target.closest('.cp_root')) this.close()
      })
  }

  toggle(value = !this._open) {
    if (value) {
      this.open()
    } else {
      this.close()
    }
  }

  open(emit = true) {
    this._open = true

    window.cp_openPicker?.close()
    window.cp_openPicker = this

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

    if (emit) this.emit('open')
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
        $swatch.addEventListener('click', () => this._setColor(color))

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
      this._setColor(this._color.saturation(x).value(1 - y))
    })

    const $hueTrack = this.$root.querySelector('.cp_slider-hue')
    this.hueSlider = new Slider($hueTrack as HTMLElement)
    this.hueSlider.on('drag', (x) => {
      this._setColor(this._color.hue(x * 360))
    })

    const $alphaTrack = this.$root.querySelector('.cp_slider-alpha') as HTMLElement
    if (this.config.enableAlpha) {
      this.alphaSlider = new Slider($alphaTrack as HTMLElement)
      this.alphaSlider.on('drag', (x) => {
        this._setColor(this._color.alpha(x))
      })
    } else {
      $alphaTrack.remove()
    }

    // When changing the input value, update color
    this.$colorInput.addEventListener('input', () => {
      try {
        const { color, format } = parseColor(this.$colorInput.value)
        this._setColor(new Color(color), false)
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
            this._setColor(color)
          })
          .catch(() => {})
      })
    } else {
      $eyedrop.remove()
    }

    // When clicking cancel, dismiss dialog
    const $cancel = this.$root.querySelector('.cp_cancel') as HTMLButtonElement
    if (this.config.showCancelButton) {
      $cancel.addEventListener('click', () => {
        this.close()
        this.emit('cancel')
      })
    } else {
      $cancel.remove()
    }

    // When clicking submit, dismiss dialog
    const $submit = this.$root.querySelector('.cp_submit') as HTMLButtonElement
    if (this.config.showSubmitButton) {
      $submit.addEventListener('click', () => {
        this._setAppliedColor(this._color)
        this.close()
      })
    } else {
      $submit.remove()
    }

    // When clicking clear, set color to null
    const $clear = this.$root.querySelector('.cp_clear') as HTMLButtonElement
    if (this.config.showClearButton) {
      $clear.addEventListener('click', () => {
        this.clear()
        this.close()
      })
    } else {
      $clear.remove()
    }
  }

  close(emit = true) {
    this._open = false
    window.cp_openPicker = undefined
    this.$root.classList.remove('cp_open')

    setTimeout(() => {
      this.$dialog.style.display = 'none'
      this.popper?.destroy()
      this.popper = undefined
    }, this.config.animationDuration)

    if (emit) this.emit('close')
  }

  clear(emit = false) {
    this._unset = true
    this.applyColor()
    this.applyPreview()
    if (emit) this.emit('pick', null)
  }

  setColor(color: Color | number[] | string | null, emit = false) {
    if (!color) return this.clear(emit)
    this._setAppliedColor(new Color(color), emit)
  }

  private _setAppliedColor(color: Color, emit = true) {
    this._unset = false
    this._color = color
    this._appliedColor = color
    this.applyColor()

    if (emit) this.emit('pick', this.color)
  }

  private _setColor(color: Color, updateInput = true) {
    this._color = color
    if (this.config.commitMode === 'instant') {
      this._unset = false
      this._appliedColor = color
      this.emit('pick', this.color)
    }
    this.applyColor(updateInput)
  }

  private applyColor(updateInput = true) {
    this.$root.classList.toggle('cp_unset', this._unset)
    this.$root.style.setProperty(
      '--cp-applied',
      this._unset ? 'transparent' : this._appliedColor.toString()
    )

    this.$root.style.setProperty('--cp-color', this._color.toString())
    this.$root.style.setProperty('--cp-hue', this._color.hue().toString())
    this.$root.style.setProperty('--cp-alpha', this._color.alpha().toString())

    this.hsvSlider.moveThumb(this._color.saturation(), 1 - this._color.value())
    this.hueSlider.moveThumb(this._color.hue() / 360)
    this.alphaSlider?.moveThumb(this._color.alpha())

    this.applyPreview(updateInput)
  }

  private setFormat(format: ColorFormat, applyPreview = true) {
    this._format = format
    this.applyFormat()
    if (applyPreview) this.applyPreview()
  }

  private applyPreview(updateInput = true) {
    if (!this._format || !this._color) return

    const value = this._color.string(this._format)

    this.$input.value = this._unset ? '-' : value
    if (updateInput) this.$colorInput.value = value
  }

  private applyFormat() {
    this.$formats.forEach(($fmt) => $fmt.removeAttribute('aria-checked'))

    const $checked = this.$formats.find(($fmt) => $fmt.dataset.format === this._format)
    if ($checked) $checked.ariaChecked = 'true'
  }
}
