const Joi = require('@hapi/joi')
const validator = require('express-joi-validation').createValidator({
  passError: true,
})

exports.validate_url_input = validator.body({
  url: Joi.string(),
}, { joi: { abortEarly: false } })
