// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },
  onShow: function () {
    this.getStorage()
  },

  // 从本地获取用户授权信息
  getStorage() {
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({userInfo})
    }
  },

  // 获取用户信息
  getUserInfo(e) {
    let { userInfo } = e.detail
    if (userInfo) {
      wx.setStorageSync('userInfo', userInfo)
      this.setData({userInfo})
      this.onShow()
    }
  }
})