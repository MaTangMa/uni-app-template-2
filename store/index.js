import Vue from 'vue'
import Vuex from 'vuex'
import userModules from './userInfo.js'
import dateInfo from './date-info.js'
import messageInfo from './message-info.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		userModules,
		dateInfo,
		messageInfo
	}
})

export default store
