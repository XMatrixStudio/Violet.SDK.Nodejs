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
    if (!state || !isNaN(state)) throw new Error() // 错误的state
    let validTime = new Date(state)
    if (Number.isNaN(validTime.getTime())) throw new Error() // 不合法的state
    if (new Date().getTime() - validTime > 1000 * 60 * 60) throw new Error() // 过期的state
    return true
  } catch (error) {
    return false
  }
}

function encrypt (text) {
  const hash = crypto.createHash('sha256')
  hash.update(this.options.clientKey)
  const keyBytes = hash.digest()
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-cfb', keyBytes, iv)
  let enc = [iv, cipher.update(text, 'utf8')]
  enc.push(cipher.final())
  return Buffer.concat(enc).toString('hex')
}

function decrypt (text) {
  const hash = crypto.createHash('sha256')
  hash.update(this.options.clientKey)
  const keyBytes = hash.digest()
  const contents = Buffer.from(text, 'hex')
  const iv = contents.slice(0, 16)
  const textBytes = contents.slice(16)
  const decipher = crypto.createDecipheriv('aes-256-cfb', keyBytes, iv)
  let res = decipher.update(textBytes, '', 'utf8')
  res += decipher.final('utf8')
  return res
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
  const hash = crypto.createHash('sha512')
  hash.update(value)
  return hash.digest('hex')
}

module.exports = {
  getToken: getToken,
  getUserBaseInfo: getUserBaseInfo,
  getLoginUrl: getLoginUrl,
  checkState: checkState
}
