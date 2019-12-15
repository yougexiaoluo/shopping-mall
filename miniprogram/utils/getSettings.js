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

// promise 形式的 showToase
export const showToast = (options) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: options.title || '操作成功',
      icon: options.icon || 'success',
      mask: options.mask || true,
      image: options.image || '',
      daration: options.daration || 1500,
      success(res) {
        resolve(res)
      },
      faild(err) {
        reject(err)
      }
    })
  })
}