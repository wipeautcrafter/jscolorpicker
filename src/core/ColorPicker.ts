import { EventEmitter } from 'events'
import { createPopper } from '@popperjs/core'
import { Color } from '../lib/Color'

import { Slider } from './Slider'
import { defaultConfig } from './config'
import { parseColor } from '../lib/colorParse'

import toggleContent from '../html/toggle.min.html?raw'
import dialogContent from '../html/dialog.min.html?raw'

import type { PickerConfig } from './config'
import type { ColorFormat } from '../lib/Color'
import type { Instance as PopperInstance } from '@popperjs/core'

let currentlyOpen: ColorPicker | undefined

export class ColorPicker extends EventEmitter<{
  open: []
  opened: []
  close: []
  closed: []
  pick: [Color | null]
  cancel: []
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
    return this._unset ? null : this._color
  }
  /**
   * Get the color currently selected in the dialog.
   */
  get selectedColor() {
    return this._newColor
  }
  /**
   * Get the color output format.
   */
  get format() {
    return this._format
  }
  /**
   * Get the target element.
   */
  get element() {
    return this.$target
  }

  private _open = false
  private _unset = true
  private _format: ColorFormat

  private _color: Color
  private _newColor: Color

  private config: PickerConfig
  private popper?: PopperInstance

  private $target: HTMLElement
  private $dialog?: HTMLElement
  private $toggle?: HTMLElement
  private $toggleText?: HTMLElement

  private hsvSlider?: Slider
  private hueSlider?: Slider
  private alphaSlider?: Slider

  private $formats?: HTMLElement[]
  private $colorInput?: HTMLInputElement

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
      $from = document.createElement('button')
    } else if (typeof $from === 'string') {
      $from = document.querySelector<HTMLElement>($from)
    }
    if (!$from) throw new Error('Element is null.')

    // Create toggle
    this.$target = $from

    if (this.config.toggleStyle !== 'hidden') {
      this.$toggle = $from
      this.$toggle.classList.add('color-picker')
      this.$toggle.innerHTML = toggleContent
      this.$toggle.addEventListener('click', () => this.toggle())
    }

    if (this.config.toggleStyle === 'input') {
      this.$toggleText = document.createElement('div')
      this.$toggleText.className = 'cp_text'
      this.$target.prepend(this.$toggleText)
    }

    this.close()

    // Apply default values
    const defaultColorInput = this.config.defaultColor ?? this.$toggle?.dataset.color
    this._setCurrentColor(new Color(defaultColorInput), false)
    if (!defaultColorInput) this.clear(false)

    // Dismissal events
    if (this.config.dismissOnOutsideClick)
      window.addEventListener('pointerdown', (event) => {
        if (!this._open) return
        const $toggle = event.target as HTMLElement
        if (!$toggle.closest('.cp_dialog') && !$toggle.closest('.color-picker')) this.close()
      })

    if (this.config.dismissOnEscape)
      window.addEventListener('keydown', (event) => {
        if (!this._open || event.key !== 'Escape') return
        const $focus = document.querySelector(':focus')
        if (!$focus || $focus.closest('.cp_dialog')) this.close()
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
    if (this._open) return
    this._open = true

    currentlyOpen?.close()
    currentlyOpen = this

    // Create dialog
    document.body.insertAdjacentHTML('beforeend', dialogContent)
    this.$dialog = document.body.lastElementChild as HTMLElement
    this.$colorInput = this.$dialog.querySelector('.cp_input')!

    this.populateDialog()
    this.bindDialog()

    this.setFormat(this.config.defaultFormat, false)
    this.updateColor()

    // Create popper
    this.popper = createPopper(this.$target, this.$dialog!, {
      placement: this.config.dialogPlacement,
      strategy: 'absolute',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, this.config.dialogOffset],
          },
        },
      ],
    })

    this.$toggle?.classList.add('cp_open')
    setTimeout(() => this.$dialog!.classList.add('cp_open'))
    if (emit) {
      this.emit('open')
      setTimeout(() => this.emit('opened'), this.getAnimationDuration())
    }
  }

  /**
   * Open the picker, returning a promise with the chosen color, optionally destroying it after.
   */
  prompt(destroy = false): Promise<Color | null> {
    return new Promise((resolve) => {
      let color: Color | null = null

      this.on('pick', (newColor) => (color = newColor))
      this.once('close', () => resolve(color))
      if (destroy) this.once('closed', () => this.destroy())

      this.open()
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
        $swatch.addEventListener('click', () => this._setNewColor(color))

        return $swatch
      })
      this.$dialog!.querySelector('.cp_swatches')!.append(...$swatches)
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
      this.$dialog!.querySelector('.cp_formats')!.append(...this.$formats)
    }
  }

  private bindDialog() {
    // Binding to these tracks is very simple :)
    const $hsvTrack = this.$dialog!.querySelector('.cp_area-hsv')
    this.hsvSlider = new Slider($hsvTrack as HTMLElement)
    this.hsvSlider.on('drag', (x, y) => {
      this._setNewColor(this._newColor.saturation(x).value(1 - y))
    })

    const $hueTrack = this.$dialog!.querySelector('.cp_slider-hue')
    this.hueSlider = new Slider($hueTrack as HTMLElement)
    this.hueSlider.on('drag', (x) => {
      this._setNewColor(this._newColor.hue(x * 360))
    })

    const $alphaTrack = this.$dialog!.querySelector('.cp_slider-alpha') as HTMLElement
    if (this.config.enableAlpha) {
      this.alphaSlider = new Slider($alphaTrack as HTMLElement)
      this.alphaSlider.on('drag', (x) => {
        this._setNewColor(this._newColor.alpha(x), true)
      })
    } else {
      $alphaTrack.remove()
    }

    // When changing the input value, update color
    this.$colorInput!.addEventListener('input', () => {
      try {
        const { color, format } = parseColor(this.$colorInput!.value)
        this.setFormat(format, false)
        this._setNewColor(new Color(color), false)
      } catch (error) {
        // do nothing
      }
    })

    // Hide side-by-side preview
    if (!this.config.enablePreview) {
      this.$dialog!.querySelector('.cp_preview')?.remove()
    }

    // When clicking the eyedropper, the EyeDropper WebAPI will be invoked
    const $eyedrop = this.$dialog!.querySelector('.cp_eyedrop') as HTMLButtonElement
    if (this.config.enableEyedropper && 'EyeDropper' in window) {
      $eyedrop.addEventListener('click', () => {
        new EyeDropper()
          .open()
          .then((result) => {
            const color = new Color(result.sRGBHex)
            this._setNewColor(color)
          })
          .catch(() => {})
      })
    } else {
      $eyedrop.remove()
    }

    // When clicking submit, dismiss dialog
    const $submit = this.$dialog!.querySelector('.cp_submit') as HTMLButtonElement
    if (this.config.showSubmitButton) {
      $submit.addEventListener('click', () => {
        this._setCurrentColor(this._newColor)
        this.close()
      })
    } else {
      $submit.remove()
    }

    // When clicking clear, set color to null
    const $clear = this.$dialog!.querySelector('.cp_clear') as HTMLButtonElement
    if (this.config.showClearButton) {
      $clear.addEventListener('click', () => {
        this.clear()
        this.close()
      })
    } else {
      $clear.remove()
    }
  }

  private getAnimationDuration() {
    const computed = window.getComputedStyle(this.$target)
    const raw = computed.getPropertyValue('--cp-delay')
    return parseFloat(raw) * (raw.endsWith('ms') ? 1 : 1000)
  }

  /**
   * Close the picker dialog.
   * @param emit Emit event?
   */
  close(emit = true) {
    if (!this._open) return
    this._open = false

    currentlyOpen = undefined
    this.$toggle?.classList.remove('cp_open')

    const $dialog = this.$dialog
    const popper = this.popper

    this.$dialog = undefined
    this.popper = undefined

    $dialog?.classList.remove('cp_open')

    setTimeout(() => {
      $dialog?.remove()
      popper?.destroy()

      if (emit) this.emit('closed')
    }, this.getAnimationDuration())
    if (emit) this.emit('close')
  }

  /**
   * Destroy the picker and revert all HTML to what it was.
   */
  destroy() {
    this.close()
    this.$dialog?.remove()
    if (this.$toggle) {
      this.$toggle.classList.remove('color-picker', 'cp_open', 'cp_unset')
      this.$toggle.style.removeProperty('--cp-current-color')
      this.$toggle.removeAttribute('data-color')
      this.$toggle.textContent = ''
    }
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
    this._setCurrentColor(new Color(color), emit)
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
      this.updateAppliedColor(false)
    }
  }

  private _setNewColor(color: Color, updateInput = true) {
    if (this.config.commitMode === 'instant') {
      return this._setCurrentColor(color)
    }

    this._newColor = color
    this.updateColor(updateInput)
  }

  private _setCurrentColor(color: Color, emit = true) {
    this._unset = false
    this._newColor = color
    this._color = color

    this.updateColor(true)
    this.updateAppliedColor(emit)
  }

  private updateColor(updateInput = true) {
    const currentColor = this.color?.toString() ?? 'transparent'

    this.$toggle?.style.setProperty('--cp-current-color', currentColor)
    this.$dialog?.style.setProperty('--cp-current-color', currentColor)
    this.$dialog?.style.setProperty('--cp-color', this._newColor.toString())
    this.$dialog?.style.setProperty('--cp-hue', this._newColor.hue().toString())
    this.$dialog?.style.setProperty('--cp-alpha', this._newColor.alpha().toString())

    this.hsvSlider?.moveThumb(this._newColor.saturation(), 1 - this._newColor.value())
    this.hueSlider?.moveThumb(this._newColor.hue() / 360)
    this.alphaSlider?.moveThumb(this._newColor.alpha())

    if (updateInput && this.$colorInput) {
      this.$colorInput.value = this._newColor.string(this._format)
    }
  }

  private updateAppliedColor(emit = true) {
    if (this.$toggle) {
      this.$toggle.classList.toggle('cp_unset', this._unset)
      this.$toggle.dataset.color = this.color?.toString() ?? ''
    }

    if (this.$toggleText) {
      this.$toggleText.textContent = this.color?.string(this._format) ?? '-'
    }

    if (emit) this.emit('pick', this.color)
  }

  private updateFormat() {
    if (!this.$formats) return
    this.$formats.forEach(($fmt) => $fmt.removeAttribute('aria-checked'))

    const $checked = this.$formats.find(($fmt) => $fmt.dataset.format === this._format)
    if ($checked) $checked.ariaChecked = 'true'
  }
}
