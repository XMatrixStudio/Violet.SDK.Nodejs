
const Violet = require('./lib/violet-sdk')
module.exports = Violet

/**
 * @example
 * let violet = new Violet({
 *  clientId: 'abcde',
 *  clientKey: 'abcde',
 *  server: 'https://oauth.xmatrix.studio/api/v2/'
 * })
 * let token = violet.getToken(code)
 */
