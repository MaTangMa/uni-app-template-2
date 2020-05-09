let state = {
	hasNewMsg: false, // 是否有新消息
	sendFailList: [] // 发送失败的消息列表
}

const mutations = {
	setHasNewMsg(state, hasNewMsg) {
		state.hasNewMsg = hasNewMsg;
	},
	setSendFailList(state, sendFailList) {
		state.sendFailList = sendFailList;
	}
}
const getters = {
	hasNewMsg: state => state.hasNewMsg,
	sendFailList: state => state.sendFailList
}

export default {
	state,
	mutations,
	getters
}
