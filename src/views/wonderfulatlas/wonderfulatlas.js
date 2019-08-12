import * as specialTourism from '@/api/api.js'
export default {
	data() {
		return {
			albumId: '', //相册集合id值
			AlbumImageList: [], //相册集合数据
			imgUrl: this.getImgUrl.readImageUrl, //配置的全局图片url地址
			indexNum: 3, //默认选中第一张
			widthAll: '', //轮播的总宽度
			defaultLiWidth: 870,
			timer: null, //定时器
			mark: 0, //比对图片索引的变量
			prevShow: false,
			nextShow: false,
			imgName: '', //定义图集的名称
			parentName: '', //定义这个页面是属于那一大类的
			specialName: '', //定义那一大类下面的分类文字名称
			countryName: '', //定义分类下面的名称
			autoplays: 'autoplay',//定义自动播放
			indexs: 0, //默认文字内容描述为0
			_dom: '',//将获取到的视频元素装到这个变量里
			isPlay:false,//判断是否播放
			isPlays:'',//用来定义图片是否加上类名，0代表没有加上，1代表加上
		    AlbumImageLists:[]
		}
	},
	methods: {
		/**
		 * 组件轮播图片==获取到视频元素
		 */
		videoPlay(item) {

			this._dom = document.getElementById(item);
          
			if(!this.isPlay ) {	
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
			this.indexs = index;
			this.mark = index;
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
			specialTourism.apiFrontAlbumImageList(
				this.albumId
			).then(res => {
				this.AlbumImageList = res.body;
				this.AlbumImageLists =this.AlbumImageList
			}).catch(err => {
				console.log(err)
			})
		},
		/**
		 * 点击返回上一级
		 */
		goBack() {
			this.$router.go(-1);
		},
		/**
		 * 自动播放滚动图片
		 */
		autoPlay() {
			this.mark++;
			if(this.mark === this.AlbumImageList.length) {
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
		stop1() {
			clearInterval(this.timer)
		},
		move1() {
			this.timer = setInterval(this.autoPlay, 5000);
		},
		/**
		 * 鼠标移出图片开始动
		 */
		move() {
			this.prevShow = false;
			this.nextShow = false;
			this.timer = setInterval(this.autoPlay, 5000);
		},
	
	},
	created: function() {
		this.albumId = this.$route.query.albumId;
		this.imgName = this.$route.query.imgName;
		this.parentName = this.$route.query.parentName;
		this.specialName = this.$route.query.specialName;
		this.countryName = this.$route.query.countryName;
		if(this.$route.query.indexAlbum) {
			this.mark = this.$route.query.indexAlbum;
		} else {
			this.mark = 0;
		}

		this.getAlbumList();
		this.widthAll = this.defaultLiWidth;
		this.plays();

	}
}