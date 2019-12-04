// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: 'cloud-app-nbjb7' })
const db = cloud.database()
const lists = db.collection('lists')
// 云函数入口函数
exports.main = async (event, context) => {
  /**
   * 加入购物车功能
   * 1. 查找数据库中是否存在此商品
   *    a. 根据商品ID进行查找
   * 2. 如果存在，那么该商品数量 +1
   * 3. 不存在，那么该商品数量默认为 1
   */
  console.log(event, context)
  try {
    let { product } = event
    let { OPENID, APPID } = cloud.getWXContext()
    let { data } = await lists.get()
    console.log('data == ', data)
    return {
      msg: '添加商品成功',
      success: true,
      code: 1,
      OPENID,
      APPID
    }
  } catch (e) {
    return {
      msg: '添加商品失败',
      success: false,
      code: -1
    }
  }
}