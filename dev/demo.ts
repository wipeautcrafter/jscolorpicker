import ColorPicker from '../src/index'

const getRandomColor = () => {
  return '#' + (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, '0')
}

//const div = document.createElement('div');

const pickers: ColorPicker[] = []

pickers.push(
  new ColorPicker('#picker1', {
    toggleStyle: 'input',
    showClearButton: true,
    //dismissOnEscape: false,
    submitMode: 'instant', // 'instant' | 'confirm'
    // defaultColor: 'red',
    defaultFormat: 'hex', // 'hex' | 'rgb' | 'hsv' | 'hsl'
    swatches: ['#d95d5d', '#db8525', '#e8c43c', '#bed649', '#9ecbdb', '#6399a5', '#c771a1'],
  }),

  new ColorPicker('#picker2', {
    toggleStyle: 'input',
    showClearButton: true,
    //dismissOnEscape: false,
    submitMode: 'confirm', // 'instant' | 'confirm'
    // defaultColor: 'red',
    defaultFormat: 'rgb', // 'hex' | 'rgb' | 'hsv' | 'hsl'
    swatches: ['#d95d5d', '#db8525', '#e8c43c', '#bed649', '#9ecbdb', '#6399a5', '#c771a1'],
  }),

  new ColorPicker('#picker3', {
    showClearButton: true,
    //dismissOnEscape: false,
    submitMode: 'instant', // 'instant' | 'confirm'
    // defaultColor: 'red',
    defaultFormat: 'hex', // 'hex' | 'rgb' | 'hsv' | 'hsl'
    swatches: ['#d95d5d', '#db8525', '#e8c43c', '#bed649', '#9ecbdb', '#6399a5', '#c771a1'],
  }),

  new ColorPicker('#picker4', {
    showClearButton: true,
    //dismissOnEscape: false,
    submitMode: 'confirm', // 'instant' | 'confirm'
    defaultColor: 'blue',
    defaultFormat: 'rgb', // 'hex' | 'rgb' | 'hsv' | 'hsl'
  }),

  new ColorPicker('#inline', {
    headless: false,
  })
)

// Bind events
for (let picker of pickers) {
  picker.on('open', () => console.log('open'))
  picker.on('opened', () => console.log('opened'))
  picker.on('close', () => console.log('close'))
  picker.on('closed', () => console.log('closed'))
  picker.on('cancel', () => console.log('cancel'))
  picker.on('pick', (color) => console.log(`pick ${color}`))
}

document.getElementById('promptBtn')!.onclick = async (e) => {
  const $target = e.target as HTMLButtonElement | HTMLInputElement
  const picker = new ColorPicker($target, {
    headless: true,
    defaultColor: '#f00',
    swatches: ['#000', '#fff'],
  })
  const color = await picker.prompt()
  console.log('Selected color via prompt', color)
  $target.style.backgroundColor = color ? color.toString() : 'none'
}

document.getElementById('lightBtn')!.onclick = () => {
  document.documentElement.setAttribute('data-bs-theme', 'light')
}
document.getElementById('darkBtn')!.onclick = () => {
  document.documentElement.setAttribute('data-bs-theme', 'dark')
}
document.getElementById('destroyBtn')!.onclick = () => {
  for (let picker of pickers) {
    picker.destroy()
  }
}

for (const btn of document.querySelectorAll<HTMLElement>('.changeBtn')) {
  const $pickerEl = document.getElementById(btn.dataset.picker!) as HTMLInputElement
  btn.onclick = () => {
    $pickerEl.value = getRandomColor()
    $pickerEl.dispatchEvent(new Event('change'))
  }
}

for (const btn of document.querySelectorAll<HTMLElement>('.setBtn')) {
  btn.onclick = () => {
    const idx = +btn.dataset.picker!
    pickers[idx - 1].setColor(getRandomColor())
  }
}
