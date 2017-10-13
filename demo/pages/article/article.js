Page({

  /**
   * 页面的初始数据
   */
  data: {
    abstract:"",
    title:'',
    image_Url:"",
    label:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var label=options.label.split(',');
    var that=this;
    var tmp=[];
    that.setData({
      abstract:options.abstract,
      title:options.title,
      label:label
    })
   var list=options.image_Url.split(",");
    for (var i = 0; i <list.length;i++){
      var url="http://"+list[i];
      tmp.push(url)
    }
    that.setData({
      image_Url:tmp,
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