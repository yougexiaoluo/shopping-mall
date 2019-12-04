import { request } from "../../request/index.js"
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}, // 显示的信息
  },
  goodsInfo: {}, // 商品对象

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { goodsId } = options
    this.getGoodsDetail(goodsId)
    // this.addProduct()
  },

  // 加入购物车
  addProduct () {
    wx.cloud.callFunction ({
      name: 'product',
      data: {
        product: {}
      }
    }).then(res => {
      console.log('res == ', res)
    }).catch(err => {
      console.log('err == ', err)
    })
  },

  // 商品全屏预览
  previewImage (e) {
    let { url } = e.currentTarget.dataset
    let urls = this.goodsInfo.pics.map(item => item.pics_mid_url)
    wx.previewImage({
      current: url,
      urls
    })
  },

  // 获取商品详情
  async getGoodsDetail (goodsId) {
    let res = await request({
      url: '/goods/detail',
      data: { goods_id: goodsId }
    })
    this.goodsInfo = res
    // console.log('res === ', res)
    // 设置data
    this.setData({
      goodsObj: {
        pics: res.pics,
        goodsName: res.goods_name,
        // 这种做法不正确，只是暂时的解决方案，最终还是需要跟后台开发人员进行协商 --> 改为其他格式的图片
        goodsIntroduce: res.goods_introduce.replace(/\.webp/g, '.jpg'),
        goodsPrice: res.goods_price,
        goodsNumber: res.goods_number,
      }
    })
  }
})