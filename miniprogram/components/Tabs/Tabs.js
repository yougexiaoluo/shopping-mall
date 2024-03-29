// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      default: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 想父组件传递事件
    changeTabsHandle(e) {
      let { idx } = e.currentTarget.dataset
      this.triggerEvent('tabsItemTap', { idx })
    }
  }
})
