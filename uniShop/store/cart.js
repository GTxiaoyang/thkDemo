export default{
	namespaced:true,
	state:()=>({
		// 每个商品的信息对象，都包含如下 6 个属性：
		// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	mutations:{
		addToCart(state,goods){
			const findResult= state.cart.find(item=>item.goods_id===goods.goods_id)
			if(!findResult){
				state.cart.push(goods)
			}else{
				findResult.goods_count++
			}
			this.commit('m_cart/saveToStorage')
		},
		//本地存储持久化
		saveToStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		//跟新购物车中商品勾选状态
		updataGoodsState(state,goods){
			const findResult=state.cart.find(item=>item.goods_id==goods.goods_id)
			if(findResult){
				findResult.goods_state=goods.goods_state
				this.commit('m_cart/saveToStorage')
			}
		},
		//更新购物车商品数量
		updataGoodsNum(state,goods){
			const findResult=state.cart.find(item=>item.goods_id==goods.goods_id)
			if(findResult){
				findResult.goods_count=goods.goods_count
				this.commit('m_cart/saveToStorage')
			}
		}
	},
	getters:{
		total(state){
			let num=0
			state.cart.forEach(item=>num += item.goods_count)
			return num
		}
	}
}