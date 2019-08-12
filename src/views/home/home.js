import * as specialTourismApi from '@/api/api.js';
import public_index1 from "@/assets/images/public_index1.png";
import public_local from "@/assets/images/public_local.png";

//gif
import public_local_big from "@/assets/images/gif.gif";
import public_icon_warning1 from "@/assets/images/public_icon_warning1.png"; //红色高亮--交通气象
import public_icon_warning2 from "@/assets/images/public_icon_warning2.png"; //黄色--交通气象

import homepage_warngalerainstorm from "@/assets/images/homepage_warngalerainstorm.png";
import homepage_warning_rainstorm from "@/assets/images/homepage_warning_rainstorm.png";

import {
  TMap
} from '@/TMap.js';
/*
 *首页
 */
export default {
  //	inject:['reload'],//注入依赖
  data() {
    return {
      lang: this.$i18n.locale,
      noticeList: [],
      warningNumber: 0, //预警的数量
      tourismShow: 0, //定义特色旅游推荐的延时加载
      count: 0, //定义特色旅游加载的数据
      testshow: 0, //定义旅游推荐的延时加载
      counts: '', //定义旅游推荐加载的数据
      scrollTop: 0, //默认的滚动条滚动高度
      scrollTopS: 0, //默认的底部滚动条高度
      rates: 0, //定义特色旅游与滚动的高度比例
      rate: 0, //定义特色推荐与滚动高度的比例
      scrollHeight: '', //
      windowHeight: '', //可视区域的高度
      lookmore: 0, //点击查看更多样式
      indexs: 0,
      futureDetail: ['景区', '天气情况', '气温', '旅游推荐指数'],
      imgUrl: this.getImgUrl.readImageUrl, //配置的全局图片url地址
      readdownload: this.getImgUrl.readdownload, //配置的全局图片url地址
      specialRecommendData: [], //需要轮播的图片数据
      mark: 0, //比对图片索引的变量
      timer: null, //定时器
      marginLeft: 0, //默认的margin左边值
      width: 200, //默认的轮播的ul宽度
      marginIndex: 0, //默认轮播移动的位置从0开始
      changePrev: false, //点击上一张
      changeNet: false, //点击下一张
      group: 'meteorology', //请求气象景观的数据
      groups: 'travel', //请求特色旅游图片的数据
      size: 30,
      start: 0,
      RecommendData: { //----------旅游线路推荐-------------推荐的数据
        createTimeBegin: '',
        createTimeEnd: '',
        size: -1,
        sortField: '',
        sortType: '',
        start: -1,
        state: null,
        title: '',
        typeCode: 'travel-recommendation',
        typeId: '',
        updateTimeBegin: '',
        updateTimeEnd: '',
      },
      num: 0,
      trafficData: [], //用来装交通气象国道里面的数据
      trafficIndex: 0, //默认显示第一个国道数据
      trafficScenicRadId: '', //默认显示第一个国道数据的id值
      map: {}, //地图
      markers: [], //用来装标记的数据
      targetType: 'road', //国道对应的道路数据类型
      conditionData: [], //天气实况的数据
      heights: '', //默认的第一个海拔高度
      roadKeyNames: '', //默认的第一个道路名字
      listData: { //获取交通气象的国道数据的参数值
        sortField: '',
        sortType: ''
      },
      latDefault: 32.50, //默认的纬度----中心点
      lonDefault: 102.50, //默认的经度---中心点
      touristDatas: [], //获取特色旅游推荐的数据
      specialName: '',
      /**
       * 旅游天气
       */
      isHomeShow: 1, //景区评级
      scenicAreaId: 0, //【景区列表】景区评级id	
      nameShowData: [], //装名字的新数组
      group: 'meteorology', //分组,meteorology:气象景观;travel:特色旅游	
      indexName: [], //名称切换name
      homeId: '', //名称切换id
      scenicMap: {}, //地图
      maps: {}, //定义交通实况的地图

      attractionsData: { //景点名字分类数据——type=scenicSpot
        scenicAreaId: '', // 景区评级id	
        size: 20, // 数量	
        sortField: '', // 排序字段	
        sortType: '', // 排序类型	
        start: 0, // 开始位置	

      },
      attractionsDatas: { //景点名字分类数据——type=attractions
        group: 'meteorology', // 分组: meteorology:气象景观;travel:特色旅游	
        scenicClassId: '', // 分类id	
        size: 20, // 数量	
        start: 0, // 开始位置	
      },
      attractionsListData: [], //景点名字分类数据
      clickName: '', //点击标记返回的名字数据
      targetId: '', //点击标记返回的id数据
      WeatherFactData: [], //天气实况返回的数据
      WeatherFactList: {
        targetType: null, //天气实况上传的类型初始值
      },
      moveName: '', //鼠标移入名字
      hoursForecastData: [], //24小时天气预报返回的数据
      hoursForecastList: {
        scenicAreaType: 'scenicArea', //24小时天气预上传的初始值——景区
        scenicType: 'scenic', //24小时天气预上传的初始值——景点
      },
      hotLevels: [], //景区列表返回的几颗星的数据
      publicImg: [], //星星图片

      advertList: { //广告的参数值
        positions: 'home',
        size: 10,
        start: 0
      },
      adertData: [], //用来装广告的数据
      notices: { //获取顶部通知消息的数据
        isShow: 1,
        showType: "textInfo",
        type: "show"
      },
      warninginfo: { //获取顶部通知消息的数据
        isShow: 1,
        showType: "warningInfo",
        type: "fileDownload"
      },

      noticeData: [], //装预警的数据
      hiddenNotice: false, //隐藏通知栏
      Idss: '', //评级点击名字的id
      homeName: '', //首页默认第一个景区名字
      homeId: '', //首页默认第一个景区id
      highLightMarker: undefined, //高亮标记点
      highLightMarkers: undefined, //定义交通实况的高亮图标标记
      highLightMarkerLabel: undefined, //定义文字高亮
      highLightMarkerLabels: undefined, //定义交通实况的文字高亮标记
      markerLabelLable: [], //标记文本的push数据
      markerLabelLables: [], //定义标记文本的push数据--交通实况的数据u

      /**
       * 走马灯
       */
      marqueePace: 1, //滚动速度
      marqueeDistance: 0, //初始滚动距离
      orientation: 'left', //滚动方向
      interval: 20, // 时间间隔
      color: "", //通知栏字体颜色
      len: 0, //获取的文字总长度
      width: 1117, //需要轮播的那个大盒子的宽度
      colors: [], //用来装顶部消息的颜色值
      fileIds: [], //用来装顶部消息的id值
      intervals: null, //定时器,

      warningList: { //预警的参数值
        size: 30,
        strat: 0,
        id: '',
        type: 'road'
      },
      wanrginName: [], //用来装预警信息的数据
      markerS: [], //用来装大风，预警的标记
      scenicMarkers: [], //列表_标记点_的数据 
      mouseMarkers: [], //用来装景区天气地图的所有标记集合
      flages: true, //鼠标移入第一次判断天气实况效果
      nulls: true, //判断实况是否有数据而需要渲染的数据
      condiflag: true, //交通实况的鼠标移入的效果
      condnull: true, //判断实况是否有数据需要渲染的数据
      hightindex: '', //定义右侧鼠标移入的时候监听标记的index值，如果index值和标记的index值相等的话，就可以添加高亮
      latlngList: [], //再次定义景区天气地图的所有标记
      markerLabel: [], //装景区天气地图所有标记文字集合
      polylineArr: [],
      noticeList: {
        isShow: 1,
        showType: null,
        type: null
      },
      noticeListData: [], //走马灯的数据
      thisLength: 0,
      zmBus: {},
      showTime: 0, //banner轮播时间

    }

  },
  computed: {

  },
  components: {},
  methods: {

    getUrlConent(item, name) {

      this.$axios.get(item).then(res => {

        if (res.data.length <= 0 || res.data == undefined || res.data == '' || res.data.body == '') {
          return;
        }

        if (res.data.indexOf('<!DOCTYPE html>') == 0) {
          return;
        }
        this.$router.push({
          path: './bannerimg',
          query: {
            urls: item,
            name: name
          }
        })
      })
    },
    //开始移动v
    getMove() {
      var count = 0;
      this.zmBus = document.getElementsByClassName("contentPmd")[0];

      //			if(!this.hiddenNotice){
      //				return;
      //			}
      var _this = this;
      //   var dd = null;
      var dd = setInterval(function start() {
        count += 1;
        if (_this.thisLength != 0) {
          _this.zmBus.style.transform = "translate" + "(" + -count + "px)";
          if (count == parseFloat(_this.thisLength).toFixed(0)) {
            count = 0;

            _this.zmBus.style.transform = "translate" + "(" + -count + "px)";
          }
        }

      }, 50)

    },
    //开始移动j
    //为何拿不到zmBus这个div元素！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
    getZmbuslength() {

      var _this = this;
      var zmWrapper = document.getElementsByClassName("contentPmd")[0];
      //console.log(zmWrapper,'zmWrapper')
      if (!this.hiddenNotice) {
        return;
      }
      this.zmBus = zmWrapper.firstChild;
      var zmBus = window.getComputedStyle(_this.zmBus, null);
      this.thisLength = zmBus.width;
      //	console.log(this.thisLength)

    },
    /**
     * 从新获取走马灯的数据  2019-01-09   11：18
     */
    getNoticeList() {
      specialTourismApi.apiFrontNoticeList(
        this.noticeList.isShow,
        this.noticeList.showType,
        this.noticeList.type
      ).then(res => {
        //console.log(res, '========================')
        if (res.body.length > 0) {
          this.hiddenNotice = true;
        }
        this.noticeListData = res.body;

      }).catch(err => {
        console.log(err)
      })
    },
    /**
     * 通知模块====鼠标移入停止滚动
     */
    stop: function () {
      //停止定时器
      clearInterval(this.intervals);
    },
    /*
     *通知消息模块===
     * 首页走马灯的效果
     */
    run() {

      var that = this;
      that.intervals = setInterval(function () {

        if (-that.marqueeDistance < that.len) {

          that.marqueeDistance = that.marqueeDistance - that.marqueePace;
          //console.log(that.marqueeDistance,'marqueeDistance')
        } else {

          clearInterval(that.interval);
          that.marqueeDistance = that.width;

          // that.run();
        }
        that.margins();
      }, that.interval);

    },
    /**
     * 顶部通知_点击预警通知为下载
     */
    toDownload(index, item) {
      // console.log(index, item, '===========')
      //			if(index > this.warningNumber) {
      //				return
      //			} else {
      //				for(var i = 0; i <= this.warningNumber - 1; i++) {
      //					if(index == i) {						
      //						window.location.href = this.readdownload + this.fileIds[i]
      //					}
      //				}
      //			}
      if (item.type == 'fileDownload') {
        window.location.href = this.readdownload + item.fileId;
      }

    },
    /**
     * 给需要轮播的那个大盒子动态的设置移动的left值
     */
    margins() {
      return {
        'left': this.marqueeDistance + 'px',
      }
    },
    /**
     * 改变通知的字体颜色
     */
    noticeColor(item) {

      if (item.color != '#FFFFFF') {
        return {
          color: item.color,
          cursor: 'pointer'
        }
      }
      return {
        color: item.color,
        cursor: 'default'
      }
    },
    /**
     * 顶部通知_数据列表
     */
    homeNotificationList() {

      var type = 'fileDownload';
      if (type == 'fileDownload') {
        var showtype = 'warningInfo'
        specialTourismApi.apiFrontNoticeList(
          this.notices.isShow,
          showtype,
          type
        ).then(res => {

          var content = []; //获取所有的消息内容
          var color = []; //获取消息内容对应的颜色值
          var fileId = []; //获取消息内容对应的id值
          for (var i in res.body) {

            content = content.concat("预警:" + res.body[i].content);
            color = color.concat(res.body[i].color);
            fileId = fileId.concat(res.body[i].fileId);
          }

          this.warningNumber = res.body.length;

          specialTourismApi.apiFrontNoticeList(
            this.notices.isShow,
            this.notices.showType,
            this.notices.type
          ).then(res => {

            for (var i in res.body) {

              content = content.concat("通知:" + res.body[i].content);
              color = color.concat(res.body[i].color);
              fileId = fileId.concat(res.body[i].fileId);
            }
            this.noticeData = content; //获取所有的消息内容

            if (this.noticeData != '') {
              this.hiddenNotice = true;
            }
            this.colors = color; //获取消息内容对应的颜色值
            //console.log(this.colors,'颜色值')
            this.fileIds = fileId; //获取消息内容对应的id值
            //计算消息内容的总长度
            for (var i in this.noticeData) {
              this.len += this.noticeData[i].length * 16;
            }
            this.len = this.len - this.width;
            this.run();
            //console.log(this.fileIds,this.len, '===============')

          }).catch(err => {
            console.log(err)
          })

        }).catch(err => {
          console.log(err)
        })
      }
    },
    /**
     * 景区评级列表
     */
    ScenicSpotRatingList() {

      let _this = this;
      specialTourismApi.apiFrontScenicAreaLevelList(
        _this.isHomeShow
      ).then(res => {
        let leveName = '';
        _this.scenicAreaId = res.body[0].scenicLevelId;

        for (var i = 0; i < res.body.length; i++) {
          //					if(res.body[i].name == "AAAAA") {
          //						leveName = "5A景区";
          //					} else if(res.body[i].name == "AAAA") {
          //						leveName = "4A景区";
          //					} else if(res.body[i].name == "AAA") {
          //						leveName = "3A景区";
          //					} else {}
          _this.nameShowData.push({
            //						name: leveName,
            name: res.body[i].name,
            id: res.body[i].scenicLevelId,
            type: 'scenicSpot'
          })
        }

        _this.scenicClassList(); //景点分类列表
        _this.attractionsList(_this.scenicAreaId, 'scenicSpot'); //调用景区列表数据/景点列表数据

      }).catch(err => {
        console.log(err);
      })
    },

    /**
     * 景点分类列表
     */
    scenicClassList() {
      specialTourismApi.apiFrontScenicClassList(
        this.group,
        this.isHomeShow
      ).then(res => {

        for (var i = 0; i < res.body.length; i++) {
          this.nameShowData.push({
            name: res.body[i].name,
            id: res.body[i].scenicClassId,
            type: 'attractions'
          })
        }

        this.attractionsList('', 'attractions'); //调用景区列表数据/景点列表数据

      }).catch(err => {
        console.log(err);
      })
    },
    /**
     * 景区列表数据/景点列表数据
     */
    attractionsList(ids, types) {
      if (ids == '') {
        return;
      }

      //清除地图上的marker标记
      this.scenicClearOverlays(this.scenicMarkers);

      let _this = this;

      //景区列表数据
      if (types == "scenicSpot") {

        specialTourismApi.apiFrontScenicAreaList(
          ids,
          this.attractionsData.size,
          this.attractionsData.sortField,
          this.attractionsData.sortType,
          this.attractionsData.start
        ).then(res => {

          _this.attractionsListData = [];

          if (res.body != null && res.body.length > 0) {

            this.homeName = res.body[0].name;
            this.homeId = res.body[0].scenicAreaId;

            for (var i = 0; i < res.body.length; i++) {

              _this.attractionsListData.push({
                name: res.body[i].name,
                id: res.body[i].scenicAreaId,
                lat: res.body[i].lat,
                lon: res.body[i].lon,
                idss: res.body[i].scenicLevelId,
                index: i,
                type: _this.hoursForecastList.scenicAreaType,
                minTemperature: res.body[i].minTemperature,
                maxTemperature: res.body[i].maxTemperature,
                weather: res.body[i].weather,
                hotLevel: res.body[i].hotLevel,
              })

            }

            let flage = true;
            if (flage) {
              let WeatherFactId = res.body[0].scenicAreaId;
              let names = res.body[0].name;

              _this.scenicMapMark(_this.attractionsListData); //调用地图标记方法
              _this.weatherDetailMove(WeatherFactId, names); //调用天气实况详情数据
              _this.weatherDetails(WeatherFactId, names, _this.hoursForecastList.scenicAreaType); //调用24天气预报数据_景区

              _this.flage = false;
            }

          }
        }).catch(err => {
          console.log(err);
        })

        // 景点列表数据
      } else if (types == "attractions") {

        specialTourismApi.apiFrontScenicPointList(
          this.attractionsDatas.group,
          ids,
          this.attractionsDatas.size,
          this.attractionsDatas.start
        ).then(res => {

          _this.attractionsListData = [];

          if (res.body != null && res.body.length > 0) {
            this.homeName = res.body[0].name;
            this.homeId = res.body[0].scenicPointId;

            for (var i = 0; i < res.body.length; i++) {
              _this.attractionsListData.push({
                name: res.body[i].name,
                id: res.body[i].scenicPointId,
                lat: res.body[i].lat,
                lon: res.body[i].lon,
                idss: res.body[i].scenicLevelId,
                index: i,
                type: _this.hoursForecastList.scenicType,
                minTemperature: res.body[i].minTemperature,
                maxTemperature: res.body[i].maxTemperature,
                weather: res.body[i].weather,
                hotLevel: res.body[i].hotLevel,
              })

            }
          }

          let flage = true;
          if (flage) {
            let WeatherFactId = res.body[0].scenicPointId;
            let names = res.body[0].name;

            _this.scenicMapMark(_this.attractionsListData); //调用地图标记方法
            _this.weatherDetailMove(WeatherFactId, names); //调用天气实况详情数据
            _this.weatherDetails(WeatherFactId, names, _this.hoursForecastList.scenicType); //调用24天气预报数据_景点

            _this.flage = false;
          }

        }).catch(err => {
          console.log(err);
        })
      }

      // _this.scenicMapMark(this.attractionsListData); //调用地图标记方法

    },
    /**
     * 点击名字分类切换
     */
    switchName(id, type, index) {

      this.scenicClearOverlays(this.scenicMarkers); //点击景区天气分类名字时需要清除地图上面的标记
      this.scenicClearOverlays(this.mouseMarkers); //点击景区天气分类名字时需要清除地图上面的标记
      this.scenicClearOverlays(this.markerLabelLable); //点击景区天气分类名字时需要清除地图上面的标记
      this.flages = true;
      this.homeId = id;
      this.indexName = index;
      this.attractionsList(id, type); //景区列表数据/景点列表数据
      this.moveName = '';

    },
    /**
     * 点击名字跳转至景区天气相对应的名字页面
     */
    clickNameJump(id, name, idss, type, jump) {

      if (type == 'scenicArea') {
        this.$router.push({
          path: '/scenicspot',
          query: {
            homeClickName: name,
            homeWeatherId: id,
            homeIdss: idss,
            jumpee: 0
          }
        })
      } else if (type == 'scenic') {

        this.$router.push({
          path: '/meteorologicalsecondary',
          query: {
            name: name,
            scenicPointIds: id,
            group: 'meteorology',

          }
        })
      }

    },
    /**
     * 点击更多景区跳转至景区天气页面
     */
    clickScenicSpotJump() {
      this.$router.push({
        path: '/scenicspot'
      })
    },
    /**
     * 鼠标点击事件(右侧的数据)
     */
    weatherDetails(id, name, type) {
      this.targetId = id;
      this.clickName = name;
      this.hoursForecast(id, type); //调用24小时天气预报列表数据方法
    },
    /**
     * 当天24小时天气预报列表数据
     */
    hoursForecast(id, type) {
      this.hoursDates = [];
      this.temperatures = [];

      specialTourismApi.apiFrontMePredictionNowList(
        id,
        type
      ).then(res => {
        this.hoursForecastData = res.body.list;

      }).catch(err => {
        console.log(err);
      })
    },

    /**
     * 鼠标移入事件
     */
    weatherDetailMove(id, name) {

      this.moveName = name;
      this.WeatherFact(id); //调用天气实况详情数据方法
    },
    /**
     * 天气实况详情数据
     */
    WeatherFact(id) {

      var _this = this;
      specialTourismApi.apiFrontMeLiveInfo(
        id,
        this.WeatherFactList.targetType
      ).then(res => {

        _this.WeatherFactData = [];
        _this.flages = true; //定义是否添加上类名，如果为true的话，则加上类名，有动态的css效果

        if (res.body.targetType === 'scenicArea' || res.body.targetType === 'scenic') {
          _this.WeatherFactData = res.body;
          _this.nulls = true; //定义‘暂无实况数据是否显示，如果为true的话，显示出来

        } else {
          _this.nulls = false; //如果为false的话，隐藏
        }

      }).catch(err => {
        console.log(err);
      })
    },
    /**
     * 标记清空
     */
    scenicClearOverlays(overlayss) {
      var overlay;
      while (overlay = overlayss.pop()) {
        overlay.setMap(null);
      }
    },
    /**
     * 鼠标移入改变左侧地图图标的样式
     */
    changeattractions(items) {
      this.flages = false; //鼠标移入的时候，将显示动画的类名变为fasle;
      this.hightindex = items.index;

      this.targetId = items.id; //用来给当前的景点加上class类名
      this.moveName = items.name;
      var _this = this;
      setTimeout(function () {
        //_this.weatherDetailMove(item.id, item.name);
        _this.WeatherFact(items.id); //实况的数据
      }, 1000);

    },
    /**
     * 旅游天气====地图标记点添加
     */
    scenicMapMark(latlngs) {
      var map = this.scenicMap;

      //标记添加提示窗
      var infoWin = new qq.maps.InfoWindow({
        map: map
      });

      latlngs.forEach((item, index) => {

        var cssCone = {
          color: "black",
          fontSize: "14px",
          fontWeight: "bold",
          backgroundColor: 'transparent',
          border: 'none'
        };

        let icon;
        //自定义标记的图标样式
        let bigImageOptions = {
          size: new qq.maps.Size(40, 64), //自定义图片大小
          origin: new qq.maps.Point(0, 0), //显示区域
          anchor: new qq.maps.Point(27, 50), //坐标点
        };
        let smallImageOptions = {
          size: new qq.maps.Size(29, 36),
          origin: new qq.maps.Point(0, 0),
          anchor: new qq.maps.Point(20, 44),
        };

        // 判断标记高亮样式 
        if (index == 0) {
          icon = new qq.maps.MarkerImage(public_local_big, bigImageOptions.size, bigImageOptions.origin, bigImageOptions.anchor);
          cssCone = {
            color: "black",
            fontSize: "20px",
            fontWeight: "bold",
            backgroundColor: 'transparent',
            border: 'none'
          };
        } else {
          icon = new qq.maps.MarkerImage(public_local, smallImageOptions.size, smallImageOptions.origin, smallImageOptions.anchor);
        }

        // 标记点
        var latlng = new qq.maps.LatLng(item.lat, item.lon);
        var marker = new qq.maps.Marker({
          position: latlng,
          map: map,
          icon: icon,
          index: index
        });

        // 标记标注文字
        var markerLabel = new qq.maps.Label({
          position: latlng,
          map: map,
          style: cssCone,
          offset: new qq.maps.Size(10, -30, 15),
          content: item.name
        });

        //判断标记高亮样式赋值
        if (index == 0) {
          this.highLightMarker = marker;
          this.highLightMarkerLabel = markerLabel;
        }

        this.scenicMarkers.push(marker, markerLabel); //清除maker，位置不要动
        this.mouseMarkers.push(marker);
        this.markerLabelLable.push(markerLabel);

        // 标记点击事件   
        var _this = this
        qq.maps.event.addListener(marker, 'click', function () {
          var jumps = 0; //定义是否是跳转过去的
          infoWin.setPosition(latlng);
          _this.weatherDetails(item.id, item.name, item.type);
          _this.clickNameJump(item.id, item.name, item.idss, item.type, jumps);

          if (_this.highLightMarker) {
            _this.highLightMarker.setIcon(new qq.maps.MarkerImage(public_local, smallImageOptions.size, smallImageOptions.origin, smallImageOptions.anchor));
          }
          _this.highLightMarker = marker;
          marker.setIcon(new qq.maps.MarkerImage(public_local_big, bigImageOptions.size, bigImageOptions.origin, bigImageOptions.anchor));

        });
        // 标记鼠标移入事件  
        qq.maps.event.addListener(marker, 'mouseover', function (event) {

          _this.targetId = item.id; //用来给当前的景点加上class类名					
          _this.flages = false;
          setTimeout(function () {
            _this.weatherDetailMove(item.id, item.name);
          }, 1000);

          for (var i = 0; i < _this.mouseMarkers.length; i++) {
            //用来判断，当前移入的地图标记是否和右侧移入景区名字显示的地图标记是否是同一个高亮，如果不是的话，就将其他的标记换成非高亮的标记，反之，亦然。
            if (marker.index !== _this.mouseMarkers[i].index) {
              _this.mouseMarkers[i].setIcon(new qq.maps.MarkerImage(public_local, smallImageOptions.size, smallImageOptions.origin, smallImageOptions.anchor));

            }
          }

          if (_this.highLightMarker) {
            //把之前的高亮换成非高亮的标记
            _this.highLightMarker.setIcon(new qq.maps.MarkerImage(public_local, smallImageOptions.size, smallImageOptions.origin, smallImageOptions.anchor));
            _this.highLightMarkerLabel.setStyle({
              color: 'black',
              fontSize: '14px',
              fontWeight: 'bold',
              backgroundColor: 'transparent',
              border: 'none'
            });
          }
          //把当前移入的标记换成高亮状态
          _this.highLightMarker = marker;
          marker.setIcon(new qq.maps.MarkerImage(public_local_big, bigImageOptions.size, bigImageOptions.origin, bigImageOptions.anchor));

          for (var i = 0; i < _this.markerLabelLable.length; i++) {

            if (item.name == _this.markerLabelLable[i].content) {
              _this.markerLabelLable[i].setStyle({
                color: 'black',
                fontSize: '20px',
                fontWeight: 'bold',
                backgroundColor: 'transparent',
                border: 'none'
              })
            } else {
              _this.markerLabelLable[i].setStyle({
                color: 'black',
                fontSize: '14px',
                fontWeight: 'bold',
                backgroundColor: 'transparent',
                border: 'none'
              })
            }
          }
        });
      })
    },
    /**
     * 地图区域_覆盖块
     */
    MapRegions(scenicAreaName, scenicMapLists) {

      let colorMap = {
        "黑水县": "#D7F795",
        "阿坝县": "#F9F7C7",
        "红原县": "#B3CBF9",
        "金川县": "#D7F795",
        "马尔康市": "#F9F795",
        "茂县": "#F9F7C7",
        "壤塘县": "#D7F795",
        "若尔盖县": "#D7F7C7",
        "松潘县": "#D7F7F9",
        "汶川县": "#F9F795",
        "小金县": "#F9F7C7",
        "九寨沟县": '#AFDFC9',
        "理县": '#CBFBFB',
      }
      let color = colorMap[scenicAreaName];
      if (!color) {
        color = "#f0f0f0";
      }
      let qq = this.qq;
      var polygon = new qq.maps.Polygon({
        path: scenicMapLists,
        map: this.scenicMap,
        strokeColor: '#f73d24',
        strokeWeight: 1,
        fillColor: color,
        fillOpacity: 0.35, //填充透明度  
        strokeOpacity: 0.35, //线透明度   
      });
    },

    /**
     * 地图列表
     */
    scenicMapList() {
      specialTourismApi.apiFrontScenicMapListAll({}).then(res => {

        for (var i = 0; i < res.body.length; i++) {

          let scenicMapLists = [];
          let scenicAreaName = res.body[i].name;
          // 判断是否是数组
          let scenicPoints;
          try {

            scenicPoints = JSON.parse(res.body[i].points);

          } catch (e) {
            console.error(e);
          }
          if (!scenicPoints) {
            continue;
          }
          for (var j = 0; j < scenicPoints.length; j++) {
            let point = scenicPoints[j];
            if (point.latitude && point.longitude) {
              scenicMapLists.push(new qq.maps.LatLng(point.latitude, point.longitude));
            }
          }
          this.MapRegions(scenicAreaName, scenicMapLists);
        }

      }).catch(err => {
        console.log(err)
      })
    },
    /**
     * 地图_创建一个地图的实例-----景区部分的地图
     */
    tourismWeatherCreateMap() {
      var citylocation, scenicMap, marker = null;
      var center = new qq.maps.LatLng(32.50, 102.50);
      var city = document.getElementById("city");
      var _this = this;
      var sw = new qq.maps.LatLng(32.57872, 105.23560); //东北角坐标  31.17471 100.39612       31.73234 100.52795   30.47658 100.36316
      var ne = new qq.maps.LatLng(32.57872, 100.13245); //西南角坐标30.50971 99.75342  33.17845 103.85132
      var latlngBounds = new qq.maps.LatLngBounds(ne, sw);
      _this.scenicMap = new qq.maps.Map(document.getElementById("mapSiteBox"), {
        center: center,
        zoom: 8,
        minZoom: 7, //minZoom设置地图最小的缩放级别
        maxZoom: 8, //maxZoom设置地图最大的缩放级别
        boundary: latlngBounds,
        panControl: false, //平移控件的初始启用/停用状态。      
        zoomControl: false, //缩放控件的初始启用/停用状态。
        scaleControl: false, //滚动控件的初始启用/停用状态。
        //draggable: false, //如果为 false，则禁止拖动地图。默认情况下启用拖动

      });

      //添加地图监听事件 如果位置改变 则触发函数 resetBounds
      qq.maps.event.addListener(_this.scenicMap, 'bounds_changed', function () {

        var bounds = _this.scenicMap.getBounds(); //获取函数范围
        if (bounds) { //如果得到函数范围值
          //					west_north.innerHTML = //西北角的坐标值
          //						'[' + bounds.getNorthEast().getLat().toFixed(5) +
          //						', ' + bounds.getNorthEast().getLng().toFixed(5) + ']';
          //					eash_south.innerHTML = //东南角的坐标值
          //						'[' + bounds.getSouthWest().getLat().toFixed(5) +
          //						', ' + bounds.getSouthWest().getLng().toFixed(5) + ']';
        }
      });

    },

    /**
     * 鼠标移入事件，给特色旅游图片添加类名
     */
    addName(inde) {

      var divs = this.$refs.divs;
      if (divs[inde].classList.contains('mystyles')) {

        divs[inde].classList.remove("mystyles");
      }
      divs[inde].classList.add("mystyle");

    },
    /**
     * 鼠标移出，给特色旅游图片移出类名
     */
    reduName(inde) {

      var divs = this.$refs.divs;
      divs[inde].classList.remove("mystyle");
      divs[inde].classList.add("mystyles");
    },
    /**
     * 获取旅游推荐图片的数据
     */
    getTouristPictures() {
      specialTourismApi.apiFrontScenicPointRecommendList(
        this.groups,
        this.size,
        this.start
      ).then(res => {

        var _this = this;
        for (var i = 0; i <= res.body.list.length - 1; i++) {
          res.body.list[i].xuhao = i + 1;
        }
        _this.touristDatas = res.body.list;
        for (var i in res.body.list) {
          //console.log(res.body.list[i].name,'iiiiiiiiiiiiiiiiiiii')
          var overName = true;
          if (res.body.list[i].name.length > 13) {

            overName = false;
            res.body.list[i].overName = overName;

          } else {
            res.body.list[i].overName = overName;
          }
        }

      }).catch(err => {
        console.log(err)
      })
    },
    /**
     * 给特色旅游图片延时加载图片效果
     */
    tourisShow() {
      var _this = this;
      var tourism = '';
      tourism = setInterval(function () {
        _this.tourismShow++;
        if (_this.tourismShow > _this.touristDatas.length) {
          clearInterval(tourism);
        }
      }, 200)
    },
    /**
     * 点击特色旅游图片跳转到乡村旅游页面
     */
    goToCountryTravel(id, group, scenicName, scenicClassId) {

      let name = '';
      if (group == 'travel') {
        name = '特色旅游';
      }
      let that = this;
      that.$router.push({
        path: '/countryTravel',
        query: {
          scenicPointId: id,
          parentName: name,
          specialNames: scenicClassId,
          scenicName: scenicName
        }
      })
    },
    /**
     * 点击更多跳转到特色旅游界面
     */
    goToSpecialTourist() {
      this.$router.push('./specialTourism');
      this.lookmore = 1;
    },

    /**
     * 交通气象=====地图_创建一个地图的实例
     * 2019-0108    1624   修改
     */
    createMap() {
      var _this = this;
      var cityLocation, map, marker = null;
      var center = new qq.maps.LatLng(this.latDefault, this.lonDefault);

      var sw = new qq.maps.LatLng(32.66414, 104.03138); //东北角坐标
      var ne = new qq.maps.LatLng(31.21490, 100.65326); //西南角坐标
      var latlngBounds = new qq.maps.LatLngBounds(ne, sw);

      _this.map = new qq.maps.Map(document.getElementById('mapSiteTraffics'), {
        center: center,
        zoom: 7,
        boundary: latlngBounds,
        //				minZoom: 10, //minZoom设置地图最小的缩放级别
        //				maxZoom: 11, //maxZoom设置地图最大的缩放级别
        //				panControl: false, //平移控件的初始启用/停用状态。      
        //				zoomControl: false, //缩放控件的初始启用/停用状态。
        //			scaleControl: false, //滚动控件的初始启用/停用状态。
        //				draggable: false, //如果为 false，则禁止拖动地图。默认情况下启用拖动
      })

      //添加地图监听事件 如果位置改变 则触发函数 resetBounds
      qq.maps.event.addListener(_this.map, 'bounds_changed', function () {

        var bounds = _this.map.getBounds(); //获取函数范围
        if (bounds) { //如果得到函数范围值
          //					west_north.innerHTML = //西北角的坐标值
          //						'[' + bounds.getNorthEast().getLat().toFixed(5) +
          //						', ' + bounds.getNorthEast().getLng().toFixed(5) + ']';
          //					eash_south.innerHTML = //东南角的坐标值
          //						'[' + bounds.getSouthWest().getLat().toFixed(5) +
          //						', ' + bounds.getSouthWest().getLng().toFixed(5) + ']';				
        }
      });
    },
    resetBounds() {

    },
    /**
     * 交通气象地图====给获取到的经纬度颜色描块
     */
    mapColor(mapList) {

      var polyline = new qq.maps.Polyline({
        path: mapList,
        strokeColor: '#16ce71',
        strokeWeight: 8,
        map: this.map
      })
      this.polylineArr.push(polyline);
    },
    /**
     * 交通气象地图====给地图描关键点的位置
     */
    mapMark(latlngs) {

      if (latlngs.length <= 0) {
        return;
      }

      //清楚地图上的marker
      this.clearOverlays(this.markers);

      var infoWin = new qq.maps.InfoWindow({
        map: this.map
      });
      var map = this.map;
      //创建标记---public_icon_warning2/public_icon_warning1
      //这里是调用第一次id指对应的天气实况的方法

      this.getTrafficCondition(latlngs[0].id, latlngs[0].height, latlngs[0].name);
      latlngs.forEach((item, index) => {

        //标记文字样式
        var cssC = {
          color: "black",
          fontSize: "14px",
          fontWeight: "bold",
          //					backgroundColor: 'transparent',
          //					border: 'none'
          zIndex: '99'
        };

        let anchor = new qq.maps.Point(10, 10),
          size = new qq.maps.Size(60, 49),
          origin = new qq.maps.Point(0, 0),
          icon = new qq.maps.MarkerImage(public_icon_warning2, size, origin, anchor);

        // 判断标记高亮样式 
        if (index == 0) {
          icon = new qq.maps.MarkerImage(public_icon_warning1, size, origin, anchor);
          cssC = {
            color: "black",
            fontSize: "20px",
            fontWeight: "bold",
            //						backgroundColor: 'transparent',
            //						border: 'none'
            zIndex: '99'
          };

        }

        var latlng = new qq.maps.LatLng(item.lat, item.lon);
        var marker = new qq.maps.Marker({
          position: latlng,
          map: map,
          icon: icon,
          id: item.id,
          name: item.name
        })
        //标记文字样式
        var markerLabel = new qq.maps.Label({
          position: latlng,
          map: map,
          style: cssC,
          offset: new qq.maps.Size(-55, 15, 55), //-35, 15, 35   10, -30, 15
          content: item.name
        })

        //判断标记高亮样式赋值
        if (index == 0) {
          this.highLightMarkers = marker;
          this.highLightMarkerLabels = markerLabel;
        }

        this.markers.push(marker, markerLabel);
        this.markerLabelLables.push(markerLabel);

        var _this = this;

        //鼠标移入事件
        qq.maps.event.addListener(marker, 'mouseover', function () {

          infoWin.setPosition(latlng);
          _this.condiflag = false;
          setTimeout(function () {
            _this.getTrafficCondition(item.id, item.height, item.name);
          }, 1000);

          if (_this.highLightMarkers) {

            _this.highLightMarkers.setIcon(new qq.maps.MarkerImage(public_icon_warning2, size, origin, anchor));
            _this.highLightMarkerLabels.setStyle({
              color: 'black',
              fontSize: '14px',
              fontWeight: 'bold',
              //							backgroundColor: 'transparent',
              //							border: 'none'
              zIndex: '99'
            });
            _this.highLightMarkers = marker;
            marker.setIcon(new qq.maps.MarkerImage(public_icon_warning1, size, origin, anchor));
          }

          for (var i = 0; i < _this.markerLabelLables.length; i++) {

            if (item.name == _this.markerLabelLables[i].content) {
              _this.markerLabelLables[i].setStyle({
                color: 'black',
                fontSize: '20px',
                fontWeight: 'bold',
                //								backgroundColor: 'transparent',
                //								border: 'none'
                zIndex: '99'
              })
            } else {
              _this.markerLabelLables[i].setStyle({
                color: 'black',
                fontSize: '14px',
                fontWeight: 'bold',
                //								backgroundColor: 'transparent',
                //								border: 'none'
                zIndex: '99'
              })
            }
          }

        });
        //鼠标点击事件
        qq.maps.event.addListener(marker, 'click', function () {

          infoWin.setPosition(latlng);
          if (_this.highLightMarkers) {

            _this.highLightMarker.setIcon(new qq.maps.MarkerImage(public_icon_warning2, size, origin, anchor));

          }
          _this.highLightMarkers = marker;
          marker.setIcon(new qq.maps.MarkerImage(public_icon_warning1, size, origin, anchor));

          _this.$router.push({
            path: './trafficMeteorological',
            query: {
              guodaoId: item.guodaoId,
              scienpointId: item.id,
              index: item.index
            }
          })

        });

      })
    },
    /**
     * 根据关键点的id指获取预警数据
     */
    getWarningLive(id, lat, lon) {
      if (!id) {
        return;
      }

      specialTourismApi.apiFrontMeAutoWarningLiveList(
        this.warningList.size,
        this.warningList.start,
        id,
        this.warningList.type
      ).then(res => {
        //this.clearOverlays(this.markerS);
        this.wanrginName = res.body;
        var homeImg = '';
        this.wanrginName.forEach(item => {

          var stromname = item.name.trim()
          if (stromname == '暴风') {
            homeImg = homepage_warngalerainstorm;
          }
          if (stromname.trim() == '暴雨') {
            homeImg = homepage_warning_rainstorm;
          }
        })
        //自定义标记的图标样式
        let anchor = new qq.maps.Point(20, 60),
          size = new qq.maps.Size(60, 49),
          origin = new qq.maps.Point(0, 0),
          icon = new qq.maps.MarkerImage(homeImg, size, origin, anchor);
        var latlng = new qq.maps.LatLng(lat, lon);
        var marker = new qq.maps.Marker({
          position: latlng,
          map: this.map,
          icon: icon,
        })
        this.markerS.push(marker);

      }).catch(err => {
        console.log(err)
      })
    },

    /**
     * 交通实况的清除标记方法
     */
    clearOverlays(overlays) {
      var overlay;
      while (overlay = overlays.pop()) {
        overlay.setMap(null);
      }
    },
    /**
     * 根据国道的id值获取国道的详情=====经纬度等数据
     */
    getTrafficDetail(id, index) {

      if (!id || id == '' || id == undefined) {
        return;
      }

      specialTourismApi.apiFrontTrafficInfo(id).then(res => {

        //清除地图上的marker
        this.clearOverlays(this.markers);
        var mapDatas = res.body;

        //				if(!res.body.roadKeyList || res.body.roadKeyList.length <= 0) {
        //					return;
        //				}

        if (res.body.roadKeyList.length > 0) {
          this.heights = res.body.roadKeyList[0].height;
          this.roadKeyNames = res.body.roadKeyList[0].roadKeyName;
          this.latDefault = res.body.roadKeyList[0].lat;
          this.lonDefault = res.body.roadKeyList[0].lon;
          this.createMap();

          //				for(var i = 0; i <= res.body.roadKeyList.length - 1; i++) {
          //					this.getWarningLive(res.body.roadKeyList[i].scenicRoadKeyId, res.body.roadKeyList[i].lat, res.body.roadKeyList[i].lon); //调用预警的数据
          //				}
        }
        var latlngs = [];
        res.body.roadKeyList.forEach(item => {

          if (item.lat && item.lon) {
            latlngs.push({
              lat: item.lat,
              lon: item.lon,
              name: item.roadKeyName,
              height: item.height,
              id: item.scenicRoadKeyId,
              guodaoId: id,
              index: this.trafficIndex
            })
          }

        })
        let mapList = [];
        let pointString = mapDatas.points;

        for (var k = 0; k < pointString.length; k++) {

          mapList.push(JSON.parse(pointString[k]));
        }
        var xx = [];
        for (var i = 0; i < mapList.length; i++) {
          var temps = [];
          for (var j = 0; j < mapList[i].length; j++) {
            var rr = mapList[i];
            var qqs = new qq.maps.LatLng(rr[j].latitude, rr[j].longitude);
            temps.push(qqs);
          };
          xx.push(temps);
          this.mapColor(xx[i]);
        }

        this.mapMark(latlngs);

      }).catch(err => {
        console.error(err)
      })
    },
    /**
     * 点击国道，改变背景颜色以及传递参数
     */
    changeTraffic(index, scenicRadId) {

      this.condiflag = true; //定义
      this.trafficScenicRadId = scenicRadId;
      this.trafficIndex = index;
      //每次点击的时候就把高度以及关键点的数值清空重新赋值
      this.heights = '';
      this.roadKeyNames = '';
      this.clearOverlays(this.markerS); //====首页清除大风标记

      //			if(this.polyline.getMap()) {
      //				this.polyline.setMap(null);
      //			}

      for (var i in this.polylineArr) {
        this.polylineArr[i].setMap(null);
      }
      this.polylineArr = [];
      this.conditionData = []; //点击一次把天气实况的数据清空一次
      this.wanrginName = []; //点击一次把装大风预警的数据清空一次
      this.condnull = false; //定义’暂无数据‘的
      this.getTrafficDetail(scenicRadId, this.trafficIndex);

    },
    /**
     * 获取交通气象的国道数据----第一部分
     */
    getTrafficData() {
      specialTourismApi.apiFrontTrafficList(
        this.listData.sortField,
        this.listData.sortType
      ).then(res => {
        if (res.body.length <= 0) {
          return;
        }
        this.trafficData = res.body;
        this.trafficScenicRadId = this.trafficData[0].scenicRadId;
        this.getTrafficDetail(this.trafficScenicRadId);
      }).catch(err => {
        console.log(err)
      })
    },
    /**
     * 获取到国道对应的天气实况的数据
     */
    getTrafficCondition(id, height, name) {

      this.heights = height;
      this.roadKeyNames = name;
      this.condiflag = true; //定义是否添加上类名，如果为true的话，则加上类名，有动态的css效果

      specialTourismApi.apiFrontMeLiveInfo(
        id,
        this.targetType
      ).then(res => {

        this.conditionData = res.body;
        if (this.conditionData.length != '' || this.conditionData.length != []) {
          this.condnull = true;
        } else {
          this.condnull = false;
        }
      }).catch(err => {
        console.log(err)
      })
    },
    /**
     * 获取广告的图片
     */
    getAderList() {
      specialTourismApi.apiAdminAdvertList(
        this.advertList.positions,
        this.advertList.size,
        this.advertList.start
      ).then(res => {

        this.showTime = res.body[0].showTime * 1000;
        this.adertData = res.body;
        // console.log(res.body, '广告')

      }).catch(err => {
        console.log(err, '错误了')
      })
    },
    /**
     * 轮播广告图片的样式
     */
    play() {
      this.timer = setInterval(this.autoPlay, 2500)
    },
    /**
     * 轮播广告自动图片的样式
     */
    autoPlay() {
      this.mark++;
      if (this.mark == this.adertData.length) {
        this.mark = 0;
      }
    },
    /**
     * 点击小圆点切换
     */
    change(i) {
      if (this.mark = i) {
        clearInterval(this.timer);
        this.mark = i;
      } else {
        this.timer = setInterval(this.autoPlay, 2500)
      }
    },
    /**
     * 滚动条数据
     */
    handleScroll() {

      var _this = this;
      var scrollTops = document.documentElement.scrollTop || document.body.scrollTop;
      _this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      _this.scrollTopS = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      //变量windowHeight是可视区的高度
      _this.windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      //变量scrollHeight是滚动条的总高度
      _this.scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      _this.rate = _this.scrollTopS / _this.scrollHeight;
      _this.rates = _this.scrollTop / _this.scrollHeight;

    },
    /**
     * 点击特色旅游线路推荐跳转到相应的页面
     */
    goToMeteorological(name, id) {

      this.$router.push({
        path: './routerecommend',
        query: {
          articleId: id,
          typeCode: name
        }
      })
    },
    /**
     * 获取旅游推荐线路的数据
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
        for (var i = 0; i <= this.specialRecommendData.length - 1; i++) {
          this.specialRecommendData[i].showit = i + 1;
        }

        if (this.specialRecommendData.length) {
          this.width = this.specialRecommendData.length * 279;
        } else {
          this.width = 1200;
        }

      }).catch(err => {
        console.log(err)
      })
    },
    /**
     * 特色旅游线路推荐------给轮播的ul的样式动态赋值
     */
    changeMarginLeft() {
      return {
        'margin-left': this.marginLeft + 'px',
        'width': this.width + 'px',
        'transition': 'all 1s ease'
      }
    },
    /**
     * 点击图片上一张
     */
    prevImages(e) {
      this.changePrev = !this.changePrev;
      if (this.marginIndex == 0) {
        this.marginLeft = 0;
      } else {
        this.marginIndex++;
        this.marginLeft += 279 * 4;
        if (this.marginIndex >= this.specialRecommendData.length - 4) {
          this.marginIndex = 0;
          this.marginLeft = 0;
        }
      }
    },
    /**
     * 点击下一张图片
     */
    nextImages(e) {

      //			if(this.marginIndex < this.specialRecommendData.length / 4) {
      //				this.marginIndex++;
      //				this.marginLeft -= 279 * 4;
      //				this.changeNet = !this.changeNet;
      //			} else {
      //				this.marginLeft = this.marginLeft;
      //				this.marginIndex = this.marginIndex;
      //			}

      if (this.marginIndex < Math.floor(this.specialRecommendData.length / 4)) {

        this.marginIndex++;
        this.marginLeft -= 279 * 4;
        this.changeNet = !this.changeNet;
      } else {
        this.marginLeft = this.marginLeft;
        this.marginIndex = this.marginIndex;
      }

    },

    /**
     * 给旅游线路推荐延时加载图片的效果
     */
    testShow() {
      var _this = this;
      var dd = '';
      dd = setInterval(function cc() {
        _this.testshow++;
        if (_this.testshow > _this.specialRecommendData.length) {
          clearInterval(dd);
        }
      }, 200)

    },

  },

  created: function () {
    //this.homeNotificationList(); //调用通知的数据
    this.getRecommendData(); //调用旅游推荐的数据
    this.getTouristPictures(); //调用特色旅游推荐图片的数据
    this.getAderList(); //调用广告的数据
    this.play(); //调用轮播广告的执行方法

    this.getNoticeList(); //通知
    this.getMove()

  },
  watch: {
    lang: function (nv, ov) {

      // console.log(nv, ov, '首页首页')
    },
    /**
     * 用来监听景区天气右侧鼠标移入的index值，然后用来标记地图的高亮标记
     */
    hightindex: function (nv, ov) {

      //自定义标记的图标样式		
      let bigImageOptions = {
        size: new qq.maps.Size(40, 64), //自定义图片大小
        origin: new qq.maps.Point(0, 0), //显示区域
        anchor: new qq.maps.Point(30, 60), //坐标点
      };
      let smallImageOptions = {
        size: new qq.maps.Size(29, 36),
        origin: new qq.maps.Point(0, 0),
        anchor: new qq.maps.Point(20, 44),
      };
      var _this = this;
      var icon = new qq.maps.MarkerImage(public_local_big, bigImageOptions.size, bigImageOptions.origin, bigImageOptions.anchor);
      var icons = new qq.maps.MarkerImage(public_local, smallImageOptions.size, smallImageOptions.origin, smallImageOptions.anchor);
      _this.mouseMarkers[nv].setMap(null);
      _this.mouseMarkers[nv].icon = icon;
      _this.mouseMarkers[nv].setMap(_this.scenicMap);

      _this.markerLabelLable[nv].setStyle({
        color: 'black',
        fontSize: '20px',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        border: 'none',
        offset: new qq.maps.Size(10, -30, 15), //-55, 15, 55
      })

      for (var i = 0; i < _this.mouseMarkers.length; i++) {

        if (i !== nv) {
          _this.mouseMarkers[i].icon = icons;
          _this.markerLabelLable[i].setStyle({
            color: 'black',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: 'transparent',
            border: 'none'
          })
          _this.mouseMarkers[i].setMap(_this.scenicMap);

        }

      }

    },
    scrollTop: function () {

      this.count++;
      if (this.rates >= 0.24) {
        if (this.count === 1) {
          this.tourisShow();
        }
      } else {
        this.count = 0;
        this.tourismShow = 0;
      }
    },
    scrollTopS: function () {
      this.counts++;
      if (this.rate >= 0.65) {
        if (this.counts === 1) {
          this.testShow();
        }
      } else {
        this.counts = 0;
        this.testshow = 0;
      }
    },

  },

  mounted: function () {

    /**
     * 监听滚动条滚动
     */
    window.addEventListener('scroll', this.handleScroll);

    var _this = this;

    TMap().then(qq => {
      _this.qq = qq;
      _this.createMap();
      _this.getTrafficData(); //获取交通气象的国道数据----第一部分
      _this.ScenicSpotRatingList(); //调用评级数据方法
      _this.tourismWeatherCreateMap(); //创建地图
      _this.scenicMapList(); //地图列表

    })

  },

  updated: function () {
    this.getZmbuslength()
  }
}
