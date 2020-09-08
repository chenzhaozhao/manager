Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNo:'',
    lpNo:'',
    ckName:'',
    ytName:'',
    isAble:-1,
    miData:'',
    boxesNumber:'',
    mapDatePlate:'',
    waybillNo:'',
    userName:'',
    mapDate: ''
  },

 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var id = options.id;
    console.log(id);
    if(id){
      wx.request({
        url: 'http://192.168.0.108:8888/cf/mi/get/'+ id,
        header: {
          'cookie': wx.getStorageSync("sessionid")
        },
        method: 'get',
        success: res => {
          console.log(res.data)
          this.setData({
            ckName: res.data.data.mapWn,
            ytName: res.data.data.platformNo,
            userName: res.data.data.userName,
            phoneNo: res.data.data.phone,
            lpNo: res.data.data.lpNo,
            waybillNo: res.data.data.waybillNo,
            boxesNumber: res.data.data.boxesNumber,
            mapDate: res.data.data.mapDate,
            mapDatePlate: res.data.data.mapDatePlate,
          })
        },
      })
  }
  },

 
})