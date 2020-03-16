// add routes
module.exports = [
  ['/v1/url', require('./url')],
  ['/s', require('./s')],
  ['/v1/ping', require('./ping')],
]
