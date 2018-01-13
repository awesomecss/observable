export const addStyleSheet = (d = document) => {
  const style = d.createElement('style')
  style.appendChild(document.createTextNode(''))
  document.head.appendChild(style)

  return style.sheet
}

export const getStyleSheet = ({ stylesheet }, d = document) => {
  const documentStyleSheet = d.styleSheets[d.styleSheets.length - 1] || addStyleSheet()

  return stylesheet || documentStyleSheet
}
