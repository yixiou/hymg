
/* 
1 点击轮播图图片 放大预览
  1 绑定点击事件
  2 调用微信内置  wx.preivewimage
2 点击 加入购物车 
  1 思考好 购物车的数据如何存储 格式是怎么样  存本地存储中！！
    {
      华为的商品id:华为的商品信息,
      小米的商品id:小米的商品信息。。。
    }
  2 先获取本地存储中的购物车对象 || {}  cart
  3 给购物车对象 添加新属性和值
    cart.height=100;
    goodsid
    cart.100=200;
    cart[goodsid]=200;
  4 给本地存储 填写进去即可！！
3 修改商品详情 富文本中的图片格式
    1 获取到的数据 图片格式 webp
    2 有些iphone手机不支持
    3 最好的解决方式 是让后台统一修改
    4 但是后台 暂时改变了
    5 前端可以暂时先处理
    6 替换字符串的方式 来把 *.webp格式 统一修改为 *.jpg的格式
      1 前提是 后台 已经存在不同格式的图片
        1.webp 1.png 1.jpg 
 */


import { request } from "../../request/index.js";
import regeneratorRuntime from'../../lib/runtime/runtime.js'
import { getStorageCart , setStorageCart } from '../../utils/storage.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
 
    goodsInfo:{}
  },
  // 定义一个全局商品对象
  GoodsObj:{},
  // 获取商品详情页数的数据，拿到商品的id
  async getGoodsDetail(goods_id){
    const result = await request({url:'/goods/detail',data:{goods_id}});
    // console.log(result);
    this.GoodsObj = result;
    this.setData({
      goodsInfo:{
        goods_name:result.goods_name,
        goods_price:result.goods_price,
        pics:result.pics,
        // goods_introduce:result.goods_introduce
        // 将.webp格式的图片全部替换为.jpg格式的（需后台数据中已经存在的才能替换）
        goods_introduce:result.goods_introduce.replace(/\.webp/g,'.jpg')
      } 
    })
    // console.log(this.data.goodsInfo, '9999')
  },
  // 点击轮播图放大预览
  handlePreviewImage(e){
    console.log(e)
    const {index} = e.currentTarget.dataset;
    const urls = this.data.goodsInfo.pics.map(v=>v.pics_big)
    const current = urls[index]
    wx.previewImage({
      current,
      urls
    })
  },
  // 点击加入购物车提示
  handleCartAdd(){
    // console.log(e);
    // 1.获取购物车的数据，如果没有就定一个默认值
    let cart = getStorageCart()||{};
    // 2.判断当前的商品是否已经购买
    if(cart[this.GoodsObj.goods_id]){
      // 已经存在旧数据
      cart[this.GoodsObj.goods_id].num++;
    }else{
      // 第一次添加
      cart[this.GoodsObj.goods_id] = this.GoodsObj;
      cart[this.GoodsObj.goods_id].num = 1 ; 
    }
    // 把数据存到本地储存中
    setStorageCart(cart);
    // 弹出成功个提示
    wx.showToast({
      title:'购买成功',
      icon:'success',
      mask:true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 接收商品列表页面传递过来的id
  onLoad: function (options) {
    this.getGoodsDetail(options.goods_id);
    // console.log(options)
   
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