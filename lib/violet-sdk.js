const util = require('./util')

let defaultOptions = {
  clientId: '',
  clientKey: '',
  server: ''
}

// 构造函数
let violet = function (options) {
  this.options = util.extend(util.clone(defaultOptions), options || {})
  this.ajax = require('./ajax')(options.server)
}

module.exports = violet
