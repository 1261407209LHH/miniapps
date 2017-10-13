var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   items:[],
   index:"0",
   path:"play.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.ixigua.com/api/pc/feed/?min_behot_time=0&category=video_new&utm_source=toutiao&widen=1&tadrequire=true&as=A115A91D4EC45A2&cp=59DEA4253A729E1',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var l=res.data.data
        that.setData({
          items:l,
          index:res.data.next["max_behot_time"]
        })
        // console.log(that.data.items)
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
    var that = this;
    var time=that.index;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: 'https://www.ixigua.com/api/pc/feed/?max_behot_time='+time+'&category=video_new&utm_source=toutiao&widen=1&tadrequire=true&as=A195592D5E74C8C&cp=59DE94CC086C1E1',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading()
        that.setData({
          items:res.data.data,
          index: res.data.next["max_behot_time"]
        })
        
      },
    })
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that=this
    var time = that.data.index
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: 'https://www.ixigua.com/api/pc/feed/?max_behot_time=' + time + '&category=video_new&utm_source=toutiao&widen=1&tadrequire=true&as=A195592D5E74C8C&cp=59DE94CC086C1E1',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var l=res.data.data;
        var list=that.data.items
        for (var i=0;i<l.length;i++){
          list.push(l[i])
        }
        wx.hideLoading()
        that.setData({
          items: list,
          index: res.data.next["max_behot_time"]
        })
      },
    })
    wx.stopPullDownRefresh()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '科技新闻视频分享',
      path: 'pages/video/video',
      success:function(){
        wx.showToast({
          title: '分享成功',
          icon: 'success',
        })
      }
    }
  },
  play:function(event){
    var video = event.currentTarget.dataset.video;
    console.log(video)
    // this.setData({
    //   path:'play.png'
    // })
    wx.navigateTo({
      url: '../logs/logs?imgUrl=' + video.image_url + '&source_url=' + video["source_url"] + "&title=" + video.title + "&group_id=" + video["group_id"]
    })
  }
})