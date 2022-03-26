<template>
	<view>
		<view class="goods_list">
			<view v-for="(item,i) in goodsList" :key="i" @click="gotoDetail(item)">
				<my-goods :goods="item"></my-goods>
			</view>
			<!-- 加载完毕提示 -->
			<view class="over" v-if="isShow">
				没有更多内容啦~~~
			</view>
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
				//关闭节流阀
				isloading:false,
				//数据加载完毕,提示文字
				isShow:false
				
			}
		},
		onLoad(options) {
			this.queryObj.query=options.query || ''
			this.queryObj.cid=options.cid || ''
			this.getGoodsList()
		},
		methods: {
			//获取商品列表数据
			async getGoodsList(cb){
				//打开节流阀
				this.isloading=true
				const {data:res}=await	goodsList(this.queryObj)
				//关闭节流阀
				this.isloading=false
				//判断是否有回调函数
				cb && cb()
				if(res.meta.status !==200) return uni.$showMsg()
				this.goodsList=[...this.goodsList,...res.message.goods]
				this.total=res.message.total
			},
			//跳转
			gotoDetail(item){
				uni.navigateTo({
					url:"/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id
				})
			},
		},
		//上拉触底事件
		onReachBottom() {
			//判断数据是否加载完毕
			if(this.queryObj.pagenum*this.queryObj.pagesize >=this.total){
				this.isShow=true
				return uni.$showMsg("数据加载完毕")
			}
			//节流阀打开，不发起请求
			if(this.isloading) return
			//让页码自增+1
			this.queryObj.pagenum++
			this.getGoodsList()
		},
		//下拉刷新
		onPullDownRefresh() {
			//重置关键数据
			this.queryObj.pagenum=1
			this.total=0
			this.isloading=false
			this.goodsList=[]
			this.isShow=false
			//重新发起数据请求
			this.getGoodsList(()=>uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss" scoped>
.goods_list{
	.over{
		width: 100vw;
		height: 30px;
		line-height: 30px;
		text-align: center;
		font-size: 12px;
		color: #D8D8D8;
	}
}
</style>
