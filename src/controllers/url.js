const { compose, bind, tap, prop, assoc, mergeDeepLeft, ifElse, takeLast, map, curry } = require('ramda')

const input = require('../input-filters/url')
const error = require('../views/error')
const view = require('../views/url')
const repo = require('../models/repo/urls')
const { encode, decode } = require('bijective')

// AUTH
const auth = require('@wdalmut/mini-auth')
const token = require('@wdalmut/token-auth')
const me = require('../microservices/auth')

// UTILITIES
const { exists } = require('../utilities')
const assoc_short = curry((url) => assoc('short', encode(url.id), url))

const create_url = curry((res, body) => {
  return repo.create(body)
    .then(assoc_short)
    .then(compose(bind(res.status(201).json, res), view.one))
})

const already_exist_url = curry((res, url) => {
  return Promise.resolve(url)
    .then(assoc_short)
    .then(compose(bind(res.json, res), view.one))
})

const create = (req, res) => {
  repo
    .get_by_url(req.body.url)
    .then(tap(console.log))
    .then(ifElse(exists, already_exist_url(res), () => create_url(res, req.body)))
    .catch(error.generic(res))
}

let urls = require('express').Router()

urls.post('/',
  input.validate_url_input,
  create
)

module.exports = urls
