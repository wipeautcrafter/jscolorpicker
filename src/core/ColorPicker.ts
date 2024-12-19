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
  /**
   * Get whether the dialog is currently open.
   */
  get isOpen() {
    return this._open
  }
  /**
   * Get the picked color.
   */
  get color() {
    return this._unset ? null : this._appliedColor
  }
  /**
   * Get the color currently selected in the dialog.
   */
  get selectedColor() {
    return this._color
  }
  /**
   * Get the color output format.
   */
  get format() {
    return this._format
  }
  /**
   * Get the root element for this picker.
   */
  get element() {
    return this.$root
  }
  /**
   * Get the input the picker is bound to.
   */
  get input() {
    return this.$input
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

  /**
   * Create a new ColorPicker instance.
   * @param $from The element or query to bind to. (leave null to create one)
   * @param config The picker configuration.
   */
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
    this.setFormat(this.config.defaultFormat, false)
    const defaultColorInput = this.config.defaultColor ?? this.$input.value
    this._setAppliedColor(new Color(defaultColorInput), false)
    if (!defaultColorInput) this.clear(false)

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

    if (this.config.dismissOnEscape)
      window.addEventListener('keydown', (event) => {
        if (!this._open || event.key !== 'Escape') return
        const $focus = document.querySelector(':focus')
        if (!$focus || $focus.closest('.cp_root')) this.close()
      })
  }

  /**
   * Toggle whether the picker dialog is opened.
   * @param value Force open or closed?
   * @param emit Emit event?
   */
  toggle(value = !this._open, emit = true) {
    if (value) {
      this.open(emit)
    } else {
      this.close(emit)
    }
  }

  /**
   * Open the picker dialog.
   * @param emit Emit event?
   */
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
        this._setColor(this._color.alpha(x), true)
      })
    } else {
      $alphaTrack.remove()
    }

    // When changing the input value, update color
    this.$colorInput.addEventListener('input', () => {
      try {
        const { color, format } = parseColor(this.$colorInput.value)
        this.setFormat(format, false)
        this._setColor(new Color(color), false)
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

  /**
   * Close the picker dialog.
   * @param emit Emit event?
   */
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

  /**
   * Clear the picker color value.
   * @param emit Emit event?
   */
  clear(emit = true) {
    this._unset = true
    this.updateAppliedColor(emit)
  }

  /**
   * Set the picker color value.
   * @param color The new color value.
   * @param emit Emit event?
   */
  setColor(color: Color | number[] | string | null, emit = true) {
    if (!color) return this.clear(emit)
    this._setAppliedColor(new Color(color), emit)
  }

  /**
   * Set the picker color format.
   * @param format The color format.
   * @param update Update colors?
   */
  setFormat(format: ColorFormat, update = true) {
    this._format = format
    this.updateFormat()
    if (update) {
      this.updateColor()
      this.updateAppliedColor()
    }
  }

  private _setColor(color: Color, updateInput = true) {
    if (this.config.commitMode === 'instant') {
      return this._setAppliedColor(color)
    }

    this._color = color
    this.updateColor(updateInput)
  }

  private _setAppliedColor(color: Color, emit = true) {
    this._unset = false
    this._color = color
    this._appliedColor = color

    this.updateColor(true)
    this.updateAppliedColor(emit)
  }

  private updateColor(updateInput = true) {
    this.$root.style.setProperty('--cp-color', this._color.toString())
    this.$root.style.setProperty('--cp-hue', this._color.hue().toString())
    this.$root.style.setProperty('--cp-alpha', this._color.alpha().toString())
    this.hsvSlider.moveThumb(this._color.saturation(), 1 - this._color.value())
    this.hueSlider.moveThumb(this._color.hue() / 360)
    this.alphaSlider?.moveThumb(this._color.alpha())

    if (updateInput) this.$colorInput.value = this._color.string(this._format)
  }

  private updateAppliedColor(emit = true) {
    this.$root.classList.toggle('cp_unset', this._unset)
    this.$root.style.setProperty('--cp-applied', this.color?.toString() ?? 'transparent')

    const value = this._appliedColor.string(this._format)
    this.$input.value = this._unset ? '-' : value

    if (emit) this.emit('pick', this.color)
  }

  private updateFormat() {
    if (!this.$formats) return
    this.$formats.forEach(($fmt) => $fmt.removeAttribute('aria-checked'))

    const $checked = this.$formats.find(($fmt) => $fmt.dataset.format === this._format)
    if ($checked) $checked.ariaChecked = 'true'
  }
}
