<template>
  <div class="pages homesPages" height="100%">
    <!-- 通知列表 -->
    <!---->
    <div class="meteorologicals" v-if="hiddenNotice">
      <div class="weatherWarning">
        <img src="../../assets/images/homepage_notice.png">
        <div class="contentPmd">
          <!--<div :style="margins()" class="loop-text">				
						<span @mouseover="stop()" @mouseout="run()" v-for="(item,index) in noticeData" :key="index" @click="toDownload(index,item)" :style=noticeColor(colors[index])>
						{{item}}
					    </span>
          </div>-->
          <div class="loop-text">
            <span
              v-for="(item,index) in noticeListData"
              :key="index"
              @click="toDownload(index,item)"
              :style="noticeColor(item)"
            >{{item.content}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- banner轮播 -->
    <div class="containerBanner">
      <el-carousel :interval="showTime" arrow="never">
        <el-carousel-item v-for="(img, index) in adertData" :key="index">
          <div
            :style="{backgroundImage:'url('+imgUrl+img.media+')',backgroundSize:'cover'}"
            class="bg-img"
            @click="getUrlConent(img.url,img.name)"
          ></div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!--http://192.167.1.13:13050/admin/adminFile/read?fileId=3949212589242993571-->
    <!-- 旅游天气 -->
    <div class="tourismWeather">
      <div class="tourismWeatherContent">
        <!-- 旅游天气名称 -->
        <div class="tourismWeatherName">
          <div>{{$t('text.touristWeather')}}</div>
          <img src="../../assets/images/public_titleline1.png" alt>
        </div>

        <!-- 名称切换 -->
        <div class="nameShow">
          <div class="signNames" v-for="(item,index) in nameShowData" :key="index">
            <div :class="indexName==index ? 'isshow':''">
              <div @click="switchName(item.id,item.type,index)" :title="item.name">{{item.name}}</div>
            </div>
          </div>
        </div>

        <div class="containerDescript">
          <!-- 小窗口 -->
          <div :class="flages==true? 'WeatherFactDatashover butteryHatch':'butteryHatch'">
            <div class="title" :title="moveName">{{moveName}}</div>
            <!--<div class="hpa" v-if="nulls==true">气压：{{WeatherFactData.hpa}}Pa</div>-->
            <div class="weather" v-if="nulls==true">气温：{{WeatherFactData.temperature}}&#8451;</div>
            <div class="humidity" v-if="nulls==true">湿度：{{WeatherFactData.humidity}}%</div>
            <div class="direction" v-if="nulls==true">风向：{{WeatherFactData.direction}}</div>
            <div class="precipitation" v-if="nulls==true">降水量：{{WeatherFactData.precipitation}}mm</div>
            <div class="precipitation" v-if="nulls==false">暂无实况数据</div>
          </div>
          <!-- 地图 -->
          <div class="landsMaps">
            <template>
              <div id="mapSiteBox"></div>
            </template>
          </div>
          <div class="popularHeat">
            <!-- 24小时天气情况标题 -->
            <div class="title">
              <div>未来24小时天气情况</div>
              <span>景区</span>
              <span>天气情况</span>
              <span>气温</span>
              <span>旅游推荐指数</span>
            </div>
            <!-- 24小时天气情况内容 -->
            <div class="content">
              <div class="contentBlock">
                <div
                  v-for="(item,index) in attractionsListData"
                  :key="index"
                  v-if="index<=7"
                  @mouseenter="changeattractions(item)"
                >
                  <span
                    class="spanName"
                    @click="clickNameJump(item.id,item.name,item.idss,item.type)"
                    :class="targetId==item.id ? 'isColor':''"
                    :title="item.name"
                  >{{item.name}}</span>
                  <span class="spanWeather">{{item.weather}}</span>
                  <span class="spanTemperature">
                    <span class="Maxs">{{item.minTemperature}}/</span>
                    <span class="Mins">{{item.maxTemperature}}℃</span>
                  </span>
                  <span class="spanImg">
                    <img src="../../assets/images/public_index1.png" v-for="(item,index) in item.hotLevel" :key="index">
                  </span>
                </div>
              </div>
            </div>
            <!-- 更多景区 -->
            <div class="moreScenicSpot">
              <!--<div>{{$t('text.touristWeather')}}</div>-->
              <!--<span @click="clickScenicSpotJump">更多景区</span>-->
              <span @click="clickScenicSpotJump">{{$t('text.morescenicspot')}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 特色旅游推荐 -->
    <!--<div style="overflow: hidden;">-->
    <div class="recommendation recommendationS" ref="recommendationScroll">
      <div class="bgopa"></div>
      <div class="containerS" id="recommendations">
        <div class="touristTitle">
          <!--<p>特色旅游推荐</p>-->
          <p>{{$t('text.recommendation')}}</p>
          <img src="../../assets/images/homepage_titleline2.png" alt>
        </div>
      </div>
      <div id="touristRecommed">
        <div class="touristPictures">
          <!--:class="index==item.xuhao? item.addname :'touristPictureFisrt'"-->
          <div
            class="touristPictureFisrt"
            ref="divs"
            v-show="tourismShow>=item.xuhao"
            :style="item.styles"
            v-if="index<=8"
            v-for="(item,index) in touristDatas"
            :key="index"
          >
            <!--    @mouseenter="addName(index)"  @mouseleave="reduName(index)"    鼠标移入移出添加类名  -->
            <div
              class="changestyle"
              @click="goToCountryTravel(item.scenicPointId,item.group,item.name,item.scenicClassId)"
            >
              <img :src="imgUrl+item.coverFileId">
              <p class="nameDetail"></p>
              <span class="fly-content" v-if="item.overName">{{item.name}}</span>
              <span class="fly-content overName" v-else>
                <span>{{item.name}}</span>
              </span>
            </div>
          </div>
        </div>
        <!--<div class="lookMore-box " @click="goToSpecialTourist">
						查看更多
        </div>-->
        <div class="lookMore-box" @click="goToSpecialTourist">{{$t('text.viewmore')}}</div>
      </div>
    </div>
    <!--</div>-->
    <!--   交通气象实况         -->
    <div class="trafficMeteorologyConditions">
      <div class="containerS">
        <div class="touristTitle">
          <!--<p>交通气象实况</p>-->
          <p>{{$t('text.trafficConditions')}}</p>
          <img src="../../assets/images/homepage_titleline1.png" alt>
        </div>
        <div class="trConditions">
          <span
            :class="index==trafficIndex? 'is_active' : 'trafficSecondName'"
            v-for="(item,index) in trafficData"
            :key="index"
            @click="changeTraffic(index,item.scenicRadId)"
          >{{item.name}}</span>
        </div>
      </div>
      <div class="trafficMeteorologyMap">
        <!--  显示对应的数据天气  -->
        <div :class="condiflag==true? 'WeatherFactDatashover detailTraffic':'detailTraffic'">
          <div class="conditionCityName">{{roadKeyNames}}</div>
          <div class="heights heightkm" v-if="condnull==true">海拔高度：{{heights}}km</div>
          <!--<div class="heights hpa" v-if="condnull==true">气压：{{conditionData.hpa}}kPa</div>-->
          <!--<div class="heights opadeg" v-if="condnull==true">能见度：km</div>-->
          <div
            class="heights temperature"
            v-if="condnull==true"
          >温度：{{conditionData.temperature}}&#8451;</div>
          <div class="heights humidity" v-if="condnull==true">湿度：{{conditionData.humidity}}%</div>
          <div class="heights windSpeed" v-if="condnull==true">风速：{{conditionData.windSpeed}}km/h</div>
          <div
            class="heights precipitation"
            v-if="condnull==true"
          >当前降水量：{{conditionData.precipitation}}毫米</div>
          <div class="heights precipitation" v-if="condnull==false">暂无实况数据</div>
        </div>
        <!--  地图   -->
        <div id="mapSiteTraffics"></div>
      </div>
      <!--<span id="west-north"></span>,<span id="eash-south"></span>-->
    </div>
    <!--  旅游线路推荐   -->
    <div class="landsRecommendHome">
      <div class="containers">
        <!--<p class="specialTitle">旅游线路推荐</p>-->
        <p class="specialTitle">{{$t('text.routerRecommendation')}}</p>
        <img src="../../assets/images/public_titleline1.png">
      </div>
      <div class="recomemendPictures" ref="rep">
        <div class="prev" @click="prevImages()">
          <span @click="prevImages()"></span>
        </div>
        <div class="showBroadCast">
          <ul ref="ulContantLength" :style="changeMarginLeft()">
            <li
              v-for="(item,index) in specialRecommendData"
              v-show="testshow>=item.showit"
              :key="index"
              @click="goToMeteorological(item.queryCode,item.articleId)"
            >
              <div class="show-img">
                <div class="img-yinc">
                  <img :src="imgUrl+item.cover">
                </div>
                <p>{{item.title}}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="next" @click="nextImages()">
          <a href="javascript:void(0)" @click="nextImages()"></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript" src="./home.js">
</script>

<style>
@import url("./home.css");
</style>