<template>
	<view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" indicator-active-color="#d81e06" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in swiperData" :key="index">
				<navigator :url="'/subpkg/goods_detail/goods_detail?goods_detail='+ item.goods_id" >
					<img class="lbtImage" :src="item.image_src">
				</navigator>
			</swiper-item>
		</swiper>
		
		<!-- 导航区 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,i) in navList" :key="i">
				<img :src="item.image_src" alt="" class="nav-img">
			</view>
		</view>
	</view>
</template>

<script>
	import {getSwiperdataFn,getNavListFn} from '../../api/api.js'
	export default {
		data() {
			return {
				// 轮播图
				swiperData:[],
				// 导航
				navList:[]
				
			};
		},
		onLoad() {
			// 获取轮播图
			this.getSwiperdata()
			//获取导航
			this.getNavList()
		},
		methods:{
			// 获取轮播图
			async getSwiperdata(){
				let {data:res}=await getSwiperdataFn()
				this.swiperData=res.message
			},
			//获取导航信息
			async getNavList(){
				let {data:res}=await getNavListFn()
				this.navList=res.message
			}
		}
	}
</script>

<style lang="scss">
swiper{
	height: 330rpx;
	.swiper-item,.lbtImage{
		width: 100%;
		height: 100%;
	}
}
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
</style>
