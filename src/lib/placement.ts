export type StaticPlacement =
  | 'center'
  | 'top left'
  | 'top center'
  | 'top right'
  | 'center left'
  | 'center center'
  | 'center right'
  | 'bottom left'
  | 'bottom center'
  | 'bottom right'

export const alignElement = (element: HTMLElement, placement: StaticPlacement, offset: number) => {
  const [y, x = 'center'] = placement.split(' ')
  const distance = `${offset}px`

  const alignY = y === 'bottom' ? 'bottom' : 'top'
  const centerY = y === 'center'
  element.style[alignY] = centerY ? '50%' : distance

  const alignX = x === 'right' ? 'right' : 'left'
  const centerX = x === 'center'
  element.style[alignX] = centerX ? '50%' : distance

  element.style.position = 'fixed'
  element.style.transform = `translate(${centerX ? '-50%' : '0%'}, ${centerY ? '-50%' : '0%'})`
}
