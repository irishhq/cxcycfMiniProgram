// pages/index/notice/notice.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    noticeList: [],
    pno: 0,       /*初始页码*/
    pageCount: 0,  /*模拟数据*/
    pageSize: 5
  },
  /**
   * 获取通知列表数据
   */
  loadMore: function () {
    var timer = setTimeout(function () {
      wx.showLoading({
        title: '加载中...',
      })
    }, 500);
    wx.request({
      url: "http://176.202.57.10:3000/noticeList",
      data: {
        pno: this.data.pno++,
        pageSize: this.data.pageSize
      },
      success: (res) => {
        /*显示下拉加载刷新*/
        setTimeout(function () {
          clearTimeout(timer);
          wx.hideLoading();
        });
        if (this.data.hasMore == false) { /*数据加载完全，没有下一页数据时，返回并弹出提示框*/
          wx.showToast({
            title: '没有更多了...',
            icon: 'none'
          })
          return;
        }
        /* 应从后台获取页码总数&当前页码,暂时以固定数据替代 */
        var pageCount = res.data.pageCount; /*res.data.pageCount;*/
        var pno = this.data.pno; /*res.data.pageIndex;*/

        var flag = pno < pageCount; /*用户判断是否加载完所有数据*/
        var list = this.data.noticeList.concat(res.data.data); /*追加下一页数据*/

        this.setData({
          noticeList: list,
          hasMore: flag,
          pno: ++pno
        })
      },
      fail: (err) => {
        if (err.errMsg == "request:fail") {
          setTimeout(function () {
            wx.showToast({
              title: '请检查网络连接',
              icon: 'none',
              duration: 2000
            });
          }, 10000)
        }
      },
      complete: (res) => {
        console.log(res);
      }
    })
  },
  toDetail: function (e) {
    var nid = e.currentTarget.dataset.nid;
    wx.navigateTo({
      url: 'noticeDetails/noticeDetails?nid=' + nid
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMore();
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
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})