/**
 * promise 形式的wx.openSetting打开授权页面
 */
export const openSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.openSetting({
            success:(result)=>{
                resolve(result);
            },
            fail:(err)=>{
                reject(err);
            }
        })
    })
}
/**
 * promise 形式的wx.getSetting 获取授权信息 
 */
export const getSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.getSetting({
            success:(result)=>{
                resolve(result);
            },
            fail:(err)=>{
                reject(err);
            }
        })
    })
}
/**
 * promise 形式的wx.chooseAddress 获取收货地址 
 */
export const chooseAddress=()=>{
    return new Promise((resolve,reject)=>{
        wx.chooseAddress({
            success:(result)=>{
                resolve(result);
            },
            fail:(err)=>{
                reject(err);
            }
        })
    })
}


/**
 * promise 形式的wx.showModal 对话框
 * @params { object } param 要传递的参数 
 */
export const showModal=({content})=>{
    return new Promise((resolve,reject)=>{
        wx.showModal({
            title:'提示',
            content:content,
            success(res){
                resolve(res);
            }
        })
    })
}



/**
 * promise 形式的wx.showToast 对话框
 * @params { object } param 要传递的参数 
 */
export const showToast=({title})=>{
    return new Promise((resolve,reject)=>{
        wx.showToast({
            title:title,
            icon:'none',
            success:(result)=>{
                resolve(result);
            }
        })
    })
}