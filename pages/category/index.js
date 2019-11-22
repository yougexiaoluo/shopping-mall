import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [], // 左侧菜单数据
    rightContentList: [], // 右侧菜单数据
    currentIndex: 0, // 当前页码下标
  },
  // 接收返回的数据
  cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCates()
  },

  // 获取分类数据
  getCates() {
    request({
      url: 'https://api.zbztb.cn/api/public/v1/categories'
    }).then(res => {
      this.cates = res.data.message
      let leftMenuList = this.cates.map(item => item.cat_name)
      let rightContentList = this.cates[0].children
      this.setData({
        leftMenuList,
        rightContentList
      })
    })
  },

  // 切换菜单内容
  changeMenuHandle(e) {
    let currentIndex = e.currentTarget.dataset.index
    let rightContentList = this.cates[currentIndex].children
    this.setData({ currentIndex, rightContentList })
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