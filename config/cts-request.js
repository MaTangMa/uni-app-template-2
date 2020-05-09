/**
 * 请求封装
 * @author Machan
 * @date 2020-02-11
 * @description 
 */
import Request from './request'

let baseURL = "http://www.wanli268.com";
// const baseURL = 'http://192.168.1.101:8004';

if (process.env.NODE_ENV === 'development') {
	console.log('开发环境')
	baseURL = 'http://test.wanli268.com';
} else {
	console.log('生产环境')
	baseURL = "http://www.wanli268.com";
}

const http = new Request()
http.setConfig((config) => { /* 设置全局配置 */
	config.baseUrl = baseURL /* 根域名不同 */
	config.timeout = 30 * 1000, // 30s 超时
		config.sslVerify = false,
		config.header = {
			'Content-Type': 'application/json'
		}
	return config
})
http.validateStatus = (statusCode) => {
	// console.log(statusCode)
	if (statusCode === 401) {
		uni.removeStorage({
			key: 'token',
			success: function(res) {
				uni.showToast({
					title: '登录过期，请重新登录',
					icon: 'none',
					duration: 1500
				});
			}
		});
		uni.reLaunch({
		    url: './pages/login/login'
		});
	} else {
		return statusCode >= 200 && statusCode < 300
	}
}
http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
	// console.log('before --- ')
	const {
		token
	} = uni.getStorageSync('token');
	// console.log(token)
	config.header.authorization = token
	/*
	if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
	  cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
	}
	*/
	return config
})

http.interceptor.response((response) => { /* 请求之后拦截器 */
	if (response.data.data && response.data.data.hasOwnProperty("token") && response.data.data.token != "") {
		try {
			uni.setStorageSync('token', {
				token: response.data.data.token
			});
		} catch (e) {
			//TODO handle the exception
		}
	}
	// TODO:
	return response.data.data
}, (response) => { // 请求错误做点什么
	return response
})

// 抛出各请求接口
export function get(path, params) {
	// console.log('get 请求 参数地址',path,params)

	return http.get(path, params)
}

export function post(path, params) {

	return http.post(path, params)
}

export function put(path, params) {

	return http.put(path, params)

}
export function Delete(path) {

	return http.delete(path)
}
