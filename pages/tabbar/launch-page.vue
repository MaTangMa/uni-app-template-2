<template>
	<view>
		<image class="img" :src="imageUrl" mode=""></image>
		<view class="doPass">
			{{showTime}} 跳过
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageUrl: '',
				passFlag: false, // 是否点击了跳过
				showTime: 10 // 默认展示时间
			}
		},
		mounted() {
			// this.creatTime()
		},
		created() {
		},
		methods: {
			getImage() {
				wlApi.getsyfuceng(1).then(result => {
					console.log("result: " + JSON.stringify(result));
					try {
						// 后端返回地址有问题，切一下
						let urlArr = result.picUrl.url.split('?')
						this.imageUrl = urlArr[0]
					} catch (error) {
						this.imageUrl = result.picUrl.url
					}
					// this.goToUrl = result.goToUrl
					this.creatTime()
				}).catch(err => {
					this.creatTime()
				})
			},
			creatTime() {
				let intervalId = setInterval(() => {
					if (this.showTime > 0)
						this.showTime -= 1
				}, 1000)
				setTimeout(() => {
					clearInterval(intervalId)
					if (!this.passFlag) {
						uni.reLaunch({
							url: './home'
						});
					}
				}, 10100)
			},
			jumpPass() {
				this.passFlag = true
				clearTimeout(this.setTimeout3)
				uni.reLaunch({
					url: './home'
				});
			}
		}
	}
</script>

<style>
	.img {
		height: 750rpx;
		width: 750rpx;
		
	}
.doPass {
	position: absolute;
	top: 100rpx;
	right: 40rpx;
}
</style>
