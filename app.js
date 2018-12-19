//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionIdc
        console.log("res.code = " + res.code);
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log("授权 = ");
        console.log(res.authSetting);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // wx.playBackgroundAudio({
    //   dataUrl: "http://fs.w.kugou.com/201812191613/9e7ac51ddb84d3fd37e062aa464559f1/G046/M01/11/17/bg0DAFYfrx6AZnO9ABo4AkPw9aQ590.mp3",
    //   title: "bgMusic"
    // })
  },
  globalData: {
    userInfo: null
  }
})