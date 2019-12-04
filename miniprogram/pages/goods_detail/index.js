import { request } from "../../request/index.js"

// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId: '',
    pics: [], // 轮播图数据
    goodsName: '', // 商品名
    goodsIntroduce: '', // 商品描述
    goodsPrice: '', // 商品价格
    previewUrls: [], // 商品预览url
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { goodsId } = options
    this.setData({ goodsId })
    this.getGoodsDetail()
    // 调用云函数
    // wx.cloud.callFunction({
    //   name: 'product',
    //   data: {
    //     a: 1,
    //     b: 2
    //   }
    // }).then(res => {
    //   console.log(res)
    // }).catch(err => {
    //   console.log(err)
    // })
  },

  // 商品全屏预览
  previewImage (e) {
    let { url } = e.currentTarget.dataset
    let { previewUrls } = this.data
    wx.previewImage({
      current: url,
      urls: previewUrls
    })
  },

  // 处理商品全屏预览url
  handlePreviewUrls () {
    let { pics, previewUrls } = this.data
    pics.map(item => previewUrls.push(item.pics_mid_url))
    this.setData({ previewUrls })
  },

  // 获取商品详情
  async getGoodsDetail () {
    let { goodsId } = this.data
    let res = await request({
      url: '/goods/detail',
      data: { goods_id: goodsId }
    })
    let {
      pics,
      goods_name,
      goods_introduce,
      goods_price
    } = res
    // 设置data
    this.setData({
      pics,
      goodsName: goods_name,
      // 这种做法不正确，只是暂时的解决方案，最终还是需要跟后台开发人员进行协商 --> 改为其他格式的图片
      goodsIntroduce: goods_introduce.replace(/\.webp/g, '.jpg'),
      goodsPrice: goods_price
    })
    this.handlePreviewUrls()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})