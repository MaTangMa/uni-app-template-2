<template>
	<view>
		<web-view :webview-styles="webviewStyles" :src="viewSrc"></web-view>
	</view>
</template>

<script>
	var wv; //计划创建的webview
	export default {
		data() {
			return {
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				},
				viewSrc: ''
			}
		},
		onLoad: function(options) {
			console.log('options------', options)
			this.viewSrc = options.id
		},
		onReady() {
			// #ifdef APP-PLUS
			var currentWebview = this.$mp.page.$getAppWebview() //获取当前页面的webview对象
			setTimeout(function() {
				wv = currentWebview.children()[0]
				wv.setStyle({
					top: 88
				})
			}, 100); //如果是页面初始化调用时，需要延时一下
			// #endif
		}
	}
</script>

<style lang="scss">

</style>
