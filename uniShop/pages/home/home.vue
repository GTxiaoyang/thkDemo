<template>
	<view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" indicator-active-color="#d81e06" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item class="sitem" v-for="(item,index) in swiperData" :key="index">
				<navigator :url="'/subpkg/goods_detail/goods_detail?goods_detail='+ item.goods_id" >
					<img class="lbtImage" :src="item.image_src">
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 导航区 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,i) in navList" :key="i" @click="navClickHandler(item)">
				<img :src="item.image_src" alt="" class="nav-img">
			</view>
		</view>
		
		<!-- 楼层区 -->
		<view class="floor-list">
			<!-- 每一个楼层的item项 -->
			<view class="floor-item" v-for="(item,i) in floorList" :key="i">
				<image :src="item.floor_title.image_src" class="floor-titleImg"></image>
				<!-- 楼层具体图片区 -->
				<view class="floor-img-box">
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width+'rpx'}" mode="widthFix"></image>
					</navigator>
					<view class="right-img-box">
						<navigator :url="itemSon.url" class="right-img-item" v-for="(itemSon,index) in item.product_list" :key="index">
							<image v-if="index !==0"  :src="itemSon.image_src" :style="{width:itemSon.image_width+'rpx'}" mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getSwiperdataFn,getNavListFn,getfloorFn} from '../../api/api.js'
	export default {
		data() {
			return {
				// 轮播图
				swiperData:[],
				// 导航
				navList:[],
				//楼层数据
				floorList:[]
				
			};
		},
		onLoad() {
			// 获取轮播图
			this.getSwiperdata()
			//获取导航
			this.getNavList()
			//获取楼层信息
			this.getFloorList()
		},
		methods:{
			// 获取轮播图
			async getSwiperdata(){
				let {data:res}=await getSwiperdataFn()
				if(res.meta.status!==200) return uni.$showMsg()
				this.swiperData=res.message
			},
			//获取导航信息
			async getNavList(){
				let {data:res}=await getNavListFn()
				if(res.meta.status!==200) return uni.$showMsg()
				this.navList=res.message
			},
			//跳转tab
			navClickHandler(item){
				if(item.name=='分类'){
					uni.switchTab({
						url:'/pages/cate/cate'
					})
				}
			},
			//获取首页楼层数据
			async getFloorList(){
				let {data:res}=await getfloorFn()
				if(res.meta.status!==200) return uni.$showMsg()
				//处理url错误地址
				res.message.forEach(floor=>{
					floor.product_list.forEach(prod=>{
						prod.url='/subpkg/goods_list/goods_list?'+prod.navigator_url.split('?')[1]
					})
				})
				this.floorList=res.message
			}
		}
	}
</script>

<style lang="scss">
swiper{
	height: 330rpx;
	width: 100%;
	swiper-item{
		width: 100%;
		height: 100%;
		.lbtImage{
			width: 100%;
			height: 330rpx;
		}
	}
}
// 导航区
.nav-list{
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin: 15px 0;
	
	.nav-img{
		width:128rpx;
		height: 140rpx;
	}
}
//楼层区
.floor-list{
	.floor-item{
		.floor-titleImg{
			width: 100%;
			height: 60rpx;
		}
		.floor-img-box{
			display: flex;
			padding-left:10rpx ;
			.right-img-box{
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
			}
		}
	}
}
</style>
