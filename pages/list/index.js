Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{},{},{}]
  },
  addMi: function(){
    wx.navigateTo({
      url: '../info/add'
    })
  },
  ontp: function(event){
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../view/view?id=' + id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: 'http://192.168.0.108:8888/cf/mi/pageByUserId',
      header: {
        'cookie': wx.getStorageSync("sessionid")
      },
      method: 'post',
      data: {
        page: 1,
        rows: 1000
      },
      success: res => {
        console.log(res.data)
        that.setData({
          list: res.data.data.rows
        })
      },
    })
  },


})