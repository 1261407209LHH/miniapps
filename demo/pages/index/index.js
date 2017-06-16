Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:null,
    items:null,
    num:10
 },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: 'https://api.tianapi.com/keji/?key=82bd10ccb529c5eab05c58c858ecfe43&num='+that.data.num,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          items:res.data.newslist,
          imgUrls: [res.data.newslist[0].picUrl, res.data.newslist[1].picUrl, res.data.newslist[2].picUrl],
          num:that.data.num+10
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
    wx.showToast({
      title: 'reresh',
      icon:'success',
      duration:2000
    })
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
    return {
      title: '科技新闻',
      path: '/page/user?id=123'
    }
  },
  scroll:function(){
    var that=this
    that.setData({
      num:that.data.num+10
    })
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    
    wx.request({
      url: 'https://api.tianapi.com/keji/?key=82bd10ccb529c5eab05c58c858ecfe43&num='+that.data.num,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading()
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        var data=res.data.newslist
        if(that.data.num !=50){
          that.setData({
            items: data,
            num: that.data.num + 10
          })
        }else{
          console.log(that.data.num)
        }
        
      }
    })

  },

 
})