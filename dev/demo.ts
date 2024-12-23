import ColorPicker from '../src/index'

const picker = new ColorPicker('#picker', {
  toggleStyle: 'input',
  commitMode: 'instant',
  defaultColor: 'red',
  defaultFormat: 'rgb',
  enablePreview: true,
  swatches: ['#d95d5d', '#db8525', '#e8c43c', '#bed649', '#9ecbdb', '#6399a5', '#c771a1'],
})

picker.on('open', () => console.log('open'))
picker.on('opened', () => console.log('opened'))
picker.on('close', () => console.log('close'))
picker.on('closed', () => console.log('closed'))
picker.on('cancel', () => console.log('cancel'))
picker.on('pick', (color) => console.log(`pick ${color}`))

picker.prompt().then(console.log)

document.getElementById('lightBtn').onclick = () => {
  document.documentElement.setAttribute('data-cp-theme', 'light')
}
document.getElementById('darkBtn').onclick = () => {
  document.documentElement.setAttribute('data-cp-theme', 'dark')
}