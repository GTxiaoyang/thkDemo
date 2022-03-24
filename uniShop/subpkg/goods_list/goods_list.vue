<template>
	<view>
		<view class="goods_list">
			<block v-for="(item,i) in goodsList" :key="i">
				<view class="goods_item">
					<view class="goods_lf">
						<image :src="item.goods_small_logo || defaultPic" class="goods_pic" mode=""></image>
					</view>
					<view class="goods_rg">
						<view class="goods_name">
							{{item.goods_name}}
						</view>
						<view class="goods_info">
							<view class="goods_price">
								￥{{item.goods_price}}
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import {goodsList} from '../../api/api.js'
	export default {
		data() {
			return {
				// 请求参数
				queryObj:{
					query:'',
					cid:'',
					pagenum:1,
					pagesize:10
				},
				//商品数据
				goodsList:[],
				total:0,
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
			}
		},
		onLoad(options) {
			this.queryObj.query=options.query || ''
			this.queryObj.cid=options.cid || ''
			this.getGoodsList()
		},
		methods: {
			//获取商品列表数据
			async getGoodsList(){
				const {data:res}=await	goodsList(this.queryObj)
				if(res.meta.status !==200) return uni.$showMsg()
				this.goodsList=res.message.goods
				this.total=res.message.total
			},
		},
	}
</script>

<style lang="scss" scoped>
.goods_list{
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
				.goods_price{
					color: #c00000;
					font-size: 16px;
					text-align: right;
					line-height: 24px;
				}
			}
		}
	}
}
</style>
