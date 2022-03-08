<template>
	<view class="my-serch" :style="{'background-color':bgcolor}" @click="search()">
		<view class="my-serch-name" :style="{'border-radius':radius+'px'}">
			<!-- uni-ui提供的图标组件 -->
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			bgcolor:{
				type:String,
				default:'#c00000'
			},
			radius:{
				type:Number,
				default:18
			}
		},
		name:"my-search",
		data() {
			return {
				
			};
		},
		methods:{
			search(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
.my-serch{
	height: 50px;
	// background-color: #c00;
	padding: 0 10px;
	display: flex;
	align-items: center;
	.my-serch-name{
		height: 36px;
		background-color:#fff;
		// border-radius: 18px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		.placeholder{
			font-size: 15px;
			margin-left: 5px;
		}
	}
	
}
</style>
