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
  private _isInputElement = false

  private _color: Color
  private _newColor: Color

  private config: PickerConfig
  private popper?: PopperInstance

  private $target: HTMLElement
  private $dialog?: HTMLElement
  private $toggle?: HTMLElement

  private $inputWrap?: HTMLElement
  private $colorBox?: HTMLElement

  private hsvSlider?: Slider
  private hueSlider?: Slider
  private alphaSlider?: Slider

  private $formats?: HTMLElement[]
  private $colorInput?: HTMLInputElement

  private clickHandler = () => {
    this.toggle()
  }

  private changeHandler = () => {
    // Only used when colorpicker is attached to <input> element
    const color = (this.$target as HTMLInputElement).value
    this._setCurrentColor(new Color(color), false)
  }

  /**
   * Create a new ColorPicker instance.
   * @param $from The element or query to bind to. (leave null to create one)
   * @param config The picker configuration.
   */
  constructor($from?: HTMLElement | string | null, config: Partial<PickerConfig> = {}) {
    super()
    this.config = { ...defaultConfig, ...config }

    // Determine element to bind to, or create one (a <button> element)
    $from = this.getElement($from) || document.createElement('button')

    // Create toggle
    this.$target = $from

    let defaultColor

    if (!this.config.hidden) {
      if (this.$target instanceof HTMLInputElement) {
        this._isInputElement = true
        this.$inputWrap = document.createElement('div')
        this.$inputWrap.className = 'cp_wrap'
        this.$colorBox = document.createElement('div')
        this.$colorBox.className = 'cp_color_box'
        this.$target.parentNode?.insertBefore(this.$inputWrap, this.$target)
        this.$inputWrap.append(this.$colorBox, this.$target)
        this.$target.addEventListener('click', this.clickHandler)
        this.$target.addEventListener('change', this.changeHandler)
        defaultColor = this.$target.value
      }
      else {
        this.$toggle = $from
        this.$toggle.classList.add('color-picker')
        this.$toggle.innerHTML = toggleContent
        this.$toggle.addEventListener('click', this.clickHandler)
        defaultColor = this.config.defaultColor ?? this.$toggle?.dataset.color
      }
    }

    this._setCurrentColor(new Color(defaultColor), false)
    if (!defaultColor) this.clear(false)

    // Dismissal events
    if (this.config.dismissOnOutsideClick) {
      window.addEventListener('pointerdown', (event) => {
        if (!this._open) return
        const $toggle = event.target as HTMLElement
        if (!$toggle.closest('.cp_dialog') && !$toggle.closest('.color-picker')) this.close()
      })
    }

    window.addEventListener('keydown', (event) => {
      if (this.config.dismissOnEscape && event.key == 'Escape') {
        // Dismiss on Escape
        const $focus = document.querySelector(':focus')
        if (!$focus || $focus.closest('.cp_dialog')) this.close()
        return
      }

      // If a slider is active, allow arrow keys to change slider value
      let slider
      const parentNode = document.activeElement?.parentNode as HTMLElement
      const sliderMap: {[key:string]:Slider | undefined} = {
        'cp_slider-hue': this.hueSlider,
        'cp_slider-alpha': this.alphaSlider,
        'cp_area-hsv': this.hsvSlider
      }

      if (parentNode) {
        for (let m in sliderMap) {
          if (parentNode.className.indexOf(m) != -1) {
            slider = sliderMap[m]
            break
          }
        }
      }

      if (!slider) { return }

      switch(event.key) {
        case 'ArrowLeft':
          slider.move('left')
          break
        case 'ArrowRight':
          slider.move('right')
          break
        case 'ArrowUp':
          slider.move('up')
          break
        case 'ArrowDown':
          slider.move('down')
          break
      }
    })

    this.close()
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
    const container = this.getElement(this.config.container) || document.body
    container.insertAdjacentHTML('beforeend', dialogContent)
    this.$dialog = container.lastElementChild as HTMLElement
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
      ]
    })

    this.$colorInput.focus({ preventScroll: true })

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
    if ('confirm' == this.config.submitMode) {
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

    // When changing the input value, update color
    // Submit color when [Enter] is hit
    this.$colorInput!.addEventListener('keyup', ({key}) => {
      const { color, format } = parseColor(this.$colorInput!.value)
      this.setFormat(format, false)

      if ('instant' == this.config.submitMode && 'Enter' != key) {
        return
      }

      try {
        this._setNewColor(new Color(color), false)
      }
      catch(err) {
        // Do nothing
      }

      if ('Enter' == key) {
        $submit.click()
      }
    })
  }

  private getAnimationDuration() {
    const computed = window.getComputedStyle(this.$target)
    const raw = computed.getPropertyValue('--cp-delay')
    return parseFloat(raw) * (raw.endsWith('ms') ? 1 : 1000)
  }

  private getElement(selector:string | HTMLElement | null | undefined) {
    if (selector instanceof HTMLElement) {
      return selector
    }
    if (typeof selector === 'string') {
      return document.querySelector<HTMLElement>(selector)
    }
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

      if (emit) { this.emit('closed') }
    }, this.getAnimationDuration())
    if (emit) { this.emit('close') }
  }

  /**
   * Destroy the picker and revert all HTML to what it was.
   */
  destroy() {
    this.close()
    this.$dialog?.remove()
    if (this.$toggle) {
      this.$toggle.removeEventListener('click', this.clickHandler)
      this.$toggle.classList.remove('color-picker', 'cp_open', 'cp_unset')
      this.$toggle.style.removeProperty('--cp-current-color')
      this.$toggle.removeAttribute('data-color')
      this.$toggle.textContent = ''
    }
    if (this._isInputElement) {
      this.$target.removeEventListener('click', this.clickHandler)
      this.$target.removeEventListener('change', this.changeHandler)
      this.$inputWrap && this.$inputWrap.replaceWith(this.$target) // Unwrap
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
    if ('instant' == this.config.submitMode) {
      return this._setCurrentColor(color)
    }

    this._newColor = color
    this.updateColor(updateInput)
  }

  private _setCurrentColor(color: Color, emit = true) {
    this._unset = false
    this._newColor = this._color = color

    this.updateColor(true)
    this.updateAppliedColor(emit)
  }

  private updateColor(updateInput = true) {
    const noColor = !this.color && this.submitMode == 'instant'
    const currentColor = this.color?.toString() ?? 'transparent'
    const newColorHex = this._newColor.string('hex')

    this.$dialog?.style.setProperty('--cp-base-color', noColor ? '' : newColorHex.substring(0,7))
    this.$toggle?.style.setProperty('--cp-current-color', noColor ? '' : currentColor)
    this.$dialog?.style.setProperty('--cp-current-color', noColor ? '' : currentColor)
    this.$dialog?.style.setProperty('--cp-color', noColor ? '' : newColorHex)
    this.$dialog?.style.setProperty('--cp-hue', noColor ? '' : this._newColor.hue().toString())
    this.$dialog?.style.setProperty('--cp-alpha', noColor ? '' : this._newColor.alpha().toString())

    this.hsvSlider?.moveThumb(noColor ? 0 : this._newColor.saturation(), 1 - this._newColor.value())
    this.hueSlider?.moveThumb(noColor ? 0 : this._newColor.hue() / 360)
    this.alphaSlider?.moveThumb(noColor ? 0 : this._newColor.alpha())

    if (updateInput && this.$colorInput) {
      this.$colorInput.value = noColor ? '' : this._newColor.string(this._format)
    }
  }

  private updateAppliedColor(emit = true) {
    const color = this.color?.toString() ?? undefined
    if (!color && this.$colorInput && 'instant' == this.submitMode) {
      this.updateColor()
    }

    if (this.$toggle) {
      this.$toggle.dataset.color = color
      this.$toggle.classList.toggle('cp_unset', this._unset)
    }

    if (this._isInputElement) {
      const colorValue = this.color?.string(this.config.defaultFormat) ?? '';
      (this.$target as HTMLInputElement).value = colorValue || ''
      if (this.$colorBox) this.$colorBox.style.backgroundColor = colorValue
    }

    if (emit) { this.emit('pick', this.color) }
  }

  private updateFormat() {
    if (!this.$formats) return
    this.$formats.forEach(($fmt) => $fmt.removeAttribute('aria-checked'))

    const $checked = this.$formats.find(($fmt) => $fmt.dataset.format === this._format)
    if ($checked) { $checked.ariaChecked = 'true' }
  }
}
