import { request } from "../../request/index.js"
const db = wx.cloud.database()
const collect = db.collection('collections')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}, // 显示的信息
    isCollection: false
  },
  goodsInfo: {}, // 商品对象

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { goodsId } = options
    this.getGoodsDetail(goodsId)
  },

  // 收藏/取消收藏
  handleCollection() {
    this.changeCollection()
  },

  changeCollection() {
    wx.cloud.callFunction({
      name: 'collections',
      data: {
        product: this.goodsInfo
      }
    }).then(res => {
      let { isCollection } = this.data
      this.setData({ isCollection: !isCollection })
      this.goodsInfo.state = Number(!isCollection)
      if (this.data.isCollection) {
        wx.showToast({
          title: '收藏成功',
          icon: 'success',
          mask: true
        })
      } else {
        wx.showToast({
          title: '取消收藏',
          icon: 'success',
          mask: true
        })
      }
    }).catch(err => {
      wx.showToast({
        title: '操作失败',
        image: '../../images/Security close.png',
        mask: true
      })
    })
  },

  // 加入购物车
  addProductToCart() {
    wx.cloud.callFunction({
      name: 'product',
      data: {
        product: this.goodsInfo
      }
    }).then(res => {
      wx.showToast({
        title: '加入成功',
        icon: 'success',
        mask: true
      })
    }).catch(err => {
      wx.showToast({
        title: '加入失败',
        image: '../../images/Security close.png',
        mask: true
      })
    })
  },

  // 商品全屏预览
  previewImage(e) {
    let { url } = e.currentTarget.dataset
    let urls = this.goodsInfo.pics.map(item => item.pics_mid_url)
    wx.previewImage({
      current: url,
      urls
    })
  },

  // 获取商品详情
  async getGoodsDetail(goodsId) {
    let res = await request({
      url: '/goods/detail',
      data: { goods_id: goodsId }
    })
    this.goodsInfo = res
    this.getGoodsCollectionState()
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
  },

  // 获取商品的收藏状态
  async getGoodsCollectionState() {
    let { data } = await collect.where({ goods_id: this.goodsInfo.goods_id }).get()
    console.log(data)
    if (!data.length) {
      this.goodsInfo.state = 0
      console.log('不存在')
    }
  }
})