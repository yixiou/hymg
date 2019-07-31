// 引入自己封装的接口代码，小程序中要引入完整的路径
import { request } from"../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图
    swiperList:[],
    // 导航数据
    navCateList:[],
    // 商品楼层
    floorList:[]
  },
  // 获取轮播图数据
  getswiperList(){
    // wx.request({
    //   url:'https://api.zbztb.cn/api/public/v1/home/swiperdata',
    //  success:(result)=>{
    //   //  console.log(result);
    //    this.setData({
    //     swiperList:result.data.message
    //    })
    //  }
    // })

    // 回调地狱
    request({url:'/home/swiperdata'})
    .then(result=>{
      this.setData({
        swiperList:result
      })
    })
  },
  // 获取导航数据
  getNavCateList(){
    // wx.request({
    //   url:'https://api.zbztb.cn/api/public/v1/home/catitems',
    //   success:(result)=>{
    //     console.log(result);
    //     this.setData({
    //       navCateList:result.data.message
    //     })
    //   }
    // })
    request({url:'/home/catitems'})
    .then(result=>{
      this.setData({
        navCateList:result
      })
    })
  },
  // 获取商品楼层数据
  getFloorList(){
    // wx.request({
    //   url:'https://api.zbztb.cn/api/public/v1/home/floordata',
    //   success:(result)=>{
    //     console.log(result)
    //     this.setData({
    //       floorList:result.data.message
    //     })
    //   }
    // })
    request({url:'/home/floordata'})
    .then(result=>{
      this.setData({
        floorList:result
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getswiperList();
   this.getNavCateList();
   this.getFloorList();
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