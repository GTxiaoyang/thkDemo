<template>
	<view class="address">
		<button v-if="JSON.stringify(address)=='{}'" type="primary" size="mini" class="add_address" @click="addAddress()">请选择收货地址+</button>
		<!-- 收货地址 -->
		<view class="addressInfo" v-else @click="addAddress()">
			<view class="row1">
				<view class="lf">
					收货人：<text>{{address.userName}}</text>
				</view>
				<view class="rg">
					电话：<text>{{address.telNumber}}</text>
					<uni-icons type="arrowright" size="12"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<text class="title">收货地址：</text> <text class="content">{{addstr}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from "vuex"
	export default {
		name:"my-address",
		data() {
			return {
				// address:{}
			};
		},
		methods:{
			...mapMutations("m_user",['updatAddress']),
			async addAddress(){
				const [err,succ] = await uni.chooseAddress().catch(err=>err)
				if(err==null && succ.errMsg === "chooseAddress:ok"){
					this.updatAddress(succ)
				}
			}
		},
		computed:{
			...mapState("m_user",['address']),
			...mapGetters("m_user",['addstr'])
		}
	}
</script>

<style lang="scss">
.address{
	width: 100%;
	min-height: 90px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	&::after{
		content: "";
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 3px;
		background: linear-gradient(to right, red , yellow);
	}
	.addressInfo{
		width: 100%;
		padding: 5px;
		box-sizing: border-box;
		font-size: 12px;
		.row1{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 25px;
			.rg{
				display: flex;
				align-items: center;
				height: 25px;
			}
		}
		.row2{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.title{
				width: 20%;
			}
			.content{
				flex: 1;
			}
		}
	}
}
</style>
