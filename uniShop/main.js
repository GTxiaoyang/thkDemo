import App from './App'
import { $http } from '@escook/request-miniprogram'

// #ifndef VUE3
import Vue from 'vue'

uni.$http = $http
// 配置请求根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net/'

// 请求开始之前做一些事情

$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}

// 请求完成之后做一些事情
$http.afterRequest = function (res) {
	let {data}=res
	uni.hideLoading()
	// if(data.status===200){
	// 	uni.hideLoading()
	// }else{
	// 	uni.showLoading({
	// 	  title: '请求失败',
	// 	  duration:1500
	// 	})
	// 	uni.hideLoading()
	// }
}

//封装弹窗方法
uni.$showMsg=function(title="数据加载失败！",duration=1500){
	uni.showToast({
		icon:'none',
		title,
		duration
	})
}
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif