<template>
	<view class="content">
		home
		<view class="top">
			顶部块
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello'
		};
	},
	onLoad() {},
	methods: {}
};
</script>

<style lang="scss">
.content {
	text-align: center;
	height: 400upx;
	border: 1px solid #007AFF;
	.top {
		height: 200upx;
		width: 200upx;
		border: 1px solid red;
	}
}
</style>
