// pages/personal/personal.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avator: "http://127.0.0.1:3000/upload/15456342156783747.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionIdc
    //     console.log("res.code = " + res.code);
    //   }
    // })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     console.log("授权 = ");
    //     console.log(res.authSetting);
    //     console.log(res.authSetting['scope.userInfo']);
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.setData({
    //             userInfo = res.userInfo
    //           })

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  /**
   * 上传头像
   */
  uploadAvator: function () {
    wx.chooseImage({
      sourceType: ['camera', 'album'],                    // 从相册或相机中选图片
      count: 1,                                           // 选择单张图片
      sizeType: ['compressed'],                           // 将原图压缩
      success: function (res) {                           // 成功获取本地图片路径
        wx.showToast({
          title: "正在上传中...",
          icon: 'loading'
        })
        setTimeout(function() {
          wx.hideToast();
        }, 1500);
        wx.uploadFile({                                   // 上传图片
          url: "http://127.0.0.1:3000/upload",            // 服务器程序路径
          filePath: res.tempFilePaths[0],                 // 本地图片路径
          name: 'mypic',                                  // 图片name值，mypic
          header: {
            "Content-Type": "multipart/form-data"         // 指定头
          },
          success: function () {                          // 上传成功
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function() {
            wx.showModal({
              title: '错误提示',
              content: '系统正在升级中,请5s后重试!',
              showCancel: false
            })
          }
        })
      }
    })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})