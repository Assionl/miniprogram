//app.js
App({
        onLaunch: function() {

        },
        // 可以被全局访问
        globalData: {
            userInfo: null,
            // 所有收藏的店铺
            globalShops: []
        },
    })
    /*小程序界面之间共享数据
    1.保存到App实例上 例如globalData
    2.保存到缓存里面


    */