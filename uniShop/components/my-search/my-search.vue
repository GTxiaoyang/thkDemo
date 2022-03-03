<template>
	<view class="my-serch">
		<view class="my-serch-name">
			<!-- uni-ui提供的图标组件 -->
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.my-serch{
	height: 50px;
	background-color: #c00;
	padding: 0 10px;
	.my-serch-name{
		height: 36px;
		background-color:#fff;
		border-radius: 18px;
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
