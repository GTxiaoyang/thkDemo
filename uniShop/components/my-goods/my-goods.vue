<template>
	<view class="goods_item">
		<view class="goods_lf">
			<radio v-if="show" @click="radioEvent()" :checked="goods.goods_state"  color="#c00000"></radio>
			<image :src="goods.goods_small_logo || defaultPic" class="goods_pic" mode=""></image>
		</view>
		<view class="goods_rg">
			<view class="goods_name">
				{{goods.goods_name}}
			</view>
			<view class="goods_info">
				<view class="goods_price">
					￥{{goods.goods_price | tofixed}}
				</view>
				<uni-number-box v-if="showNum" :min="1" :max="9999" :value="goods.goods_count" @change="changeValue" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		props:{
			goods:{
				type:Object,
				default:{}
			},
			show:{
				type:Boolean,
				default:false
			},
			showNum:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
			};
		},
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
		},
		methods:{
			//状态改变
			radioEvent(){
				this.$emit('radio-change',{
					goods_id:this.goods.goods_id,
					goods_state:!this.goods.goods_state
				})
			},
			//数量改变
			changeValue(val){
				this.$emit('numChangeHandler',{
					goods_id:this.goods.goods_id,
					goods_count:Number(val)
				})
			},
			//修改不规则内容,转化为 1
			// editNum(val){
			// 	let value=parseInt(val.detail.value)
			// 	if(!value){
			// 		val.detail.value=1
			// 		this.$forceUpdate();
			// 		return
			// 	}
			// }
		}
	}
</script>

<style lang="scss">
.goods_item{
	display: flex;
	padding: 10px 8px;
	border-bottom: 1px solid #F0F0F0;
	box-sizing: border-box;
	width: 100vw;
	.goods_lf{
		// width: 30vw;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-right: 15px;
		.goods_pic{
			width: 100px;
			height: 100px;
			display: block;
		}
	}
	.goods_rg{
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.goods_name{
			font-size: 13px;
		}
		.goods_info{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.goods_price{
				color: #c00000;
				font-size: 16px;
				text-align: left;
				line-height: 24px;
			}
		}
	}
}
</style>
