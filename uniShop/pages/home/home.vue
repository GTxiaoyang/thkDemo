<template>
	<view>
		
	</view>
</template>

<script>
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
				let {data:res}=await uni.$http.get('api/public/v1/home/swiperdata')
				this.swiperData=res.message
			}
		}
	}
</script>

<style lang="scss">

</style>
