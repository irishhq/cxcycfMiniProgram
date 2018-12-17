//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,

    //显示条目数
    displayTimes: 3
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.loadCarousel();
  },
  // 获取轮播图数据
  loadCarousel: function () {
    var that = this;
    wx.request({
      url: 'http://localhost:3000/getSwiperImgs',
      //请求的参数
      // data: {
      //   action: 'carousel',
      //   top: 6
      // },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var imgUrl = res.data;
        that.setData({
          imgUrls: imgUrl
        })
      },
      fail: function (res) {
        console.log('fail');
      },
      complete: function (res) {
        console.log('complete');
      }
    })
  }
  /* getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }*/
})
