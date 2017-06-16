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
      }]
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

  }
})