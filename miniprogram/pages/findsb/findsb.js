// pages/getData/getData.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataArr:[]
  },

  getData(){
    db.collection("inf")
    .get()
    .then(res=>{
      this.setData({
        dataArr:res.data
      })
    })
  },

  moreinf:function(index) {
    var i=index.currentTarget.dataset.index
    wx.setStorage({
      key:"temInf",
      data:this.data.dataArr[i]
    }).then(res=>{
      wx.navigateTo({
        url: '/pages/moreinf/moreinf',
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
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