import * as specialTourismApi from '@/api/api.js';

export default {
  data() {
    return {
		albumImageLists:[],//精彩图集第二张开始的后面所有
		ImageListOne:'',//精彩图集第一张
      scenicPointId: '', //接收从特色旅游点击传参景点id
      parentName: '', //接收从特色旅游点击传参一级导航名字
      countryName: '', //接收从特色旅游点击传参的分类下的景区名字，
      countryData: {
        landscapeName: '', //接收从特色旅游点击过来的景点名字
        landsDes: '', //接收从特色旅游点击过来的景点描述
        height: '' //
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
      group: 'meteorology', //评论的参数值
      start: 0, //评论的参数值
      size: 10, //评论的参数值
      page: 1, //评论页数
      total: 0, //总共的评论
      commends: [], //装评论的数据
      groups: '', //用来装从父级传过来的气象景观值
      indexNumCommend: false,
      mepredictionList: { //7天气预报的参数
        size: 7,
        start: 0,
      },

      //弹框
      BouncedBoxShade: false, //弹框显示判断
      AlbumImageList: [], //相册集合数据
      indexNum: 3, //默认选中第一张
      widthAll: '', //轮播的总宽度
      defaultLiWidth: 870,
      timer: null, //定时器
      mark: 0, //比对图片索引的变量
      prevShow: true, //鼠标移入是否显示左边箭头
      nextShow: true, //鼠标移入是否显示右边箭头
      specialName: '', //定义那一大类下面的分类文字名称
      indexs: 0, //默认文字内容描述为0
      imgName: '', //定义图集的名称
      hotLevel: 0,

    }
  },
  methods: {

    /**
     * 鼠标移入事件，给第一张图片添加类名
     */
    addNamefirst() {

      var divs = this.$refs.imgcovers;
      if (divs[0].classList.contains('movechildname')) {
        divs[0].classList.remove("movechildname");
      }
      divs[0].classList.add("addchildname");

    },
    /**
     * 鼠标移出，给第一张图片移出类名
     */
    reduNamefirst() {

      var divs = this.$refs.imgcovers;
      divs[0].classList.remove("addchildname");
      divs[0].classList.add("movechildname");
    },

    /**
     * 鼠标移入事件，给图片添加类名
     */
    addName(inde) {

      var divs = this.$refs.divs;
      if (divs[inde].classList.contains('mystyles')) {
        divs[inde].classList.remove("mystyles");
      }
      divs[inde].classList.add("mystyle");

    },
    /**
     * 鼠标移出，给图片移出类名
     */
    reduName(inde) {

      var divs = this.$refs.divs;
      divs[inde].classList.remove("mystyle");
      divs[inde].classList.add("mystyles");
    },

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
      var size = parseInt(this.size);
      size = val;
      this.size = size;
      this.getCommend();
    },
    /**
     * 获取到气象景观次级页面的数据
     */
    getChildCountryData() {
      specialTourismApi.apiFrontScenicPointInfo(
        this.scenicPointId
      ).then(res => {

        console.log(res, 'res============')
        this.hotLevel = res.body.hotLevel;
        this.countryData.landscapeName = res.body.name;
        this.countryData.landsDes = res.body.des;
        this.countryData.height = res.body.height;
        this.albumData = res.body.album;

        for (var i in res.body.album) {
			// 第一张图的封面
		this.ImageListOne = res.body.album[i].albumImageList[0].fileId;
		
          for (var j = 1; j < res.body.album[i].albumImageList.length; j++) {

			// 第二张开始显示的图片
			this.albumImageLists.push(res.body.album[i].albumImageList[j]);
			
          }


        //   var overName = true;

          // for(var j in res.body.album[i].albumImageList) {
          // 	if(res.body.album[i].albumImageList[j].des.length > 13) {
          // 		//console.log(res.body.album[i].albumImageList[j].name,'dayule ============')

          // 		overName = false;
          // 		res.body.album[i].albumImageList[j].overName = overName;

          // 	} else {

          // 		res.body.album[i].albumImageList[j].overName = overName;
          // 	}
          // }

        }

      }).catch(err => {
        console.log(err)
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
        this.commends = res.body.list;
        //				console.log(this.commends,'============================')
        this.total = parseInt(res.body.records);
      }).catch(err => {
        console.log(err, 'pinglun')
      })
    },
    /**
     * 【弹框】点击上一张
     */
    prevImg() {
      if (this.mark > 0) {
        this.mark--;
      } else {
        this.mark = 0;
      }
    },
    /**
     * 【弹框】点击下一张
     */
    nextImg() {
      this.mark++;
      if (this.mark >= this.AlbumImageList.length) {
        this.mark = 0;
      }
    },
    /**
     * 【弹框】鼠标移入图片不动
     */
    stop() {
      //   this.prevShow = true;
      //   this.nextShow = true;
      clearInterval(this.timer);
    },
    stops() {
      clearInterval(this.timer);
    },
    moves() {
      this.timer = setInterval(this.autoPlay, 5000);
    },
    /**
     * 【弹框】鼠标移出图片开始动
     */
    move() {
      //   this.prevShow = false;
      //   this.nextShow = false;
      this.timer = setInterval(this.autoPlay, 5000);
    },

    /**
     * 【弹框】点击缩略图展示大轮播里面的图片
     */
    changes(i) {
      this.$refs.picImgs.setActiveItem(i); //这一步改变组件轮播的index值
      if (this.mark != i) {
        this.mark = i;
        this.timer = null;
        clearInterval(this.timer);
        //this.timer = setInterval(this.autoPlay, 5000)				
      } else {
        clearInterval(this.timer);
      }
      clearInterval(this.timer);
    },
    /**
     * 【弹框】自动播放滚动图片
     */
    autoPlay() {
      this.mark++;
      if (this.mark === this.AlbumImageList.length) {
        this.mark = 0;
      }
    },
    /**
     * 【弹框】轮播图片播放
     */
    play() {
      this.timer = setInterval(this.autoPlay, 5000);
    },
    /**
     * 【弹框】组件轮播图片
     */
    activeFun(index) {
      this.indexs = index;
      this.mark = index;
    },
    pre() {
      this.$refs.picImgs.prev();
    },
    net() {
      this.$refs.picImgs.next();
    },
    /**
     * 【弹框】获取图片集的数据
     */
    getAlbumList(id) {
      specialTourismApi.apiFrontAlbumImageList(
        id
      ).then(res => {

        if (res.body.length <= 0) {
          this.BouncedBoxShade = false;
          return
        }
        this.AlbumImageList = res.body;
        this.BouncedBoxShade = true;
      }).catch(err => {
        console.log(err)
      })
    },

    /**
     * 点击更多跳转到图集数据
     */
    lookMorPictures(albumId, imgName) {

      this.BouncedBoxShade = true;
      this.imgName = imgName;
      this.getAlbumList(albumId); //调用【弹框】获取图片集的数据

    },

    /**
     * 点击单个图片后跳转到图集页面
     */
    jumpAlbum(albumId, index, imgName) {

      //this.BouncedBoxShade = true;
      this.imgName = imgName;
      this.getAlbumList(albumId); //调用【弹框】获取图片集的数据
      // this.$router.push({
      // 	path: './meteorologyatlas',
      // 	query: {
      // 		indexAlbum: index,
      // 		albumId: albumId,
      // 		imgName: imgName,
      // 		parentName: this.parentName,
      // 		countryName: this.countryName
      // 	}
      // })
    },

    /**
     * 返回上一级
     */
    goBack() {
      //this.$router.go(-1);
      var type = false;
      this.$router.push({
        path: '/meteorological',
        query: {
          names: this.$route.query.name,
          scenicPointIds: this.$route.query.scenicPointIds,
          index: this.$route.query.index,
          lat: this.$route.query.lat,
          lon: this.$route.query.lon,
          scenicClassId: this.$route.query.scenicClassId,
          latInde: this.$route.query.latInde,
          type: type
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
        //console.log(res.body,'===================')
        var that = this;
        if (!this.foreastList) {
          return;
        }
        this.foreastList.forEach(function (item, index) {

          item.dayImg = that.getWeather.getWeather(item.weather);
          item.nightImg = that.getNightImg.getNightImg(item.weather);

          var dates = item.date;
          that.datas.push(dates.substring(5, 10).split('-'));
          var dd = dates.replace(/-/g, "/").split(' ')[0]; //用来处理浏览器不识别2018-12-30这种日期格式
          var dts = new Date(dd); //用来处理星期几				
          if (dts.getDay() == 0) {
            item.dt = '周日';
          } else if (dts.getDay() == 1) {
            item.dt = '周一';
          } else if (dts.getDay() == 2) {
            item.dt = '周二';
          } else if (dts.getDay() == 3) {
            item.dt = '周三';
          } else if (dts.getDay() == 4) {
            item.dt = '周四';
          } else if (dts.getDay() == 5) {
            item.dt = '周五';
          } else if (dts.getDay() == 6) {
            item.dt = '周六';
          } else {
            console.log('错误')
          }
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created: function () {

    this.scenicPointId = this.$route.query.scenicPointIds;
    this.countryName = this.$route.query.name;
    this.groups = this.$route.query.group;

    if (this.$route.query.group == 'meteorology') {
      this.parentName = '气象景观';
    }

    this.getChildCountryData()
    this.getWeatherConditions()
    this.getWeatherForeast()
    this.getCommend()
  }
}
