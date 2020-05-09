<template>
	<view>
		<image class="wanli-logo" :src="$_getImgUrl('logo1')" mode=""></image>
		<view class="text">
			手机号
		</view>
		<view class="input-view">
			<input class="uni-input" type="number" :adjust-position="false" maxlength="11" v-model="phoneNum" placeholder="请输入手机号" />
		</view>
		<view class="text">
			验证码
		</view>
		<view class="v-code-view">
			<view class="input-container">
				<input class="uni-input" type="number" :adjust-position="false" maxlength="6" v-model="verificationCode"
				 placeholder="请输入验证码" />
			</view>
			<wl-button-primary class="getCodeBtn" size="small" :btnType="smallBtnType" :btnText="smallBtnText" @btnClick="getVerificationCode()"></wl-button-primary>
		</view>

		<wl-button-primary class="login-btn" btnText="登陆" @btnClick="doLogin"></wl-button-primary>

	</view>
</template>

<script>
	import wlButtonPrimary from '../../components/wl-button-primary.vue'
	import wlApi from '@/config/wl-api.js'
	export default {
		components: {
			wlButtonPrimary
		},
		data() {
			return {
				userOs: 'ios', //当前手机型号
				deviceid: 'fit', //渠道名称
				freezeTime: 0,
				smallBtnType: 'wl-btn-primary',
				smallBtnText: '获取验证码',
				verificationCode: '',
				phoneNum: ''
			};
		},
		created() {
			this.userOs = uni.getSystemInfoSync().platform
		},
		methods: {
			getVerificationCode() {
				if (this.freezeTime > 1) {
					return
				}
				this.freezeTime = 60
				this.smallBtnText = `${this.freezeTime} 后再获取`
				this.smallBtnType = 'wl-btn-grey'
				let intervalId = setInterval(() => {
					if (this.freezeTime > 0) {
						this.freezeTime -= 1
						this.smallBtnText = `${this.freezeTime} 再获取`
					} else {
						clearInterval(intervalId)
						this.smallBtnText = '获取验证码'
						this.smallBtnType = 'wl-btn-primary'
					}
				}, 1000)
				this.sendVerificationCode(this.phoneNum)
			},
			sendVerificationCode(phoneNum) {
				wlApi
					.sendSms({
						mobile: phoneNum
					})
					.then(data => {
						if (data.hasOwnProperty("code") && data === 400) {
							uni.showToast({
								title: '验证码发送失败',
								icon: 'none',
								duration: 3000
							});
							return;
						} else {
							uni.showToast({
								title: data.msgMobile,
								icon: 'none',
								duration: 3000
							});
						}
					})
					.catch(error => {
						if (error.response && error.response.data.errmsg) {
							uni.showToast({
								title: error.response.data.errmsg,
								icon: 'none',
								duration: 3000
							});
						}
					});
			},
			doLogin() {
				let params = {};
				params.mobile = this.phoneNum;
				params.smscode = this.verificationCode;
				params.userOs = this.userOs;
				params.deviceid = this.deviceid;
				wlApi
					.registerOrLogin(params)
					.then(user => {
						console.log("user: " + JSON.stringify(user));
						//  error 后台返回短信验证码失败的情况 提示 return 函数
						if (user.hasOwnProperty("error")) {
							uni.showToast({
								title: user.error.error,
								icon: 'none',
								duration: 3000
							});
						}
						uni.setStorage({
							key: 'loginUser',
							data: user,
							success: function() {
								console.log('login success');
								uni.switchTab({
									url: '/pages/home/home'
								});
							}
						});
						uni.setStorage({
							key: 'hasLogin',
							data: 'true'
						});
					})
					.catch(error => {
						uni.showToast({
							title: "网络繁忙！",
							icon: 'none',
							duration: 3000
						});
					});

			}
		}
	}
</script>

<style lang="scss">
	page {
		align-items: flex-start;
	}

	view {
		margin-bottom: 10px;
	}

	.wanli-logo {
		margin: 20px 0;
		width: 40px;
		height: 80px;
	}

	.input-view,
	.text {
		width: 686rpx;
		align-items: flex-start;
	}

	.text {
		color: $uni-text-color;
	}

	.input-view {
		border-bottom: 1px solid #E7E7E7;
		padding-bottom: 10px;
	}

	.uni-input {
		color: $uni-text-color;
		font-size: 18px;
	}

	.v-code-view {
		width: 686rpx;
		flex-direction: row;
		margin-bottom: 20px;
		justify-content: flex-start;

		.input-container {
			flex: 1;
			border-bottom: 1px solid #E7E7E7;
			padding-bottom: 10px;
			margin-right: 10px;
			align-items: flex-start;
		}

		.getCodeBtn {
			justify-items: flex-end;
		}
	}
</style>
