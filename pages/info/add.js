Page({

  /**
   * 页面的初始数据
   */
  data: {
    cdataList:null,
    list: null,
    ckArray: ['请选择', '青村总仓', '集库仓', 'RDC仓'],
    ytArray: [],
    ckIndex: 0,
    ytIndex: 0,
    userName:'',
    phoneNo:'',
    lpNo:'',
    ckName:'',
    ytName:'',
    isAble:-1,
    miData:'',
    boxesNumber:'',
    mapDatePlate:'',
    waybillNo:''
  },

  onSubmitClick: function(e){
    var sckName = this.data.ckName;
    var sytName = this.data.ytName;
    var smapDatePlate = this.data.mapDatePlate;
    var sboxesNumber = this.data.boxesNumber;
    var swaybillNo = this.data.waybillNo;
    if(sckName && sytName && smapDatePlate && sboxesNumber){
      wx.request({
        url: 'http://192.168.0.108:8888/cf/mi/miSave',
        header: {
          'cookie': wx.getStorageSync("sessionid"),
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data: {
          mapWn: sckName,
          platformNo: sytName,
          mapDatePlate: smapDatePlate,
          boxesNumber: sboxesNumber,
          waybillNo: swaybillNo
        },
        method: 'post',
        success: res => {
          console.log(res.data)
          wx.navigateTo({
            url: '../view/view?id=' + res.data.data.mapId
          })
         }
        });
    }else{
      wx.showToast({  
        title: '请完善表单内容',  
        icon: 'none',  
        duration: 2000  
      })  
    }
  }, 
  getwaybillNoValue: function (e) {
    this.setData({
      waybillNo: e.detail.value
    })
  },

  getboxesNumberValue: function (e) {
    this.setData({
      boxesNumber: e.detail.value
    })
  },

  onDataPlClick: function(options) {
    var key = options.currentTarget.dataset.key;
    var value = options.currentTarget.dataset.value;
    var index = options.currentTarget.dataset.index;
    console.log(options);
    if(value == '1'){
      wx.showToast({  
        title: '该时间段已占用',  
        icon: 'none',  
        duration: 2000  
      })  
    }else{

      this.setData({
        isAble:index,
        mapDatePlate:key
      });
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var id = options.id;
    console.log(id);

    wx.request({
      url: 'http://192.168.0.108:8888/user/getUser/',
      header: {
        'cookie': wx.getStorageSync("sessionid")
      },
      method: 'get',
      success: res => {
        console.log(res.data)
        that.setData({
          userName: res.data.data.userName,
          phoneNo: res.data.data.phoneNo,
          lpNo: res.data.data.lpNo
        });
      },
    });

    if(id){
      wx.request({
        url: 'http://192.168.0.108:8888/cf/mi/get/'+ id,
        header: {
          'cookie': wx.getStorageSync("sessionid")
        },
        method: 'get',
        success: res => {
          console.log(res.data)
          that.setData({
            list: res.data.data.rows
          })
        },
      })
  }
  },

  bindCkPickerChange: function (e) {
    if(e.detail.value == '0'){}else{
      
      this.setData({
      ckIndex: e.detail.value,
      ckName: this.data.ckArray[e.detail.value]
      })
      wx.request({
        url: 'http://192.168.0.108:8888/cf/pm/page',
        header: {
          'cookie': wx.getStorageSync("sessionid"),
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data: {
          page: 1,
          rows: 1000,
          warehouseName: this.data.ckArray[e.detail.value]
        },
        method: 'post',
        success: res => {
          console.log(res.data)
          var ckData = [];
          var yt='';
          var dlist = null;
          res.data.data.rows.forEach(function(item, index){
            if(index == 0){
              yt = item.platformNo
            }
            ckData.push(item.platformNo);
          });
          
          if(yt){
            wx.request({
              url: 'http://192.168.0.108:8888/cf/mi/getTimeBlock',
              header: {
                'cookie': wx.getStorageSync("sessionid"),
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
              },
              data: {
                mapWn: this.data.ckName,
                platformNo: yt
              },
              method: 'post',
              success: res => {
                console.log(res.data)
                this.setData({
                  cdataList:res.data.data
                });
              },
            });
          }
          this.setData({
            ytArray: ckData,
            ytName:yt
          });
        },
      });
    }
   },
   bindYtPickerChange: function (e) {
    var ytNo = this.data.ytArray[e.detail.value];
    this.setData({
     ytIndex: e.detail.value,
     ytName: this.data.ytArray[e.detail.value]
    });
    
    console.log(this.data.ckName)
    wx.request({
      url: 'http://192.168.0.108:8888/cf/mi/getTimeBlock',
      header: {
        'cookie': wx.getStorageSync("sessionid"),
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      data: {
        mapWn: this.data.ckName,
        platformNo: ytNo
      },
      method: 'post',
      success: res => {
        console.log(res.data)
        this.setData({
          cdataList:res.data.data
        });
      },
    });
  
   },
})