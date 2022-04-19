<template>
	<view class="login-box">
		<!-- 图标 -->
		<uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
		<!--  -->
		<button type="primary" @click="getUserInfo" class="btn-login">一键登录</button>
		<text class="tips-text">登录后尽享更多权益</text>
	</view>
</template>

<script>
	import {login} from "../../api/api.js"
	import {mapMutations} from "vuex"
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations('m_user',['updataUserInfo']),
			//获取用户登录授权
			getUserInfo(){
				uni.getUserProfile({
				  desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				  success: (res) => {
					this.updataUserInfo(res.userInfo)
					//拿到参数-->再去获取code
					this.getToken(res)
				  },
				  fail:()=>{
					  uni.$showMsg('您取消了授权！')
				  }
				})
			},
			async getToken(info){
				const [err,res] = await uni.login().catch(err=>err)
				if(err || res.errMsg !="login:ok") return uni.$showMsg('登录失败!')
				//准备参数
				const query = {
					code: res.code,
					encryptedData:info.encryptedData,
					iv:info.iv,
					rawData:info.rawData,
					signature:info.signature
				}
				const {data:loginResult} =await login({query})
				if(loginResult.meta.status!==200) return uni.$showMsg('登录失败!')
				uni.$showMsg('登录成功!')
			}
		}
	}
</script>

<style lang="scss">
.login-box{
	height: 750rpx;
	background-color: #f8f8f8;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	overflow: hidden;
	&::after{
		content: "";
		display: block;
		width: 100%;
		height: 40px;
		background-color: #FFFFFF;
		position: absolute;
		bottom: 0;
		left: 0;
		border-radius: 100%;
		transform: translateY(50%);
	}
	.btn-login{
		width: 90%;
		border-radius: 100px;
		margin: 15px 0;
		background-color: #c00000;
	}
	.tips-text{
		font-size: 12px;
		color: gray;
	}
}
</style>
