<template>
	<view>
		<!-- 使用自定义组件 -->
		<my-search @click="goToSearch()"></my-search>
		<view class="cate">
			<!-- 左侧滑动区  start-->
			<scroll-view class="left_scroll" scroll-y :style="{height: wh + 'px'}" >
				<block v-for="(item,i) in leftList" :key="i">
					<view :class="['left_scroll_item',i===active?'active':'']" @click="activeChange(i)">
						{{item.cat_name}}
					</view>
				</block>
			</scroll-view>
			<!-- 左侧滑动区  end-->
			
			<!-- 右侧滑动区 start -->
			<scroll-view class="right_scroll" scroll-y :style="{height: wh + 'px'}" :scroll-top="scrollTop">
				<view class="right_scroll_item" v-for="(item,i) in level2" :key="i">
					<!-- 二级分类标题 -->
					<view class="scroll_item_title">
						/ {{item.cat_name}} /
					</view>
					<!-- 三级内容 start -->
					<view class="cate-lv3-list">
						<view class="cate-l3-item" v-for="(item3,index) in item.children" :key="index" @click="goGoodsList(item3.cat_id)">
							<image :src="item3.cat_icon" mode=""></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
					<!-- 三级内容 end -->
				</view>
			</scroll-view>
			<!-- 右侧滑动区 end -->
		</view>
	</view>
</template>

<script>
	import {getLeftListFn} from '../../api/api.js'
	export default {
		data() {
			return {
				//当前设备可用高度
				wh:0,
				//左侧列表内容
				leftList:[],
				//左侧默认选中项
				active:0,
				//二级分类
				level2:[],
				//设置右侧滚动条位置  用来重置高度
				scrollTop:0,
			};
		},
		onLoad() {
			// 当前设备可用高度
			const sysInfo=uni.getSystemInfoSync()
			this.wh=sysInfo.windowHeight-50
			// 加载 左侧列表内容
			this.getLeftList()
		},
		methods:{
			//加载 左侧列表内容
			async getLeftList(){
				const {data:res} =await getLeftListFn()
				if(res.meta.status!==200) return uni.$showMsg()
				this.leftList=res.message
				// 获取二级分类
				this.level2=res.message[0].children
			},
			// 切换左侧选中项
			activeChange(i){
				this.active=i
				// 切换 获取二级分类
				this.level2=this.leftList[i].children
				//重置右侧分类滚动条位置
				this.scrollTop=this.scrollTop==0?0.5:0
			},
			//点击三级类容，跳转商品页面
			goGoodsList(id){
				uni.navigateTo({
					url:`/subpkg/goods_list/goods_list?cid=${id}`
				})
			},
			//点击收缩组件，跳转搜索页
			goToSearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
.cate{
	display: flex;
	.left_scroll{
		width: 120px;
		.left_scroll_item{
			height: 60px;
			background-color: #f7f7f7;
			text-align: center;
			line-height: 60px;
			font-size: 12px;
			&.active{
				background-color: #FFFFFF;
				position: relative;
				&::before{
					content: '';
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
					width: 2px;
					height: 30px;
					background-color: #c00;
				}
			}
		}
	}
	.right_scroll{
		flex: 1;
		.right_scroll_item{
			.scroll_item_title{
				font-size: 12px;
				font-weight: blod;
				text-align: center;
				padding: 15px 0;
			}
			.cate-lv3-list{
				display: flex;
				flex-wrap: wrap;
				.cate-l3-item{
					width: 33.33%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					margin-bottom: 10px;
					image{
						width: 60px;
						height: 60px;
					}
					text{
						font-size: 12px;
					}
				}
			}
		}
	}
}
</style>
