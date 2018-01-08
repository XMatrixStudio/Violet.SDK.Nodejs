function clone (obj) {
  return map(obj, function (v) {
    return typeof v === 'object' ? clone(v) : v
  })
}
function extend (target, source) {
  each(source, function (val, key) {
    target[key] = source[key]
  })
  return target
}
function isArray (arr) {
  return arr instanceof Array
}
function each (obj, fn) {
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      fn(obj[i], i)
    }
  }
}
function map (obj, fn) {
  var o = isArray(obj) ? [] : {}
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = fn(obj[i], i)
    }
  }
  return o
}

module.exports = {
  extend: extend,
  clone: clone
}
