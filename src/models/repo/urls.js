const { if_exists } = require('../../utilities/errors_code')
const Url = require('../url')

module.exports = {
  get: (id) => {
    const query = Url.query()
    
    query
      .where({ id })
      .first()

    return query.then(if_exists)
  },
  get_by_url: (url) => {
    const query = Url.query()

    query
      .where({ url })
      .first()

    return query
  },
  create: (body) => {
    return Url.query().insert(body)
      .then((url) => Url.query().where({ id: url.id }).first())
  },
}