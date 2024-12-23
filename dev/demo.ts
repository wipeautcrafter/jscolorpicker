import ColorPicker from '../src/index'

const picker = new ColorPicker('button', {
  toggleStyle: 'input',
  defaultColor: 'salmon',
  swatches: ['#D95D5D', '#DB8525', '#E8C43C', '#BED649', '#9ECBDB', '#6399A5', '#C771A1'],
})

picker.on('open', () => console.log('open'))
picker.on('opened', () => console.log('opened'))
picker.on('close', () => console.log('close'))
picker.on('closed', () => console.log('closed'))
picker.on('cancel', () => console.log('cancel'))
picker.on('pick', (color) => console.log('pick', color?.toString() ?? 'none'))

picker.openOnce().then(console.log)
