<template>
	<view class="my-settle">
		<!-- 全选 -->
		<label class="radio" @click="changeAllState()">
			<radio color="#c00000" :checked="isFullCheck"/><text>全选</text>
		</label>
		<!-- 合计 -->
		<view class="amount-box">
			合计:<text class="amount">￥{{checkedGoodsAmount}}</text>
		</view>
		<!-- 结算 -->
		<view class="btn-settle" @click="settlement()">结算({{checkedCount}})</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations,mapState} from "vuex"
	export default {
		name:"my-settle",
		data() {
			return {
				
			};
		},
		computed:{
			...mapGetters('m_cart',['checkedCount','total','checkedGoodsAmount']),
			...mapGetters('m_user',['addstr']),
			...mapState('m_user',['token']),
			isFullCheck(){
				return this.checkedCount===this.total
			}
		},
		methods:{
			...mapMutations('m_cart',['updataAllGoodsState']),
			changeAllState(){
				this.updataAllGoodsState(!this.isFullCheck)
			},
			//结算按钮
			settlement(){
				if(!this.checkedCount) return uni.$showMsg('请选择要结算的商品!')
				if(!this.addstr) return uni.$showMsg('请选择收货地址!')
				if(!this.token) return uni.$showMsg('请先登录!')
			}
		}
	}
</script>

<style lang="scss">
.my-settle{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 50px;
	background-color: pink;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 14px;
	padding:0 0 0 8px;
	box-sizing: border-box;
	.radio{
		display: flex;
		align-items: center;
	}
	.amount-box{
		.amount{
			color: #c00000;
			font-weight: bold;
		}
	}
	.btn-settle{
		background-color: #c00000;
		height: 50px;
		color: #fff;
		line-height: 50px;
		padding: 0 10px;
		min-width: 80px;
		text-align: center;
	}
}
</style>
