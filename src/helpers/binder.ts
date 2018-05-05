/**
 * Vincula métodos de uma classe a ela mesma
 * @param {Object} self Objeto instanciado 
 */
export default function autoBind (self : Object) {
  for (const key of Object.getOwnPropertyNames(self.constructor.prototype)) {
    const val = self[key]
    if (key !== 'constructor' && typeof val === 'function') {
      self[key] = val.bind(self)
    }
  }
}
