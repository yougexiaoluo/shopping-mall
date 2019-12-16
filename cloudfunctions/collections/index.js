// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const collect = db.collection('collections')

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let { product } = event
  // 获取传递过来的商品对象
  var { data } = await collect.where({ goods_id: product.goods_id }).get()
  // 不存在该商品，添加到数据库，并改变收藏状态
  if (!data.length) {
    product.state = 1
    let { _id } = await collect.add({ data: product })
    var { data } = await collect.where({ _id }).get()
  } else {
    // 存在该商品时，改变商品收藏状态
    let _ = db.command
    let { stats } = await collect
    .doc(data[0]._id)
    .update({
      data: {
        state: Number(!data[0].state),
        done: true
      }
    })
    if (stats.updated >= 1) {
      var { data } = await collect.where({ goods_id: product.goods_id }).get()
    }
  }
  
  return {
    data,
    msg: '操作成功',
    code: 1,
    success: true
  }
}