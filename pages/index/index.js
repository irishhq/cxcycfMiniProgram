//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,

    //显示条目数
    displayTimes: 3,
    categoryLists: [
      // { id: 1, link_url: "", img_url: "http://176.202.57.10:3000/img/category-icon/tongzhigonggao.png", title: "通知公告" },
      // { id: 2, link_url: "", img_url: "http://176.202.57.10:3000/img/category-icon/chuangyezhengce.png", title: "创业政策" },
      // { id: 3, link_url: "", img_url: "http://176.202.57.10:3000/img/category-icon/chuangyexiangmu.png", title: "创业项目" },
      // { id: 4, link_url: "", img_url: "http://176.202.57.10:3000/img/category-icon/chuangyejijin.png", title: "创业基金" },
      // { id: 5, link_url: "", img_url: "http://176.202.57.10:3000/img/category-icon/chuangyejidi.png", title: "创业基地" },
      // { id: 6, link_url: "", img_url: "http://176.202.57.10:3000/img/category-icon/chaungyedaoshi.png", title: "创业导师" }
      { id: 1, link_url: "", img_url: "http://192.168.43.87:3000/img/category-icon/tongzhigonggao.png", title: "通知公告" },
      { id: 2, link_url: "", img_url: "http://192.168.43.87:3000/img/category-icon/chuangyezhengce.png", title: "创业政策" },
      { id: 3, link_url: "", img_url: "http://192.168.43.87:3000/img/category-icon/chuangyexiangmu.png", title: "创业项目" },
      { id: 4, link_url: "", img_url: "http://192.168.43.87:3000/img/category-icon/chuangyejijin.png", title: "创业基金" },
      { id: 5, link_url: "", img_url: "http://192.168.43.87:3000/img/category-icon/chuangyejidi.png", title: "创业基地" },
      { id: 6, link_url: "", img_url: "http://192.168.43.87:3000/img/category-icon/chaungyedaoshi.png", title: "创业导师" }
    ]/* 分类导航数据 */ 
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
      // url: 'http://176.202.57.10:3000/getSwiperImgs',
      url: "http://192.168.43.87:3000/getSwiperImgs",
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
      }
    })
  }
})
