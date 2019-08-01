// 同时发送的ajax次数
let ajaxTimes = 0;
export const request=(params)=>{
    ajaxTimes++;
    // 显示真正等待的图标
    wx.showLoading({title:'加载中'});
    // 公共接口前缀
    const baseUrl="https://api.zbztb.cn/api/public/v1";
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            url:baseUrl+params.url,
            success:(result)=>{
                resolve(result.data.message)
            },
            fail:(err)=>{
                reject(err);
            },
            // 不管成功还是失败都会执行的代码
            complete:()=>{
                ajaxTimes--;
                if(ajaxTimes === 0){
                // 最后一个请求回来，关闭正在等待的图标
                wx.hideLoading();
                }
                
            }
        })
    })
}