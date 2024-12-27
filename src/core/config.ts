import type { ColorFormat } from '../lib/Color'
import type { Placement } from '@popperjs/core'

export interface PickerConfig {
  /**
   * Determines the appearance of the toggle element, either as a button, an input field or nothing at all.
   * Default: 'button'
   */
  toggleStyle: 'button' | 'input' | 'hidden'

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
   * Whether to enable the side-by-side color preview.
   * Default: false
   */
  enablePreview: boolean

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
   * - 'confirm': requires user confirmation (e.g., via a submit button)
   * Default: 'confirm'
   */
  submitMode: 'instant' | 'confirm'

  /**
   * Whether to show the submit button.
   * Default: true
   */
  showSubmitButton: boolean

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
  toggleStyle: 'button',
  container: null,
  defaultColor: null,
  swatches: null,
  enablePreview: false,
  enableAlpha: true,
  enableEyedropper: true,
  formats: ['hex', 'rgb', 'hsv', 'hsl'],
  defaultFormat: 'hex',
  submitMode: 'confirm',
  showSubmitButton: true,
  showClearButton: true,
  dismissOnOutsideClick: true,
  dismissOnEscape: true,
  dialogPlacement: 'top',
  dialogOffset: 8,
}
