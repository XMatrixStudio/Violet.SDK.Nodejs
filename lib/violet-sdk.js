const util = require('./util')
const base = require('./base')

let defaultOptions = {
  clientId: '123',
  clientKey: 'dg7j5jwp8jdeca1k9rhk9qtq',
  server: 'https://oauth.xmatrix.studio/api/v2/',
  loginUrl: 'https://oauth.xmatrix.studio/Verify/Authorize'
}

// 构造函数
let violet = function (options) {
  this.options = util.extend(util.clone(defaultOptions), options || {})
  this.ajax = require('./ajax')(this.options.server)
}

util.extend(violet.prototype, base)

module.exports = violet
