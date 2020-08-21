// 引入 axios
import axios from 'axios'
import apiConfig from '../config'
import router from './../../router'

axios.defaults.baseURL = apiConfig.baseURL //默認全局域名
// 引入 api 对象
import api from './api.js'
// 引入 后端 处理 模块
import dataHandle from './dataHandle.js'
import { setToken, getToken } from '@/libs/util'


/**
 * 后端 交互 模块
 *  port, 为用于 判断 何处调用 之 参数,
 *      api[port], 调用 api 对象 中, 封装 的 对应 接口
 *      detaDeal[port], 调用 对应接口 相关的 数据 处理 函数
 *  data, 为调用者 传递的 数据
 *  errCallback, 如果 在 ajax 請求失敗時, 執行某些函數, 則傳遞 此回調
 */

export default function (port, method, data = {}, errCallback) {
    if (!data) return console.warn('没有传递 data 参数，作为请求参数')
    //判断  f_ttype 终端类型, 1-WEB 2-微信小程序 //f_ltype 登录方式, 1-账号 2-微信 3-手机 4-安全秘钥
    data['f_ttype'] = 1
    data['f_ltype'] = 1


    let csrftoken = getToken('csrftoken')
    let sessionid = getToken('sessionid')
    let f_crypt_key = localStorage.getItem('f_crypt_key')
    let f_secretkey = localStorage.getItem('f_secretkey')

    let key = f_crypt_key || 'Kingteller_SYS'
    let str_data = JSON.stringify(data)
    // console.log(key)
    // console.log(str_data)
  
    let hash = md5(str_data, key) // "01433efd5f16327ea4b31144572c67f6"
    let upperHash = hash.toUpperCase()

    // console.log(upperHash)
    let obj = {
        f_ver: 'V2.0',
        f_type: 'json',
        f_data: str_data,
        f_mac: upperHash
    }
    //将 数据 转换 为 后端 可 处理的 URL格式
    let qsobj = qs.stringify(obj)
    // console.log(method)
    // console.log(qsobj)
    // 返回 promise 實例
    return new Promise ( resolve => {
        if(method == 'get'){
            axios.get(`${api[port]}?${qsobj}`,
            {
                headers: {
                    // 'token' : token,  //设置token到请求头
                    'X-CSRFToken': csrftoken,
                },
                cookies: {
                    'sessionid':  sessionid,
                    'csrftoken': csrftoken
                } 
            })
            .then(res => {
                resolve(dataHandle[port](res.data))
            })
            .catch( err => {
                console.warn(err)
                // 對 請求錯誤, 進行統一處理
                Dialog.alert({
                    title: '服务器错误',
                    message: err
                })
            })
            .finally ( () => {
                errCallback && errCallback()
            })
        }else if(method == 'post'){
            axios.post(api[port], qsobj, {
                headers: {
                    // 'token' : token,  //设置token到请求头
                    'X-CSRFToken': csrftoken,
                },
                cookies: {
                    'sessionid':  sessionid,
                    'csrftoken': csrftoken
                } 
            })
            .then(res => {
                resolve(dataHandle[port](res.data))
            })
            .catch( err => {
                console.warn(err)
                // 對 請求錯誤, 進行統一處理
                Dialog.alert({
                    title: '服务器错误',
                    message: err
                })
            })
            .finally ( () => {
                errCallback && errCallback()
            })
        }else if(method == 'put'){
            axios.put(api[port], qsobj, {
                headers: {
                    // 'token' : token,  //设置token到请求头
                    'X-CSRFToken': csrftoken,
                },
                cookies: {
                    'sessionid':  sessionid,
                    'csrftoken': csrftoken
                } 
            })
            .then(res => {
                resolve(dataHandle[port](res.data))
            })
            .catch( err => {
                console.warn(err)
                // 對 請求錯誤, 進行統一處理
                Dialog.alert({
                    title: '服務器錯誤',
                    message: err
                })
            })
            .finally ( () => {
                errCallback && errCallback()
            })
        }else if(method == 'delete'){
            axios.delete(`${api[port]}?${qsobj}`,{
                headers: {
                    // 'token' : token,  //设置token到请求头
                    'X-CSRFToken': csrftoken,
                },
                cookies: {
                    'sessionid':  sessionid,
                    'csrftoken': csrftoken
                } 
            })
            .then(res => {
                resolve(dataHandle[port](res.data))
            })
            .catch( err => {
                console.warn(err)
                // 對 請求錯誤, 進行統一處理
                Dialog.alert({
                    title: '服務器錯誤',
                    message: err
                })
            })
            .finally ( () => {
                errCallback && errCallback()
            })
        }
    })
}

// 設備ip 限制, 不能在不同設備上登錄
function deviceIpLimit (ip) {
    // 如果 本地ip 存在, 且不等於 後端傳遞的 ip, 則跨設備了, 進行登出操作
    if (localStorage.getItem('ip') && localStorage.getItem('ip') !== ip) {
        localStorage.removeItem('ip')
        localStorage.removeItem('openid')
        localStorage.removeItem('mobile')
        window.location.reload()
    }
}