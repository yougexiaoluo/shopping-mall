// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const lists = db.collection('lists')
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  changeData(event)
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}

// 查询并更新数据
let changeData = (event) => {
  let { product } = event
  lists.doc(product._id).update({
    data: {
      num: product.num
    }
  })
}