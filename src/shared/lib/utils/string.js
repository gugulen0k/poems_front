class StringUtils {
  static camelToFlat(string) {
    if (!string) return

    const camelCase = string.replace(/([a-z])([A-Z])/g, '$1 $2').split(' ')

    let flat = ''

    camelCase.forEach((word) => {
      flat = flat + word.charAt(0).toUpperCase() + word.slice(1) + ' '
    })
    return flat
  }

  static camelToSnake(str) {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase()
  }
}

export default StringUtils
