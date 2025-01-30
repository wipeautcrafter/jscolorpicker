#!/usr/bin/env bash

# Run build task
npm run build

# Minify files
cd dist
esbuild colorpicker.css --loader=css --minify --outfile=colorpicker.min.css
esbuild colorpicker.iife.js --minify --outfile=colorpicker.iife.min.js
esbuild colorpicker.js --minify --outfile=colorpicker.min.js
