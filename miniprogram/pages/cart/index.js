import { getSetting, openSetting, chooseAddress } from '../../utils/getSettings'
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {}
  },
  onShow: function () {
    let address = wx.getStorageSync('address') || {}
    this.setData({ address })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  // 获取小程序内置的收货地址
  async getAddress() {
    // 获取权限状态
    let res = await getSetting()
    let scope = res.authSetting["scope.address"]
    // 诱导授权
    scope == false && await openSetting()
    // 获取获取地理信息
    let address = await chooseAddress()
    address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
    // 将地址信息缓存到本地存储
    wx.setStorageSync('address', address)
    this.setData({ address })
    console.log(address)
  }
})