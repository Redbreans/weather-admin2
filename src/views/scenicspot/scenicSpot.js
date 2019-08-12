import * as Api from '@/api/api.js';
import public_local from "@/assets/images/public_local.png";
import public_local_big from "@/assets/images/gif.gif";

import {
  TMap
} from '@/TMap.js';
/*
 *景区天气
 */
export default {
  data() {
    return {
      defaultclick: {},
      markers: [], //地图标记
      isHomeShow: 1, //景区评级
      qq: {}, //异步回调函数
      map: {}, //新建地图
      latlngList: [], //经纬度获取到的数据
      indexName: 0, //初始显示第0位的名字
      nameShowData: [], //【景区评级列表】返回的数据
      scenicAreaId: 0, //【景区列表】景区评级id	
      size: 30, //【景区列表】 数量	
      sortField: '', //【景区列表】 排序字段	
      sortType: '', //【景区列表】 排序类型	
      start: 0, //【景区列表】 开始位置	
      scenicAreaData: [], //【景区列表】返回的数据
      index: '', //默认初始
      parentId: '', //获取地图的值
      // TMapData: [], //获取地图的值
      poi: [], //获取地图经纬度的值
      group: 'meteorology', //景点分类列表_分组,meteorology:气象景观;travel:特色旅游
      image: require('../../assets/images/public_index1.png'),
      scenicAreaIds: [], //具体景区名字id
      targetId: '', //天气实况详情id
      targetType: 'scenicArea', //天气实况详类型
      WeatherFactData: [], //天气实况返回的数据
      WeatherFactDatas: [], //小窗口天气实况数据
      WeatherFactTimeData: [], //获取时间详情返回数据
      hoursForecastData: [], //当天24小时天气预报列表数据
      mapNames: '', //景区(右侧数据)获取的名字
      mapIds: '', //景区(右侧数据)获取的ID
      hoursDates: [], //当天24小时天气预报里获取的时间
      temperatures: [], //当天24小时天气预报里获取的温度
      temp: '', //当天24小时天气预报列表温度
      width: '', //动态获取宽度（横向滚动条）
      daysForecastData: [], //7天天气预报列表数据
      // daysDate: [], //7天天气预报时间 几月几日
      weekFewData: [], //7天天气预报时间 星期几
      exponent: {
        group: 'life', // 指数初始_分组;life: 生活； travel： 旅游； traffic： 交通
        size: -1, // 指数初始_数量
        start: -1, // 指数初始_开始位置
        targetId: '', // 指数初始_目标id
        type: 'scenicArea', //类型:road:道路；scenicArea：景区	
      },
      exponentData: [], //指数返回的数据
      daysExponentData: [], //7天天气的指数返回的数据
      // mouseScenic: true, //控制鼠标移入显示为false
      currScenicLevelId: 0, //景区等级分类id

      display: 'none', //显示与隐藏（7天天气预报指标）
      // seen: false, //显示与隐藏（7天天气预报指标）
      WeatherFactsName: '', //鼠标移动显示实况（小窗口）的名字
      isFirstByParam: false, //是否 是首次请求且是传参进入的界面
      highLightMarker: undefined, //高亮标记点
      highLightMarkerLabel: undefined, //高亮标记文本
      timer: null, //定时器
      imgUrl: this.getImgUrl.readImageUrl, //配置的全局图片url地址
      imgBannerData: [], //装轮播图片的数据
      mark: 0, //轮播图片默认值
      flage: true, //鼠标移入第一次判断天气实况效果
      nulls: true, //判断实况是否有数据而需要渲染的数据
      hoursTitle: true, //未来24小时天气预报名字点击效果
      dayTitle: false, //未来7天天气预报名字点击效果
      exponentDataLength: false, //未来24小时天气预报指数显示判断
      daysExponentDataLength: false, //未来7天天气预报指数显示判断
      markerLabelLable: [], //标记文本的push数据
      scenicAreaIdOne: '', //取列表0位的id
      scrollnumber: 0, //滚动条监听内容事件，强行渲染数据_数字++
      numberHalf: 0, //滚动条监听内容事件，强行渲染数据_数字求余
      jumps: -1, //定义从其他页面传过来的值
      jumpsTwo: -1,
      newmapList: [], //
      secNewmapList: [],
      clickLat: 0,
      clickLon: 0,
      clickName: '',
      datasFromback: [],
      sunriseOnvue: '',
      sunoutOnvue: '',
      heightOnvue: 0,
      senicarealist: {
        scenicAreaId: "",
        size: -1,
        sortField: "",
        sortType: "DESC",
        start: -1
      },
      mepredion: { //7天天气预报
        size: 7,
        start: 0
      },
      conentShow: false,

    }
  },

  methods: {

    /**
     * 景区评级等级列表
     */
    ScenicSpotRatingList() {
      var _this = this;
      Api.apiFrontScenicAreaLevelList(
        this.isHomeShow
      ).then(res => {
        _this.nameShowData = res.body || [];

        //				_this.nameShowData.forEach(item => {
        //					if(item.name == "AAAAA") {
        //						item.names = "5A景区";
        //					} else if(item.name == "AAAA") {
        //						item.names = "4A景区";
        //					} else if(item.name == "AAA") {
        //						item.names = "3A景区";
        //					} else {}
        //				});

        for (let j = 0; j < _this.nameShowData.length; j++) {
          Api.apiFrontScenicAreaList( //应该是景区模块
            _this.nameShowData[j].scenicLevelId,
            _this.size,
            _this.sortField,
            _this.sortType,
            _this.start
          ).then(res => {

            if (res.body.length == 0) {
              _this.nameShowData.splice(j, 1);
              //_this.nameShowData[j].show = false;
              _this.$forceUpdate()
              //						}else{
              //							_this.nameShowData[j].show = true;
              //						}
            }
          })
        }

        if (!_this.scenicAreaId) {
          _this.scenicAreaId = _this.nameShowData[0].scenicLevelId;
        }
        let newId = _this.scenicAreaId;
        if (_this.$route.query.homeIdss) {
          newId = _this.$route.query.homeIdss;
          _this.isFirstByParam = true;
        }
        _this.switchName(newId); // 调用名字点击分类方法
      }).catch(err => {
        console.log(err);
      })
    },
    /**
     * 景区列表
     */
    scenicAreaList(id) {
      Api.apiFrontScenicAreaList( //应该是景区模块
        id,
        this.size,
        this.sortField,
        this.sortType,
        this.start
      ).then(res => {
        this.scenicAreaData = res.body;
        let bodys = this.scenicAreaData;

        //清除地图上的marker标记
        this.clearOverlays(this.markers);
        this.clearOverlays(this.markerLabelLable);
        if (bodys != null && bodys.length > 0) {
          this.conentShow = true;
          if (this.isFirstByParam) {
            for (var i = 0; i < bodys.length; i++) {
              if (this.$route.query.homeWeatherId == bodys[i].scenicAreaId) {
                this.weatherDetails(bodys[i].scenicAreaId, bodys[i].name, bodys[i].mapName); //调用点击右侧景区名字显示对应的id方法
                this.WeatherFact(bodys[i].scenicAreaId, bodys[i].name, bodys[i].mapName); //调用天气实况详情
                this.WeatherFacts(bodys[i].scenicAreaId, bodys[i].name, bodys[i].mapName); //调用天气实况详情(鼠标移动后)
                this.imgBannerData = [];
                this.imgBannerData.push(bodys[i].coverFileId); // 轮播

                setTimeout(function () {
                  window.scrollTo(0, 900); //让页面跳转到指定的位置---滚动条
                }, 10)
                this.isFirstByParam = false;
                // console.log(this.isFirstByParam, "if--------------");
              }
            }
          } else {
            //	console.log(bodys[0].scenicAreaId, bodys[0].name, bodys[0].mapName, "else---------------");

            this.weatherDetails(bodys[0].scenicAreaId, bodys[0].name, bodys[0].mapName); //调用点击右侧景区名字显示对应的id方法
            this.WeatherFact(bodys[0].scenicAreaId, bodys[0].name, bodys[0].mapName); //调用天气实况详情
            this.WeatherFacts(bodys[0].scenicAreaId, bodys[0].name, bodys[0].mapName); //调用天气实况详情(鼠标移动后)
            this.imgBannerData = [];
            this.imgBannerData.push(bodys[0].coverFileId); // 轮播
            // this.scenicAreaIdOne=bodys[0].scenicAreaId;//取列表0位的id
            this.sunriseOnvue = bodys[0].sunriseTime
            this.sunoutOnvue = bodys[0].sunSettingTime
            this.heightOnvue = bodys[0].height
          }
          let latlngs = [];
          for (var i = 0; i < bodys.length; i++) {

            this.scenicAreaIds = bodys[i].scenicAreaId;
            this.scenicAreaData.height = bodys[i].height;
            this.scenicAreaData.sunriseTime = bodys[i].sunriseTime;
            this.scenicAreaData.sunSettingTime = bodys[i].sunSettingTime;
            // this.scenicAreaData.coverFileId=bodys[i].coverFileId;//封面id

            //						if(bodys[i].scenicLevelName == "AAAAA") {
            //							bodys[i].scenicLevelNames = "5A";
            //						} else if(bodys[i].scenicLevelName == "AAAA") {
            //							bodys[i].scenicLevelNames = "4A";
            //						} else if(bodys[i].scenicLevelName == "AAA") {
            //							bodys[i].scenicLevelNames = "3A";
            //						} else {}

            if (bodys) {
              if (bodys[i].lat && bodys[i].lon) {
                latlngs.push({
                  lon: bodys[i].lon,
                  lat: bodys[i].lat,
                  name: bodys[i].name,
                  mapnames: bodys[i].mapName,
                  id: bodys[i].scenicAreaId,
                  index: i,
                  coverFileId: bodys[i].coverFileId
                })
              }
            }
          }
          this.mapMark(latlngs);
        }
      }).catch(err => {
        console.log(err);
      })
    },
    //滚动条监听内容事件，强行渲染数据
    changeScroll() {
      var _this = this;
      var timer = ''
      var maxTimes = 20;
      timer = setInterval(function () {
        if (_this.mapIds) {
          _this.scrollnumber++
          _this.numberHalf = _this.scrollnumber % 2;
          if (_this.scrollnumber === 1) {
            clearInterval(timer)
          }
          _this.hoursTitleClick(); // mapIds
          _this.$forceUpdate();
        }
        maxTimes--;
        if (maxTimes < 0) {
          clearInterval(timer)
        }
      }, 1000)
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
      if (this.mark == this.imgBannerData.length) {
        this.mark = 0
      }
    },
    /**
     * 点击24小时天气预报名字
     */
    hoursTitleClick() {
      this.hoursTitle = true;
      this.dayTitle = false;
      this.hoursForecast(this.mapIds) //24小时天气预报列表
    },
    /**
     * 点击7天天气预报名字
     */
    dayTitleClick() {
      this.dayTitle = true;
      this.hoursTitle = false;
    },
    /**
     * 点击名字分类切换
     */
    switchName(id) {
      this.flage = true;
      this.scenicAreaId = id;
      this.jumpsTwo++;
      this.scenicAreaList(this.scenicAreaId); //调用景区列表  
      this.WeatherFactDatas = [];
      this.WeatherFactsName = '';
      //			this.WeatherFactData = [];
      //			this.senicnames = '';
      //			this.mapNames = '';
      //			this.WeatherFactTimeData = '';
      //			this.sunriseOnvue ='';
      //			this.sunoutOnvue = '';
      //			this.hoursForecastData =[];
      //			this.exponentData =[];
      this.conentShow = false;
      //下面这个代码是处理折线图的bug
      this.dayTitleClick();
      var _this = this
      setTimeout(function () {
        _this.hoursTitleClick();
      }, 1000)

    },
    /**
     * 点击右侧景区名字显示对应的id//
     */
    weatherDetails(id, name, coverFileId, mapName) {
      //			console.log(id, name, mapName, "数值")
      this.targetId = id;
      this.clickName = name;
      this.WeatherFact(id, name, mapName); //调用天气实况详情
      this.WeatherFacts(id, name, mapName); //调用天气实况详情(鼠标移动后)
      this.WeatherFactTime(); //调用获取时间详情
      this.hoursForecast(id); //调用24小时天气预报
      this.daysForecastData = []; //每次点击切换景区名字时把装7天天气的数据清空
      this.daysForecast(id); //调用7天天气预报
      this.exponentList(id); //调用指数
      this.daysExponentList(id); //调用7天天气预报指数
      this.imgBannerData = [];
      this.imgBannerData.push(coverFileId);
      //this.defaultclick.click()
    },
    /**
     * 指数列表    
     */
    exponentList(id) {
      Api.apiFrontScenicIndexList(
        this.exponent.group,
        this.exponent.size,
        this.exponent.start,
        id,
        this.exponent.type
      ).then(res => {
        this.exponentData = [];
        for (var i = 0; i < res.body.length; i++) {
          if (res.body[i].scenicIndexGroup == 'life' || res.body[i].scenicIndexGroup == 'travel') {
            this.exponentData.push(res.body[i]);
          } else {
            console.log('错误!');
          }
        }
        //这里循环是用来调用判断指数对应的图片路径，并且添加相应的字段来转图片路径
        this.exponentData.forEach(item => {
          item.indexImg = this.getIndexNameImg.getIndexNameImg(item.indexName)
        })
        if (this.exponentData.length > 0) {
          this.exponentDataLength = true;
        }
      }).catch(err => {
        console.log(err);
      })
    },
    /**
     * 7天列表（7天天气预报指数）
     */
    daysExponentList(id) {
      //console.log(id,'id')
      Api.apiFrontScenicIndexPredictionlist(
        this.exponent.group,
        this.exponent.size,
        this.exponent.start,
        id,
        this.exponent.type
      ).then(res => {

        for (var i = 0; i < res.body.length; i++) {
          if (res.body[i].scenicIndexGroup == 'life' || this.daysExponentData[i].scenicIndexGroup == 'travel') {
            var aa = res.body[i].indexDateTime.substring(5, 7) + '/' + res.body[i].indexDateTime.substring(8, 11)
            res.body[i].indexDateTimeNew = aa.replace(/\s/g, "");
          } else {
            console.log('错误!');
          }
        }
        this.daysExponentData = res.body;
        if (this.daysExponentData.length > 0 || !this.daysExponentData.length == [] || !this.daysExponentData.length == '') {
          this.daysExponentDataLength = true;
        }
      }).catch(err => {

      })

    },

    /*
     * 7天天气预报列表数据
     */
    daysForecast(id) {
      Api.apiFrontMePredictionList(
        this.mepredion.size,
        this.mepredion.start,
        id,
        this.targetType
      ).then(res => {

        this.daysForecastData = [];
        for (var i = 0; i < res.body.length; i++) {
          this.daysForecastData.push(res.body[i]);
        }
        //	console.log(this.daysForecastData,'daysForecastData')
        //这里循环是用来判断天气对应的图标的路径，调用的方法来判断
        this.daysForecastData.forEach(item => {
          item.weatherImg = this.getWeather.getWeather(item.weather)
          item.weatherNightImg = this.getWeather.getNightImg(item.weather)
          console.log()
        })
        let days = [];
        let newdays = [];
        let week = [];
        let weeks = [];
        let aa = [];
        for (var i = 0; i < this.daysForecastData.length; i++) {

          this.daysForecastData[i].daysDate = (this.daysForecastData[i].date.substring(5, 7)) + '/' + (this.daysForecastData[i].date.substring(8, 11));
          aa = this.daysForecastData[i].direction.split(' ');
          this.daysForecastData[i].direction = aa[1];
          // 根据日期判断是星期几
          days = this.daysForecastData[i].date.substring(0, 11);
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
          this.weekFewData.push(weeks);
        }
      }).catch(err => {
        console.log(err);
      })
    },
    /**
     * 当天24小时天气预报列表数据
     */
    hoursForecast(id) {
      if (!id) {
        return;
      }
      this.hoursDates = [];
      this.temperatures = [];
      Api.apiFrontMePredictionNowList(
        id,
        this.targetType
      ).then(res => {
        // this.hoursForecast=true;
        this.hoursForecastData = res.body.list;
        let dates = [];
        for (var i = 0; i < this.hoursForecastData.length; i++) {
          dates = this.hoursForecastData[i].date.substring(10, 16);

          this.hoursForecastData[i].weathers = this.getWeather.getWeather(this.hoursForecastData[i].weather); //调用天气图片判断的封装方法
          this.hoursDates.push(dates);
          this.temp = this.hoursForecastData[i].temperatureMax;
          this.temperatures.push(this.temp);
          /**截取空格左边和右边的字符串 */
          let direction = this.hoursForecastData[i].direction.split(' ');
          this.hoursForecastData[i].directions = direction[0];
          this.hoursForecastData[i].directionsLevel = direction[1];
          this.$forceUpdate();
        }
        this.drawLine(); //调用Echarts折线插件
        if (this.hoursForecastData.length) {
          this.width = this.hoursForecastData.length * 150;
        } else {
          this.width = 1200;
        }
        this.$forceUpdate();
      }).catch(err => {
        console.log(err);
      })
    },
    /**
     * 天气插件方法
     */
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myCharts'));

      let xdata = this.hoursDates
      let listdata = this.temperatures;
      let temp = this.temp;
      // 指定图表的配置项和数据
      let option = {
        // tooltip: {
        //   trigger: 'axis',
        //   formatter: '{c0}℃'
        // },
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
          name: temp,
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
              },
            }
          }
        }],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    /**
     * 滚动条框宽度动态设置
     */
    changeHoursWeather() {
      return {
        'width': this.width + 'px',
      }
    },
    /**
     * 折线图宽度动态设置
     */
    changeHoursWeatherMyCharts() {
      return {
        'width': this.width + 'px',
        'height': '138px'
      }
    },
    /**
     * 天气实况详情数据
     */
    WeatherFact(id, name, mapname) {
      this.mapIds = id;
      this.mapNames = mapname;
      this.senicnames = name;
      Api.apiFrontMeLiveInfo(
        id,
        this.targetType
      ).then(res => {
        this.WeatherFactData = res.body;
        if (res.body.length <= 0) {
          return;
        }
        // 截取字段，保留一位小数
        // this.WeatherFactData.temperature=(parseFloat(this.WeatherFactData.temperature)).toFixed(1);
        this.WeatherFactData.temperature = Number((this.WeatherFactData.temperature).toString().match(/^\d+(?:\.\d{0,1})?/))
        //				var sun = document.getElementById("suncircle");
        //					var suns = document.getElementsByClassName("sun")[0];
        //				
        //				var x = 0;
        //				var y = '';
        //				var arr = [];
        //				var i = 0 ;
        //				var timer = setInterval(function aa() {
        //					x += 0.00439;
        //					i++;
        //					y = Math.sqrt(-(79 - x) * (79 - x) + 79 * 79);
        //					var y1=-y
        //					sun.style.transform = "translateY" + "(" +y1 + "px)" + "translateX" + "(" + x + "px)";
        //				    arr[i] = document.createElement('div');
        //				    arr[i].style.background = 'yellow';
        //				    arr[i].style.position = 'absolute';
        //				    arr[i].style.height = y +'px';
        //				    arr[i].style.width = '1px';
        //				    arr[i].style.left = x +'px';
        //				     arr[i].style.bottom = '0';
        //				    suns.appendChild(arr[i]);
        //				    
        //				}, 1000)
        //				
        //				if(x == 158) {
        //					clearInterval(timer)
        //				}
      }).catch(err => {
        console.log(err);
      })
    },
    /**
     * 天气实况详情数据(鼠标移动后)
     */
    WeatherFacts(id, name) {
      var _this = this;
      _this.WeatherFactsName = name;
      _this.WeatherFactDatas = [];

      Api.apiFrontMeLiveInfo(
        id,
        this.targetType
      ).then(res => {
        _this.WeatherFactDatas = res.body;
        if (res.body.length <= 0) {
          return;
        }
        _this.flage = true;
        if (_this.WeatherFactDatas.length != '' || _this.WeatherFactDatas.length != []) {
          _this.nulls = true;
        } else {
          _this.nulls = false;
        }
        // 截取字段，保留一位小数
        // _this.WeatherFactData.temperature=(parseFloat(this.WeatherFactData.temperature)).toFixed(1);
        // _this.WeatherFactDatas.temperature = Number((_this.WeatherFactDatas.temperature).toString().match(/^\d+(?:\.\d{0,1})?/))

      }).catch(err => {
        console.log(err);
      })
    },
    /**
     * 获取时间详情数据
     */
    WeatherFactTime() {
      Api.apiFrontDateTimeInfo().then(res => {
        this.WeatherFactTimeData = res.body.substring(10, 16);
      }).catch(err => {
        console.log(err);
      })
    },
    /**
     * 清空标记
     */
    clearOverlays(overlays) {
      var overlay;
      while (overlay = overlays.pop()) {
        overlay.setMap(null);
      }
    },

    /**
     * 地图标记添加
     */
    mapMark(latlngs) {
      var map = this.map;
      //标记提示窗
      var infoWin = new qq.maps.InfoWindow({
        map: map
      });
      latlngs.forEach((item, index) => {

        //自定义标记的图标样式
        let bigImageOptions = {
          size: new qq.maps.Size(40, 70), //自定义图片大小
          origin: new qq.maps.Point(0, 0), //显示区域
          anchor: new qq.maps.Point(30, 70), //坐标点
        };
        let smallImageOptions = {
          size: new qq.maps.Size(29, 36),
          origin: new qq.maps.Point(0, 0),
          anchor: new qq.maps.Point(20, 44),
        };
        let icon = new qq.maps.MarkerImage(public_local, smallImageOptions.size, smallImageOptions.origin, smallImageOptions.anchor);

        let cssC = {
          color: 'black',
          fontSize: '14px',
          fontWeight: 'bold',
          backgroundColor: 'transparent',
          border: 'none'
        };
        let flageHomeWeatherId = false;
        // 判断标记点高亮样式
        if (this.$route.query.homeWeatherId && this.jumps === 0 && this.jumpsTwo === 0) {

          if (this.$route.query.homeWeatherId == item.id) {
            // console.log(item.name,"跳转页面name-------------");
            icon = new qq.maps.MarkerImage(public_local_big, bigImageOptions.size, bigImageOptions.origin, bigImageOptions.anchor);
            cssC = {
              color: 'black',
              fontSize: '20px',
              fontWeight: 'bold',
              backgroundColor: 'transparent',
              border: 'none'
            };
          }
          // else{
          //   if (index == 0) {
          //     console.log(item.name,"index-------------");
          //     icon = new qq.maps.MarkerImage(public_local_big, bigImageOptions.size, bigImageOptions.origin, bigImageOptions.anchor);

          //     cssC = {
          //       color: 'black',
          //       fontSize: '20px',
          //       fontWeight: 'bold',
          //       backgroundColor: 'transparent',
          //       border: 'none'
          //     };
          //   }
          // }

          // 标记点
          var latlng = new qq.maps.LatLng(item.lat, item.lon);
          var marker = new qq.maps.Marker({
            position: latlng,
            map: map,
            icon: icon,
            id: item.id,
          });

          //标记文字
          var markerLabel = new qq.maps.Label({
            position: latlng,
            map: map,
            content: item.name,
            style: cssC,
            offset: new qq.maps.Size(10, -30, -15),
          });

          //判断标记高亮样式赋值
          if (this.$route.query.homeWeatherId == item.id) {
            this.highLightMarker = marker;
            this.highLightMarkerLabel = markerLabel;
          }

          this.markers.push(marker, markerLabel);
          this.markerLabelLable.push(markerLabel);

        } else {

          if (index == 0) {
            icon = new qq.maps.MarkerImage(public_local_big, bigImageOptions.size, bigImageOptions.origin, bigImageOptions.anchor);

            cssC = {
              color: 'black',
              fontSize: '20px',
              fontWeight: 'bold',
              backgroundColor: 'transparent',
              border: 'none'
            };
          }

          // 标记点
          var latlng = new qq.maps.LatLng(item.lat, item.lon);
          var marker = new qq.maps.Marker({
            position: latlng,
            map: map,
            icon: icon,
            id: item.id,
          });

          //标记文字
          var markerLabel = new qq.maps.Label({
            position: latlng,
            map: map,
            content: item.name,
            style: cssC,
            offset: new qq.maps.Size(10, -30, -15),
          });

          //判断标记高亮样式赋值
          if (index == 0) {
            this.highLightMarker = marker;
            this.highLightMarkerLabel = markerLabel;
          }

          this.markers.push(marker, markerLabel);
          this.markerLabelLable.push(markerLabel);

        }

        /**
         * 监听标记的点击事件
         */
        var _this = this;

        qq.maps.event.addListener(marker, 'click', function () {

          infoWin.setPosition(latlng);

          _this.weatherDetails(item.id, item.name, item.coverFileId, item.mapnames);

          if (_this.highLightMarker) {
            _this.highLightMarker.setIcon(new qq.maps.MarkerImage(public_local, smallImageOptions.size, smallImageOptions.origin, smallImageOptions.anchor));
          }
          _this.highLightMarker = marker;
          marker.setIcon(new qq.maps.MarkerImage(public_local_big, bigImageOptions.size, bigImageOptions.origin, bigImageOptions.anchor));

        });

        /**
         * 监听标记点的鼠标移入事件
         */
        qq.maps.event.addListener(marker, 'mouseover', function () {
          infoWin.setPosition(latlng);

          _this.flage = false;
          setTimeout(function () {
            _this.WeatherFacts(item.id, item.name)
          }, 1000);

          if (_this.highLightMarker) {

            // 先把高亮的改为普通的
            _this.highLightMarker.setIcon(new qq.maps.MarkerImage(public_local, smallImageOptions.size, smallImageOptions.origin, smallImageOptions.anchor));

            _this.highLightMarkerLabel.setStyle({
              color: 'black',
              fontSize: '14px',
              fontWeight: 'bold',
              backgroundColor: 'transparent',
              border: 'none'
            });

            // 再赋值
            _this.highLightMarker = marker;

            // 再根据事件改为高亮
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
     * 地图列表
     */
    MapList() {
      Api.apiFrontScenicMapListAll({}).then(res => {

        for (var i = 0; i < res.body.length; i++) {
          let mapList = [];
          let areaName = res.body[i].name;

          // 判断是否是数组
          let points;
          try {
            points = JSON.parse(res.body[i].points);
          } catch (e) {
            console.error(e);
          }
          if (!points) {
            continue;
          }
          for (var j = 0; j < points.length; j++) {
            let point = points[j];
            if (point.latitude && point.longitude) {
              mapList.push(new qq.maps.LatLng(point.latitude, point.longitude));
            }
          }
          this.MapRegion(areaName, mapList);
        }
      }).catch(err => {
        console.log(err)
      })
    },
    /**
     * 地图区域_覆盖块_颜色
     */
    MapRegion(areaName, mapList) {
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
      let color = colorMap[areaName];
      if (!color) {
        color = "#f0f0f0";
      }
      let qq = this.qq;
      var polygon = new qq.maps.Polygon({
        path: mapList,
        map: this.map,
        strokeColor: '#f73d24',
        strokeWeight: 1,
        fillColor: color,
        fillOpacity: 0.35, //填充透明度  
        strokeOpacity: 0.35, //线透明度   
      });
    },
    // 地图创建
    createMap() {
      var _this = this;
      var citylocation, map, marker = null;
      var center = new qq.maps.LatLng(32.50, 102.50);
      var city = document.getElementById("city");
      var sw = new qq.maps.LatLng(32.57872, 105.23560); //东北角坐标  31.17471 100.39612       31.73234 100.52795   30.47658 100.36316
      var ne = new qq.maps.LatLng(32.57872, 100.13245); //西南角坐标30.50971 99.75342  33.17845 103.85132
      var latlngBounds = new qq.maps.LatLngBounds(ne, sw);
      _this.map = new qq.maps.Map(document.getElementById("mapSiteBox"), {
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
    },
    /**
     * 获取详情数据----bywl 
     */
    getAreaInfo() {
      Api.apiFrontScenicAreaList(
        this.senicarealist.scenicAreaId,
        this.senicarealist.size,
        this.senicarealist.sortField,
        this.senicarealist.sortType,
        this.senicarealist.start
      ).then(res => {
        this.datasFromback = res.body;
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
            ss[j].innerText = "语言";
          }
        }
      }, 10)
    },
  },
  created: function () {

  },
  watch: {
    clickName(cv, ov) {

      var indexj = 0;
      for (var j = 0; j < this.datasFromback.length; j++) {

        if (this.datasFromback[j].name === cv) {
          this.sunriseOnvue = this.datasFromback[j].sunriseTime;
          this.sunoutOnvue = this.datasFromback[j].sunSettingTime;
          this.heightOnvue = this.datasFromback[j].height;
          indexj = this.datasFromback[j].scenicAreaId;
        }
      }
      var _this = this;
      let bigImageOptions = {
        size: new qq.maps.Size(40, 64), //自定义图片大小
        origin: new qq.maps.Point(0, 0), //显示区域
        anchor: new qq.maps.Point(30, 70), //坐标点
      };
      let smallImageOptions = {
        size: new qq.maps.Size(29, 36),
        origin: new qq.maps.Point(0, 0),
        anchor: new qq.maps.Point(20, 44),
      };
      var iconbig = new qq.maps.MarkerImage(public_local_big, bigImageOptions.size, bigImageOptions.origin, bigImageOptions.anchor);
      var iconsmall = new qq.maps.MarkerImage(public_local, smallImageOptions.size, smallImageOptions.origin, smallImageOptions.anchor);
      for (var i = 0; i < _this.markers.length; i++) {
        if (i % 2 == 0) {
          if (_this.markers[i].id == indexj) {
            _this.markers[i].setIcon(iconbig);
            _this.highLightMarker = _this.markers[i];
          } else {
            _this.markers[i].setIcon(iconsmall);
          }
        }
      };
    }
  },
  mounted() {
    var _this = this;
    _this.getAreaInfo(); //====
    _this.jumps = _this.$route.query.jumpee;
    _this.changeScroll(); //调用滚动条监听内容事件，强行渲染数据方法
    //_this.htmlWatcher()

    TMap().then(qq => { //异步回调值得到后再执行里面的方法
      _this.qq = qq;
      _this.createMap(); //地图创建
      _this.MapList(); //地图列表
      _this.ScenicSpotRatingList(); //景区评级列表
      _this.play(); //调用轮播广告的执行方法
    });
    //下面这个代码是为了处理折线的bug----假性点击事件
    setTimeout(function () {

      var fakeClick1 = document.getElementsByClassName("fakeClick1")[0];
      var fakeClick2 = document.getElementsByClassName("fakeClick2")[0];
      if (fakeClick1) {
        fakeClick1.click();
      }
      if (fakeClick2) {
        setTimeout(function () {
          fakeClick2.click();
        }, 50)
      }

    }, 2000)

  },
}

