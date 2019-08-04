// 封装项目中用到的本地存储的代码



// 获取本地存储中的购物车数据
export const getStorageCart=()=>{
    return wx.getStorageSync("cart");      
}
/**
 * 设置购物车到本地存储中
 * @param { Object } obj 要填充的数据
 */
export const setStorageCart=(obj)=>{
    wx.setStorageSync("cart",obj);      
}




// 获取本地存储中的分类商品数据
export const getStorageCate=()=>{
    return wx.getStorageSync("cate");      
}
/**
 * 设置分类商品数据到本地存储中
 * @param { Object } obj 要填充的数据
 */
export const setStorageCate=(obj)=>{
    wx.setStorageSync("cate",obj);      
}



/**
 * 把地址信息 存入到缓存中
 * @param {object} address 要存入的购物车对象
 */
export const setStorageAddress = (address) => {
    wx.setStorageSync("address", address);
  }
  /**
   * 获取缓存中的地址信息
   */
  export const getStorageAddress = () => {
    return wx.getStorageSync("address");
  }




  /**
 * 把 token 存入到缓存中
 * @param {object} token 要存入的token
 */
export const setStorageToken = (token) => {
    wx.setStorageSync("token", token);
  }
  /**
   * 获取缓存中的token
   */
  export const getStorageToken = () => {
    return wx.getStorageSync("token");
  }