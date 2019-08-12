<template>
<!-- 景区天气 -->
	<div class="scenicAreaPages pages"> 
		<div class="landscapeDistribution" >
			<div class="distributionImg">
				<div class="distributionName"><img src="../../assets/images/public_title_line.png" alt="" />
				<!--阿坝州全域景区分布-->
				{{$t('text.abpdistribution')}}
				</div>
			</div>
			<!-- 名称切换 -->
			<div class="nameShow">
				<div  class="signNames" v-for="(item,index) in nameShowData" :key="index" >
					<div :class="scenicAreaId==item.scenicLevelId ? 'isshow':''" >
						<div @click="switchName(item.scenicLevelId)" :title=item.name>{{item.name}}</div>
					</div>
				</div>
			</div>
			
			<div class="containerDescript">
				<!-- 小窗口 -->
				<div :class="flage==true? 'WeatherFactDatashover butteryHatch':'butteryHatch'">
				<!-- <div class="WeatherFactDatashover butteryHatch"> -->
					<div class="title" :title="WeatherFactsName">{{WeatherFactsName}}</div>
					<!--<div class="hpa" v-if="nulls==true">气压：{{WeatherFactDatas.hpa}}Pa</div>-->
					<div class="weather"  v-if="nulls==true">气温：{{WeatherFactDatas.temperature}}&#8451;</div>
					<div class="humidity"  v-if="nulls==true">湿度：{{WeatherFactDatas.humidity}}%</div>
					<div class="direction "  v-if="nulls==true">风向：{{WeatherFactDatas.direction}} </div>
					<div class="precipitation"  v-if="nulls==true">降水量：{{WeatherFactDatas.precipitation}}mm</div>
					<div class="precipitation"  v-if="nulls==false">暂无实况数据</div>
				</div>
			
				<!-- 地图 -->
				<div class="landsMaps">
					<template>
						<div id="mapSiteBox" ></div>
					</template>						
				</div>
				<div class="popularHeat">
					<!-- 人气热度标题 -->
					<div class="title">
						<span>序号</span>
						<span>名称</span>
						<span>旅游评级</span>
						<span>人气热度</span>
					</div>
					<!-- 人气热度内容 -->
					<div class="content">
						<div class="contentBlock">
							<div v-for="(item,index) in scenicAreaData" :key="index">
								<span>{{index+1}}</span>
								<span @click="weatherDetails(item.scenicAreaId,item.name,item.coverFileId,item.mapName)" :class="targetId==item.scenicAreaId ? 'isshow':''" :title="item.name">{{item.name}}</span>
								<span :title="item.scenicLevelName">{{item.scenicLevelName}}</span>
								<span>
									<img src="../../assets/images/public_index1.png" v-for="(item,indexs) in item.hotLevel" :key="indexs"/>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<!-- 天气具体情况细部展示区 -->
		 <div class="weatherDetail " ref="weatherHeight" v-if="conentShow">
			

			<!-- 背景图片轮播 -->
			<div class="containerBanner" >
				
				<el-carousel :interval="5000" arrow="never" indicator-position="none" class="aaaaaa">
					<el-carousel-item v-for="(img, index) in imgBannerData" :key="index">
						<div :style="{backgroundImage:'url('+imgUrl+img+')',backgroundSize:'cover'}" class="bg-img">

							<!-- 遮罩 -->
							<div class="containerBannerMask">

								<!-- 内容 -->
								<div class="currentWeatherDetails"  >
									<!-- 地址 -->
									<div class="scenicAreaName">
										<span>{{senicnames}}({{mapNames}})</span>
									</div>

									<!-- 实况详情框 -->
									<div class="detailsBlock">
										<!-- 时间 -->
										<div  class="currentTime"><img src="../../assets/images/public_icon.png" />{{WeatherFactTimeData}}实况</div>
										<!-- 温度 -->
										<div class="temperature">{{WeatherFactData.temperature}}&#8451;
										
										<!--<span class="sun">
											<span id="suncircle"></span>
										</span>-->
										</div>

										<!-- 天气情况及日出落时间 -->
										<div class="weatherTimeBlock">
											<span class="weather">{{WeatherFactData.weather}}</span>
											<i></i>
											<span class="aqiOptimal" v-if="WeatherFactData.aqi=='优秀'">AQI {{WeatherFactData.aqi}}</span>
											<span class="aqiGood" v-if="WeatherFactData.aqi=='良好'">AQI {{WeatherFactData.aqi}}</span>
											<span class="aqiMildPollution" v-if="WeatherFactData.aqi=='轻度污染'">AQI {{WeatherFactData.aqi}}</span>
											<span class="aqiModeratePollution" v-if="WeatherFactData.aqi=='中度污染'">AQI {{WeatherFactData.aqi}}</span>
											<span class="aqiSeverePollution" v-if="WeatherFactData.aqi=='重度污染'">AQI {{WeatherFactData.aqi}}</span>
											<span class="aqiSeriousPollution" v-if="WeatherFactData.aqi=='严重污染'">AQI {{WeatherFactData.aqi}}</span>
											<i></i>
											<span class="sunriseTime">日出：{{sunriseOnvue}}</span>
											<span class="sunSettingTime">日落:{{sunoutOnvue}}</span>
										</div>

										<!-- 风向_湿度等情况 -->
										<div class="windIs">
											<span class="precipitation">
												<img src="../../assets/images/public_icon1.png" alt="" />
												{{WeatherFactData.precipitation}}mm
											</span>
											<span class="direction">
												<img src="../../assets/images/public_icon2.png" alt="" />
												{{WeatherFactData.windSpeed}} {{WeatherFactData.direction}}
											</span>
											<span class="humidity">
												<img src="../../assets/images/public_icon3.png" alt="" />
												{{WeatherFactData.humidity}}%
											</span>
											<span class="height">
												<img src="../../assets/images/public_icon4.png" alt="" />
												{{heightOnvue}}m
											</span>
											<span class="hpa">
												<img src="../../assets/images/public_icon5.png" alt="" />
												{{WeatherFactData.hpa}}Pa
											</span>
										</div>
									</div>	
								</div>

								<!-- 天气预报 -->
								<div class="weatherForecastBlock">

									<!-- 名字切换 -->
									<div class="titleBlock">
										<span class="fakeClick2" :class="hoursTitle==true ? 'changes hoursTitle' : 'hoursTitle'" @click="hoursTitleClick">
											24小时天气
											<i v-if="hoursTitle==true"></i>
										</span>
										<span class="fakeClick1" :class="dayTitle==true ? 'changes dayTitle' : 'dayTitle'"  @click="dayTitleClick">
											未来7天天气
											<i v-if="dayTitle==true"></i>
										</span>
									</div>
									<!-- 内容切换 -->
									<div class="contentBlock">
										
										<!-- 滚动条组件 -->
										<div  style="height:360px;width:1200px;"  v-if="hoursTitle==true" >
											<happy-scroll color="rgba(0,0,0,0.5)" size="10"  v-if="numberHalf===1">
												<!-- 24小时天气预报内容 -->
												<div class="hoursContentBlock" :style="changeHoursWeather()"  >
													
													<!-- 天气插件 !!-->
													<div class="myChart" >
														<div id="myCharts" :style="changeHoursWeatherMyCharts()"></div>
													</div>
													<!-- 24小时内容 -->
													<div class="hoursTime" v-for="(time,index) in hoursForecastData" :key="index">
														<div class="date" v-for="(times,indexs) in hoursDates" :key="indexs" v-if="index==indexs">{{times}}</div>
														<div class="imgblock">
															<img :src="time.weathers" alt="图片加载失败" />
														</div>
														<div class="weather">{{time.weather}}</div>

														<div class="direction">{{time.directions}}</div>
														<div class="directions">{{time.directionsLevel}}</div>
													</div>	

												</div>
											</happy-scroll>
										</div>
										
										<!-- 24小时指数 -->
										<div class="scrollBarBlocks" v-if="hoursTitle==true">
											<!-- 24小时指数 -->
											<div class="hoursExponentBlock" >
												<div class="blocks"  v-for="(timee,indexe) in exponentData" v-if="exponentDataLength==true">
													<img  :src="timee.indexImg" alt="加载错误" />
													<div class="block">
														<div class="title">{{timee.indexName}}</div>
														<div class="content">{{timee.result}}</div>
													</div>	
												</div>
											</div>

										</div>
										
										<!-- 7天天气预报内容 -->
										<div class="dayContentBlock" v-if="dayTitle==true">
											
											<div class="days" v-for="(day,index) in daysForecastData" :key="index" >
												<i></i>
												<span class="day" >{{day.daysDate}}</span>
												<span class="everyDay" v-for="(dayWeek,indexWeek) in weekFewData" v-if="index===indexWeek">
													<span v-if="index==0">明天</span>
													<span v-if="index==1">后天</span>
													<span v-if="index>=2">{{dayWeek}}</span>
												</span>

												<span class="imgblocks">
													<img  :src="day.weatherImg" alt="" />
												</span>
												<span class="imgNightblocks">
													<img  :src="day.weatherNightImg" alt="" />
												</span>

												<span class="weatherName">{{day.weather}}</span>
												<span class="weatherDegree">{{day.temperatureMax}}/{{day.temperatureMin}}℃</span>
												<span class="weatherSeries">{{day.direction}}</span>

												<!-- 7天天气预报指数 -->
												<div class="daysExponentBlock" >
													<span class="daysExponent" v-for="(dayExponent,indexExponent) in daysExponentData"  v-if="dayExponent.indexDateTimeNew===day.daysDate">
														<span class="names" >{{dayExponent.indexName}}</span>
														<span class="results" >{{dayExponent.result}}</span>
													</span>
												</div>
												
												<!-- 7天天气预报指数小窗口 -->
												<div class="daysExponentOneBlock" v-if="daysExponentDataLength==true">
													<div class="arrows"></div>
													<span class="daysExponentOne"  v-for="(dayExponent,indexExponent) in daysExponentData" v-if="dayExponent.indexDateTimeNew===day.daysDate">
														<span class="names" >{{dayExponent.indexName}}:</span>
														<span class="results" >{{dayExponent.result}};</span>
													</span>
												</div>
												
											</div>
										</div>

									</div>

									<div class="nulls"></div>

								</div>	

							<!-- 遮罩结束	 -->
							</div>

						<!-- 轮播结束 -->
						</div>
					</el-carousel-item>
				</el-carousel>
				
			<!-- 轮播结束 -->
			</div>
			
		<!-- 天气情况结束 -->
		</div>

	<!-- 整体页面结束 -->
	</div>

</template>
<script type="text/javascript" src="./scenicSpot.js"></script>

<style>
@import url("./scenicSpot.css");
/* @import url("vue-happy-scroll/docs/happy-scroll.css"); */
/* <link rel="stylesheet" href="https://unpkg.com/vue-happy-scroll/docs/happy-scroll.css"> */
</style>