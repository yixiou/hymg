
/* 
步骤：
1 给左侧菜单绑定点击事件 点击
  1 左侧菜单切换选中  
    1 获取到被点击的索引
    2 获取源数组 循环修改 
  2 同时 右侧要显示的内容跟随着改变
    1 获取之前定义 好的全局的接口的返回值
    2 动态的传递被点击的索引即可
2 给分类页面添加一个缓存效果 
  0 h5中的 本地存储技术  localStorage 
    localStorage.setItem  存入不同类型的数据 
    1 普通的数据 数字 字符串 bool
    2 对象格式     先转成json字符串再存进去     
  1 微信小程序中 本地存储技术 
    1 不管什么类型的数据 直接存 可以直接获取  比以前的h5的本地存储更简单 
  2 再分析缓存的逻辑 
    1 发送请求之前 先判断一下有没有缓存数据
    2 假如 没有数据 (a. 直接发送新请求 获取数据 (b. 把新输入存入到缓存中 
        要存入的数据的格式  key="cates",: {time:存入的时间,data:接口返回值}
    3 有缓存数据 
      判断数据是否过期
      1 数据已经过期了  重新发送新请求去拿新的数据
      2 数据没有过期   此时 才使用缓存数据！！！
 */

import { request } from"../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单
    leftMenuList:[],
    // 右侧商品数组
    rightGoodsList:[],
    // 选择菜单的索引
    currentIndex:0,
    // 右侧滚动条的距离顶部的位置
    scrollTop:0
  },
  // 给缓存定义一个空数组，接口的返回值  数组格式  不要把没必要的数据定义在data中
// 小程序内部会把所有的数据返回给视图层wxml，导致页面特别卡
  Cates:[],
  // 获取分类页面的接口数据
  getCategoryList(){
    request({url:'/categories'})
    .then(result=>{
      // 把接口数据，赋值给全局变量
      this.Cates=result;
      // console.log(result);
      
      // 把数据存入缓存中
      wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});
        
      // 左侧菜单的数据
      const leftMenuList = this.Cates.map(v=>({cat_id:v.cat_id,cat_name:v.cat_name}))
      const rightGoodsList = this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightGoodsList
      })
    })
  },
  handleMenuChange(e){
    console.log(e);
    // 获取索引
    const {index} = e.currentTarget.dataset;
    // 根据获取的索引渲染右侧显示的内容
    const rightGoodsList = this.Cates[index].children;
    // 控制右侧滚动条的滚动距离
    this.setData({
      currentIndex:index,
      rightGoodsList,
      scrollTop:0
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // 获取缓存的数据，用来判断有没有缓存数据
      const cates = wx.getStorageSync("cates");
      // 判断有没有缓存数据
      if(!cates){
        // 没有数据发送请求，存入到缓存
        this.getCategoryList();
      }else{
        // 有缓存数据，判断是否过期，设置过期时间10s
        if(Date.now()-cates.time>1000*10){
          // 过期
          this.getCategoryList();
        }else{
          // 获取缓存数据
          const catesData = cates.data;

          // 给全局数据赋值
          this.Cates=catesData;
    // 左侧菜单的数据
    const leftMenuList = this.Cates.map(v=>({cat_id:v.cat_id,cat_name:v.cat_name}));
    const rightGoodsList = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightGoodsList
    })
  }           
 }
 
 
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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