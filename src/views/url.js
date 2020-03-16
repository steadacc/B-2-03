const { map, pick, compose } = require('ramda')

const fields = ['id', 'url', 'short']

module.exports = {
  one: compose(pick(fields)),
  many: map(compose(pick(fields))),
}
