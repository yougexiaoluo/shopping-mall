import { request } from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [], // 左侧菜单数据
    rightContentList: [], // 右侧内容数据
    currentIndex: 0, // 当前页码下标
    rightScrollTop: 0, // 右侧内容初始滚动条距离顶部的距离
    leftScrollTop: 0  // 左侧菜单初始滚动条距离顶部的距离
  },
  // 接收返回的数据
  cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let cates = wx.getStorageSync('cates')
    if (!cates) {
      this.getCates()
    } else {
      if (Date.now() - cates._time > 1000 * 10) {
        this.cates = cates.data
        // 构造左侧菜单数据
        let leftMenuList = this.cates.map(item => item.cat_name)
        // 构造右侧内容数据
        let rightContentList = this.cates[0].children
        this.setData({
          leftMenuList,
          rightContentList
        })
      }
    }
  },

  // 获取分类数据
  async getCates() {
    let res = await request({ url: '/categories' })
    this.cates = res
    // 将请求的数据存放到本地缓存中
    wx.setStorageSync('cates', { _time: Date.now(), data: this.cates })
    // 构造左侧菜单数据
    let leftMenuList = this.cates.map(item => item.cat_name)
    // 构造右侧内容数据
    let rightContentList = this.cates[0].children
    this.setData({
      leftMenuList,
      rightContentList
    })
  },

  // 切换菜单内容
  changeMenuHandle(e) {
    let { index } = e.currentTarget.dataset
    let rightContentList = this.cates[index].children
    let leftScrollTop = 0
    if (index >= 8) {
      leftScrollTop = index * 30
    }
    this.setData({
      currentIndex: index,
      rightContentList,
      leftScrollTop,
      rightScrollTop: 0
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