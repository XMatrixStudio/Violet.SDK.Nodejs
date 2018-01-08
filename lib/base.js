const crypto = require('crypto')

async function getToken (code) {
  try {
    let res = await this.ajax.get('/verify/token', {
      grantType: 'authorization_code',
      code: code,
      clientSecret: getClientSecret()
    })
    return res.data
  } catch (error) {
    console.error(`[ERROR] ajax: \n${error}`)
    return false
  }
}

function encrypt (str) {
  this.options = { clientKey: 'abcde' }
  const cipher = crypto.createCipher('aes192', this.options.clientKey)
  if (typeof str === 'object') str = JSON.stringify(str)
  let encrypted = cipher.update(str, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}

function getClientSecret () {
  let time = (new Date().getTime())
  return encrypt({
    t: time,
    c: this.options.clientId
  })
}

/**
 * SHA512 hash
 *
 * @param {string} value 需要进行hash的字符串
 * @returns {string} SHA512hash后的字符串
 */
function hash (value) {
  const hash = crypto.createHash('sha512')
  hash.update(value)
  return hash.digest('hex')
}

function decrypt (str) {
  const decipher = crypto.createDecipher('aes192', this.options.clientKey)
  let decrypted = decipher.update(str, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return JSON.parse(decrypted)
}

module.exports = {
  getToken: getToken
}
