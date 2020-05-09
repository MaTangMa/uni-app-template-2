/**
 * 请求接口配置
 * @author Machan
 * @date 2020-02-11
 * @description 
 */
import {
	get,
	post,
	Delete,
	put
} from './cts-request.js';
export default {
	token(t) {
		return setToken(t);
	},
	getUsers() {
		return get('/api/user');
	},
	/**
	 * @param {Object} params
	 * @return {Object}
	 * 
	 */
	loginRegister(params) {
		return post('/api/registerOrLogin/sms', params);
	},
	sendSms(params) {
		// 手机验证码
		return post('/api/sms/send', params);
	},
	registerOrLogin(params) {
		// 手机验证码登录
		return post('/api/registerOrLogin/sms', params);
	},
	autologin(params) {
		// 自动登陆以获取用户信息
		return post('/api/autologin', params);
	},
	signin(params) {
		// 用户名密码登录，测试用
		return post('api/auth/signin', params);
	},
	// ---------我的-------------
	feedback(params) {
		// 客户反馈
		return post('/api/feedback', params);
	},
	updateUser(params) {
		// 修改用户信息
		return post('/api/modifyInfo', params);
	},
	signOut() {
		// 退出登录
		return get('/api/auth/signout');
	}
};
