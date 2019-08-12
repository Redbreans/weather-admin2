import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home/home.vue'
import meteorological from '@/views/meteorological/meteorological.vue'
import scenicSpot from '@/views/scenicspot/scenicSpot.vue'
import specialTourism from '@/views/specialtourism/specialTourism.vue'
import trafficMeteorological from '@/views/trafficmeteorological/trafficMeteorological.vue'
import countryTravel from '@/views/countrytravel/countryTravel.vue'
import wonderfulatlas from '@/views/wonderfulatlas/wonderfulatlas.vue'
import routerecommend from '@/views/routerecommend/routerecommend.vue'
import meteorologicalSecondary from '@/views/meteorologicalsecondary/meteorologicalSecondary.vue'
import meteorologyatlas from '@/views/meteorologyatlas/meteorologyatlas.vue'
import aboutus from '@/views/aboutus/aboutus.vue'
import bannerimg from '@/views/bannerimg/bannerimg.vue'
import bannerimgmeteory from '@/views/bannerimgmeteory/bannerimg.vue'
import bannerimgtravel from '@/views/bannerimgtravel/bannerimg.vue'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			//  component: home     //首页
			component: () =>
				import('@/views/home/home.vue')
		},
		{
			path: '/meteorological', //气象景观
			//  component: meteorological
			component: () =>
				import('@/views/meteorological/meteorological.vue')
		},
		{
			path: '/scenicSpot', //景区天气
			//  component: scenicSpot
			component: () =>
				import('@/views/scenicspot/scenicSpot.vue')
		},
		{
			path: '/trafficMeteorological', //交通气象
			//  component: trafficMeteorological
			component: () =>
				import('@/views/trafficmeteorological/trafficMeteorological.vue')
		},
		{
			path: '/meteorologicalSecondary', //交通气象-------次级界面
			//  component: meteorologicalSecondary
			component: () =>
				import('@/views/meteorologicalsecondary/meteorologicalSecondary.vue')
		},
		{
			path: '/meteorologyatlas', //交通气象-------次级界面-----精彩图集那块
			//  component: meteorologyatlas
			component: () =>
				import('@/views/meteorologyatlas/meteorologyatlas.vue')
		},
		{
			path: '/specialTourism', //特色旅游
			//  component: specialTourism
			component: () =>
				import('@/views/specialtourism/specialTourism.vue')
		},
		{
			path: '/countryTravel', //这个是特色旅游下面的次级------乡村旅游
			//  component: countryTravel
			component: () =>
				import('@/views/countrytravel/countryTravel.vue')
		},
		{
			path: '/wonderfulatlas', //这个是特色旅游下面的次级------乡村旅游图集那块
			//  component: wonderfulatlas
			component: () =>
				import('@/views/wonderfulatlas/wonderfulatlas.vue')
		},
		{
			path: '/routerecommend', //旅游线路推荐
			//  component: routerecommend
			component: () =>
				import('@/views/routerecommend/routerecommend.vue')
		},
		{
			path: '/aboutus', //关于我们
			//  component: routerecommend
			component: () =>
				import('@/views/aboutus/aboutus.vue')
		},
		{
			path: '/bannerimg', //banner图片展示
			//  component: routerecommend
			component: () =>
				import('@/views/bannerimg/bannerimg.vue')
		},
		
		
		{
			path: '/bannerimgmeteory', //banner图片展示
			//  component: routerecommend
			component: () =>
				import('@/views/bannerimgmeteory/bannerimg.vue')
		},
		{
			path: '/bannerimgtravel', //banner图片展示
			//  component: routerecommend
			component: () =>
				import('@/views/bannerimgtravel/bannerimg.vue')
		},


	],

	scrollBehavior(to, from, savedPosition) {
		return {
			x: 0,
			y: 0
		}
	}

})