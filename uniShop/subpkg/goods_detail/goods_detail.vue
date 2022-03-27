<template>
	<view class="goodsDetail" v-if="goods_info.goods_name">
		<!-- 轮播图 start-->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,i) in goods_info.pics" :key="i">
				<image @click="preview(i)" :src="item.pics_big" mode=""></image>
			</swiper-item>
		</swiper>
		<!-- 轮播图 end-->
		<!-- 商品信息  start-->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="price">
				￥{{goods_info.goods_price}}
			</view>
			<!-- 商品信息+收藏 -->
			<view class="goods_info-body">
				<view class="goods-name">
					{{goods_info.goods_name}}
				</view>
				<view class="collect">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- yf -->
			<view class="yf">
				快递：已免费
			</view>
		</view>
		<!-- 商品信息  end-->
		<!-- 富文本 start-->
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		<!-- 富文本 end-->
		<!-- 商品导航组件 -->
		<view class="goods_nav">
			<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import {mapMutations , mapGetters} from "vuex"
	import {goodsDetail} from "../../api/api.js"
	export default {
		data() {
			return {
				goods_info:{},
				goods_id:null,
				//商品nav配置数据
				options: [{
						icon: 'shop',
						text: '店铺',
					}, {
						icon: 'cart',
						text: '购物车',
						info: 0
				}],
				buttonGroup: [{
				  text: '加入购物车',
				  backgroundColor: '#ff0000',
				  color: '#fff'
				},
				{
				  text: '立即购买',
				  backgroundColor: '#ffa200',
				  color: '#fff'
				}]
			};
		},
		onLoad(options){
			this.goods_id=options.goods_id
			this.getInfo(this.goods_id)
		},
		methods:{
			async getInfo(goods_id){
				const {data:res}=await goodsDetail({goods_id})
				if(res.meta.status !==200) return uni.$showMsg()
				// 正则替换 
				res.message.goods_introduce=res.message.goods_introduce.replace(/<img /g, '<img style="display:block;"').replace(/webp/g,'jpg')
				this.goods_info=res.message
			},
			//轮播图预览
			preview(i){
				// 图片预览 方法
				uni.previewImage({
					current:i,
					urls:this.goods_info.pics.map(item => item.pics_big)
				})
			},
			//商品nav 左侧事件
			onClick(e){
				//index=0 店铺按钮
				if(e.index==0){
					
				}else{
					uni.switchTab({
						url:'../../pages/cart/cart'
					})
				}
			},
			//商品nav 右侧事件
			buttonClick(e){
				//index=0 加入购物车
				if(e.index==0){
					// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
					const goods={
						goods_id:this.goods_info.goods_id,
						goods_name:this.goods_info.goods_name,
						goods_price:this.goods_info.goods_price,
						goods_small_logo:this.goods_info.goods_small_logo,						
						goods_count:1,
						goods_state:true,
					}
					this.addToCart(goods)
				}else{
					
				}
			},
			//添加vuex中 
			...mapMutations('m_cart',['addToCart']),
			
		},
		computed:{
			...mapGetters('m_cart',['total'])
		},
		watch:{
			total:{
				handler(newVal){
					this.options[1].info = newVal
				},
				immediate:true
			}
		}
	}
</script>

<style lang="scss">
.goodsDetail{
	padding-bottom: 50px;
	swiper{
		height: 750rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.goods-info-box{
		padding: 10px;
		padding-right: 0px;
		.price{
			color: #c00000;
			font-size: 18px;
			margin: 10px 0;
		}
		.goods_info-body{
			display: flex;
			justify-content: space-between;
			// align-items: center;
			.goods-name{
				font-size: 13px;
				margin-right:10px ;
			}
			.collect{
				width: 120px;
				font-size: 12px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-left: 1px solid #efefef;
				color: gray;
			}
		}
		.yf{
			font-size: 12px;
			color: gray;
			margin: 10px 0;
		}
	}
	.goods_nav{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
}
</style>
