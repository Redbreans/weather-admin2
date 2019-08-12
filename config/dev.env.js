'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://192.167.1.14:13020/"',
  BASE_FILE_URL:'"http://192.167.1.14:13050/"',
})
