import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperData: [], // 轮播图
    navList: [], // 导航
    floorList: [], // 楼层
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperData()
    this.getNavList()
    this.getFloorList()
  },

  // 获取轮播图数据
  getSwiperData: function () {
    request({
      url: '/home/swiperdata'
    }).then(res => {
      this.setData({
        swiperData: res
      })
    })
  },

  // 获取导航数据
  getNavList: function () {
    request({
      url: '/home/catitems'
    }).then(res => {
      this.setData({
        navList: res
      })
    })
  },

  // 获取楼层数据
  getFloorList: function () {
    request({
      url: '/home/floordata'
    }).then(res => {
      this.setData({
        floorList: res
      })
    })
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