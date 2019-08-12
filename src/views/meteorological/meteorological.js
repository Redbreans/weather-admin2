import * as specialTourismApi from '@/api/api.js';
import public_local from "@/assets/images/public_local.png";
import public_local_big from "@/assets/images/gif.gif";
import {
  TMap
} from '@/TMap.js';
export default {
  data() {
    return {
      map: {},
      markers: [], //用来装标记的数据
      marginLeft: 0, //默认的margin左边值
      width: 200, //默认的轮播的ul宽度
      marginIndex: 0, //默认轮播移动的位置从0开始
      imgDatas: [], //需要轮播的图片数据
      changePrev: false,
      changeNet: false,
      group: 'meteorology', //请求气象景观的数据
      size: 30,
      start: 0,
      MeteorologyBanner: [], //气象景观banner图片数据
      MeteorologyData: [], //气象景观数据
      timer: null, //定时器
      mark: 0, //比对图片索引的变量
      imgUrl: this.getImgUrl.readImageUrl, //配置的全局图片url地址
      indexBg: '', //默认的气象景观显示
      meteorologicalScenicClassId: '', //默认显示的气象景观的id 如：云海
      bannersContentData: '', //banner文字介绍
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
      indexDefault: 0,
      bodyData: [], //装分类右侧对应的数据
      latInde: 0, //默认右侧高亮的索引位置
      highLightMarker: undefined, //高亮标记点
      highLightMarkerLabel: undefined, //高亮文字标记
      markerLabelLable: [], //标记文本的push数据
      scrollTop: 0, //默认的底部滚动条高度
      rate: 0,
      scrollHeight: 0,
      count: 0,
      testshow: 0,
      jump: false, //定义是否是从其他页面跳转过来的
      showTime: 0, //banner轮播时间
    }
  },
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
          path: './bannerimgmeteory',
          query: {
            urls: item,
            name: name
          }
        })
      })
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
        //console.log(res,'res')

      }).catch(err => {
        console.log(err)
      })
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

        if (this.marginIndex >= this.imgDatas.length - 4) {
          this.marginIndex = 0;
          this.marginLeft = 0;
        }
      }
    },
    /**
     * 点击图片下一张
     */
    nextImages(e) {

      if (this.marginIndex < Math.floor(this.imgDatas.length / 4)) {

        this.marginIndex++;
        this.marginLeft -= 279 * 4;
        this.changeNet = !this.changeNet;
      } else {
        this.marginLeft = this.marginLeft;
        this.marginIndex = this.marginIndex;
      }

    },
    /**
     * 给轮播的ul的样式动态赋值
     */
    changeMarginLeft() {
      return {
        'margin-left': this.marginLeft + 'px',
        'width': this.width + 'px',
        'transition': 'all 1s ease'
      }
    },
    /**
     * 获取气象景观的数据
     */
    getMeteorologyData() {
      specialTourismApi.apiFrontScenicClassList(
        this.group
      ).then(res => {

        this.MeteorologyData = res.body;

        if (this.$route.query.scenicClassId) {

          this.indexBg = this.$route.query.scenicClassId;

        } else {
          this.indexBg = res.body[0].scenicClassId;
        }

        this.descriptAreaList(this.indexBg);
      }).catch(err => {
        console.log(err, '错误了')
      })
    },
    /**
     * 获取气象景观推荐的数据
     */
    getRecommendData() {
      specialTourismApi.apiFrontScenicPointRecommendList(
        this.group,
        this.size,
        this.start
      ).then(res => {

        this.imgDatas = res.body.list;
        for (var i = 0; i <= this.imgDatas.length - 1; i++) {
          this.imgDatas[i].showit = i + 1;
        }
        if (!this.imgDatas.length) {
          this.width = 1200;
        } else {
          this.width = this.imgDatas.length * 279;
        }
      }).catch(err => {})
    },
    /**
     * 去推荐详情看看
     */
    goToMeteorological(name, scenicPointIds, index, lat, lon, scenicClassId, latInde) {

      var indexs = '';

      if (!index) {
        indexs = this.indexDefault;
      } else {
        indexs = index;
      }

      this.$router.push({
        path: './meteorologicalSecondary',
        query: {
          name: name,
          scenicPointIds: scenicPointIds,
          group: this.group,
          index: indexs,
          lat: lat,
          lon: lon,
          scenicClassId: scenicClassId,
          latInde: latInde
        }
      })
    },
    /**
     * 获取气象景观banner图片数据
     */
    getMeteorologyBanner() {
      specialTourismApi.apiAdminAdvertList(
        this.group,
        this.size,
        this.start
      ).then(res => {

        this.showTime = res.body[0].showTime * 1000;
        this.MeteorologyBanner = res.body;
      }).catch(err => {
        console.log(err, '错误了')
      })
    },
    /**
     * 气象景观banner轮播图片
     */
    autoPlay() {
      this.mark++;
      if (this.mark === this.MeteorologyBanner.length) {
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

      if (this.mark = i) {
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
    /**
     * 点击气象景观名字分类(有地图的版块)
     */
    changeBg(scenicClassId, index) {
      //点击显示不同的景点

      this.indexBg = scenicClassId;
      this.descriptAreaList(this.indexBg);
      this.jump = true;
      this.indexDefault = index;

    },
    /**
     * 景区描点
     */
    descriptAreaList(scenicClassId) {

      specialTourismApi.apiFrontScenicPointList(
        this.group,
        scenicClassId,
        this.size,
        this.start
      ).then(res => {

        this.bodyData = res.body;
        let latlngs = [];
        this.bodyData.forEach((item, inde) => {

          if (item.lat && item.lon) {
            latlngs.push({
              lat: item.lat,
              lon: item.lon,
              name: item.scenicAreaName,
              id: item.scenicPointId,
              index: this.indexDefault,
              latInde: item.scenicPointId,
              scenicClassId: scenicClassId
            })
          }
        })
        this.mapMark(latlngs);

      }).catch(err => {
        console.log(err)
      })

    },
    /**
     * 清除标记
     */
    clearOverlays(overlays) {
      var overlay;
      while (overlay = overlays.pop()) {
        overlay.setMap(null);
      }
    },
    /**
     * 地图标记
     */
    mapMark(latlngs) {
      //清除地图上的marker

      this.clearOverlays(this.markers);
      var map = this.map;
      //创建标记，标注
      latlngs.forEach((item, index) => {

        //自定义标记的图标样式
        let bigImageOptions = {
          size: new qq.maps.Size(40, 70), //自定义图片大小
          origin: new qq.maps.Point(0, 0), //显示区域
          anchor: new qq.maps.Point(27, 50), //坐标点
        };
        let smallImageOptions = {
          size: new qq.maps.Size(29, 36),
          origin: new qq.maps.Point(0, 0),
          anchor: new qq.maps.Point(20, 44),
        };

        let icon = new qq.maps.MarkerImage(public_local, smallImageOptions.size, smallImageOptions.origin, smallImageOptions.anchor);

        var cssCone = {
          color: "black",
          fontSize: "14px",
          fontWeight: "bold",
          backgroundColor: 'transparent',
          border: 'none'
        };


        // 判断标记高亮样式 
        if (this.$route.query.scenicPointIds && this.jump === false) {

          this.latInde = this.$route.query.scenicPointIds; //将鼠标移入的图标的索引值赋给变量，相等的就添加类名
          if (this.$route.query.scenicPointIds == item.id) {
            icon = new qq.maps.MarkerImage(public_local_big, bigImageOptions.size, bigImageOptions.origin, bigImageOptions.anchor);
            cssCone = {
              color: "black",
              fontSize: "20px",
              fontWeight: "bold",
              backgroundColor: 'transparent',
              border: 'none'
            };
          }

          //标记点
          var latlng = new qq.maps.LatLng(item.lat, item.lon);
          var marker = new qq.maps.Marker({
            position: latlng,
            map: map,
            icon: icon,
            id: item.id
          })
          //标记文字
          var markerLabel = new qq.maps.Label({
            position: latlng,
            map: map,
            content: item.name,
            style: cssCone,
            offset: new qq.maps.Size(10, -30, 15)
          })
          //判断标记高亮样式赋值
          if (this.$route.query.scenicPointIds == item.id) {
            this.highLightMarker = marker;
            this.highLightMarkerLabel = markerLabel;
          }

          this.markers.push(marker, markerLabel);
          this.markerLabelLable.push(markerLabel);

        } else {

          if (index == 0) {
            this.latInde = item.id;

            icon = new qq.maps.MarkerImage(public_local_big, bigImageOptions.size, bigImageOptions.origin, bigImageOptions.anchor);
            cssCone = {
              color: 'black',
              fontSize: '20px',
              fontWeight: 'bold',
              backgroundColor: 'transparent',
              border: 'none'
            };
          }
          //标记点
          var latlng = new qq.maps.LatLng(item.lat, item.lon);
          var marker = new qq.maps.Marker({
            position: latlng,
            map: map,
            icon: icon,
            id: item.id
          })
          //标记文字
          var markerLabel = new qq.maps.Label({
            position: latlng,
            map: map,
            content: item.name,
            style: cssCone,
            offset: new qq.maps.Size(10, -30, 15)
          })
          //判断标记高亮
          if (index == 0) {
            this.latInde = item.id;
            this.highLightMarker = marker;
            this.highLightMarkerLabel = markerLabel;
          }
          this.markers.push(marker, markerLabel);
          this.markerLabelLable.push(markerLabel);

        }

        var _this = this;
        /**
         * 监听标记的点击事件
         */
        qq.maps.event.addListener(marker, 'click', function () {

          _this.goToMeteorological(item.name, item.id, item.index, item.lat, item.lon, item.scenicClassId, item.latInde);
          if (_this.highLightMarker) {

            _this.highLightMarker.setIcon(new qq.maps.MarkerImage(public_local, smallImageOptions.size, smallImageOptions.origin, smallImageOptions.anchor));
          }
          _this.highLightMarker = marker;
          marker.setIcon(new qq.maps.MarkerImage(public_local_big, bigImageOptions.size, bigImageOptions.origin, bigImageOptions.anchor));

        });
        /**
         * 监听鼠标移入事件
         */
        qq.maps.event.addListener(marker, 'mouseover', function () {

          _this.latInde = item.latInde; //将鼠标移入的图标的索引值赋给变量，相等的就添加类名

          if (_this.highLightMarker) {
            _this.highLightMarker.setIcon(new qq.maps.MarkerImage(public_local, smallImageOptions.size, smallImageOptions.origin, smallImageOptions.anchor));

            _this.highLightMarkerLabel.setStyle({
              color: 'black',
              fontSize: '14px',
              fontWeight: 'bold',
              backgroundColor: 'transparent',
              border: 'none'
            });

            _this.highLightMarker = marker;

            marker.setIcon(new qq.maps.MarkerImage(public_local_big, bigImageOptions.size, bigImageOptions.origin, bigImageOptions.anchor));
          }

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
     * 获取地图列表数据
     */
    getMapData() {
      specialTourismApi.apiFrontScenicMapListAll().then(res => {
        var mapDatas = res.body;
        mapDatas.forEach(item => {
          let mapList = [];
          let areaName = item.name;
          let pointString = item.points;
          let points = JSON.parse(pointString);

          points.forEach(items => {
            if (items.latitude && items.longitude) {
              var qqs = new qq.maps.LatLng(items.latitude, items.longitude);
              mapList.push(qqs);
            }
          })
          this.mapColor(mapList, areaName);
        })
      }).catch(err => {
        console.log(err)
      })
    },
    /**
     * 地图区域----颜色区块标记
     * rgb("+Math.floor(Math.random() * 256)+','+ Math.floor(Math.random() * 256)+','+Math.floor(Math.random() * 256)+")
     */
    mapColor(mapList, areaName) {
      let colors = {
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
      let color = colors[areaName];
      if (!color) {
        color = "#f0f0f0"
      }
      var polygon = new qq.maps.Polygon({
        path: mapList,
        strokeColor: '#f73d24',
        strokeWeight: 1,
        fillColor: color,
        map: this.map
      });
    },
    /**
     * 创建一个地图的实例
     */
    createMap() {
      var _this = this;
      var citylocation, map, marker = null;
      var center = new qq.maps.LatLng(32.50, 102.50);
      var sw = new qq.maps.LatLng(32.57872, 105.23560); //东北角坐标  31.17471 100.39612       31.73234 100.52795   30.47658 100.36316
      var ne = new qq.maps.LatLng(32.57872, 100.13245); //西南角坐标30.50971 99.75342  33.17845 103.85132
      var latlngBounds = new qq.maps.LatLngBounds(ne, sw);
      _this.map = new qq.maps.Map(document.getElementById("mapSiteMeteorgy"), {
        center: center,
        zoom: 8,
        minZoom: 7, //minZoom设置地图最小的缩放级别
        maxZoom: 8, //maxZoom设置地图最大的缩放级别
        boundary: latlngBounds,
        panControl: false, //平移控件的初始启用/停用状态。      
        zoomControl: false, //缩放控件的初始启用/停用状态。
        scaleControl: false, //滚动控件的初始启用/停用状态。比例尺
        //				draggable: false, //如果为 false，则禁止拖动地图。默认情况下启用拖动
      });
    },
    /**
     * 滚动条数据
     */
    handleScroll() {

      var _this = this;
      var scrollTops = document.documentElement.scrollTop || document.body.scrollTop;
      _this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

      //变量windowHeight是可视区的高度
      _this.windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      //变量scrollHeight是滚动条的总高度
      _this.scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

      _this.rate = _this.scrollTop / _this.scrollHeight;


    },
    /**
     * 给旅游线路推荐延时加载图片的效果
     */
    testShow() {
      var _this = this;
      var dd = '';
      dd = setInterval(function cc() {
        _this.testshow++;
        if (_this.testshow > _this.imgDatas.length) {
          clearInterval(dd);
        }
      }, 200)

    },

  },
  created: function () {

    this.getMeteorologyBanner(); //调用获取气象景观banner图片数据方法
    this.play(); //调用播放图片方法
    this.getRecommendData(); //调用获取气象景观推荐的数据方法
    this.getBannerContent(); //调用获取banner文字简介的id值方法

  },
  watch: {
    scrollTop: function () {

      this.count++;
      if (this.rate >= 0.35) {
        if (this.count === 1) {
          this.testShow();
        }
      } else {
        this.count = 0;
        this.testshow = 0;
      }
    },
  },
  mounted: function () {
    if (this.$route.query.type) {
      this.jump = this.$route.query.type;
    }


    window.addEventListener('scroll', this.handleScroll);
    TMap().then(qq => {
      this.getMeteorologyData() //获取气象景观的数据
      this.createMap() //创建地图
      this.getMapData() //获取地图列表的数据
    });
  }
}
