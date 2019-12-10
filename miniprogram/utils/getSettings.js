// 获取用户授权状态
export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success(res) {
        resolve(res)
      },
      faild(err) {
        reject(err)
      }
    })
  })
}

// 诱导用户授权
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success(res) {
        resolve(res)
      },
      faild(err){
        reject(err)
      }
    })
  })
}

// 获取用户地址信息
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success(res) {
        resolve(res)
      },
      faild(err) {
        reject(err)
      }
    })
  })
}