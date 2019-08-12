import * as specialTourismApi from '@/api/api.js';
//动态背景图片 ==》 note: { backgroundImage: "url(" + require("../../assets/save.png") + ")", backgroundRepeat: "no-repeat", backgroundSize: "25px auto", marginTop: "5px", }
export default {
	data() {
		return {
			images: "https://images.weserv.nl/?url=",
			scenicPointId: '', //接收从特色旅游点击传参景点id
			parentName: '', //接收从特色旅游点击传参一级导航名字
			countryName: '', //接收从特色旅游点击传参的分类下的景区名字，
			specialName: '', //接收从特色旅游点击传传参特色旅游分类名字
			countryData: {
				landscapeName: '', //接收从特色旅游点击过来的景点名字
				landsDes: '', //接收从特色旅游点击过来的景点描述
				height: ''
			},
			albumData: [], //接收相册的数据
			imgUrl: this.getImgUrl.readImageUrl, //配置的全局图片url地址
			albumImageList: [], //用来接收图片集合
			dialogTableVisible: false, //显示轮播弹框
			showReply: false, //默认回复不显示
			targetType: 'scenic', //默认的是景点类型
			condationData: [], //获取当前天气实况数据
			foreastList: [], //7天天气预报数据
			datas: [], //用来装处理之后的时间
			group: 'travel', //评论的参数值
			start: 0, //评论的参数值
			size: 10, //评论的参数值
			page: 1, //评论页数
			total: 0, //总共的评论
			commends: [], //装评论的数据
			indexNumCommend: false,
			mepredictionList: { //7天天气的数据
				size: 7,
				start: 0
			},
			indexgo: '', //旅游分类的索引值
			initIds: '', //旅游分类的id值
			isMark: false, //遮罩层默认不显示,点击更多的时候显示

			//================遮罩层
			albumId: '', //相册集合id值
			AlbumImageListchild: [], //相册集合数据
			indexNum: 3, //默认选中第一张
			widthAll: '', //轮播的总宽度
			defaultLiWidth: 870,
			timer: null, //定时器
			mark: 0, //比对图片索引的变量
			prevShow: true,
			nextShow: true,
			imgName: '', //定义图集的名称
			parentNames: '', //定义这个页面是属于那一大类的
			specialNames: '', //定义那一大类下面的分类文字名称
			countryNames: '', //定义分类下面的名称
			autoplays: 'autoplay', //定义自动播放
			indexcontent: 0, //默认文字内容描述为0
			_dom: '', //将获取到的视频元素装到这个变量里
			isPlay: false, //判断是否播放
			isPlays: '', //用来定义图片是否加上类名，0代表没有加上，1代表加上
			AlbumImageLists: [],
			hotLevel: 0,
			indexs: '',

		}
	},
	methods: {
		/**
		 * 当前页
		 */
		shophouseCurrentChange(val) {
			var size = parseInt(this.size);
			var start = parseInt(this.start);
			this.page = val;
			start = (val - 1) * size;
			this.start = start;
			this.getCommend();
		},
		/**
		 * 每条页数
		 */
		handleSizeChange(val) {
			//console.log(val)
			var size = parseInt(this.size);
			size = val;
			this.size = size;
			this.getCommend();
		},
		/**
		 * 获取到乡村旅游页面的数据
		 */
		getChildCountryData() {
			specialTourismApi.apiFrontScenicPointInfo(
				this.scenicPointId
			).then(res => {
				//console.log(res,'=============================')
				this.hotLevel = res.body.hotLevel;
				this.countryData.landscapeName = res.body.name;
				this.countryData.landsDes = res.body.des;
				this.countryData.height = res.body.height;
				this.albumData = res.body.album;
				//console.log(this.albumData,'albumData')

				for(var i in res.body.album) {

					var overName = true;
					for(var j in res.body.album[i].albumImageList) {
						if(res.body.album[i].albumImageList[j].des.length > 13) {
							//console.log(res.body.album[i].albumImageList[j].name,'dayule ============')

							overName = false;
							res.body.album[i].albumImageList[j].overName = overName;

						} else {

							res.body.album[i].albumImageList[j].overName = overName;
						}
					}

				}

				if(!res.body.length || res.body.length < 0) {
					return;
				}

				this.srclist[0].imsrc = this.imgUrl + res.body.album[0].albumImageList[1].fileId;
				this.srclist[1].videosrc = this.imgUrl + res.body.album[0].albumImageList[0].fileId;
				this.srclist[3].videosrc = this.imgUrl + res.body.album[0].albumImageList[0].fileId;
				this.xixi = this.imgUrl + res.body.album[0].albumImageList[0].fileId;
			}).catch(err => {
				console.log(err);
			})
		},
		/**
		 * 获取评论的数据
		 */
		getCommend() {
			specialTourismApi.apiFrontCommentList(
				this.group,
				this.size,
				this.start,
				this.scenicPointId
			).then(res => {

				for(var i = 0; i < res.body.list.length; i++) {

					var _url = res.body.list[i].userHeadImage.substring(7);
					res.body.list[i].urls = _url;
				}

				this.commends = res.body.list;
				// console.log(this.commends,'------------------')
				this.total = parseInt(res.body.records);

			}).catch(err => {
				console.log(err)
			})
		},

		getImages(_url) {

			if(_url !== undefined) {

				let _u = _url.substring(7);
				return 'https://images.weserv.nl/?url=' + _u;
			}
		},

		/**
		 * 点击更多弹出图集数据
		 */
		lookMorPictures(albumId, imgName) {
			this.isMark = true;
			//			this.$router.push({
			//				path: './wonderfulatlas',
			//				query: {
			//					albumId: albumId,
			//					imgName: imgName,
			//					parentName: this.parentName,
			//					specialName: this.specialName,
			//					countryName: this.countryName
			//				}
			//			})
			this.albumId = albumId;
			this.imgName = imgName;
			this.getAlbumList();
		},
		/**
		 * 点击单个图片后跳转到图集页面
		 */
		jumpAlbum(albumId, index, imgName) {
			//			this.$router.push({
			//				path: './wonderfulatlas',
			//				query: {
			//					indexAlbum: index,
			//					albumId: albumId,
			//					imgName: imgName,
			//					parentName: this.parentName,
			//					specialName: this.specialName,
			//					countryName: this.countryName
			//				}
			//			})

			this.albumId = albumId;
			this.imgName = imgName;
			this.isMark = true;
			this.mark = index;
			this.indexcontent = index;
			this.getAlbumList();
			//this.$refs.picImgs.setActiveItem(index); //这一步改变组件轮播的index值

		},
		/**
		 * 返回上一级
		 */
		goBack() {

			this.$router.push({
				path: './specialTourism',
				query: {
					index: this.indexgo,
					initId: this.initIds,
					parentName: this.parentName,
					specialName: this.specialName,
					state: 'jump'
				}
			})
		},
		/**
		 * 回复功能，默认不显示，点击显示回复的内容
		 */
		showReplys(index) {
			this.indexNumCommend = index;
			this.showReply = !this.showReply;
		},
		/**
		 * 获取天气实况的数据
		 */
		getWeatherConditions() {
			specialTourismApi.apiFrontMeLiveInfo(
				this.scenicPointId,
				this.targetType
			).then(res => {

				this.condationData = res.body;

			}).catch(err => {
				console.log(err, '获取信息错误了')
			})
		},
		/**
		 * 获取7天天气预报的数据
		 */
		getWeatherForeast() {

			specialTourismApi.apiFrontMePredictionList(
				this.mepredictionList.size,
				this.mepredictionList.start,
				this.scenicPointId,
				this.targetType
			).then(res => {

				this.foreastList = res.body;
				var that = this;
				for(var i in that.foreastList) {

					var item = that.foreastList[i];
					item.dayImg = that.getWeather.getWeather(item.weather);
					item.nightImg = that.getNightImg.getNightImg(item.weather);

					var dates = item.date;
					that.datas.push(dates.substring(5, 10).split('-'));
					var dd = dates.replace(/-/g, "/").split(' ')[0];
					var dts = new Date(dd); //用来处理星期几	

					if(dts.getDay() == 0) {
						item.dt = '周日';
					} else if(dts.getDay() == 1) {
						item.dt = '周一';
					} else if(dts.getDay() == 2) {
						item.dt = '周二';
					} else if(dts.getDay() == 3) {
						item.dt = '周三';
					} else if(dts.getDay() == 4) {
						item.dt = '周四';
					} else if(dts.getDay() == 5) {
						item.dt = '周五';
					} else if(dts.getDay() == 6) {
						item.dt = '周六';
					} else {
						console.log('错误')
					}
				}

			}).catch(err => {
				console.log(err)
			})
		},
		/**
		 * 获取旅游推荐图片的分类数据
		 */
		getClassifyDatas(id) {
			specialTourismApi.apiFrontScenicClassInfo(id).then(res => {
				this.specialName = res.body.name;
			}).catch(err => {
				console.log(err)
			})
		},

		/**
		 * 遮罩层里面的数据		
		 * 组件轮播图片==获取到视频元素
		 */
		videoPlay(item) {
			console.log(item, "item")
			this._dom = document.getElementById(item);
			console.log(this.isPlay, "this.isPlay")
			if(!this.isPlay) {

				this.isPlays = 1;
				this._dom.play();
				this.isPlay = !this.isPlay;
				this.autoplays = '';
			} else {

				this.isPlays = 0;
				this._dom.pause();
				this.isPlay = !this.isPlay;
				this.autoplays = 'autoplay';
			}

		},
		/**
		 * 这个是组件轮播的change事件，图片轮播可以获取到相应的索引位置
		 */
		activeFun(index) {
			
			var fileIdItem = this.$refs.fileIdItem
			var lunId = "";
			var newDom;
			var pausedId = "";
			this.indexs = index;
			this.mark = index;
			this.indexcontent = index;
			for(var i in this.AlbumImageListchild) {
				if(i == index) {
					lunId = this.AlbumImageListchild[index].fileId
				}
			}
			for(var k = 0; k <= fileIdItem.length - 1; k++) {
				if(lunId == fileIdItem[k].id) {
					pausedId = fileIdItem[k].id;
				}
			}
			newDom = document.getElementById(pausedId);
			if(newDom != null){
//				newDom.paused = true;
				newDom.pause()
			}

			
		},

		/**
		 * 点击上一张按钮，
		 */
		pre() {
			this.$refs.picImgs.prev();
		},
		/**
		 * 点击下一张按钮
		 */
		net() {
			this.$refs.picImgs.next();
		},
		/**
		 * 获取图片集的数据
		 */
		getAlbumList() {
			specialTourismApi.apiFrontAlbumImageList(
				this.albumId
			).then(res => {

				if(res.body.length <= 0) {
					this.isMark = false;
					return;
				}

				this.AlbumImageListchild = res.body;
				this.AlbumImageLists = this.AlbumImageListchild
				//console.log(this.AlbumImageListchild,'===========AlbumImageListchild')
			}).catch(err => {
				console.log(err)
			})
		},
		/**
		 * 点击返回上一级
		 */
		goBacks() {
			this.$router.go(-1);
		},
		/**
		 * 自动播放滚动图片
		 */
		autoPlay() {

			this.mark++;
			if(this.mark === this.AlbumImageListchild.length) {
				this.mark = 0;
			}
		},
		/**
		 * 轮播图片播放
		 */
		plays() {

			this.timer = setInterval(this.autoPlay, 5000);
		},
		/**
		 * 点击缩略图展示大轮播里面的图片
		 */
		changes(i) {
			this.$refs.picImgs.setActiveItem(i); //这一步改变组件轮播的index值
			if(this.mark != i) {

				this.mark = i;
				this.timer = null;
				clearInterval(this.timer);

			} else {
				clearInterval(this.timer)
			}

			clearInterval(this.timer)
		},
		/**
		 * 鼠标移入图片不动
		 */
		stop() {
			this.prevShow = true;
			this.nextShow = true;
			clearInterval(this.timer)
		},
		stops() {
			clearInterval(this.timer)
		},
		moves() {
			this.timer = setInterval(this.autoPlay, 5000);
		},
		/**
		 * 鼠标移出图片开始动
		 */
		move() {
			//this.prevShow = false;
			//this.nextShow = false;
			this.timer = setInterval(this.autoPlay, 5000);
		},
		closemark() {
			this.isMark = false;
		}

	},
	created: function() {

		this.scenicPointId = this.$route.query.scenicPointId;
		this.parentName = this.$route.query.parentName;
		this.specialName = this.$route.query.specialName;
		this.countryName = this.$route.query.scenicName;
		this.indexgo = this.$route.query.indexs;
		this.initIds = this.$route.query.initId;

		this.getChildCountryData();
		this.getWeatherConditions();
		this.getWeatherForeast();
		this.getCommend();
		if(this.$route.query.specialNames) {
			this.getClassifyDatas(this.$route.query.specialNames);
		}

		/**
		 * 遮罩层的数据
		 */

		this.widthAll = this.defaultLiWidth;
		this.plays();

	}
}