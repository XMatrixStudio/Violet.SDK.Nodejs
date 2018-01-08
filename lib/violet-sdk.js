const util = require('./util')
const base = require('./base')

let defaultOptions = {
  clientId: '123',
  clientKey: '123',
  server: '123'
}

// 构造函数
let violet = function (options) {
  this.options = util.extend(util.clone(defaultOptions), options || {})
  this.ajax = require('./ajax')(this.options.server)
}

util.extend(violet.prototype, base)

module.exports = violet