// pages/home/home.js
const app = getApp()
const api = require("../../utils/api.js")
Page({
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: 'elm',
            path: '/page/home/home'
        }
    },
    /**
     * 页面的初始数据
     */
    data: {
        subjects: [],
        baseUrl: "https://elm.cangdu.org/img/",
        swiperData: []
    },
    collect(event) {
        console.log("收藏", event)
        // 取消我们点击的店铺
        // let shop = event.currentTarget.dataset.shop;
        let { index, shop } = event.currentTarget.dataset;


        // app.globalData.globalShops.push(shop);
        // 每次点击收藏的时候 需要把当前点击的放入之前的收藏数组中
        // 1.先获取收藏数组 因为第一次取不到给默认值
        let globalShops = wx.getStorageSync("globalShops") || [];
        /*
        当前点击的店铺放入收藏数组
        收藏一个店铺多次 会显示多次
        但我们要做到收藏同一个店铺多次只显示一个
        收藏数组需要进行过滤筛选
        拿点击的店铺和已收藏的店铺的ID比较
        进行ID相等的比较
        some() 方法用于检测数组中的元素是否满足指定条件（函数提供）
some() 方法会依次执行数组的每个元素：

        如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
        如果没有满足条件的元素，则返回false。
        注意： some() 不会对空数组进行检测。
            some() 不会改变原始数组。
        */
        let isHasShop = globalShops.some((oldShop) => {
            return oldShop.id === shop.id;
        });
        if (isHasShop) {
            // 有   筛选
            // console.log("有该店铺，不再次收藏")
            globalShops = globalShops.filter((oldShop) => {
                return oldShop.id !== shop.id;
            })
        } else {
            // 没有
            console.log("没有该店铺，收藏")
            globalShops.push(shop)
        }
        // globalShops.push(shop)

        /*
        取消收藏：
            就需要给每个店铺加一个状态/标记
            点哪个改哪个 把0变成变量
            "subjects[0]":shop 小程序特有
        */
        shop.isCollect = !shop.isCollect;
        this.setData({
            ["subjects[" + index + "]"]: shop
        })

        // 存储到缓存当中 storage面板查看数据 
        wx.setStorageSync("globalShops", globalShops);
    },
    requestShop(offset) {
        const shops = "shopping/restaurants";
        let data = {
            latitude: 31.22967,
            longitude: 121.4762,
            offset, // 跳过多少条数据，默认0
            limit: 10
        }
        let oldSubjects = this.data.subjects;
        api.get(shops, data).then(res => {
            /* 
            0.明确需求 下拉时收藏状态消失【赋值初始状态】
            所以只需要处理新加载的数据就行res.data[]
            1.获取之前收藏过的数组
            收藏过 shop.isCllect = true  
            */
            // 先获取收藏数组
            let globalShops = wx.getStorageSync("globalShops") || [];
            res.data.forEach((newShop) => {
                // 判断收藏数组里面是否有了
                let isHasShop = globalShops.some((oldShop) => {
                    return oldShop.id === newShop.id;
                });
                // 标记被收藏
                if (isHasShop) {
                    newShop.isCollect = true;
                }
            })
            console.log(res)
            let subjects = null;
            if (offset === 0) {
                // 下拉刷新 清空原数组
                subjects = res.data;
                wx.stopPullDownRefresh()
            } else {
                // 上拉是拼接
                subjects = [...oldSubjects, ...res.data]
            }
            this.setData({
                subjects
            })
        }).catch(error => {
            console.log(error)
        })
    },

    requestSwiper() {
        const url = "v2/index_entry";
        api.get(url).then((res) => {
            console.log("swiper>>>>>>>", res);
            // swiperData[[第一页],[第二页]]
            // 定义轮播图数组，里面装的是每一页的数据
            let arr1 = res.data.slice(0, 8);//[0,8)
            let arr2 = res.data.slice(8);//[8,结尾)
            this.setData({
                swiperData: [arr1, arr2]
            })
            console.log("swiperData>>>>>>", this.data.swiperData)
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // const Top250 = "https://douban.uieee.com/v2/movie/top250";
        // 商铺列表
        this.requestShop(0)
        this.requestSwiper()
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
        console.log("下拉")
        this.requestShop(0)
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        console.log("上拉")
        this.requestShop(this.data.subjects.length)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})