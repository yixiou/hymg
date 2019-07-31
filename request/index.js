export const request=(params)=>{
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
            }
        })
    })
}