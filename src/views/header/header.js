import * as specialTourismApi from '@/api/api.js';
export default {
	data() {
		return {
			navBarTitles: [{
				path: '/',
				name: '首页',
				enName: 'HomePage',
				isActive: false
			}, {
				path: '/scenicSpot',
				name: '景区天气',
				enName: 'WeatherOfTheScenicSpot',
				isActive: false
			}, {
				path: '/trafficMeteorological',
				name: '交通气象',
				enName: 'TrafficMeteorological',
				isActive: false
			}, {
				path: '/meteorological',
				name: '气象景观',
				enName: 'MeteorologicalLandscape',
				isActive: true
			}, {
				path: '/specialTourism',
				name: '特色旅游',
				enName: 'SpecialTourism',
				isActive: false
			}],
			initIndex: 0, //默认的显示tabBar颜色
			year: '', //年
			month: '', //月
			day: '', //日
			is_Show: false, //默认切换中英文不显示
			languageIndex: 0, //默认显示中文的索引
			calendarMonth: '', //农历月份
			calendarDay: '', //农历某天
			calendarFestival: '', //农历节气
			language: this.getImgUrl.language, //
			languageIndexs: 0,
			defultName: true, //默认显示中文的路由
			lang: 'en',
			langcn: 'cn'
		}

	},
	methods: {
		/**
		 * 切换农历
		 */
		changeCalendar(year, month, day) {
			let calendar = this.getCalendar.calendar.solar2lunar(year, month, day)

			this.calendarFestival = calendar.Term
			this.calendarDay = calendar.IDayCn
			this.calendarMonth = calendar.IMonthCn

		},
		/**
		 * 点击切换中英文状态
		 */
		chooseLanguage(index) {
			this.language = index;
			this.languageIndexs = index;
			if(index === 0) {

				this.$i18n.locale = 'zh-cn';
				this.defultName = true;
			}
			if(index === 1) {

				this.$i18n.locale = 'en-us'
				this.defultName = false;

			}

		},
		/**
		 * 鼠标移入切换中英文状态
		 */
		chooseLanguages(index) {
			this.languageIndex = index
		},
		/**
		 * 鼠标移出切换中英文状态
		 */
		chooseLanguageS(index) {
			this.languageIndex = index
		},
		/**
		 * 鼠标移入显示出来
		 */
		enter: function() {
			this.is_Show = true;
		},
		/**
		 * 鼠标移出隐藏
		 */
		leave: function() {
			this.is_Show = false;
		},
		/**
		 * 点击切换头部颜色
		 */
		activeFun: function(datas) {
			this.initIndex = datas;
		},
		/**
		 * 页面刷新的时候，改变的index的值
		 */
		changeLoad: function() {
			this.currentRoute = this.$route.path;
			if(this.currentRoute == '/countryTravel' || this.currentRoute == '/specialTourism' || this.currentRoute == '/wonderfulatlas' || this.currentRoute == '/routerecommend') {
				this.initIndex = 4;
			}
			if(this.currentRoute == '/') {
				this.initIndex = 0;
			}
			if(this.currentRoute == '/scenicSpot' || this.currentRoute == '/scenicspot') {
				this.initIndex = 1;
			}
			if(this.currentRoute == '/trafficMeteorological' || this.currentRoute == '/trafficMeteorologica') {
				this.initIndex = 2;
			}
			if(this.currentRoute == '/meteorological' || this.currentRoute == '/meteorologicalsecondary' || this.currentRoute == '/meteorologicalSecondary') {
				this.initIndex = 3;
			}
		},
		/**
		 * 获取当前时间
		 */
		getCurrentTime() {
			specialTourismApi.apiFrontDateTimeInfo({}).then(res => {
				this.year = res.body.substring(0, 4)
				this.month = res.body.substring(7, 5)
				this.day = res.body.substring(10, 8)
				this.changeCalendar(this.year, this.month, this.day)
			}).catch(err => {
				console.log(err, '错误了')
			})
		},
		/**
		 * 关于我们
		 */
		aboutUs() {
			this.$router.push({
				path: './aboutus'
			})
		}
	},
	created: function() {
		this.getCurrentTime();
	},
	mounted: function() {
		this.$nextTick(function() {
			this.changeLoad();
		})
	},
	watch: {
		/**
		 * 监听路由发生改变
		 */
		$route(to, from, next) {
			this.changeLoad();
			window.scrollTo(0, 0); //让每一次跳转都回到顶部						
		}
	}
}