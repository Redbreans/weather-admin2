import * as specialTourism from '@/api/api.js'
// import 'swiper/dist/css/swiper.css';
// import Swiper from 'swiper';
export default {
	data() {
		return {
			// 跳转传参的变量重名
			// albumId: '', //相册集合id值
			// imgName: '', //定义图集的名称
			// parentName: '', //定义这个页面是属于那一大类的
			// countryName: '', //定义分类下面的名称
			
			// imgUrl: this.getImgUrl.readImageUrl, //配置的全局图片url地址

			AlbumImageList: [], //相册集合数据
			indexNum: 3, //默认选中第一张
			widthAll: '', //轮播的总宽度
			defaultLiWidth: 870,
			timer: null, //定时器
			mark: 0, //比对图片索引的变量
			prevShow: false,
			nextShow: false,
			specialName: '', //定义那一大类下面的分类文字名称
			indexs:0,//默认文字内容描述为0
		}
	},
	methods: {
		/**
		 * 组件轮播图片
		 */
		activeFun(index){
			this.indexs = index;
			this.mark = index;			
		},
		pre(){
			this.$refs.picImgs.prev();
		},
		net(){
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
			}).catch(err => {
				console.log(err)
			})
		},
		/**
		 * 点击返回上一级
		 */
		// goBack() {
		// 	this.$router.push('./meteorological');
		// },
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
		play() {
			this.timer = setInterval(this.autoPlay, 5000);
		},
		/**
		 * 点击缩略图展示大轮播里面的图片
		 */
		changes(i) {	
			this.$refs.picImgs.setActiveItem(i);//这一步改变组件轮播的index值
			if(this.mark != i){
				this.mark = i;
				this.timer = null;
				clearInterval(this.timer);
//				this.timer = setInterval(this.autoPlay, 5000)				
			}else {			
				clearInterval(this.timer);	
			}
			clearInterval(this.timer);
		},
		/**
		 * 鼠标移入图片不动
		 */
		stop() {
			this.prevShow = true;
			this.nextShow = true;
			clearInterval(this.timer);
		},
		stops(){
			clearInterval(this.timer);
		},
		moves(){
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
		/**
		 * 点击上一张
		 */
		prevImg() {
			if(this.mark > 0) {
				this.mark--;
			} else {
				this.mark = 0;
			}
		},
		/**
		 * 点击下一张
		 */
		nextImg() {
			this.mark++;
			if(this.mark >= this.AlbumImageList.length) {
				this.mark = 0;
			}
		},		
	},
	created: function() {
		this.albumId = this.$route.query.albumId;
		this.imgName = this.$route.query.imgName;
		this.parentName = this.$route.query.parentName;
		this.specialName = this.$route.query.specialName;
		this.countryName = this.$route.query.countryName;
		
		if(this.$route.query.indexAlbum){
			this.mark = this.$route.query.indexAlbum;
		}else{
			this.mark = 0;
		}
		
		this.getAlbumList()
		this.widthAll = this.defaultLiWidth;
		this.play()
	}
}