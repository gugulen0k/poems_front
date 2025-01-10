import StringUtils from './string'

class ObjectUtils {
  static convertKeysToSnakeCase(obj) {
    if (Array.isArray(obj)) {
      return obj.map((item) => this.convertKeysToSnakeCase(item))
    }
    if (obj && typeof obj === 'object') {
      return Object.entries(obj).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [StringUtils.camelToSnake(key)]: this.convertKeysToSnakeCase(value),
        }),
        {}
      )
    }
    return obj
  }

  static cleanEmptyValues(obj, defaults = [undefined, null, NaN, '']) {
    if (defaults.includes(obj)) return

    if (Array.isArray(obj))
      return obj
        .map((v) =>
          v && typeof v === 'object' ? this.cleanEmptyValues(v, defaults) : v
        )
        .filter((v) => !defaults.includes(v))

    return Object.entries(obj).length
      ? Object.entries(obj)
          .map(([k, v]) => [
            k,
            v && typeof v === 'object' ? this.cleanEmptyValues(v, defaults) : v,
          ])
          .reduce(
            (a, [k, v]) => (defaults.includes(v) ? a : { ...a, [k]: v }),
            {}
          )
      : obj
  }
}

export default ObjectUtils
