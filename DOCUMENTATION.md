# Documentation

Below, you can find all type declarations, including the events.
Refer to [jscolorpicker.com](https://www.jscolorpicker.com) for even more detailed documentation.

```ts
class ColorPicker extends EventEmitter<{
  open: []
  opened: []
  close: []
  closed: []
  pick: [Color | null]
}> {
  /**
   * Get whether the dialog is currently open.
   */
  get isOpen(): boolean

  /**
   * Get the picked color.
   */
  get color(): Color | null

  /**
   * Get the color currently selected in the dialog.
   */
  get selectedColor(): Color

  /**
   * Get the color output format.
   */
  get format(): ColorFormat

  /**
   * Get the target element.
   */
  get element(): HTMLElement

  /**
   * Create a new ColorPicker instance.
   * @param $from The element or query to bind to. (leave null to create one)
   * @param config The picker configuration.
   */
  constructor(
    $from?: HTMLInputElement | HTMLButtonElement | string | null,
    config?: Partial<PickerConfig>
  )

  /**
   * Toggle whether the picker dialog is opened.
   * @param value Force open or closed?
   * @param emit Emit event?
   */
  toggle(value?: boolean, emit?: boolean): void

  /**
   * Open the picker dialog.
   * @param emit Emit event?
   */
  open(emit?: boolean): void

  /**
   * Open the picker, returning a promise with the chosen color, optionally destroying it after.
   */
  prompt(destroy?: boolean): Promise<Color | null>

  /**
   * Close the picker dialog.
   * @param emit Emit event?
   */
  close(emit?: boolean): void

  /**
   * Destroy the picker and revert all HTML to what it was.
   */
  destroy(): void

  /**
   * Clear the picker color value.
   * @param emit Emit event?
   */
  clear(emit?: boolean): void

  /**
   * Set the picker color value.
   * @param color The new color value.
   * @param emit Emit event?
   */
  setColor(color: Color | number[] | string | null, emit?: boolean): void

  /** 
   * Update swatches 
   * @param {array} swatches An array of new colors for swatches
   *                Use null/false for no swatches
   */
  setSwatches(swatches: string[] | null | false): void 

  /**
   * Set the picker color format.
   * @param format The color format.
   * @param update Update colors?
   */
  setFormat(format: ColorFormat, update?: boolean): void
}

interface PickerConfig {
  /**
   * When enabled, run the picker in headless mode:
   * - leaves the target element untouched, and does not render a toggle
   * - requires manually calling the prompt() method to show the dialog
   * - still positions the dialog relative to the target element
   * Default: false
   */
  headless: boolean

  /**
   * Should the toggle be rendered as an input element or a button?
   * Default: 'button'
   */
  toggleStyle: 'button' | 'input'

  /**
   * The HTML element the picker dialog will be appended to.
   * By default, this is the body.
   */
  container: HTMLElement | null

  /**
   * The initial color.
   * Default: null
   */
  color: string | null

  /**
   * A list of predefined color swatches available for selection.
   * Pass null, false or an empty array to disable them altogether.
   * Default: null
   */
  swatches: string[] | null | false

  /**
   * Hide hsv, hue and alpha sliders as well as format selector and input field. 
   * Keep swatches only.
   * Default: false
   */
  swatchesOnly: boolean

  /**
   * Whether to enable the alpha (transparency) slider.
   * Default: true
   */
  enableAlpha: boolean

  /**
   * Whether to enable the built-in eyedropper tool for selecting colors from the screen.
   * As of January 2025, this is only supported on Chromium based browsers: https://caniuse.com/mdn-api_eyedropper
   * Default: true
   */
  enableEyedropper: boolean

  /**
   * The set of color formats the user can choose from.
   * Pass null or false to disable format selection.
   * Default: ['hex', 'rgb', 'hsv', 'hsl']
   */
  formats: ColorFormat[] | null | false

  /**
   * The default color format to use when multiple formats are enabled.
   * Default: 'hex'
   */
  defaultFormat: ColorFormat

  /**
   * Determines how the chosen color is applied:
   * - 'instant': applies immediately as the user picks a color
   * - 'confirm': requires user confirmation (via a submit button)
   * Default: 'confirm'
   */
  submitMode: 'instant' | 'confirm'

  /**
   * Whether to show the clear button for resetting the color.
   * Default: false
   */
  showClearButton: boolean

  /**
   * Whether the color picker should close when clicking outside of it.
   * Default: true
   */
  dismissOnOutsideClick: boolean

  /**
   * Whether the color picker should close when escape is pressed.
   * Default: true
   */
  dismissOnEscape: boolean

  /**
   * How to place the dialog relative to the toggle.
   * Default: 'top'
   */
  dialogPlacement: Placement

  /**
   * How big the gap between the toggle and dialog should be, in pixels.
   * Default: 8
   */
  dialogOffset: number
}

type ColorFormat = 'hex' | 'rgb' | 'hsv' | 'hsl'

class Color {
  string(format: ColorFormat): string
  toString(): string
  clone(): Color
  hue(): number
  hue(value: number): Color
  saturation(): number
  saturation(value: number): Color
  value(): number
  value(value: number): Color
  alpha(): number
  alpha(value: number): Color
}
```
