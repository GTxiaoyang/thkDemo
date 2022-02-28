//轮播图
export const getSwiperdataFn = ()=> uni.$http.get('api/public/v1/home/swiperdata')
// 导航
export const getNavListFn = ()=> uni.$http.get('api/public/v1/home/catitems')
//楼层
export const getfloorFn = ()=> uni.$http.get('api/public/v1/home/floordata')