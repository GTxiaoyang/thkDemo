<template>
	<view class="cart">
		<!-- 标题 -->
		<view class="cart-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>
		<!-- 购物车商品 -->
		<block v-for="(goods,i) in cart" :key="i">
			<my-goods :show="true" :showNum="true" @numChangeHandler="numChange()" @radio-change="changeState()" :goods="goods"></my-goods>
		</block>
	</view>
</template>

<script>
	import badgeMix from "../../mixins/tabbar-badge.js"
	import {mapState,mapMutations} from "vuex"
	export default {
		mixins:[badgeMix],
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('m_cart',['cart'])
		},
		methods:{
			...mapMutations('m_cart',['updataGoodsState','updataGoodsNum']),
			changeState(e){
				this.updataGoodsState(e)
			},
			numChange(e){
				this.updataGoodsNum(e)
			}
		}
		
	}
</script>

<style lang="scss">
.cart{
	.cart-title{
		height: 40px;
		display: flex;
		align-items: center;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;
		.cart-title-text{
			font-size: 14px;
			margin-left: 10px;
		}
	}
}
</style>
