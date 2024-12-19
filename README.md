# ColorPicker

A color picker component supporting light and dark color schemes, swatches, instant and submit modes, multiple color formats, CSS color parsing and way more.

## Table of Contents

- [ColorPicker](#colorpicker)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Live Demo](#live-demo)
  - [Screenshots](#screenshots)
  - [Installation](#installation)
    - [IIFE Bundle](#iife-bundle)
    - [ESM Bundle](#esm-bundle)
  - [Getting Started](#getting-started)
  - [Documentation](#documentation)
  - [Developing](#developing)

## Features

- 🌙 Dark and light themes
- 🌈 Swatches
- 🫥 Alpha slider
- 💧 EyeDropper
- 📜 CSS color parsing (including names!)
- 🔼 Button and input styles
- 🔢 Multiple color formats
- ⏱️ Customizable animation speed
- ✅ Apply color immediately, or on submit
- 🚫 Clearable
- ⌨️ Keyboard support

## Live Demo

TODO

## Screenshots

TODO

## Installation

The color picker requires a tiny stylesheet. Please include it like this:

```html
<link rel="stylesheet" href="colorpicker.css" />
```

Now, depending on your environment, choose one of the following:

- IIFE Bundle → When using vanilla JavaScript, without ES modules
- ESM Bundle → When using ES modules or a bundler

### IIFE Bundle

Please import the IIFE script using a `script` tag in your HTML:

```html
<script src="colorpicker.iife.js"></script>
```

This exposes the `ColorPicker` class (on window).

### ESM Bundle

Please import the ESM bundle using the `import` directive in your script:

```js
import { ColorPicker } from 'colorpicker.js'
```

This allows you to use `ColorPicker` directly.

## Getting Started

To create a color picker, first create an input, button or div:

```html
<!-- bind to input -->
<input id="picker" autocomplete="off" />
<!-- OR: bind to button -->
<button id="picker"></button>
<!-- OR: bind to div -->
<div id="picker"></div>
```

Next instantiate the ColorPicker, passing an element to bind to and an (optional) configuration:

```js
const picker = new ColorPicker('#picker', {
  commitMode: 'instant',
  showSubmitButton: 'false',
})
```

## Documentation

For all methods and properties, please view the [documentation](DOCUMENTATION.md).

## Developing

To install dependencies:

```sh
bun|deno|npm|pnpm|yarn install
```

To run:

```sh
bun|deno|npm|pnpm|yarn run dev
```
