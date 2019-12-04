/**
 * 
 * @param {*} options 传递的配置对象
 */
export let tips = (options) => {
  wx.showToast({
    title: options.title || '',
    icon: options.icon || 'none',
    image: options.imagePath || '',
    duration: options.duration || 1500,
    mask: options.mask || true,
    success: (result) => {
      options.callback && options.callback(result)
    },
    fail: (err) => {
      options.callback && options.callback(result)
      console.log('showToast == ', '显示失败')
    }
  })
  console.log('options == ', options)
}