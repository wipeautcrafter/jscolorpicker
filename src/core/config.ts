import type { ColorFormat } from '../lib/Color'
import type { Placement } from '@popperjs/core'

export interface PickerConfig {
  /**
   * Determines the appearance of the toggle element, either as a button, an input field or nothing at all.
   */
  toggleStyle: 'button' | 'input' | 'hidden'

  /**
   * The default initial color.
   */
  defaultColor: string | null

  /**
   * A list of predefined color swatches available for selection.
   * Pass null or false to disable swatches.
   */
  swatches: string[] | null | false

  /**
   * Whether to enable the side-by-side color preview.
   */
  enablePreview: boolean

  /**
   * Whether to enable the alpha (transparency) slider.
   */
  enableAlpha: boolean

  /**
   * Whether to enable the built-in eyedropper tool for selecting colors from the screen.
   */
  enableEyedropper: boolean

  /**
   * The set of color formats the user can choose from.
   * Pass null or false to disable format selection.
   */
  formats: ColorFormat[] | null | false

  /**
   * The default color format to use when multiple formats are enabled.
   */
  defaultFormat: ColorFormat

  /**
   * Determines how the chosen color is applied:
   * - 'instant': applies immediately as the user picks a color
   * - 'confirm': requires user confirmation (e.g., via a submit button)
   */
  commitMode: 'instant' | 'confirm'

  /**
   * Whether to show the submit button.
   */
  showSubmitButton: boolean

  /**
   * Whether to show the clear button for resetting the color.
   */
  showClearButton: boolean

  /**
   * Whether the color picker should close when clicking outside of it.
   */
  dismissOnOutsideClick: boolean

  /**
   * Whether the color picker should close when escape is pressed.
   */
  dismissOnEscape: boolean

  /**
   * How to place the dialog relative to the toggle.
   */
  dialogPlacement: Placement

  /**
   * How big the gap between the toggle and dialog should be.
   */
  dialogOffset: number
}

export const defaultConfig: PickerConfig = {
  toggleStyle: 'button',
  defaultColor: null,
  swatches: null,
  enablePreview: false,
  enableAlpha: true,
  enableEyedropper: true,
  formats: ['hex', 'rgb', 'hsv', 'hsl'],
  defaultFormat: 'hex',
  commitMode: 'confirm',
  showSubmitButton: true,
  showClearButton: true,
  dismissOnOutsideClick: true,
  dismissOnEscape: true,
  dialogPlacement: 'top',
  dialogOffset: 8,
}
