//轮播图
export const getSwiperdataFn = ()=> uni.$http.get('api/public/v1/home/swiperdata')
// 导航
export const getNavListFn = ()=> uni.$http.get('api/public/v1/home/catitems')
//楼层
export const getfloorFn = ()=> uni.$http.get('api/public/v1/home/floordata')
//分类左侧列表
export const getLeftListFn = ()=> uni.$http.get('api/public/v1/categories')
//查询关键词
export const searchFn = params=> uni.$http.get('api/public/v1/goods/qsearch',params)
//商品列表
export const goodsList = params=> uni.$http.get('api/public/v1/goods/search',params)