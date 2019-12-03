// 有可能出现多个请求一起发送，所以用一个计数器进行计算
let ajaxTimes = 0
export const request = (params) => {
  ajaxTimes++ // 请求一次进行 ++
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  const BASEURL = 'https://api.zbztb.cn/api/public/v1'
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: BASEURL + params.url,
      success: function (result) {
        resolve(result.data.message)
      },
      fail: function (err) {
        reject(err)
      },
      complete: function () {
        ajaxTimes-- // loading动画只能出现一次，所以需要 --
        if (ajaxTimes === 0) {
          wx.hideLoading()
        }
      }
    })
  })
}