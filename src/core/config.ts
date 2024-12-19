import type { ColorFormat } from '../lib/Color'

export interface PickerConfig {
  /**
   * Specifies the theme for the color picker.
   * If set to null, the theme is inferred from data attributes on the element.
   */
  theme: 'dark' | 'light' | null

  /**
   * Determines the appearance of the toggle element, either as a button or an input field.
   */
  toggleStyle: 'button' | 'input'

  /**
   * Duration of the toggle animation in milliseconds.
   */
  animationDuration: number

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
}

export const defaultConfig: PickerConfig = {
  theme: null,
  toggleStyle: 'button',
  animationDuration: 150,
  defaultColor: '#D95D5D',
  swatches: [
    '#D95D5D',
    '#DB8525',
    '#E8C43C',
    '#BED649',
    '#9ECBDB',
    '#6399A5',
    '#C771A1',
    '#FFFFFF',
    '#000000',
  ],
  enableAlpha: true,
  enableEyedropper: true,
  formats: ['hex', 'rgb', 'hsv', 'hsl'],
  defaultFormat: 'hex',
  commitMode: 'confirm',
  showSubmitButton: true,
  showClearButton: true,
  dismissOnOutsideClick: true,
  dismissOnEscape: true,
}
