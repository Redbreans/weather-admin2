import * as specialTourismApi from '@/api/api.js';
export default {
	data() {
		return {
			articleId: '',
			typeCode: '',
			routerData: {}, //装推荐过来的数据
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
	watch:{
		dataAvailable(nv,ov){
			
			var _this = this;
			if(nv == true){			
			   setTimeout(function(){		   	
			   	var wh = _this.$refs.routeRecommeds.clientHeight;		   	
			   	_this.paddingbottom.paddingBottom=  window.innerHeight-105-280-wh +'px';
			   			   	
			   },10)
			}
		}
	},
	methods: {
		getRecommedData() {
			specialTourismApi.apiAdminRouterRecommendationInfo(
				this.articleId,
				this.typeCode
			).then(res => {
				//console.log(res,'=====================')
				if(res.body.length < 0 || res.body == undefined || res.body == '') {
					this.dataAvailable = false;
					return;
				}
				this.routerData = res.body;
				this.dataAvailable = true;
			
			}).catch(err => {
				console.log(err)
			})
		},
		/**
		 * 返回上一级
		 */
		goBack(){
			this.$router.push({path:'./'});
		}
	},
	created: function() {
		
		this.styles.height = window.innerHeight - 390 + 'px';
		this.articleId = this.$route.query.articleId;
		this.typeCode = this.$route.query.typeCode;

		this.getRecommedData()
	},
	mounted() {
		
		var _this = this;
		window.onresize = function windowResize() {
			
			_this.styles.height = window.innerHeight - 390 + 'px';
			_this.paddingbottom.paddingBottom = window.innerHeight - 390 + 'px';
			//console.log(_this.styles.height,'==========')

		}
	}
}