//index.js
//获取应用实例
const app = getApp()
    // commonJS 规范 node
const api = require("../../utils/api.js")
    // console.log(api)
api.sayHi();
// ES6 的方式
import { sayHi } from "../../utils/api.js"
sayHi()
Page({
    data: {

    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function() {},
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})