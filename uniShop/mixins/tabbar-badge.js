import {mapGetters} from "vuex"

export default {
	onShow() {
		this.setBadge()
	},
	computed:{
		...mapGetters('m_cart',['total'])
	},
	watch:{
		total(){
			this.setBadge()
		}
	},
	methods:{
		setBadge(){
			//购物车数量不等于0才显示
			if(this.total){
				uni.setTabBarBadge({
					index:2,
					text:String(this.total)
				})
			}
		}
	}
}