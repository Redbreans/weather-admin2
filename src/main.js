// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import echarts from 'echarts'
import axios from 'axios'

//import i18n from './i18n/i18n'; //切换中英文


import getImgUrl from '@/getImgUrl/getImgUrl.js'
import getWeather from '@/getWeather/getWeather.js'
import getIndexNameImg from '@/getIndexNameImg/getIndexNameImg.js'
import getNightImg from '@/getNightImg/getNightImg.js'
import getCalendar from '@/getCalendar/getCalendar.js'





import VueI18n from 'vue-i18n';    //切换中英文

import 'element-ui/lib/theme-chalk/index.css';

import LangENUS from '@/common/lang/en-us.js';  //切换中英文
import LangZHCN from '@/common/lang/zh-cn.js';  //切换中英文


import '@/public/public.css';
import animated  from 'animate.css';//引入animate动画库
Vue.use(ElementUI);
Vue.use(animated);
//Vue.use(i18n);



Vue.use(VueI18n);   /// 切换中英文
const i18n = new VueI18n({
  locale: 'zh-cn',
  messages: {
    'en-us': LangENUS,
    'zh-cn': LangZHCN
  }
})







//引入滚动条插件
import Vues from 'vue'
import { HappyScroll } from 'vue-happy-scroll';
//自定义组件名
Vues.component('happy-scroll', HappyScroll);
// 引入css
import 'vue-happy-scroll/docs/happy-scroll.css';


//getCalendar
//
Vue.prototype.$echarts = echarts 
Vue.prototype.getImgUrl = getImgUrl
Vue.prototype.getWeather = getWeather //晚上天气预报图片
Vue.prototype.getIndexNameImg = getIndexNameImg //指数图片
Vue.prototype.getNightImg = getNightImg //晚上天气预报图片

Vue.prototype.getCalendar = getCalendar
Vue.prototype.$axios = axios


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,  
  //i18n,
  i18n,
  components: { App },
  template: '<App/>'
})

