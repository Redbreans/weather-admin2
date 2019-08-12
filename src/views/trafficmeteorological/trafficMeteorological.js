import * as specialTourismApi from '@/api/api.js';
import public_local from "@/assets/images/public_icon_warning2.png";

import public_local_big from "@/assets/images/public_icon_warning1.png";

import homepage_warngalerainstorm from "@/assets/images/homepage_warngalerainstorm.png";
import homepage_warning_rainstorm from "@/assets/images/homepage_warning_rainstorm.png";

import {
  TMap
} from '@/TMap.js';
export default {
  data() {
    return {
      roadKeyLists: [], //道路预警详情数据
      condiflag: true, //小窗口的动画判断
      trafficData: [], //用来装交通气象国道里面的数据
      trafficIndex: 0, //默认显示第一个国道数据
      trafficScenicRadId: '', //默认显示第一个国道数据的id值
      map: {}, //地图
      markers: [], //用来装标记的数据
      markerS: [], //用来装标记预警的数据
      listData: {
        sortField: '',
        sortType: ''
      },
      targetType: 'road', //国道对应的道路数据类型
      conditionData: [], //天气实况的数据
      conditionDatas: [], //天气实况鼠标移入事件
      heights: '', //默认的第一个海拔高度
      sunSettingTime: '', //默认第一个日落
      sunriseTime: '', //默认的第一个日出
      roadKeyNames: '', //默认的第一个道路名字
      roadKeyName: '', //默认点击切换的道路名字
      polyline: {}, //根据获取到的经纬度描根线 TODO xxx
      polylineArr: [], //根据获取到的经纬度描根线
      latDefault: 32.50, //默认的纬度----中心点
      lonDefault: 102.50, //默认的经度---中心点
      tHoursData: [], //装24小时的数据
      width: '', //动态设置装24小时数据的宽度
      hoursDates: [], //装24小时里面的每一个小时
      WeatherFactTimeData: '', //用来装当前时间详情返回的数据
      getWeathers: [], //配置全局的天气
      imgUrl: this.getImgUrl.readImageUrl, //配置的全局图片url地址		
      exponent: { //指数的参数
        group: '',
        size: 30,
        start: 0
      },
      temperatures: [], //装温度的数据
      temp: '',
      exponentData: [], //用来装指数的数据
      sevenData: [], //装7天天气的数据
      datas: [], //用来装处理之后的时间
      MePredictionLists: { //7天数据的参数
        size: 7,
        start: 0
      },
      scenicIndexList: {
        group: 'traffic',
        size: -1,
        start: -1,
        targetId: '',
        type: 'road'
      },
      scenicIndexData: [], //装7天天气指数的数据
      is_show: false,
      mouseMapNames: '', //鼠标移入小窗口显示的景区名字
      stateShow: 0, //默认为鼠标移入事件的状态值
      warningList: { //预警的参数值
        size: 30,
        strat: 0,
        id: '',
        type: 'road'
      },
      wanrginName: [], //用来装预警信息的数据
      isFirstByParam: false, //是否 是首次请求且是传参进入的界面

      highLightMarker: undefined, //高亮标记点
      highLightMarkerLabel: undefined, //定义文字高亮
      markerLabelLable: [], //标记文本的push数据

      hoursTitle: true, //未来24小时天气预报名字点击效果
      dayTitle: false, //未来7天天气预报名字点击效果
      exponentDataLength: false, //未来24小时天气预报指数显示判断
      daysExponentDataLength: false, //未来7天天气预报指数显示判断
      weekFewData: [], //7天天气预报时间 星期几
      nulls: true, //判断实况是否有数据而需要渲染的数据
      mapIds: '', //关键点等的id
      scrollnumber: 0, //滚动条监听内容事件，强行渲染数据_数字++
      numberHalf: 0, //滚动条监听内容事件，强行渲染数据_数字求余
      jumps: -1, //定义从其他页面传过来的值
      jumpsTwo: -1,

    }
  },
  watch: {
    isFirstByParam(nv, ov) {
      //			console.log(nv, ov, '======================')
      if (this.isFirstByParam == true) {
        //				console.log(this.highLightMarker)
      }

    }
  },
  methods: {

    /**
     * 获取7天天气的指数
     */
    getScenicIndexList(id) {

      specialTourismApi.apiFrontScenicIndexPredictionlist(
        this.scenicIndexList.group,
        this.scenicIndexList.size,
        this.scenicIndexList.start,
        id,
        this.scenicIndexList.type
      ).then(res => {

        for (var i in res.body) {
          var changeIndex = res.body[i].indexDateTime.substring(5, 7) + '/' + res.body[i].indexDateTime.substring(8, 11);
          res.body[i].dateIndexTime = changeIndex.replace(/\s/g, "");;

          //					var aa = res.body[i].indexDateTime.substring(5, 7) + '/' + res.body[i].indexDateTime.substring(8, 11)
          //
          //					res.body[i].indexDateTimeNew = aa.replace(/\s/g, "");
        }
        this.scenicIndexData = res.body;

        if (!this.scenicIndexData.length == [] || !this.scenicIndexData.length == '' || this.scenicIndexData.length > 0) {
          this.daysExponentDataLength = true;
        }

      }).catch(err => {
        console.log(err)
      })
    },

    htmlWatcher() {
      var timer = 0;
      var count = 0
      timer = setInterval(function () {
        count++;
        if (count === 1000) {
          var ss = document.getElementsByTagName("span");
          for (var j = 0; j < ss.length; j++) {
            ss[j].innerText = "语言"
          }

          //ss.innerText="语言冬至农历冬月十六2018年12月22日"
          //	console.log(ss.innerText, "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
        }
      }, 10)

    },

    /**
     * 获取交通气象的国道数据----第一部分
     */
    getTrafficData() {

      specialTourismApi.apiFrontTrafficList(
        this.listData.sortField,
        this.listData.sortType
      ).then(res => {

        this.trafficData = res.body;

        if (!this.trafficScenicRadId) {
          this.trafficScenicRadId = this.trafficData[0].scenicRadId;
        }
        let newId = this.trafficScenicRadId; //国道的id值
        let newIds = ''; //用来获取从首页点击过来的关键点的id值
        if (this.$route.query.guodaoId) {

          newId = this.$route.query.guodaoId;
          newIds = this.$route.query.scienpointId;
          this.trafficIndex = this.$route.query.index;
          this.isFirstByParam = true;
        }

        this.getTrafficDetail(newId); //调用根据国道的id值获取国道的详情=====经纬度等数据方法
        this.getTrafficConditions(newIds); //获取到国道对应的天气实况的数据_小窗口
        this.getTrafficCondition(newIds); //获取到国道对应的天气实况的数据
        this.changeScroll(); //调用滚动条监听内容事件，强行渲染数据方法
      }).catch(err => {
        console.log(err)
      })
    },
    /**
     * 点击国道，改变背景颜色以及传递参数【点击名字切换、317国道、318国道等】
     */
    changeTraffic(index, scenicRadId) {

      this.nulls = false;
      this.condiflag = true; //小窗口的动画判断
      this.trafficScenicRadId = scenicRadId;
      this.trafficIndex = index;
      this.exponentData = [];
      //每次点击的时候就把高度以及关键点的数值清空重新赋值
      this.roadKeyNames = '';
      this.heights = '';
      this.conditionDatas = [];

      this.clearOverlays(this.markerS); //====首页清除大风标记
      this.jumpsTwo++;
      this.isFirstByParam = false;
      // 道路清空
      //			if(this.polyline.length > 0) {
      //				if(this.polyline.getMap()) {
      //					this.polyline.setMap(null);
      //
      //				} //现在改变了   -----2019-01-07  16：15
      //			}
      //之前的格式

      this.getTrafficDetail(scenicRadId); //调用根据国道的id值获取国道的详情=====经纬度等数据方法
      this.getTrafficCondition(scenicRadId); //获取到国道对应的天气实况的数据
      this.getTrafficConditions(scenicRadId);
      this.getTHoursData(scenicRadId) //24小时天气预报列表
      var _this = this;

      for (var i in this.polylineArr) {
        this.polylineArr[i].setMap(null);
      }
      this.polylineArr = [];
      //			if(_this.polyline.getMap()) {
      //				console.log(_this.polyline.getMap(),'_this.polyline.getMap()')
      //				
      //				_this.polyline.setMap(null);
      //				console.log('--------------')
      //
      //			}

    },

    /**
     * 指数指标    
     */
    exponentList(id) {

      specialTourismApi.apiFrontScenicIndexList(
        this.exponent.group,
        this.exponent.size,
        this.exponent.start,
        id,
        this.targetType
      ).then(res => {

        this.exponentData = res.body;
        this.exponentData.forEach(item => {
          //给每一条道路添加一个字段用来装对应道路的图片路径
          item.roadImg = this.getIndexNameImg.getIndexNameImg(item.indexName);
        })

        if (this.exponentData.length > 0) {
          this.exponentDataLength = true;
        }

      }).catch(err => {
        console.log(err);
      })
    },
    /**
     * 根据国道的id值获取国道的详情=====经纬度等数据
     */
    getTrafficDetail(id) {

      specialTourismApi.apiFrontTrafficInfo(id).then(res => {
        console.log(res, '详情!!!!!!!!!!!!!!!')
        //清除地图上的marker
        this.clearOverlays(this.markers);
        //
        //				if(!res.body || !res.body.roadKeyList || res.body.roadKeyList.length <= 0) {
        //					return;
        //				}
        var mapDatas = res.body;
        for (var i in mapDatas.roadKeyList) {
          this.roadKeyLists = mapDatas.roadKeyList[i].meWarningList;
        }
        //   console.log()
        if (this.isFirstByParam) {

          setTimeout(function () {
            window.scrollTo(0, 800); //让页面跳转到指定的位置---滚动条
          }, 5)

          var _this = this;
          var roadlist = mapDatas.roadKeyList;

          for (var i = 0; i < roadlist.length; i++) {

            if (_this.$route.query.scienpointId == roadlist[i].scenicRoadKeyId) {
              _this.heights = roadlist[i].height;
              _this.roadKeyNames = roadlist[i].roadKeyName;
              _this.roadKeyName = roadlist[i].roadKeyName;
              _this.sunSettingTime = roadlist[i].sunSettingTime;
              _this.sunriseTime = roadlist[i].sunriseTime;
              //用来判断日出前面的时间是否是小于10的，如果小于10的话，在前面补0；
              //							var addsun = roadlist[i].sunriseTime;
              //							var addsunri = addsun.split(':');
              //							if(addsunri[0] < 10) {
              //								addsunri = '0' + addsunri;
              //							}
              //							var addsunrise = addsunri.split(',');
              //							_this.sunriseTime = addsunrise[0] + ':' + addsunrise[1];

              _this.latDefault = roadlist[i].lat;
              _this.lonDefault = roadlist[i].lon;

              // _this.getWarningLive(roadlist[i].scenicRoadKeyId, roadlist[i].lat, roadlist[i].lon); //调用预警的数据
              _this.mapIds = roadlist[i].scenicRoadKeyId;

              _this.getTHoursData(roadlist[i].scenicRoadKeyId); //获取24小时的数据
              _this.exponentList(roadlist[i].scenicRoadKeyId); //指数指标
              _this.getSevenDatas(roadlist[i].scenicRoadKeyId); //获取7天指数的数据
              _this.getScenicIndexList(roadlist[i].scenicRoadKeyId); //7天天气的指数
            }

          }

        } else {
          var _this = this
          console.log(mapDatas.roadKeyList, "sw")
          for (var i in mapDatas.roadKeyList) {
            _this.roadKeyLists = mapDatas.roadKeyList[i].meWarningList;
            var lat = mapDatas.roadKeyList[i].lat;
            var lon = mapDatas.roadKeyList[i].lon;

            //此处为调样式添加的固定数据，可删除
            // _this.roadKeyLists[0].name = '暴雨'
            // _this.roadKeyLists[1].name = '大暴雨'

            for (var j in _this.roadKeyLists) {
              var cssCs = {
                color: colors,
                // fontSize: '20px',
                // fontWeight: 'bold',
                // backgroundColor: 'transparent',
                border: 'none',
                zIndex: '99'
              };
              var icons = _this.imgUrl + _this.roadKeyLists[j].icon;
              var colors = _this.roadKeyLists[j].color;
              var names = _this.roadKeyLists[j].name;

              //自定义标记的图标样式
              let anchor = new qq.maps.Point(25, 70 + 60 * parseInt(j));
              let size = new qq.maps.Size(50, 50);
              let scaleSize = new qq.maps.Size(76, 50);
              let origin = new qq.maps.Point(20, 0);
              let icon = new qq.maps.MarkerImage(icons, size,origin, anchor,scaleSize);
              var latlng = new qq.maps.LatLng(lat, lon);
              // 图片
              var marker = new qq.maps.Marker({
                position: latlng,
                map: _this.map,
                icon: icon,
              })
              // 字体
              var markerLabel = new qq.maps.Label({
                position: latlng,
                map: _this.map,
                content: names,
                style: cssCs,
                offset: new qq.maps.Size(30, -60 * j - 60, 15, 35), //-35, 15, 35   15, -5, 35
              });

              _this.markerS.push(marker, markerLabel);
            }
          }
          console.log(_this.markerS, "哈哈哈哈")

          // console.log(mapDatas.roadKeyList, 'roadlistroadlistroadlist')
          // this.wanrginName.forEach(item => {
          //       var stromname = item.name.trim()
          //       if (stromname == '暴风') {
          //         homeImg = homepage_warngalerainstorm;
          //       }
          //       if (stromname.trim() == '暴雨') {
          //         homeImg = homepage_warning_rainstorm;
          //       }
          //     })
          //     //自定义标记的图标样式
          //     let anchor = new qq.maps.Point(25, 60),
          //       size = new qq.maps.Size(60, 49),
          //       origin = new qq.maps.Point(0, 0),
          //       icon = new qq.maps.MarkerImage(homeImg, size, origin, anchor);
          //     var latlng = new qq.maps.LatLng(lat, lon)
          //     var marker = new qq.maps.Marker({
          //       position: latlng,
          //       map: this.map,
          //       icon: icon,
          //     })
          //     this.markerS.push(marker);


          //        console.log('fffffffffff')
          if (res.body.roadKeyList.length > 0) {
            this.heights = res.body.roadKeyList[0].height;
            this.roadKeyNames = res.body.roadKeyList[0].roadKeyName;
            this.roadKeyName = res.body.roadKeyList[0].roadKeyName;
            this.sunSettingTime = res.body.roadKeyList[0].sunSettingTime;
            this.sunriseTime = res.body.roadKeyList[0].sunriseTime;
            this.latDefault = res.body.roadKeyList[0].lat;
            this.lonDefault = res.body.roadKeyList[0].lon;

            this.mapIds = res.body.roadKeyList[0].scenicRoadKeyId;

            this.getTHoursData(res.body.roadKeyList[0].scenicRoadKeyId); //获取24小时的数据
            this.exponentList(res.body.roadKeyList[0].scenicRoadKeyId); //指数指标
            this.getSevenDatas(res.body.roadKeyList[0].scenicRoadKeyId); //获取7天指数的数据
            this.getScenicIndexList(res.body.roadKeyList[0].scenicRoadKeyId); //7天天气的指数
          }

          //用来判断日出前面的时间是否是小于10的，如果小于10的话，在前面补0；
          //					var addsun = res.body.roadKeyList[0].sunriseTime;
          //					var addsunri = addsun.split(':');
          //					if(addsunri[0] < 10) {
          //						addsunri = '0' + addsunri;
          //					}
          //					var addsunrise = addsunri.split(',');
          //					this.sunriseTime = addsunrise[0] + ':' + addsunrise[1];

        }

        //				for(var i = 0; i <= res.body.roadKeyList.length - 1; i++) {
        //
        //					this.getWarningLive(res.body.roadKeyList[i].scenicRoadKeyId, res.body.roadKeyList[i].lat, res.body.roadKeyList[i].lon); //调用预警的数据
        //
        //				}

        var latlngs = [];
        res.body.roadKeyList.forEach(item => {

          //用来判断日出前面的时间是否是小于10的，如果小于10的话，在前面补0；

          //					var addroad = item.sunriseTime;
          //					var addroads = addroad.split(':');
          //					if(addroads[0] < 10) {
          //						addroads = '0' + addroads;
          //					}
          //					var addroadrise = addroads.split(',');
          //					item.sunriseTime = addroadrise[0] + ':' + addroadrise[1];
          //

          if (item.lat && item.lon) {
            for (var i in this.roadKeyLists) {

              latlngs.push({
                lat: item.lat,
                lon: item.lon,
                name: item.roadKeyName,
                height: item.height,
                id: item.scenicRoadKeyId,
                sunSettingTime: item.sunSettingTime,
                sunriseTime: item.sunriseTime,
                //              colors: this.roadKeyLists[i].color,
              })
            }
          }
          // if (item.lat && item.lon) {
          //   latlngs.push({
          //     lat: item.lat,
          //     lon: item.lon,
          //     name: item.roadKeyName,
          //     height: item.height,
          //     id: item.scenicRoadKeyId,
          //     sunSettingTime: item.sunSettingTime,
          //     sunriseTime: item.sunriseTime
          //   })
          // }

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
        console.log(err)
      })
    },

    /**
     * 根据关键点的id指获取预警数据
    //  */
    // getWarningLive(id, lat, lon) {

    //   specialTourismApi.apiFrontMeAutoWarningLiveList(
    //     this.warningList.size,
    //     this.warningList.start,
    //     id,
    //     this.warningList.type
    //   ).then(res => {
    //     console.log(res,'====================')
    //     this.wanrginName = res.body;
    //     var homeImg = '';
    //     this.wanrginName.forEach(item => {
    //       var stromname = item.name.trim()
    //       if (stromname == '暴风') {
    //         homeImg = homepage_warngalerainstorm;
    //       }
    //       if (stromname.trim() == '暴雨') {
    //         homeImg = homepage_warning_rainstorm;
    //       }
    //     })
    //     //自定义标记的图标样式
    //     let anchor = new qq.maps.Point(25, 60),
    //       size = new qq.maps.Size(60, 49),
    //       origin = new qq.maps.Point(0, 0),
    //       icon = new qq.maps.MarkerImage(homeImg, size, origin, anchor);
    //     var latlng = new qq.maps.LatLng(lat, lon)
    //     var marker = new qq.maps.Marker({
    //       position: latlng,
    //       map: this.map,
    //       icon: icon,
    //     })
    //     this.markerS.push(marker);

    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },

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
     * 给地图描关键点的位置
     */
    mapMark(latlngs) {
      //    console.log(latlngs, 'latlngslatlngslatlngslatlngslatlngs')
      //清楚地图上的marker
      this.clearOverlays(this.markers);
      var infoWin = new qq.maps.InfoWindow({
        map: this.map
      });
      var map = this.map;
      //创建标记
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
        //自定义标记的图标样式
        let anchor = new qq.maps.Point(14, 14),
          size = new qq.maps.Size(28, 28),
          origin = new qq.maps.Point(0, 0),
          icon = new qq.maps.MarkerImage(public_local, size, origin, anchor);

        if (this.isFirstByParam) {

          if (this.$route.query.scienpointId == item.id) {
            icon = new qq.maps.MarkerImage(public_local_big, size, origin, anchor);

            cssC = {
              color: 'black',
              fontSize: '20px',
              fontWeight: 'bold',
              //							backgroundColor: 'transparent',
              //							border: 'none'
              zIndex: '99'
            };
          }

          // 标记点
          var latlng = new qq.maps.LatLng(item.lat, item.lon);
          var marker = new qq.maps.Marker({
            position: latlng,
            map: map,
            icon: icon,
            id: item.id,
            name: item.name
          });

          //标记文字
          var markerLabel = new qq.maps.Label({
            position: latlng,
            map: map,
            content: item.name,
            style: cssC,
            offset: new qq.maps.Size(-0, 15, 35), //-35, 15, 35   15, -5, 35
          });

          //判断标记高亮样式赋值
          if (this.$route.query.scienpointId == item.id) {
            this.highLightMarker = marker;
            this.highLightMarkerLabel = markerLabel;
          }

          this.markers.push(marker, markerLabel);
          this.markerLabelLable.push(markerLabel);

        } else {

          // 判断标记高亮样式 
          if (index == 0) {

            icon = new qq.maps.MarkerImage(public_local_big, size, origin, anchor);
            cssC = {
              color: 'black',
              fontSize: "20px",
              fontWeight: "bold",
              //							backgroundColor: 'transparent',
              //							border: 'none'
              zIndex: '99'
            };
          }
          //标记点
          var latlng = new qq.maps.LatLng(item.lat, item.lon);
          var marker = new qq.maps.Marker({
            position: latlng,
            map: map,
            icon: icon,
            name: item.name
          })
          // 标记的标注文字
          var markerLabel = new qq.maps.Label({
            position: latlng,
            map: map,
            content: item.name,
            style: cssC,
            offset: new qq.maps.Size(-35, 15, 35),
          })

          if (index == 0) {
            this.highLightMarker = marker;
            this.highLightMarkerLabel = markerLabel;
          }

          var _this = this;

          _this.markers.push(marker, markerLabel);
          _this.markerLabelLable.push(markerLabel);
        }
        var _this = this;
        /**
         * 监听标记的鼠标点击事件
         */
        qq.maps.event.addListener(marker, 'click', function () {
          infoWin.setPosition(latlng);

          _this.roadKeyName = marker.name;

          if (_this.highLightMarker) {
            _this.highLightMarker.setIcon(new qq.maps.MarkerImage(public_local, size, origin, anchor));
          }
          _this.highLightMarker = marker;
          marker.setIcon(new qq.maps.MarkerImage(public_local_big, size, origin, anchor));

          _this.mapIds = item.id;
          _this.getTrafficCondition(item.id, item.height, item.name, item.sunriseTime, item.sunSettingTime); //获取到国道对应的天气实况的数据
          _this.getTHoursData(item.id); //24小时数据
          _this.exponentList(item.id);
          _this.getSevenDatas(item.id); //7天数据
          _this.getScenicIndexList(item.id); //调用7天指数

        });

        /**
         * 监听标记的鼠标移入事件
         */
        qq.maps.event.addListener(marker, 'mouseover', function () {
          infoWin.setPosition(latlng);

          _this.condiflag = false; //小窗口的动画判断
          _this.nulls = false;
          _this.roadKeyNames = marker.name;
          setTimeout(function () {

            _this.getTrafficConditions(item.id); //获取到国道对应的天气实况的数据_小窗口

          }, 1000);

          if (_this.highLightMarker) {

            _this.highLightMarker.setIcon(new qq.maps.MarkerImage(public_local, size, origin, anchor));
            _this.highLightMarkerLabel.setStyle({
              color: 'black',
              fontSize: '14px',
              fontWeight: 'bold',
              //							backgroundColor: 'transparent',
              //							border: 'none'
              zIndex: '99'

            });
          }
          _this.highLightMarker = marker;
          marker.setIcon(new qq.maps.MarkerImage(public_local_big, size, origin, anchor));

          for (var i = 0; i < _this.markerLabelLable.length; i++) {

            if (item.name == _this.markerLabelLable[i].content) {
              _this.markerLabelLable[i].setStyle({
                color: 'black',
                fontSize: '20px',
                fontWeight: 'bold',
                //								backgroundColor: 'transparent',
                //								border: 'none'
                zIndex: '99'
              })
            } else {
              _this.markerLabelLable[i].setStyle({
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

      })
    },
    //给获取到的经纬度颜色描块
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
     * 创建一个地图的实例
     */
    createMap() {

      var _this = this;
      var cityLocation, map, marker = null;

      var center = new qq.maps.LatLng(this.latDefault, this.lonDefault);
      var sw = new qq.maps.LatLng(32.66414, 104.03138); //东北角坐标
      var ne = new qq.maps.LatLng(31.21490, 100.65326); //西南角坐标
      var latlngBounds = new qq.maps.LatLngBounds(ne, sw);
      _this.map = new qq.maps.Map(document.getElementById('mapSiteTraffic'), {
        center: center,
        zoom: 8,
        boundary: latlngBounds,
        minZoom: 6, //minZoom设置地图最小的缩放级别
        maxZoom: 9, //maxZoom设置地图最大的缩放级别

        //						      panControl: false,
        //						      zoomControl: false,
        //						      scaleControl: false,
        //						      draggable: false
      })
    },
    /**
     * 获取到国道对应的天气实况的数据_小窗口
     */
    getTrafficConditions(id) {

      specialTourismApi.apiFrontMeLiveInfo(
        id,
        this.targetType
      ).then(res => {
        this.condiflag = true; //小窗口的动画判断
        this.conditionDatas = res.body;
        if (res.body == '' || res.body.length == []) {
          this.nulls = false;
        } else {
          this.nulls = true;
        }
      }).catch(err => {
        console.log(err)
      })
    },
    /**
     * 获取到国道对应的天气实况的数据_显示下面的详情数据
     */
    getTrafficCondition(id, height, name, sunriseTime, sunSettingTime) {
      this.condiflag = true; //小窗口的动画判断
      this.heights = height;
      this.sunriseTime = sunriseTime;
      this.sunSettingTime = sunSettingTime;

      specialTourismApi.apiFrontMeLiveInfo(
        id,
        this.targetType
      ).then(res => {

        this.conditionData = res.body;
        if (res.body == '' || res.body.length == []) {
          this.nulls = false;
        } else {
          this.nulls = true;
        }
      }).catch(err => {
        console.log(err)
      })
    },
    /**
     * 获取当前显示的时间数据
     */
    getCurrentTime() {
      specialTourismApi.apiFrontDateTimeInfo().then(res => {
        this.WeatherFactTimeData = res.body.substring(10, 16);
      }).catch(err => {
        console.log(err)
      })
    },
    /**
     * 获取7天天气预报的数据
     */
    getSevenDatas(id) {
      specialTourismApi.apiFrontMePredictionList(
        this.MePredictionLists.size,
        this.MePredictionLists.start,
        id,
        this.targetType
      ).then(res => {

        this.sevenData = [];
        for (var i = 0; i < res.body.length; i++) {
          this.sevenData.push(res.body[i]);
        }

        var that = this;
        //这里循环是用来判断天气对应的图标的路径，调用的方法来判断

        that.sevenData.forEach(item => {
          item.weatherImg = that.getWeather.getWeather(item.weather)
          item.weatherNightImg = that.getNightImg.getNightImg(item.weather)
        })

        let days = [];
        let newdays = [];
        let week = [];
        let weeks = [];
        var aa = [];
        for (var i = 0; i < that.sevenData.length; i++) {

          that.sevenData[i].daysDate = (that.sevenData[i].date.substring(5, 7)) + '/' + (that.sevenData[i].date.substring(8, 11));
          aa = that.sevenData[i].direction.split(' ')
          that.sevenData[i].direction = aa[1]
          // 根据日期判断是星期几
          days = that.sevenData[i].date.substring(0, 11);
          newdays = new Date(Date.parse(days.replace(/\-/g, "/")));
          week = newdays.getDay();

          if (week == '0') {
            weeks = '周天';
          } else if (week == '1') {
            weeks = '周一';
          } else if (week == '2') {
            weeks = '周二';
          } else if (week == '3') {
            weeks = '周三';
          } else if (week == '4') {
            weeks = '周四';
          } else if (week == '5') {
            weeks = '周五';
          } else if (week == '6') {
            weeks = '周六';
          } else {
            console.log('输入错误');
          }
          that.weekFewData.push(weeks);
        }

      }).catch(err => {
        console.log(err)
      })
    },
    /**
     * 点击24小时天气预报名字
     */
    hoursTitleClick() {
      this.hoursTitle = true;
      this.dayTitle = false;
      if (this.mapIds) {
        this.getTHoursData(this.mapIds) //24小时天气预报列表
      }

    },
    /**
     * 点击7天天气预报名字
     */
    dayTitleClick() {
      this.dayTitle = true;
      this.hoursTitle = false;
    },
    //滚动条监听内容事件，强行渲染数据
    changeScroll() {
      var _this = this;
      var timer = ''
      timer = setInterval(function () {
        _this.scrollnumber++
        _this.numberHalf = _this.scrollnumber % 2;
        if (_this.scrollnumber === 1) {
          clearInterval(timer)
        }
        _this.hoursTitleClick();
        _this.$forceUpdate();
      }, 1000)
    },
    /**
     * 获取24小时的数据
     */
    getTHoursData(id) {

      this.temperatures = []; //折线图里的数据
      this.hoursDates = [];
      specialTourismApi.apiFrontMePredictionNowList(
        id,
        this.targetType
      ).then(res => {

        this.tHoursData = res.body.list;
        var dates = [];
        var that = this;

        that.tHoursData.forEach(item => {
          dates = item.date.substring(10, 16);
          that.hoursDates.push(dates);
          that.temp = item.temperatureMax;
          that.temperatures.push(item.temperatureMax);
          //给每一条小时数据添加一个字段用来装对应天气的图片路径
          that.getWeathers.push(item.weather);
          item.weathers = that.getWeather.getWeather(item.weather);

        })

        for (var i = 0; i < that.tHoursData.length; i++) {
          /**截取空格左边和右边的字符串 */
          let direction = that.tHoursData[i].direction.split(' ');
          that.tHoursData[i].directions = direction[0];
          that.tHoursData[i].directionsLevel = direction[1];
        }

        if (that.tHoursData.length) {
          that.width = that.tHoursData.length * 150;
        } else {
          that.width = 1200;
        }

        that.drawLine(); //绘画折线图----天气折线图

      }).catch(err => {
        console.log(err)
      })
    },
    /**
     * 设置24小时的宽度
     */
    changeHoursWeather() {
      return {
        'width': this.width + 'px',
      }
    },
    /**
     * 折线图的宽度以及高度
     */
    changedrawLine() {
      return {
        'width': this.width + 'px',
      }

    },
    /**
     * 绘画折线图----天气折线图
     */
    drawLine() {

      let myCharts = this.$echarts.init(document.getElementById("myCharts"));
      let xdata = this.hoursDates;
      let listdata = this.temperatures;

      let option = {
        grid: { //网格
          left: '0',
          right: '0',
          top: '25px',
          bottom: '10px',
          containLabel: true,
        },
        xAxis: {
          data: xdata,
          axisLabel: {
            show: false, //坐标轴刻度标签的相关设置
          },
          splitLine: {
            show: false, // 控制网格线是否显示
          },
          axisLine: {
            show: false, //  隐藏坐标轴
          },
          axisTick: {
            show: false, // 去除坐标轴上的刻度线
          },
          lineStyle: {
            color: 'none', //x轴参考线颜色隐藏
          },
        },
        yAxis: {
          axisLabel: {
            show: false, //坐标轴刻度标签的相关设置
          },
          splitLine: {
            show: false, // 控制网格线是否显示
          },
          axisLine: {
            show: false, //  隐藏坐标轴
          },
          axisTick: {
            show: false, // 去除坐标轴上的刻度线
          },
          lineStyle: {
            color: 'none' //x轴参考线颜色隐藏
          },
        },
        series: [{
          type: 'line',
          data: listdata,
          symbolSize: 8, //设定实心点的大小
          itemStyle: {
            normal: {
              label: {
                show: true,
                fontSize: 16,
                fontFamily: "微软雅黑",
                formatter: '{c0}℃',
              },
              color: '#fff', //折点外面的圈
              lineStyle: {
                color: '#94D1FF' //折线的颜色
              }
            }
          }
        }],
      }

      myCharts.setOption(option);
    }

  },
  created: function () {

  },
  mounted: function () {
    //			this.htmlWatcher()
    TMap().then(qq => {

      this.createMap();
      this.getTrafficData(); //调用获取交通气象的国道数据----第一部分方法
      this.getCurrentTime(); //调用获取当前显示的时间数据方法
      //			this.changeScroll(); //调用滚动条监听内容事件，强行渲染数据方法
    })
  },

}
