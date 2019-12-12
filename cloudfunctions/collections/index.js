// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const collect = db.collection('collections')

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let { product } = event
  let { data } = await collect.where({ goods_id: product.goods_id }).get()
  console.log(data)
  if (!data.length) {
    product.state = 1
    collect.add({ data: product })
  } else {
    let _ = db.command
    collect
      .doc(data[0]._id)
      .update({
        data: {
          state: Number(!data[0].state),
          done: true
        }
      })
  }
  return {
    data,
    msg: '操作成功',
    code: 1,
    success: true
  }
}