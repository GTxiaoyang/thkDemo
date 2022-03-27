import {mapGetters} from "vuex"

export default {
	onShow() {
		this.setBadge()
	},
	computed:{
		...mapGetters('m_cart',['total'])
	},
	methods:{
		setBadge(){
			uni.setTabBarBadge({
				index:2,
				text:String(this.total)
			})
		}
	}
}