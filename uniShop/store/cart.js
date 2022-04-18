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
		},
		//删除商品
		removeGoods(state,goods){
			state.cart=state.cart.filter(item=>item.goods_id!=goods.goods_id)
			this.commit("m_cart/saveToStorage")
		},
		//全选购物车勾选状态
		updataAllGoodsState(state,newState){
			state.cart.forEach(item=>item.goods_state=newState)
			this.commit('m_cart/saveToStorage')
		}
	},
	getters:{
		//购物车中所以商品总数量
		total(state){
			return state.cart.reduce((total,item)=> total +=item.goods_count,0)
		},
		//购物车中已选中商品数量
		checkedCount(state){
			return	state.cart.filter(item=>item.goods_state).reduce((total,itemson)=> total+=itemson.goods_count,0)
		},
		//已勾选商品总价格
		checkedGoodsAmount(state){
			return state.cart.filter(item=>item.goods_state).reduce((total,item)=>total+=item.goods_count *item.goods_price,0).toFixed(2)
		}
	}
}