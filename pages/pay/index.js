/* 
支付页面动态渲染标签的时候只需要显示 checked 为true  的元素
判断存储中有没有token
1.如果没有token 就跳转页面到授权页面（授权页面获取到token之后，重新跳回来）
2.有token 基础执行剩下的逻辑
*/
import regeneratorRuntime from '../../lib/runtime/runtime';
import { showToast } from "../../utils/asyncWx";
import { getStorageToken,getStorageCart,getStorageAddress} from "../../utils/storage.js";
import { request } from "../../request/index.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:{},
     // 总价格
     totalPrice: 0,
     // 总数量 勾选了的中数量 
     totalNum: 0
  },
// 点击支付
async handleOrderPay(){
try {
  const cart = this.data.cart;
  // 获取本地存储中的token
  const token = getStorageToken();
  console.log(token);
  
} catch (error) {
  
}
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    const address = getStorageAddress()||{};
    const cart = getStorageCart()||{};

    // 把对象中的值提取出来变成一个数组
    let cartArr = Object.values(cart);
    // 2.计算总的价格
    let totalPrice = 0 ;
    // 3.计算要购买的数量
    let totalNum = 0 ;
    cartArr.forEach(v=>{
      if(v.checked){
        // 选中了
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      }
    })
    this.setData({cart,totalNum,totalPrice,address});
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