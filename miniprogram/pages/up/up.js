// pages/up/up.js
const db = wx.cloud.database()
var i=0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fData:{},
    imgSrc:[],
    count:-1,
    fileID:[],
    kind:"sb"
  },

  up:function() {
    var that=this
    wx:wx.chooseImage({
      count:3,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: (result) => {
        var tempFilePaths = result.tempFilePaths
        that.setData({
          imgSrc:that.data.imgSrc.concat(tempFilePaths)
        })
        that.setData({
          count:that.data.imgSrc.length
        })
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  },

  delete:function(index) {
    for (var i = 0; i < this.data.imgSrc.length; i++) {
      if (i == index.currentTarget.dataset.index) this.data.imgSrc.splice(i, 1)
    }
    this.setData({
      imgSrc: this.data.imgSrc
    })
    this.setData({
      count:this.data.imgSrc.length
    })
  },

  btnSub:function(res) {
    var that=this
    wx.showLoading({
      title: '数据提交中',
      mask:true
    })
    this.setData({
      fData:res.detail.value
    })
    if(that.data.imgSrc.length==0){
      that.setData({
        "fData.fileID":this.data.fileID,
        "fData.kind":this.data.kind
      })
      that.dbAdd();
    }
    for(i=0;i<that.data.imgSrc.length;++i){
      wx.cloud.uploadFile({
        cloudPath:"userPic/"+Date.now()+".jpg",
        filePath:that.data.imgSrc[i]
      }).then(res=>{
        that.setData({
          fileID:that.data.fileID.concat(res.fileID)
        })
        if(that.data.fileID.length==that.data.imgSrc.length){
          that.setData({
            "fData.fileID":this.data.fileID,
            "fData.kind":this.data.kind
          })
          that.dbAdd();
        }
      })
    }
  },

  dbAdd:function() {
    var that=this
    db.collection("inf").add({
      data:that.data.fData
    }).then(res=>{
      wx.hideLoading({
        success: (res) => {
          wx.reLaunch({
            url: '/pages/index/index',
          })
        },
      })
    })
  },
  
  choKind:function(e) {
    this.setData({
      kind:e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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