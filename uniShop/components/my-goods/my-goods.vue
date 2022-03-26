<template>
	<view class="goods_item">
		<view class="goods_lf">
			<image :src="goods.goods_small_logo || defaultPic" class="goods_pic" mode=""></image>
		</view>
		<view class="goods_rg">
			<view class="goods_name">
				{{goods.goods_name}}
			</view>
			<view class="goods_info">
				<view class="goods_price">
					￥{{goods.goods_price | tofixed}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		props:{
			goods:{
				type:Object,
				default:{}
			}
		},
		data() {
			return {
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
			};
		},
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
.goods_item{
	display: flex;
	padding: 10px 8px;
	border-bottom: 1px solid #F0F0F0;
	box-sizing: border-box;
	width: 100vw;
	.goods_lf{
		width: 30vw;
		.goods_pic{
			width: 100px;
			height: 100px;
			display: block;
		}
	}
	.goods_rg{
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.goods_name{
			font-size: 13px;
		}
		.goods_info{
			display: flex;
			align-items: center;
			.goods_price{
				color: #c00000;
				font-size: 16px;
				text-align: left;
				line-height: 24px;
			}
		}
	}
}
</style>
