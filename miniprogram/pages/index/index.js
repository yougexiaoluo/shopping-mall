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

  // navigateTo
  navigateTo(e) {
    let { url } = e.currentTarget.dataset
    if (url === undefined) {
      return
    } else {
      wx.switchTab({url})
    }
  },

  // 商品列表
  goodsList(e) {
    let { url } = e.currentTarget.dataset
    let query = url.split('=')[1]
    wx.navigateTo({url: `/pages/goods_list/index?query=${query}`})
  }
})