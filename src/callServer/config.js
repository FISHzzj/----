//判断是否是生产环境
let isPro = process.env.NODE_ENV === 'production' //process.env.NODE_ENV用于区分是生产环境还是开发环境
//根据环境不同导出不同的baseURL

export default {
    baseURL: isPro ? `http://192.168.34.113:7084/` : '/apis'
    // baseURL: isPro ? `http://${location.hostname}` : 'http://192.168.34.113:7083'

    
}