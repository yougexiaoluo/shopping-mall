// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const collect = db.collection('collections')

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let { product } = event
  searchCollections(product)
  return {
    msg: '操作成功',
    code: 1,
    success: true
  }
}

// 操作数据库中的收藏列表
let searchCollections = async (product) => {
  let { data } = await collect.where({ goods_id: product.goods_id }).get()
  if (!data.length) {
    product.state = 1
    collect.add({ data: product })
  } else {
    let _ = db.command
    collect
      .doc(data[0]._id)
      .update({
        data: {
          state: Number(!product.state),
          done: true
        }
      })
  }
}