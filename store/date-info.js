let state = {
	todaySolarText: '', // 2019年11月21日
	todayLunarText: '', // 庚子年二月廿四
	todayWeek: '', // 星期二
	todaySolarParam: '', // 2019-11-21 参数类型格式
	todayLunarParam: '', // 2019-11-21 参数类型格式
}

const mutations = {
	setTodaySolarText(state, todaySolarText) {
		state.todaySolarText = todaySolarText;
	},
	setTodayLunarText(state, todayLunarText) {
		state.todayLunarText = todayLunarText;
	},
	setTodayWeek(state, todayWeek) {
		state.todayWeek = todayWeek;
	},
	setTodaySolarParam(state, todaySolarParam) {
		state.todaySolarParam = todaySolarParam;
	},
	setTodayLunarParam(state, todayLunarParam) {
		state.todayLunarParam = todayLunarParam;
	}
}
const getters = {
	todaySolarText: state => state.todaySolarText,
	todayLunarText: state => state.todayLunarText,
	todayWeek: state => state.todayWeek,
	todaySolarParam: state => state.todaySolarParam,
	getTodayLunarParam: state => state.todayLunarParam
}

export default {
	state,
	mutations,
	getters
}
