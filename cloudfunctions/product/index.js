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
   * 4. 加入购物车需要传递商品ID，以及属性
   */
  let { product } = event
  let { OPENID, APPID } = cloud.getWXContext()
  let { data } = await lists.where({ goods_id: product.goods_id }).get() // 查找
  changeData(product, data)
  return {
    msg: '添加成功',
    success: true,
    code: 1,
    OPENID,
    APPID
  }
}

// 对数据库的具体操作
let changeData = (product, data) => {
  // 添加
  if (!data.length) {
    product.num = 1
    lists.add({ data: product })
  } else { // 更新
    let _ = db.command
    lists
      .doc(data[0]._id)
      .update({
        data: { num: _.inc(1) }
      })
  }
}