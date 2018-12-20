// pages/education/courseDetails/courseDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoSrc: 'http://176.202.57.10:3000/x.mp4',
    poster: 'http://176.202.57.10:3000/img/ad.png',
    danmuList: [
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 5
      }
    ],
    itemSelected: [
      { isSelected: true, show: true },
      { isSelected: false, show: false }
    ],
    /*学习状态*/
    courseLearning: ""
  },
  inputValue: '',
  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  },
  switch: function (e) {
    var selectedId = e.currentTarget.id;
    console.log("currTarID==" + selectedId);
    if (selectedId == 'introTitle') {
      this.setData({
        'itemSelected[0].isSelected': true,
        'itemSelected[1].isSelected': false,
        'itemSelected[0].show': true,
        'itemSelected[1].show': false
      });
    }
    else if (selectedId == 'dirTitle') {
      this.setData({
        'itemSelected[0].isSelected': false,
        'itemSelected[1].isSelected': true,
        'itemSelected[0].show': false,
        'itemSelected[1].show': true
      });
    }
  },
  joinLearning: function () {
    try {
      const status = wx.getStorageSync('key');      /*获取课程学习状态*/
      var msg = "";
      if (0 == status) {                            /*该课程未被加入学习*/
        msg = "加入学习成功"
        this.setData({                                /*修改'加入学习'为继续学习*/
          courseLearning: "继续学习"
        });
      } else {

      }
      wx.showToast({                                /*显示加入学习成功提示框*/
        title: msg,
        icon: "success",
        duration: 2000
      });

    } catch (e) {
      throw e;
    }
    /*将课程学习状态保存*/
    wx.setStorage({
      key: ""
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*加载页面时，获取课程学习状态：显示加入学习/继续学习*/
    
    var courLearingStatus = "加入学习";
    this.setData({
      courseLearning: courLearingStatus
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
function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}