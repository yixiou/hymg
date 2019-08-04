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

