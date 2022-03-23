<template>
	<view class="search">
		<view class="search-box">
			<uni-search-bar @input="input()" :focus="true" :radius="100" cancelButton="none"></uni-search-bar>
		</view>
	</view>
</template>

<script>
	import {searchFn} from '../../api/api.js'
	export default {
		data() {
			return {
				timer:null,
				//搜索关键字
				kw:'',
				//返回的数据列表
				searchList:[]
			};
		},
		methods:{
			input(value){
				this.kw=value
				clearTimeout(this.timer)
				this.timer=setTimeout(()=>{
					this.getSearchList()									
				},500)

			},
			//获取搜索列表
			async getSearchList() {
				// 判断关键词是否为空
				if (this.kw === '') {
					this.searchResults = []
					return
				}
				// 发起请求，获取搜索建议列表
				let {data:res} = await searchFn({query: this.kw})
				if (res.meta.status !== 200) return uni.$showMsg(res.meta.msg)
				this.searchList=res.message
			}
		}
	}
</script>

<style lang="scss">
.search-box{
	position: sticky;
	top: 0;
	z-index: 999;
	background-color: #c00;
}
</style>
