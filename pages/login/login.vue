<template>
	<view>
		<view class="slogan">
			<view class="wanli">
				万历
			</view>
			<view class="description">
				为您专属定制的私人日历
			</view>
		</view>
		<!-- <button style="border: red;" type="primary" @click="toPhoneLogin">手机登陆</button> -->
		<wl-button-primary class="login-btn" btnText="游客登陆" @click="toPhoneLogin"></wl-button-primary>
		<wl-button-primary class="login-btn" btnText="手机登陆" @btnClick="toPhoneLogin"></wl-button-primary>
		<view class="agreement" @click="doAgree">
			<view class="space">
				<image v-if="isAgree" :src="$_getImgUrl('wanli_gou')" mode=""></image>
			</view>
			我已阅读并同意
			<view class="agree-text" @click.stop="toAgreement">
			《隐私服务协议》
			</view>
		</view>
		<view class="separate">
			<view class="separate-line"></view>
			其他登录方式
			<view class="separate-line"></view>
		</view>
		<view class="">

			<image class="wechat-img" :src="$_getImgUrl('login_wechat')" mode=""></image>
		</view>
	</view>
</template>

<script>
	import wlButtonPrimary from '../../components/wl-button-primary.vue'
	export default {
		components: {
			wlButtonPrimary
		},
		data() {
			return {
				isAgree: false
			};
		},

		methods: {
			toPhoneLogin() {
				if (!this.isAgree) {
					uni.showToast({
					    title: '请先阅读并同意隐私协议',
						icon: 'none',
					    duration: 2000
					});
					return;
				}
				uni.reLaunch({
					url: './login-phone',
					agreementUrl: 'http://wanli268.com/wlAgreement'
				});
			},
			doAgree () {
				this.isAgree = !this.isAgree
			},
			toAgreement () {
				uni.navigateTo({
					url: `../web-view/web-view?id=http://wanli268.com/wlAgreement`
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		justify-content: center;
		align-items: flex-end;
		.slogan {
			width: 606rpx;
			color: $uni-text-color;
			align-items: flex-start;
			.wanli {
				@extend .letter-spacing2;
				font-size: 40px;
				margin-bottom: 10px;
			}
			.description {
				@extend .letter-spacing2;
				font-size: 18px;
				margin-bottom: 175px;
			}
		}
		.login-btn {
			margin-bottom: 20px;
		}

		.wechat-img {
			height: 42px;
			width: 42px;
			margin-bottom: 25px;
		}

		.separate {
			flex-direction: row;
			width: 686rpx;
			height: 54px;
			font-size: 12px;
			color: #B3B3B3;
			justify-content: space-between;
			.separate-line {
				width: 121px;
				border: 0.5px solid rgba(204, 204, 204, 0.55);
				margin: 0px 0 0px 0;
			}
		}
		.agreement {
			@extend .letter-spacing2;
			color: $wl-primary-color;
			flex-direction: row;
			.space {
				height: 10px;
				width: 10px;
				border: 1px solid $wl-primary-color;
				margin-right: 6px;
				image {
					height: 16px;
					width: 16px;
				}
			}
			.agree-text {
				color: #938e52;
			}
		}
	}
</style>