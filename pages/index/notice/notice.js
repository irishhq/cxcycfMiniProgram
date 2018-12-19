// pages/index/notice/notice.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // notice: {
    //   url: "/pages/index/notice/noticeDetails/noticeDetails",
    //   imgSrc: "http://upload.cxcycf.com/upload/201612/06/201612061512317998.jpg",
    //   itemTitle: "我省创新高校编制管理 高层次人才编制可单列",
    //   itemInfo: "近日，四川省委办公厅印发《关于进一步加强和改进高等学校党的建设的意见》，提出高校党政领导班子实行任期制，明确每届任期5年，领导人员原则上担任同一职务时间不超过两届或10年。&amp;emsp;&amp;emsp;《意见》强调…",
    //   releaseTime: "2016-09-05 14:23"
    // },
    // noticeList: []
  },
  getNoticeList: function() {
    wx.request({
      url: "http://176.202.57.10:3000/noticeList",
      success: (res) => {
        // var noticeList = res.data;
        this.setData({
          noticeList: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNoticeList();
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