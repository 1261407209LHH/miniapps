Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:null,
    items:null,
    max_time:""
 },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: 'http://www.toutiao.com/api/pc/feed/?category=news_tech&utm_source=toutiao&widen=1&max_behot_time=0&max_behot_time_tmp=0&tadrequire=true&as=A155493CA8EBB0F&cp=59C84BEB601F7E1',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        for(var i=0;i<res.data.data.length;i++){
          if (res.data.data[i]["image_url"]){
            res.data.data[i]["image_url"] = "http://" + res.data.data[i]["image_url"];
          }else{
            res.data.data[i]["image_url"] ="http://p3.so.qhimgs1.com/bdr/_240_/t019e5e7cbb4957f5d3.jpg";
          }
        }
        that.setData({
          items:res.data.data,
          max_time: res.data.next["max_behot_time"],
          imgUrls: [res.data.data[1].image_url, res.data.data[2].image_url, res.data.data[4].image_url],
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
    var that=this;
    wx.showLoading({
      title: '刷新中',
    })
    wx.request({
      url: "http://www.toutiao.com/api/pc/feed/?category=news_tech&utm_source=toutiao&widen=1&max_behot_time=0&max_behot_time_tmp=0&tadrequire=true&as=A155493CA8EBB0F&cp=59C84BEB601F7E1",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        for (var i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i]["image_url"]) {
            res.data.data[i]["image_url"] = "http://" + res.data.data[i]["image_url"];
          } else {
            res.data.data[i]["image_url"] = "http://p3.so.qhimgs1.com/bdr/_240_/t019e5e7cbb4957f5d3.jpg";
          }
        }
        that.setData({
          items:res.data.data,
        })
        wx.hideLoading()
      }
    })
  }, 

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that=this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: "http://www.toutiao.com/api/pc/feed/?category=news_tech&utm_source=toutiao&widen=1&max_behot_time=" + that.data.max_time + "&max_behot_time_tmp=" + that.data.max_time +"&tadrequire=true&as=A155493CA8EBB0F&cp=59C84BEB601F7E1",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        for (var i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i]["image_url"]) {
            res.data.data[i]["image_url"] = "http://" + res.data.data[i]["image_url"];
          } else {
            res.data.data[i]["image_url"] = "http://p3.so.qhimgs1.com/bdr/_240_/t019e5e7cbb4957f5d3.jpg";
          }
        }   
        var list=that.data.items;
        var getData=res.data.data;
        for(var i=0;i<getData.length;i++){
          list.push(getData[i])
        }
        that.setData({
          items:list,
          max_time: res.data.next["max_behot_time"]
        })
        wx.hideLoading()
      }
    })
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
  onbindclickItem:function(event){
    var news = event.currentTarget.dataset.news;
    console.log(news.label);
    // var image_Url ="http://"+news.image_url
    var image_list=[];
    for(var i=0;i<news.image_list.length;i++){
      image_list.push(news.image_list[i].url)
    }
    wx.navigateTo({
      url: '../article/article?abstract=' + news.abstract + "&title=" + news.title + "&image_Url=" + image_list+"&label="+news.label

    })

  }

 
})