<template>
	<view class="search">
		<view class="search-box">
			<uni-search-bar @input="input()" :focus="true" :radius="100" cancelButton="none"></uni-search-bar>
		</view>
		<!-- 搜索建议列表 -->
		<view class="sugg-list" v-if="searchList.length>0">
			<view class="sugg-item" v-for="(item,i) in searchList" :key="i" @click="gotoDetail(item)">
				<view class="goods-name">
					{{item.goods_name}}
				</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<view class="history-title" v-if="show">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="clean()"></uni-icons>
			</view>
			<view class="history-list">
				<view class="item" v-for="(item,i) in history" :key="i">
					<uni-tag type="default" :text="item" @click="gotoGoodsList(item)"></uni-tag>
				</view>
			</view>
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
				searchList:[],
				//搜索历史
				historyList:[],
				//显示搜索历史
				show:false,
			};
		},
		onLoad() {
			this.historyList=JSON.parse(uni.getStorageSync('kw') || '[]')
			this.historyList.length>0?this.show=true:this.show=false
		},
		computed: {
			history(){
				return [...this.historyList].reverse()
			}
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
				if (this.kw == '') {
					this.searchList = []
					return
				}
				// 发起请求，获取搜索建议列表
				let {data:res} = await searchFn({query: this.kw})
				if (res.meta.status !== 200) return uni.$showMsg(res.meta.msg)
				this.searchList=res.message
				this.saveSearchHistory()
			},
			//添加搜索记录
			saveSearchHistory(){
				let set=new Set(this.historyList)
				set.delete(this.kw)
				set.add(this.kw)
				this.historyList=Array.from(set)
				uni.setStorageSync('kw',JSON.stringify(this.historyList))
				this.historyList.length>0?this.show=true:this.show=false
			},
			//去往商品详情页
			gotoDetail(item){
				uni.navigateTo({
					url:"/subpkg/goods_detail/goods_detail?goods_id="+item.goods_id
				})
			},
			//清楚搜索记录
			clean(){
				this.historyList=[]
				uni.setStorageSync('kw','[]')
				this.show=false
			},
			//点击搜索记录，去往商品
			gotoGoodsList(item){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?query='+ item
				})
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
.sugg-list{
	padding: 0 5px;
	.sugg-item{
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 12px;
		padding: 13px 0;
		border-bottom: 1px solid #efefef;
		.goods-name{
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
}
.history-box{
	padding: 0 5px;
	box-sizing: border-box;
	.history-title{
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #efefef;
		font-size: 13px;
		height: 40px;
	}
	.history-list{
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		padding-top: 10px;
		.item{
			margin-bottom: 10px;
			margin-right: 5px;
		}
	}
}
</style>
