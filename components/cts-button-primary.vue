<template>
	<view>
		<view :class="btnType" :style="btnStyle" @click.stop="btnClick">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'cts-button-primary',
		props: {
			/**
			 * @description 可选值 
			 * 查看css同名类样式
			 * cts-btn-primary 主金色按钮
			 * cts-btn-primary-plain 主金色空心按钮
			 * cts-btn-grey 	  灰色按钮
			 * cts-btn-grey-plain 灰色空心按钮
			 * cts-btn-white   白色按钮
			 */
			btnType: {
				type: String,
				default: 'cts-btn-primary',
				required: false
			},
			// max / large / medium / small / mini / min
			size: {
				type: String,
				default: 'max',
				required: false
			},
			// 是否 左右为圆形 的 按钮
			allRound: {
				type: Boolean,
				default: false,
				required: false
			}
		},
		data() {
			return {
			};
		},
		computed: {
			btnStyle () {
				let style = {}
				let height = 0
				if (this.size === 'max') {
					style.width = '700rpx'
					height = 42
					style.height = height + 'px'
					style.fontSize = '16px'
				} else if (this.size === 'large') {
					style.width = '520rpx'
					height = 35
					style.height = height + 'px'
					style.fontSize = '18px'
					style.borderRadius = '6px'
				} else if (this.size === 'medium') {
					style.width = '118px'
					height = 42
					style.height = height + 'px'
					style.fontSize = '16px'
					style.borderRadius = '6px'
				} else if (this.size === 'small') {
					style.width = '83px'
					height = 28
					style.height = height + 'px',
					style.fontSize = '14px'
					style.borderRadius = '4px'
				} else if (this.size === 'mini') {
					style.width = '62px'
					height = 25
					style.height = height + 'px'
					style.fontSize = '11px'
					style.borderRadius = '4px'
				} else if (this.size === 'min') {
					style.width = '39px'
					height = 22
					style.height = height + 'px'
					style.fontSize = '11px'
					style.borderRadius = '4px'
				}
				if (this.allRound) {
					style.borderRadius = (height / 2) + 'px'
				}
				return style;
			}
		},
		methods: {
			btnClick () {
				this.$emit('btnClick')
			}
		}
	}
</script>

<style scoped lang="scss">
.btn-base {
	@extend .flex-column-center;
	height: 42px;
	border-radius: 8px;
}
.cts-btn-primary {
	@extend .btn-base;
	background-color: $cts-primary-color;
	color: #FFFFFF;
}
.cts-btn-primary-plain {
	@extend .btn-base;
	background-color: rgba($color: #ffffff, $alpha: 0);
	border: 1px solid $cts-primary-color;
	color: $cts-primary-color;
}
.cts-btn-grey {
	@extend .btn-base;
	background-color: #E7E7E7;
	color: $cts-grey-color;
}
.cts-btn-grey-plain {
	@extend .btn-base;
	background-color: rgba($color: #E7E7E7, $alpha: 0);
	border: 1px solid $cts-grey-color;
	color: $uni-text-color;
}
.cts-btn-white {
	@extend .btn-base;
	background-color: #FFFFFF;
	color: $uni-text-color;
}
</style>
