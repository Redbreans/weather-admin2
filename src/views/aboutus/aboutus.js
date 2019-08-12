import * as specialTourismApi from '@/api/api.js';
export default {
  data() {
    return {

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
  watch: {
    dataAvailable(nv, ov) {

      var _this = this;
      // if (nv == true) {
      //   setTimeout(function () {
      //     var wh = _this.$refs.routeRecommeds.clientHeight;
      //     _this.paddingbottom.paddingBottom = window.innerHeight - 100 - 280 - wh + 'px';

      //   }, 10)
      // }
    }
  },
  methods: {
    getRecommedData() {
      var _this = this;

      let articleId = null;
      let queryCode = 'aboutUs';
      specialTourismApi.apiFrontAboutUsCmsArticleInfo(articleId,queryCode).then(res => {
		  
        _this.routerData = res.body;
        // console.log(_this.routerData,'!!!!!!!!!')

      }).catch(err => {
        console.log(err)
      })
    }
  },
  created: function () {

    // this.styles.height = window.innerHeight - 390 + 'px';
    // console.log(this.styles.height, 'this.paddingbottom.paddingbottom')
    this.getRecommedData();

  },
  mounted() {

    // var _this = this;
    // window.onresize = function windowResize() {

    //   _this.styles.height = window.innerHeight - 390 + 'px';
    //   _this.paddingbottom.paddingBottom = window.innerHeight - 390 + 'px';
    //   //console.log(_this.styles.height,'==========')

    // }
  }
}
