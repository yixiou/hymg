// pages/cart/index.js
/* 
步骤：
1.给收货地址按钮添加点击事件
调用微信小程序自带的收货地址api wx.chooseAddress（X）
2.正常流程
  2.1先调用获取(wx.getSetting)用户对小程序的授权接口
      有返回值 scope 存放  用户对该应用的权限信息
  2.2 对权限scope进行判断
      2.2.1 scope可能是undefined 用户从来没有点击过收货地址按钮
            直接获取用户的收货地址
      2.2.2 scope可能是true 用户曾经给过应用权限
            直接获取用户的收货地址
      2.2.3 scope 可能是false 用户曾经点击 取消 授权
            先打开用户授权页面(openSetting)让用户自己重新授权
            再去获取收货地址信息
  2.3 把收货的地址信息存入到本地存储中方便获取
2 购物车数据动态渲染
  1 商品的详情页面 ‘加入购物车 ’ 添加新商品的时候顺便添加了新属性 checked=true
  2 页面 onShow 获取本地存储的数据 存入到 data中 wxml 才有数据渲染 
  3 根据data中的cart对象 来计算 全选| 总价格| 总购买数量 setCart(cart)
3 单个商品的切换选中
  1 给 商品绑定change事件
  2 获取 要修改的商品的id
  3 获取data中的购物车cart 对象 
  4 cart[id].checked=!cart[id].checked;
  5 把新的cart 设置会 data中  也要设置会本地存储中 
4 全选 复选框 
  1 绑定选中事件
  2 获取data中的  isAllChecked
  3 直接 取反 isAllChecked=!isAllChecked;
  4 获取data中的购物车对象， 循环对象 来修改每一个商品的选中状态 把值都改为  isAllChecked
  5 把修改后的 cart对象 传入到 this.setCart(cart);
5 给数量按钮 绑定事件
  1 获取到要操作的商品的id 和  加 还是 减  opeation
  2 获取data中的购物车 cart
  3 判断当前的操作是正常的操作 还是删除操作
    if(当前的数量===1&&点击的是 "-"){
      删除。 要删除的是一个cart对象的属性而已 delete cart[id]
    }
  4 当删除操作 时候 要删除购物车数据
    1 先弹出对话框 用户是否确认删除
  5 是正常操作的时候 cart[id].num+= opeation;
6 点击 结算
  1 先判断有么有收货地址
  2 判断有没有选中了的要购买的商品 checked=true 
  3 都满足了 才跳转到 支付页面！！
*/
import regeneratorRuntime from '../../lib/runtime/runtime';
import { getSetting, openSetting, chooseAddress,showModal,showToast } from "../../utils/asyncWx";
import { getStorageCart,setStorageCart,setStorageAddress, getStorageAddress} from "../../utils/storage.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
      address:{},
      cart:{},
      // 全选状态
      isAllChecked:false,
      // 总价格
      totalPrice:0,
      // 总数量 勾选中的数量
      totalNum:0,
      // 购物车有没有商品
      hasGoods:false
  },
  async handleChooseAddress(){
    // console.log(11)
    // 1.获取用户的授权信息
    const res1 = await getSetting();
    const scopeAddress = res1.authSetting["scope.address"];
    if(scopeAddress === true || scopeAddress === undefined){
      // console.log('有地址')
      // 1.1 直接调用获取用户的收货地址
    }else{
      console.log('重新授权')
      // 1.2 打开授权页面
      await openSetting();
    }
    const res2 = await chooseAddress();
    // console.log(res3, '获取地址')
    // 1.3 存入到本地存储中
    // res3.all = res3.provinceName + res3.cityName + res3.countyName + res3.detailInfo;
    res2.all = res2.provinceName+res2.cityName+res2.countyName+res2.detailInfo;
    // wx.setStorageSync('address',res2);
    setStorageAddress(res2);
    // console.log(this.data.address);

  },
  // 根据cart对象计算总价格，还需要把总价设置到data中
  setCart(cart){
    // 把对象转为数组[].filter [].forEach
    // 把对象中的值提取出来变成一个数组
    let cartArr = Object.values(cart);
    // 1.计算 全选
    let isAllChecked = true;
    // 2.计算总的价格
    let totalPrice = 0 ;
    // 3.计算要购买的数量
    let totalNum = 0 ;
    cartArr.forEach(v=>{
      if(v.checked){
        // 选中了
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      }else{
        isAllChecked = false;
      }
    })
    // 判断购物车有没有数据
    isAllChecked = cartArr.length === 0 ? false:isAllChecked;
    // 判断购物车内有没有商品
    const hasGoods = cartArr.length ?true : false ;
    this.setData({cart,isAllChecked,totalNum,totalPrice});
    setStorageCart(cart);
  },
  // 点击单选框
  handleCartCheck(e){
    console.log(e);
    // 1.获取要修改的商品的id
    const { id } = e.currentTarget.dataset;
    // 2.获取data中的购物车对象
    let { cart } = this.data;
    // 3.选中状态的取反
    cart[id].checked = !cart[id].checked;
    // 4.把cart重新设置回data中和缓存中

    //  5.重新计算 全选状态
    this.setCart(cart);
  },
  // 点击全选
  handleCartAllCheck(){
    // 获取data中的数据
    let { isAllChecked , cart } = this.data;
    // 给全选按钮进行取反
    isAllChecked = !isAllChecked;
    // 循环购物车对象，修改每一个购物车商品对象，把选中状态都改为isAllChecked
    for(const key in cart){
      // 判断该属性是不是对象自己
      if(cart.hasOwnProperty(key)){
        // console.log(cart[key])
        cart[key].checked = isAllChecked ; 
        cart[key].checked = isAllChecked;
      }
    }
    // 把cart 传入到setCart函数
    this.setCart(cart);
  },
  // 改变商品数量
  async handleCartNumEdit(e){
    // console.log(e);
    // 获取传递的参数
    const { id , operation } = e.currentTarget.dataset;
    // 获取data中的购物车对象cart
    let { cart } = this.data ; 
    // console.log(cart);
    // console.log(cart[id]);
    
    
    // 判断当前操作是否是删除操作
    if(cart[id].num === 1 && operation === -1){
      // 执行删除
      const res = await showModal({content:'您确定删除吗？'})
      // 确定删除
      // console.log(res);
      if(res.confirm){
        // console.log(res.confirm);
        delete cart[id];
        this.setCart(cart);        
      }else{

      }
    }else{
      // 正常改变数量
      // 直接修改购物车的数量
      cart[id].num += operation;
      // 把cart重新赋值到data和缓存中 同时 也需要让底部的计算总价重新计算
      this.setCart(cart);
    }
  },
  // 结算按钮的点击事件
  async handlePay(){
    // 获取data中的地址
    const { address , totalNum } = this.data;
    if(!address.all){
      // 没有收货地址
      await showToast ({title:'您没有选择收货地址'});
    }else if(totalNum <= 0 ){
      // 不满足
      await showToast({title:'没有要结算的商品'});
    }else{
      // 满足要求 可以进行跳转页面
      wx.navigateTo({
        url: '/pages/pay/index'
      });        
    }
  },
  // 
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
    // this.setData({address:wx.getStorageSync("address")||{}});
    // const address = wx.getStorageSync('address')||{};
    // const cart = wx.getStorageSync('cart')||{};
    const address = getStorageAddress()||{};
    const cart = getStorageCart()||{};
    this.setData({address,cart});
    this.setCart(cart);
  //  console.log(cart)
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