import { ColorPicker } from '../src/index'

const picker = new ColorPicker('button', {
  enableAlpha: true,
  commitMode: 'instant',
  toggleStyle: 'button',
  showCancelButton: false,
})

picker.on('open', () => console.log('open'))
picker.on('close', () => console.log('close'))
picker.on('cancel', () => console.log('cancel'))
picker.on('pick', (color) => console.log('pick', color?.toString() ?? 'none'))
