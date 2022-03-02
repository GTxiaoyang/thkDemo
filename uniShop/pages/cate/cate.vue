<template>
	<view class="cate">
		<!-- 左侧滑动区  start-->
		<scroll-view class="left_scroll" scroll-y :style="{height: wh + 'px'}" >
			<template v-for="(item,i) in leftList" :key="i">
				<view :class="['left_scroll_item',i===active?'active':'']" @click="activeChange(i)">
					{{item.cat_name}}
				</view>
			</template>
		</scroll-view>
		<!-- 左侧滑动区  end-->
		
		<!-- 右侧滑动区 start -->
		<scroll-view class="right_scroll" scroll-y :style="{height: wh + 'px'}">
			<view class="right_scroll_item">
				xxx
			</view>
			<view class="right_scroll_item">
				xxx
			</view>
			<view class="right_scroll_item">
				xxx
			</view>
			<view class="right_scroll_item">
				xxx
			</view>
			<view class="right_scroll_item">
				xxx
			</view>
			<view class="right_scroll_item">
				xxx
			</view>
			<view class="right_scroll_item">
				xxx
			</view>
			<view class="right_scroll_item">
				xxx
			</view>
			<view class="right_scroll_item">
				xxx
			</view>
			<view class="right_scroll_item">
				xxx
			</view>
			<view class="right_scroll_item">
				xxx
			</view>
			<view class="right_scroll_item">
				xxx
			</view>
			<view class="right_scroll_item">
				xxx
			</view>
			<view class="right_scroll_item">
				xxx
			</view>
			<view class="right_scroll_item">
				xxx
			</view>
			<view class="right_scroll_item">
				xxx
			</view>
			<view class="right_scroll_item">
				xxx
			</view>
			<view class="right_scroll_item">
				xxx
			</view>
			<view class="right_scroll_item">
				xxx
			</view>
			<view class="right_scroll_item">
				xxx
			</view>

		</scroll-view>
		<!-- 右侧滑动区 end -->
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
			};
		},
		onLoad() {
			// 当前设备可用高度
			const sysInfo=uni.getSystemInfoSync()
			this.wh=sysInfo.windowHeight
			// 加载 左侧列表内容
			this.getLeftList()
		},
		methods:{
			//加载 左侧列表内容
			async getLeftList(){
				const {data:res} =await getLeftListFn()
				if(res.meta.status!==200) return uni.$showMsg()
				this.leftList=res.message
			},
			// 切换左侧选中项
			activeChange(i){
				this.active=i
			},
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
			
		}
	}
}
</style>
