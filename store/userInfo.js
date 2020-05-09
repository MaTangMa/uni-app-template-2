let state = {
	hasLogin: false, // 登陆状态
	userInfo: {}, // 登陆用户
	otherUserInfo: {}, // 看看别人的用户信息
	loginChannel: '' ,// 登陆渠道
	isVip: false, // 用户是否是vip
}

const mutations = {
	setIsVip(state, isVip) {
		state.isVip = isVip;
	},
	setLogin(state, userInfo) {
		state.userInfo = userInfo;
		state.hasLogin = true;
	},
	setOtherUserInfo(state, otherUserInfo) {
		state.otherUserInfo = otherUserInfo;
	},
	logout(state) {
		state.userInfo = {};
		state.hasLogin = false;
	}
}
const getters = {
	isVip: state => state.isVip,
	getUserInfo: state => state.userInfo,
	getHasLogin: state => state.hasLogin,
	getOtherUserInfo: state => state.otherUserInfo
}

export default {
	state,
	mutations,
	getters
}
