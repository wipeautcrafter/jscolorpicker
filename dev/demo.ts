import ColorPicker from '../src/index'

const getRandomColor = () => {
  return '#' + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, '0')
}

//const div = document.createElement('div');

const pickers = []
pickers.push(
  new ColorPicker('#picker1', {
    showClearButton: true,
    //dismissOnEscape: false,
    submitMode: 'instant', // 'instant' | 'confirm'
    // defaultColor: 'red',
    defaultFormat: 'rgb', // 'hex' | 'rgb' | 'hsv' | 'hsl'
    swatches: ['#d95d5d', '#db8525', '#e8c43c', '#bed649', '#9ecbdb', '#6399a5', '#c771a1'],
  }),

  new ColorPicker('#picker2', {
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
    defaultFormat: 'rgb', // 'hex' | 'rgb' | 'hsv' | 'hsl'
    swatches: ['#d95d5d', '#db8525', '#e8c43c', '#bed649', '#9ecbdb', '#6399a5', '#c771a1'],
  }),

  new ColorPicker('#picker4', {
    showClearButton: true,
    //dismissOnEscape: false,
    submitMode: 'confirm', // 'instant' | 'confirm'
    defaultColor: 'blue',
    defaultFormat: 'rgb', // 'hex' | 'rgb' | 'hsv' | 'hsl'
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

document.getElementById('promptBtn').onclick = async (e) => {
  const picker = new ColorPicker(e.target, {
    hidden: true,
    submitMode: 'confirm',
    defaultColor: '#f00',
    swatches: ['#000','#fff']
  })
  const color = await picker.prompt()
  e.target.style.backgroundColor = color ? color.toString() : null
}

document.getElementById('lightBtn').onclick = () => {
  document.documentElement.setAttribute('data-bs-theme', 'light')
}
document.getElementById('darkBtn').onclick = () => {
  document.documentElement.setAttribute('data-bs-theme', 'dark')
}
document.getElementById('destroyBtn').onclick = () => {
  for (let picker of pickers) {
	  picker.destroy()
  }
}

for (const btn of document.querySelectorAll('.changeBtn')) {
  const pickerEl = document.getElementById(btn.dataset.picker)
  btn.onclick = () => {
    pickerEl.value = getRandomColor()
    const event = document.createEvent('Event');
    event.initEvent('change', false, true);
    pickerEl.dispatchEvent(event);
  }
}

for (const btn of document.querySelectorAll('.setBtn')) {
  btn.onclick = () => {
    const idx = +btn.dataset.picker
    pickers[idx-1].setColor(getRandomColor())
  }
}



