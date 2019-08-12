import * as footerApi from '@/api/api.js'
/**
 * footer部分
 */
export default {
	data() {
		return {
			friendLinks: [], //友情链接的数据
			FilingInformationList: {
				createTimeBegin: '',
				createTimeEnd: '',
				size: 20,
				sortField: '',
				sortType: '',
				start: 0,
				state: null,
				title: '',
				typeCode: 'filing',
				typeId: '',
				updateTimeBegin: '',
				updateTimeEnd: ''
			},
			goTops: false,
			scrollTop: '', //默认的滚动条滚动高度
			contents: '', //备案信息
			imgUrl: this.getImgUrl.readImageUrl, //配置的全局图片url地址
			smallProgramCode:'',//小程序的图片
			publicNumbeCode:'',//公众号的图片
		}
	},
	methods: {
		/**
		 * 获取友情链接的数据
		 */
		getFriendLink() {
			footerApi.apiFrontLinkList(
				this.FilingInformationList.size,
				this.FilingInformationList.start
			).then(res => {
				this.friendLinks = res.body.list;
				//				console.log(res,'1111111111111111')
			}).catch(err => {
				console.log(err, '错误了')
			})
		},
		/**
		 * 获取备案信息
		 */
		getFILingInformation() {
			footerApi.apiAdminFilingInformationList(
				this.FilingInformationList.createTimeBegin,
				this.FilingInformationList.createTimeEnd,
				this.FilingInformationList.size,
				this.FilingInformationList.sortField,
				this.FilingInformationList.sortType,
				this.FilingInformationList.start,
				this.FilingInformationList.state,
				this.FilingInformationList.title,
				this.FilingInformationList.typeCode,
				this.FilingInformationList.typeId,
				this.FilingInformationList.updateTimeBegin,
				this.FilingInformationList.updateTimeEnd
			).then(res => {

//				this.getInformation(res.body[0].articleId, res.body[0].queryCode);
                this.getInformation();

			}).catch(err => {
				console.log(err, '错误')
			})
		},
		/**
		 * 获取备案详细信息
		 */
		getInformation(id, queryCode) {
			//apiFrontPlatformConfigInfo
			footerApi.apiFrontPlatformConfigInfo({}).then(res => {
				//console.log(res,'-----------------')
				this.contents = res.body.archivalInformation;//获取备案信息
				//smallProgramCode--publicNumbeCode
				this.smallProgramCode = res.body.smallProgramCode;
				this.publicNumbeCode = res.body.publicNumbeCode;

			}).catch(err => {
				console.log(err, '错误了')
			})
		},
		/**
		 * 滚动条数据
		 */
		handleScroll() {
			//this.$nextTick(()=>{})
			var scrollTops = document.documentElement.scrollTop || document.body.scrollTop;
			this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
			//变量windowHeight是可视区的高度
			var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
			//变量scrollHeight是滚动条的总高度
			var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

			if(this.scrollTop > 750) {
				this.goTops = true;
			} else {
				this.goTops = false;
			}

		},
		/**
		 * 点击回到顶部
		 */
		goToTop() {

			var timer = null;
			timer = setInterval(function() {
				
				let osTop = document.documentElement.scrollTop || document.body.scrollTop;
				let ispeed = Math.floor(-osTop / 5) ;
				document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed ;
				if(osTop === 0) {
					clearInterval(timer);
				}
			}, 50)

		}

	},

	created: function() {

		this.getFriendLink()
		this.getFILingInformation()

	},
	mounted: function() {
		/**
		 * 监听滚动条滚动
		 */
		window.addEventListener('scroll', this.handleScroll)
	},

}