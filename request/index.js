export const request = (params) => {
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      success: function (result) {
        resolve(result)
      },
      fail: function (err) {
        reject(err)
      },
      complete: function () {
        // 可以在这里做加载动画loading...
      }
    })
  })
}