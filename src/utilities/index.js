const { curry, assoc, reduce, keys, ifElse, isNil, identity, bind, compose, not } = require('ramda')

const if_not_null_convert = curry(ifElse(isNil, identity))

const renameKeys = curry((keysMap, obj) => reduce((acc, key) => assoc(keysMap[key] || key, obj[key], acc), {}, keys(obj)))

const stringify = bind(JSON.stringify, JSON)
const exists = compose(not, isNil)
module.exports = {
  if_not_null_convert,
  renameKeys,
  stringify,
  exists
}
