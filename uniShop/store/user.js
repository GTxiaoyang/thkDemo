export default{
	namespaced:true,
	state:()=>({
		address:JSON.parse(uni.getStorageSync("address") || "{}")
	}),
	mutations:{
		//更新收货地址
		updatAddress(state,value){
			state.address=value
			this.commit('m_user/saveAddress')
		},
		saveAddress(state){
			uni.setStorageSync("address",JSON.stringify(state.address))
		}
	}
}