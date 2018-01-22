const crypto = require('crypto')

async function getToken (code) {
  let res = await this.ajax.get('/verify/Token', {
    grantType: 'authorization_code',
    code: code,
    clientSecret: getClientSecret()
  })
  return res.data
}

async function getUserBaseInfo (userId, userAuth) {
  let res = await this.ajax.get('/user/BaseData', {
    accessToken: userAuth,
    userId: userId,
    clientSecret: getClientSecret()
  })
  return res.data
}

async function getLoginUrl (redirectUrl) {
  let state = encrypt(`${new Date().getTime()}`)
  return {
    url: `${this.options.loginUrl}?responseType=code&clientId=${this.options.clientId}&state=${state}&redirectUrl=${redirectUrl}`,
    state: state
  }
}

async function checkState (state) {
  try {
    state = decrypt(state)
    if (!state) throw new Error() // 错误的state
    let validTime = new Date(state)
    if (Number.isNaN(validTime.getTime())) throw new Error() // 不合法的state
    if (new Date().getTime() - validTime > 1000 * 60 * 60) throw new Error() // 过期的state
    return true
  } catch (error) {
    return false
  }
}

function encrypt (str) {
  const cipher = crypto.createCipher('aes192', this.options.clientKey)
  if (typeof str === 'object') str = JSON.stringify(str)
  let encrypted = cipher.update(str, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}

function decrypt (str, key) {
  try {
    const decipher = crypto.createDecipher('aes192', this.options.clientKey)
    let decrypted = decipher.update(str, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
  } catch (error) {
    return false
  }
}

function getClientSecret () {
  let secret = encrypt(new Date().getTime())
  return `${this.options.clientId}&${secret}&${hash(secret + this.options.clientKey)}`
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
  getUserBaseInfo: getUserBaseInfo,
  getLoginUrl: getLoginUrl,
  checkState: checkState
}
