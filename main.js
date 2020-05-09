import Vue from 'vue'
import App from './App'
import store from './store'
import ctsLoading from 'components/cts-loading'
import ctsButtonPrimary from 'components/cts-button-primary.vue'
import ctsApi from './config/cts-api.js'
import imageUrl from './config/image-server.js'
import * as tools from './common/js/tools.js'
import calendar from './common/js/calendar.js'

Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$store = store
Vue.prototype.$_tools = tools
Vue.prototype.$_calendar = calendar
Vue.prototype.$_ctsApi = ctsApi
// 获取img方法
Vue.prototype.$_getImgUrl = imageName => {
	return imageUrl[imageName]
}
Vue.component('cts-loading', ctsLoading)
Vue.component('cts-button-primary', ctsButtonPrimary)

const app = new Vue({
	store,
	...App
})
app.$mount()
