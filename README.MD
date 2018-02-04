# violet-sdk-v2
The SDK for Violet User System
https://oauth.xmatrix.studio

## Installation
Using npm:
```
$ npm i violet-sdk-v2 --save
```

## demo
```js
// 引入模块
let Violet = require('violet-sdk-v2')
// 创建实例
let violet = new Violet({
  clientId: 'abcdexxxxxxxxxxxxx', // 客户端ID
  clientKey: 'abcdexxxxxxxxxxxxxxxxxxxxx', // 客户端Key
  server: 'https://xxxxxxxxxxxxx', // VioletAPI地址
  loginUrl: 'https://xxxxxxxxxxx' // 跳转到登陆的地址
})

/**
 * 获取token
 *
 * @param {string} code 网页登陆成功后返回的令牌
 * @return {string} 用户所对应的token， 若失败则抛出错误
 */
let token = await violet.getToken(code)

/**
 * 获取用户基本信息
 *
 * @param {string} userId 用户ID
 * @param {string} token 用户对应token
 * @return {object} 用户信息， 若失败则抛出错误
 * email 用户邮箱
 * name 用户名
 * info 用户具体信息
 */
let user = await violet.getUserBaseInfo(userId, token)

/**
 * 获取登陆url
 * 其中返回的state必须设置
 * 防止CSRF攻击，state会原封不动返回
 * 建议写在cookie或者session里面，返回的时候检查是否相同，而且还需调用checkState检查
 *
 * @param {string} redirectUrl 重定向的URL，会原封不动返回
 * @return {object} url和state
 * url 用户登陆跳转的URL
 * state 状态码
 */
let data = await violet.getLoginUrl(redirectUrl)

/**
 * 检测State的有效性
 * 除此之外，还需要检验state与当前session或cookie的state是否一致
 *
 * @param {string} state
 * @return {boolean} 是否有效
 */
let result = await violet.checkState(state)
```
