import { getSetting, openSetting, chooseAddress, showToast } from '../../utils/getSettings'
import regeneratorRuntime from '../../lib/runtime/runtime'
const db = wx.cloud.database()
const lists = db.collection('lists')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [], // 购物车列表数据
    radioIsChecked: false, // 管理购物车商品选中按钮 
    allSelected: false, // 全选
    totalPrice: 0, // 商品总价格
    totalNum: 0, // 商品总数量
    cartNumber: 0, // 购物车商品数量
  },

  onShow: function () {
    let address = wx.getStorageSync('address') || {}
    this.setData({ address })
    this.getCart()
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
    scope === false && await openSetting()
    // 获取获取地理信息
    let address = await chooseAddress()
    address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
    // 将地址信息缓存到本地存储
    wx.setStorageSync('address', address)
    this.setData({ address })
  },

  // 获取购物车数据
  async getCart() {
    let { data } = await lists.get()
    let cartNumber = 0
    data.length && data.map(item => {
      cartNumber += item.num
    })
    this.setData({cart: data, cartNumber})
  },

  // 选中单个商品
  handleCheckbox(e) {
    let { id } = e.currentTarget.dataset
    let { cart } = this.data
    let index = cart.findIndex(item => item.goods_id === id)
    cart[index].checked = !cart[index].checked
    this.setCart(cart)
  },

  // 全选与取消全选
  handleAllSelected() {
    let { cart, allSelected } = this.data
    allSelected = !allSelected
    cart.forEach(item => item.checked = allSelected)
    this.setCart(cart)
  },

  // 操作商品数量
  async handleItemEdit(e) {
    let { id, operation } = e.currentTarget.dataset
    let { cart } = this.data
    let index = cart.findIndex(item => item.goods_id === id)
    // 保证商品数量至少有 1个
    if (cart[index].num === 1 && operation == -1) {
      return showToast({title: '商品不能再少了', icon: 'none'})
    }
    cart[index].num += operation
    this.setCart(cart)
    wx.cloud.callFunction({
      name: 'cart',
      data: {
        product: cart[index]
      }
    })
  },

  // 结算
  settlement() {
    let { address, cart, totalNum } = this.data
    if (JSON.stringify(address) == '{}') {
      return showToast({title: '请选择收货地址', icon: 'none'})
    }
    if (totalNum == 0) {
      return showToast({title: '请选择需要购买的商品', icon: 'none'})
    }
    wx.navigateTo({url: '/pages/pay/index'}) // 跳转到结算页面
  },

  // 计算总价钱、总数量、是否全选
  setCart(cart) {
    let totalNum = 0,
        totalPrice = 0,
        allSelected = true

    cart.map(item => {
      if (item.checked) {
        totalPrice += item.num * item.goods_price
        totalNum += item.num
      } else {
        allSelected = false
      }
    })
    this.setData({
      totalNum,
      totalPrice,
      allSelected,
      cart
    })
  }
})