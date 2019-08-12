import * as specialTourismApi from '@/api/api.js';
export default {
	data() {
		return {
			group: "travel",
			specialData: [], //用来装特色旅游分类的数据
			indexNum: 0, //判断类名的索引值
			initId: '', //初始特色旅游分类这块的id值
			initDetail: '', //初始特色旅游分类这块的介绍内容
			size: 20, //获取的图片数据长度
			start: 0, //开始位置
			specialPicture: [], //用来装图片的数据
			specialRecommendData: [], //用来接收旅游推荐的数据
			scenicRecommendId: '', //用来接收点击旅游推荐模块的id值然后弹出弹出框
			recommendDetail: [], //用来接收推荐详情的数据
			imgUrl: this.getImgUrl.readImageUrl, //配置的全局图片url地址

			limitNum: 8, //用来控制显示的数据条数
			limitNumRecommend: 4, //用来控制显示的推荐数据
			defaultNumRecommend: 4, //默认显示4条数据
			defaultNum: 8, //默认的显示数据条数
			specialName: '', //点击分类下面的数据显示的名字
			imgArray: [], //banner图片数据
			timer: null, //定时器
			mark: 0, //比对图片索引的变量
			RecommendData: { //推荐的数据
				createTimeBegin: null,
				createTimeEnd: null,
				size: 30,
				sortField: '',
				sortType: '',
				start: 0,
				state: null,
				title: '',
				typeCode: 'travel-recommendation',
				typeId: '',
				updateTimeBegin: null,
				updateTimeEnd: null,
			},
			bannersContentData: '', //banner文字介绍
			takeUp: true, //点击更多后，内容变为收起
			takeUps: true,
			initSpecialPictures: { //这个是特色旅游下面分类图片的参数值
				size: -1,
				start: -1
			},
			state: '', //判断跳转过来的状态值
			initIds: '', //接收传过来的id值
			specialNames: '', //用来接收传过来的specialName名字
			arr: [],
			newArrs: [],
			arrList: [],
			showTime: 0, //banner轮播时间
		}
	},
	/**
	 * 计算属性
	 */
	computed: {
		//看显示几条数据
		defultShowAddress: function() {
			return this.specialPicture.slice(0, this.limitNum);
		},
		//看旅游推荐更多的数据
		defaultShowRecommendList: function() {
			return this.specialRecommendData.slice(0, this.limitNumRecommend);
		}
	},
	methods: {

		getUrlConent(item, name) {
			
			this.$axios.get(item).then(res => {
								
				if(res.data.length <= 0 || res.data == undefined || res.data == '' || res.data.body =='') {
					return;
				}
				
				if(res.data.indexOf('<!DOCTYPE html>') == 0){
					return;
				}
				this.$router.push({
					path: './bannerimgtravel',
					query: {
						urls: item,
						name: name
					}
				})
			})							

		},

		/**
		 * 去推荐详情看看
		 */
		goToRecommend(articleId) {
			this.$router.push({
				path: './routerecommend',
				query: {
					articleId: articleId,
					typeCode: this.RecommendData.typeCode
				}
			})
		},
		/**
		 * 查看更多数据
		 */
		loadMore() {
			if(this.limitNum != this.specialPicture.length) {
				//this.limitNum+=4
				this.limitNum = this.specialPicture.length;
				this.takeUp = false;
			} else {
				this.limitNum = this.defaultNum;
				this.takeUp = true;
			}
		},
		/**
		 * 查看旅游线路更多
		 */
		loadMores() {
			if(this.limitNumRecommend != this.specialRecommendData.length) {
				this.limitNumRecommend = this.specialRecommendData.length;
				this.takeUps = false;
			} else {
				this.limitNumRecommend = this.defaultNumRecommend;
				this.takeUps = true;
			}
		},
		/**
		 * 获取banner文字简介的id值
		 */
		getBannerContent() {
			specialTourismApi.apiAdminMeteorologyAndTravelIntroList(
				this.RecommendData.createTimeBegin,
				this.RecommendData.createTimeEnd,
				this.RecommendData.size,
				this.RecommendData.sortField,
				this.RecommendData.sortType,
				this.RecommendData.start,
				this.RecommendData.state,
				this.RecommendData.title,
				this.group,
				this.RecommendData.typeId,
				this.RecommendData.updateTimeBegin,
				this.RecommendData.updateTimeEnd
			).then(res => {
				//console.log(res, '获取banner文字简介的id值')
				this.getInfoBannerContent(res.body[0].articleId, this.group);
			}).catch(err => {})
		},
		/**
		 * 根据id值获取banner文字内容介绍
		 */
		getInfoBannerContent(id, group) {
			specialTourismApi.apiAdminMeteorologyAndTravelIntroInfo(
				id,
				group
			).then(res => {
				this.bannersContentData = res.body.content;
			}).catch(err => {
				console.log(err)
			})
		},
		/**
		 * 获取初始的特色分类这块的数据
		 */
		initSpecialTourism() {
			var _this = this;
			specialTourismApi.apiFrontScenicClassList(
				_this.group
			).then(res => {
				var body = res.body;
				_this.arr = body; // 景点列表

				if(body.length > 0) {
					body.forEach(function(item) {
						//console.log(item,'===================')
						_this.checkClassifyList(item);
					});
				}
			}).catch(err => {
				console.log(err)
			})
		},
		/**
		 * 判断分类下面是否有图片的数据
		 * 
		 */
		checkClassifyList(item) {
			var _this = this;
			var arr = _this.arr;
			var newArr = [];
			specialTourismApi.apiFrontScenicPointList(
				_this.group,
				item.scenicClassId,
				_this.initSpecialPictures.size,
				_this.initSpecialPictures.start
			).then(res => {
				//给每个特色旅游分类的数据添加一个字段来表示有图片的数据
				//	console.log(res,'图片')
				if(res.body.length > 0) {
					_this.specialData.push(item) //带有图片列表
					var specialData = _this.specialData;
					//                   _this.arrList.push(item)

					arr.map(function(it) {
						specialData.map(function(its) {
							if(it.name == its.name) {
								newArr.push(it);
							}
						});
					});

					// TODO 
					// newArr 
					//					var arrs = [];
					//					newArr.map(function(it){
					//						specialData.map(function(its){
					//							if(it.name == its.name){
					//								arrs.push(its);
					//							}
					//						});
					//					});
					// TODO 

					this.newArrs = newArr;

					if(this.state == 'jump') {
						this.initSpecialPicture(this.initIds)
						this.initId = this.initIds
						this.specialName = this.specialNames;
					} else {
						this.specialName = this.newArrs[0].name;
						this.initId = this.newArrs[0].scenicClassId;
						this.initSpecialPicture(this.newArrs[0].scenicClassId)
					}
				}

			}).catch(err => {
				console.log(err)
			})
		},
		/**
		 * 获取初始特色分类这块详情内容的数据===这部分内容可以不要
		 */
		initSpecialInfo(id) {
			specialTourismApi.apiFrontScenicClassInfo(
				id
			).then(res => {
				this.initDetail = res.body.des;
			}).catch(err => {
				console.log(err)
			})
		},
		/**
		 * 获取初始的特色旅游下面的图片数据
		 */
		initSpecialPicture(id) {

			specialTourismApi.apiFrontScenicPointList(
				this.group,
				id,
				this.initSpecialPictures.size,
				this.initSpecialPictures.start
			).then(res => {

				this.specialPicture = res.body;
				//				console.log(res.body,this.specialPicture.length,'=====specialPicture==============')

			}).catch(err => {
				console.log(err)
			})

		},
		/**
		 * 点击获取特色分类的数据,以及介绍的内容
		 */
		getSpecialData(id, index, specialName) {

			this.initId = id;
			//			this.initSpecialInfo(id);
			this.initSpecialPicture(this.initId);
			this.indexNum = index;
			this.specialName = specialName;
		},
		/**
		 * 获取旅游推荐的数据
		 */
		getRecommendData() {
			specialTourismApi.apiAdminRouterRecommendationList(
				this.RecommendData.createTimeBegin,
				this.RecommendData.createTimeEnd,
				this.RecommendData.size,
				this.RecommendData.sortField,
				this.RecommendData.sortType,
				this.RecommendData.start,
				this.RecommendData.state,
				this.RecommendData.title,
				this.RecommendData.typeCode,
				this.RecommendData.typeId,
				this.RecommendData.updateTimeBegin,
				this.RecommendData.updateTimeEnd
			).then(res => {
				this.specialRecommendData = res.body;
			}).catch(err => {
				console.log(err)
			})
		},
		/**
		 * 点击旅游分类下面的景点跳转到乡村旅游界面
		 */
		jumpTravel(scenicPointId, index, scenicName) {

			let name = '';
			if(this.group == 'travel') {
				name = '特色旅游';
			}

			this.$router.push({
				path: '/countryTravel',
				query: {
					scenicPointId: scenicPointId,
					parentName: name,
					specialName: this.specialName,
					scenicName: scenicName,
					indexs: this.indexNum,
					initId: this.initId

				}
			})
		},
		/**
		 * 获取旅游banner图片数据
		 */
		getBannerData() {
			specialTourismApi.apiAdminAdvertList(
				this.group,
				this.size,
				this.start
			).then(res => {

				this.showTime = res.body[0].showTime * 1000;

				this.imgArray = res.body;

			}).catch(err => {
				console.log(err, '错误了')
			})
		},
		/**
		 * 自动播放图片
		 */
		autoPlay() {
			this.mark++;
			if(this.mark === this.imgArray.length) {
				this.mark = 0;
			}
		},
		/**
		 * 播放图片
		 */
		play() {
			this.timer = setInterval(this.autoPlay, 2500);
		},
		/**
		 * 点击小圆点切换图片
		 */
		change(i) {
			if(this.mark = i) {
				clearInterval(this.timer);
				this.mark = i;
			} else {
				this.timer = setInterval(this.autoPlay, 2500);
			}
		},
		/**
		 * 鼠标移入暂停图片动画
		 */
		stop() {
			clearInterval(this.timer);
		},
		/**
		 * 鼠标移出图片开始
		 */
		move() {
			this.timer = setInterval(this.autoPlay, 2500);
		},

	},
	created: function() {
		this.initSpecialTourism();
		this.getRecommendData();
		this.getBannerData();
		this.play();
		this.getBannerContent();
		this.state = this.$route.query.state

		if(this.$route.query.state == 'jump') {
			this.specialNames = this.$route.query.specialName;

			this.indexNum = this.$route.query.index;
			this.initIds = this.$route.query.initId;

			this.initSpecialPicture(this.$route.query.initId);
		}

	}

}