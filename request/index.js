export const request = (params) => {
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
        // 可以在这里做加载动画loading...
      }
    })
  })
}