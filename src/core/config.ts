import type { ColorFormat } from '../lib/Color'
import type { Placement } from '@popperjs/core'

export interface PickerConfig {
  /**
   * By default, the ColorPicker is bound to a HTML element.
   * That element is replaced with a color picker box.
   * If you don't want the this replacement to occur, set hidden to true
   * If hidden === true, you can show the color picker dialog via the 
   * prompt() method.
   */
  hidden: boolean

  /**
   * HTML element to append the picker to.
   * Default: null (which implies: document.body)
   */
  container: HTMLElement | null

  /**
   * The default initial color.
   * Default: null
   */
  defaultColor: string | null

  /**
   * A list of predefined color swatches available for selection.
   * Pass null or false to disable swatches.
   * Default: null
   */
  swatches: string[] | null | false

  /**
   * Whether to enable the alpha (transparency) slider.
   * Default: true
   */
  enableAlpha: boolean

  /**
   * Whether to enable the built-in eyedropper tool for selecting colors from the screen.
   * Currently (Dec 2024) only supported on Chromium based browsers.
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
   * Default: true
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

export const defaultConfig: PickerConfig = {
  hidden: false,
  container: null,
  defaultColor: null,
  swatches: null,
  enableAlpha: true,
  enableEyedropper: true,
  formats: ['hex', 'rgb', 'hsv', 'hsl'],
  defaultFormat: 'hex',
  submitMode: 'confirm',
  showClearButton: true,
  dismissOnOutsideClick: true,
  dismissOnEscape: true,
  dialogPlacement: 'top',
  dialogOffset: 8,
}
