// components/swiper.js
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    test: {
      type: String,
      value: 'def',
    },
    // 属性用驼峰命名，组件传值时用—
    swiperData: Array
  },
  data: {
    // 这里是一些组件内部数据
    baseImgUrl: "https://fuss10.elemecdn.com"
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function () { }
  }
})
