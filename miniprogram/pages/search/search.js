// pages/sousuo/sousuo.js
const db = wx.cloud.database();
const  m=db.command;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    gjz:"",
    dataObj:"",
    kong:""
  },
abc(e){
  this.setData({
    gjz:e.detail.value
  })
},
btnclick(){
  var str=this.data.gjz;
  db.collection("inf")
  .get().then(res=>{
    // this.setData({
    //   dataObj:res.data
    // })
    var o=[];
    for (let index = 0; index < res.data.length; index++) {
      if(res.data[index].moreInf.indexOf(str)>=0){
        o.push(res.data[index]);
      }
    };
    if(o.length==0)
    {
      this.setData({
        kong:"没有找到所需求的信息！"
      })
      wx.showModal({
        title: '提示',
        content: '没有找到所寻物品',
        success: function (res) {
          if (res.confirm) {//这里是点击了确定以后
            console.log('用户点击确定')
          } else {//这里是点击了取消以后
            console.log('用户点击取消')
          }
        }
      })
    }
    this.setData({
      dataObj:o
    })
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