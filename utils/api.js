const sayHi = function() {
    console.log("早上好")
}
const baseurl = "https://elm.cangdu.org/"
const get = function(url, data) {
        wx.showLoading({
            title: "加载中",
            mask: true,
            success: (result) => {},
            fail: () => {},
            complete: () => {}
        });

        // promise 承诺 在异步请求上有优势 resolve 同意 reject 拒绝
        return new Promise(function(resolve, reject) {
            // resolve reject只能走一个
            // resolve()
            // reject()
            wx.request({
                url: baseurl + url, //仅为示例，并非真实的接口地址
                // data: {},
                data,
                header: {
                    'content-type': 'application/json' // 默认值 只针对豆瓣 json去掉
                },
                success: (res) => {
                    resolve(res)
                    wx.showToast({
                        title: '成功',
                        icon: 'none',
                        image: '',
                        duration: 1500,
                        mask: false,
                        success: (result) => {

                        },
                        fail: () => {},
                        complete: () => {}
                    });

                },
                fail: (error) => {
                    reject(error)
                },
                complete: () => {
                    // 请求完成调用 成功失败都会走
                    // wx.hideLoading();
                }
            })
        })
    }
    // get("url").then(res => {
    //     console.log("in")
    // }).catch(error => {
    //     console.log("out")
    // })

module.exports = {
    sayHi,
    get
}

// ES6
export { sayHi }