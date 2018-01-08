const axios = require('axios')

const ax = function (options) {
  return axios.create({
    timeout: 3000,
    baseURL: options.server
  })
}

module.exports = ax
