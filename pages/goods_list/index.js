import { request } from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      value: "综合",
      isActive: true
    },
    {
      id: 1,
      value: "销量",
      isActive: false
    },
    {
      id: 2,
      value: "价格",
      isActive: false
    }], // 导航条数据
    goodsList: [], // 商品数据
  },

  // 请求的参数
  queryParams: {
    query: '',  // 搜索内容
    cid: '',  // 商品ID
    pagenum: 1, // 页码
    pagesize: 10 // 请求数量
  },
  totalPages: 1, // 总页码
  /**
   * 功能点：
   *  1. 上拉加载
   *  2. 下拉刷新
   *  3. tabs切换
   */

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryParams.cid = options.cid || ''
    this.getGoodsList()
  },

  // 获取对应商品ID数据
  async getGoodsList() {
    let res = await request({
      url: '/goods/search',
      data: this.queryParams
    })
    this.totalPages = Math.ceil(res.total / this.queryParams.pagesize) // 计算总页数
    this.setData({ goodsList: [...this.data.goodsList, ...res.goods] })
    wx.stopPullDownRefresh()
  },

  // 监听子组件的事件
  tabsItemTapHandle(e) {
    let { idx } = e.detail
    let { tabs } = this.data
    tabs.forEach(item => item.id == idx ? item.isActive = true : item.isActive = false)
    this.setData({ tabs })
  },

  /**
   * 下拉刷新逻辑实现：
   *  1. 用户上滑页面 滚动触底，开始加载下一页数据
   *      a. 是否有下一页数据
   *        I. 总页数 --> 总页码 = Math.ceil(总数量 / 页容量)
   *        II. 获取当前页码
   *        III. 判断当前页码是否大于等于总页码 --> 表示没有数据
   *      b. 如果没有，弹出提示
   *      c. 如果有，那么加载数据
   *        I. 当前页码++
   *        II. 重新发送请求
   *        III. 请求成功，重新对数据进行拼接
   *  2. 下拉刷新页面
   *      a. 重置当前页码为初始页码
   *      b. 重新请求
   */

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    /**
     * 触底加载可以添加loading加载效果，没有数据的时候在底部可以显示没有更多数据提示
     */
    if (this.queryParams.pagenum >= this.totalPages) {
      return wx.showToast({
        title: '没有更多数据了',
        icon: 'none',
        duration: 1500,
        mask: false
      })
    } else {
      this.queryParams.pagenum++
      this.getGoodsList()
    }
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
    if (this.queryParams.pagenum !== 1) {
      this.setData({goodsList: []}) // 重置数组
      this.queryParams.pagenum = 1  // 重置
      this.getGoodsList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})