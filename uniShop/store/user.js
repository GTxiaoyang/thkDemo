export default{
	namespaced:true,
	state:()=>({
		address:JSON.parse(uni.getStorageSync("address") || "{}"),
		token:'',
		userinfo:JSON.parse(uni.getStorageSync('userinfo') || '{}')
	}),
	mutations:{
		//更新收货地址
		updatAddress(state,value){
			state.address=value
			this.commit('m_user/saveAddress')
		},
		//修改用户信息
		updataUserInfo(state,userinfo){
			state.userinfo=userinfo
			this.commit('m_user/saveUserInfoToStorage')
		},
		//永久保持
		saveUserInfoToStorage(state){
			uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
		},
		saveAddress(state){
			uni.setStorageSync("address",JSON.stringify(state.address))
		}
	},
	getters:{
		addstr(state){
			if(!state.address.provinceName){
				return ''
			}else{
				return state.address.provinceName+ state.address.cityName+ state.address.countyName+ state.address.detailInfo
			}
		}
	}
}