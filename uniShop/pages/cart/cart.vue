<template>
	<view class="cart" v-if="cart.length>0">
		<!-- 收获地址 -->
		<my-address></my-address>
		<!-- 标题 -->
		<view class="cart-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>
		<!-- 购物车商品 -->
		<uni-swipe-action>
			<block  v-for="(goods,i) in cart" :key="i">
				<uni-swipe-action-item :right-options="options" @click="del(goods)">
					<my-goods :show="true" :showNum="true" @numChangeHandler="numChange()" @radio-change="changeState()" :goods="goods"></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<!-- 使用自定义结算组件 -->
		<my-settle></my-settle>
	</view>
	<!-- 购物车空白时 -->
	<view class="empty" v-else>
		<image src="../../static/empty.jpg"></image>
		<text>空空如也~</text>
	</view>
</template>

<script>
	import badgeMix from "../../mixins/tabbar-badge.js"
	import {mapState,mapMutations} from "vuex"
	export default {
		mixins:[badgeMix],
		data() {
			return {
				options:[{
					text:'删除',
					style:{
						backgroundColor:"#c00000"
					}
				}]
			};
		},
		computed:{
			...mapState('m_cart',['cart'])
		},
		methods:{
			...mapMutations('m_cart',['updataGoodsState','updataGoodsNum','removeGoods']),
			changeState(e){
				this.updataGoodsState(e)
			},
			numChange(e){
				this.updataGoodsNum(e)
			},
			del(goods){
				this.removeGoods(goods)
			}
		}
		
	}
</script>

<style lang="scss">
.cart{
	padding-bottom: 50px;
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
.empty{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 92vw;
	margin:auto;
	text-align: center;
	padding-top: 20vh;
	img{
		width: 100%;
	}
	text{
		text-align: center;
		font-size: 14px;
		color: #e8e8e8;
	}
}
</style>
