import ColorPicker from '../src/index'

const div = document.createElement('div');

const picker = new ColorPicker('#picker', {
//const picker = new ColorPicker(div, {
  showClearButton: true,
  //dismissOnEscape: false,
  submitMode: 'confirm', // 'instant' | 'confirm'
 // defaultColor: 'red',
  defaultFormat: 'rgb', // 'hex' | 'rgb' | 'hsv' | 'hsl'
  enablePreview: true,
  swatches: ['#d95d5d', '#db8525', '#e8c43c', '#bed649', '#9ecbdb', '#6399a5', '#c771a1'],
})
//picker.prompt()

picker.on('open', () => console.log('open'))
picker.on('opened', () => console.log('opened'))
picker.on('close', () => console.log('close'))
picker.on('closed', () => console.log('closed'))
picker.on('cancel', () => console.log('cancel'))
picker.on('pick', (color) => console.log(`pick ${color}`))

//picker.prompt().then(console.log)

document.getElementById('lightBtn').onclick = () => {
  document.documentElement.setAttribute('data-cp-theme', 'light')
}
document.getElementById('darkBtn').onclick = () => {
  document.documentElement.setAttribute('data-cp-theme', 'dark')
}
document.getElementById('destroyBtn').onclick = () => {
	picker.destroy()
}
document.getElementById('changeBtn').onclick = () => {
	document.getElementById('picker').value = 'rgb(255,128,0)';
	var event = document.createEvent('Event');
	event.initEvent('change', false, true);
	document.getElementById('picker').dispatchEvent(event);
}
