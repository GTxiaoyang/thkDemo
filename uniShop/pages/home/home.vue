<template>
	<view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" indicator-active-color="#d81e06" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in swiperData" :key="index">
				<navigator :url="'/subpkg/goods_detail/goods_detail?goods_detail='+ item.goods_id" class="swiper-item">
					<img :src="item.image_src">
				</navigator>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {getSwiperdataFn} from '../../api/api.js'
	export default {
		data() {
			return {
				swiperData:[]
			};
		},
		onLoad() {
			this.getSwiperdata()
		},
		methods:{
			async getSwiperdata(){
				let {data:res}=await getSwiperdataFn()
				this.swiperData=res.message
			}
		}
	}
</script>

<style lang="scss">
swiper{
	height: 330rpx;
	.swiper-item,.swiper-item image{
		width: 100%;
		height: 100%;
	}
}
</style>
