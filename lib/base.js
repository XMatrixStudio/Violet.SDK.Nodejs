const crypto = require('crypto')

async function getToken (code) {
  try {
    let res = await this.ajax.get('/verify/Token', {
      grantType: 'authorization_code',
      code: code,
      clientSecret: getClientSecret()
    })
    return res.data
  } catch (error) {
    console.error(`[ERROR] getToken: \n${error}`)
    return false
  }
}

async function getUserBaseInfo (userId, userAuth) {
  try {
    let res = await this.ajax.get('/user/BaseData', {
      accessToken: userAuth,
      userId: userId,
      clientSecret: getClientSecret()
    })
    return res.data
  } catch (error) {
    console.error(`[ERROR] getUserBaseInfo: \n${error}`)
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
  let secret = encrypt({
    t: time,
    c: this.options.clientId
  })
  return `${secret}&${hash(secret + this.options.clientKey)}`
}

/**
 * SHA512 hash
 *
 * @param {string} value 需要进行hash的字符串
 * @returns {string} SHA512hash后的字符串
 */
function hash (value) {
  const hash = crypto.createHash('sha1')
  hash.update(value)
  return hash.digest('hex')
}

module.exports = {
  getToken: getToken,
  getUserBaseInfo: getUserBaseInfo
}
