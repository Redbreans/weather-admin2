export default {
	data() {
		return {
			urls: '',
			type:'',
			name:'',
			bannerInfoData: {}, //装推荐过来的数据
			imgUrl: this.getImgUrl.readImageUrl, //配置的全局图片url地址
			dataAvailable: false, //默认是没有数据的
			styles: {
				height: ''
			},
			paddingbottom: {
				paddingBottom: ''
			}
		}
	},
	watch: {
		dataAvailable(nv, ov) {

			var _this = this;
			if(nv == true) {
				setTimeout(function() {
					var wh = _this.$refs.routeRecommeds.clientHeight;
					_this.paddingbottom.paddingBottom = window.innerHeight - 105 - 280 - wh + 'px';

				}, 10)
			}
		}
	},
	methods: {
		getInfo() {
			this.$axios.get(this.urls).then(res => {
				
				if(res.data.length < 0 || res.data == undefined || res.data == '') {
					this.dataAvailable = false;
					return;
				}
				this.dataAvailable = true;
				this.bannerInfoData = res.data;
				//console.log(res.data, '哈哈哈哈哈哈哈请求详情')
			})
		},
		/**
		 * 返回上一级
		 */
		goBack() {
			this.$router.push({
				path: './'
			});
		}
	},
	created: function() {

		this.styles.height = window.innerHeight - 385 + 'px';
		this.urls = this.$route.query.urls;
		this.name = this.$route.query.name;
		

	},
	mounted() {
        this.getInfo();
		var _this = this;
		window.onresize = function windowResize() {

			_this.styles.height = window.innerHeight - 390 + 'px';
			_this.paddingbottom.paddingBottom = window.innerHeight - 390 + 'px';
		

		}
		
	}
}