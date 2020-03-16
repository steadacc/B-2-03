const { compose, bind, assoc } = require('ramda')
const { encode, decode } = require('bijective')

const repo = require('../models/repo/urls')
const input = require('../input-filters/url')
const error = require('../views/error')
const view = require('../views/url')

const redirect = (req, res) => {
  return Promise.resolve(decode(req.params.short))
    .then(id => repo.get(id))
    .then(url => res.status(301).redirect(url.url))
    .catch(error.generic(res))
}

let urls = require('express').Router()

urls.get('/:short',
  redirect
)

module.exports = urls