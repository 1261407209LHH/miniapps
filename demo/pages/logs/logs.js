Page({
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  inputValue: '',
  data: {
    danmuList: [
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
      }],
      imgUrl:"",
      title:"",
      videoSrc:'',
      group_id:"",
      comments:[],
      offset:0
  },
  danmu: function (e) {
    this.inputValue = e.detail.value
    e.detail.value=''
  },
  sendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color:"#ff0000"
    })

  },
  onLoad:function(options){
    var that=this
    that.setData({
      imgUrl:options.imgUrl,
      title:options.title,
      videoSrc:options.videoSrc,
      group_id:options["group_id"]
    })
    wx.request({
      url: "https://www.ixigua.com/api/comment/list/?group_id=" + that.data["group_id"] + "&item_id=" + that.data["group_id"]+"&offset=0&count=5",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          offset:that.data.offset+10,
          comments:res.data.data.comments,
        })
        console.log(that.data.comments)
      }
    })
  },
  onReachBottom:function(){
    var that=this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: "https://www.ixigua.com/api/comment/list/?group_id=" + that.data["group_id"] + "&item_id=" + that.data["group_id"] + "&offset="+that.data.offset+"&count=5",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var list=that.data.comments;
        var newData=res.data.data.comments;
        console.log(newData)
        for (var i=0;i<newData.length;i++){
          list.push(newData[i])
        }
        that.setData({
          offset:that.data.offset+10,
          comments: list,
        })
        wx.hideLoading()
      }
    })
  }
})