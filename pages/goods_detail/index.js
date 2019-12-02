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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { goodsId } = options
    this.setData({ goodsId })
    this.getGoodsDetail()
  },

  // 获取商品详情
  async getGoodsDetail() {
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
      goodsIntroduce: goods_introduce,
      goodsPrice: goods_price
    })
    console.log(res, this.data)
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