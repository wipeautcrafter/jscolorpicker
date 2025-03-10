import { EventEmitter } from 'events';
import { Placement } from '@popperjs/core';

declare class Color {
    private readonly color;
    private getSet;
    constructor(from?: Color | number[] | string);
    string(format: ColorFormat): string;
    toString(): string;
    clone(): Color;
}

declare interface Color {
    hue(): number;
    hue(value: number): Color;
    saturation(): number;
    saturation(value: number): Color;
    value(): number;
    value(value: number): Color;
    alpha(): number;
    alpha(value: number): Color;
}

declare type ColorFormat = 'hex' | 'rgb' | 'rgba' | 'hsv' | 'hsl';

declare class ColorPicker extends EventEmitter<{
    open: [];
    opened: [];
    close: [];
    closed: [];
    pick: [Color | null];
}> {
    /**
     * Get whether the dialog is currently open.
     */
    get isOpen(): boolean;
    /**
     * Get the picked color.
     */
    get color(): Color | null;
    /**
     * Get the array of swatches.
     */
    get swatches(): string[];
    /**
     * Get the color currently selected in the dialog.
     */
    get selectedColor(): Color;
    /**
     * Get the color output format.
     */
    get format(): ColorFormat;
    /**
     * Get the target element.
     */
    get element(): HTMLElement;
    private _open;
    private _unset;
    private _format;
    private _color;
    private _newColor;
    private _swatches;
    private config;
    private popper?;
    private isInput;
    private $toggle;
    private $dialog?;
    private $button?;
    private $input?;
    private changeHandler?;
    private clickHandler?;
    private hsvSlider?;
    private hueSlider?;
    private alphaSlider?;
    private $formats?;
    private $colorInput?;
    private createToggle;
    /**
     * Append the picker to a given element.
     * @param target The element to attach the picker to.
     */
    appendTo(target: HTMLElement): void;
    /**
     * Create a new ColorPicker instance.
     * @param $from The element or query to bind to. (leave null to create one)
     * @param config The picker configuration.
     */
    constructor($from?: HTMLInputElement | HTMLButtonElement | string | null, config?: Partial<PickerConfig>);
    setSwatches(swatches: string[] | null | false): void;
    /**
     * Toggle whether the picker dialog is opened.
     * @param value Force open or closed?
     * @param emit Emit event?
     */
    toggle(value?: boolean, emit?: boolean): void;
    /**
     * Open the picker dialog.
     * @param emit Emit event?
     */
    open(emit?: boolean): void;
    /**
     * Open the picker, returning a promise with the chosen color, optionally destroying it after.
     */
    prompt(destroy?: boolean): Promise<Color | null>;
    private populateDialog;
    private bindDialog;
    private getAnimationDuration;
    /**
     * Close the picker dialog.
     * @param emit Emit event?
     */
    close(emit?: boolean): void;
    /**
     * Submit the current color and close.
     * @param color The picked color value.
     * @param emit Emit event?
     */
    submit(color?: Color, emit?: boolean): void;
    /**
     * Destroy the picker and revert all HTML to what it was.
     */
    destroy(): void;
    /**
     * Clear the picker color value.
     * @param emit Emit event?
     */
    clear(emit?: boolean): void;
    /**
     * Set the picker color value.
     * @param color The new color value.
     * @param emit Emit event?
     */
    setColor(color: Color | number[] | string | null, emit?: boolean): void;
    /**
     * Set the picker color format.
     * @param format The color format.
     * @param update Update colors?
     */
    setFormat(format: ColorFormat, update?: boolean): void;
    private _setNewColor;
    private _setCurrentColor;
    private updateColor;
    private updateAppliedColor;
    private updateFormat;
    private updateSwatches;
}
export default ColorPicker;

declare interface PickerConfig {
    /**
     * When enabled, run the picker in headless mode:
     * - leaves the target element untouched, and does not render a toggle
     * - requires manually calling the prompt() method to show the dialog
     * - still positions the dialog relative to the target element
     * Default: false
     */
    headless: boolean;
    /**
     * Should the toggle be rendered as an input element or a button?
     * Default: 'button'
     */
    toggleStyle: 'button' | 'input';
    /**
     * The HTML element the picker dialog will be appended to.
     * By default, this is the body.
     */
    container: HTMLElement | null;
    /**
     * The initial color.
     * Default: null
     */
    color: string | null;
    /**
     * A list of predefined color swatches available for selection.
     * Pass null, false or an empty array to disable them altogether.
     * Default: null
     */
    swatches: string[] | null | false;
    /**
     * Hide hsv, hue and alpha sliders as well as format selector and input field.
     * Keep swatches only.
     * Default: false
     */
    swatchesOnly: boolean;
    /**
     * Whether to enable the alpha (transparency) slider.
     * Default: true
     */
    enableAlpha: boolean;
    /**
     * Whether to enable the built-in eyedropper tool for selecting colors from the screen.
     * As of January 2025, this is only supported on Chromium based browsers: https://caniuse.com/mdn-api_eyedropper
     * Default: true
     */
    enableEyedropper: boolean;
    /**
     * The set of color formats the user can choose from.
     * Pass null or false to disable format selection.
     * Default: ['hex', 'rgb', 'hsv', 'hsl']
     */
    formats: ColorFormat[] | null | false;
    /**
     * The default color format to use when multiple formats are enabled.
     * Default: 'hex'
     */
    defaultFormat: ColorFormat;
    /**
     * Determines how the chosen color is applied:
     * - 'instant': applies immediately as the user picks a color
     * - 'confirm': requires user confirmation (via a submit button)
     * Default: 'confirm'
     */
    submitMode: 'instant' | 'confirm';
    /**
     * Whether to show the clear button for resetting the color.
     * Default: true
     */
    showClearButton: boolean;
    /**
     * Whether the color picker should close when clicking outside of it.
     * Default: true
     */
    dismissOnOutsideClick: boolean;
    /**
     * Whether the color picker should close when escape is pressed.
     * Default: true
     */
    dismissOnEscape: boolean;
    /**
     * How to place the dialog relative to the toggle.
     * Default: 'top'
     */
    dialogPlacement: Placement;
    /**
     * How big the gap between the toggle and dialog should be, in pixels.
     * Default: 8
     */
    dialogOffset: number;
}

export { }
