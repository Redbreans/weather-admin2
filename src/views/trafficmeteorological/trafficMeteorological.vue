<template>
	<!-- 交通气象 -->
	<div class="pageTraffics pages">
		<div class="trafficMeteor">
			<div class="trafficFirst">
				<img src="../../assets/images/public_title_line.png" alt="" />
				<!--全州主要交通道路气象-->
				{{$t('text.stateroad')}}
			</div>
			<div class="trafficSecond">
				<span :class="index==trafficIndex? 'is-active' : 'trafficSecondName'" v-for="(item,index) in trafficData" :key="index" @click="changeTraffic(index,item.scenicRadId)">{{item.name}}</span>
			</div>
			<div class="trafficThird">
				<!--  显示对应的数据天气【小窗口】 -->
				<div :class="condiflag==true? 'conditionDatashover detailTraffic':'detailTraffic'">

					<div class="conditionCityName">{{roadKeyNames}}</div>
					<div class="heights heightkm" v-if="nulls==true">海拔高度：{{heights}}km</div>
					<!--<div class="heights hpa" v-if="nulls==true">气压：{{conditionDatas.hpa}}kPa</div>-->
					<!--<div class="heights opadeg" v-if="nulls==true">能见度：km</div>-->
					<div class="heights temperature" v-if="nulls==true">温度：{{conditionDatas.temperature}}&#8451;</div>
					<div class="heights humidity" v-if="nulls==true">湿度：{{conditionDatas.humidity}}%</div>
					<div class="heights windSpeed" v-if="nulls==true">风速：{{conditionDatas.windSpeed}}km/h</div>
					<div class="heights precipitation" v-if="nulls==true">当前降水量：{{conditionDatas.precipitation}}毫米</div>
					<div class="heights precipitations" v-if="nulls==false">暂无实况数据</div>
				</div>
				<!--  地图   -->
				<div id="mapSiteTraffic"></div>
			</div>
		</div>
		<!-- 天气具体情况细部展示区 -->
		<div class="weatherDetail ">
			<!-- 遮罩 -->
			
				<div class="containerBannerMask">
					<!-- 内容 -->
					<div class="currentWeatherDetails">
						<!-- 地址 -->
						<div class="scenicAreaName">
							<span>{{roadKeyName}}</span>
						</div>

						<!-- 实况详情框 -->
						<div class="detailsBlock">
							<!-- 时间 -->
							<div class="currentTime"><img src="../../assets/images/public_icon.png" />{{WeatherFactTimeData}}实况</div>
							<!-- 温度 -->
							<div class="temperature">{{conditionData.temperature}}&#8451;</div>

							<!-- 天气情况及日出落时间 -->
							<div class="weatherTimeBlock">
								<span class="weather">{{conditionData.weather}}</span>
								<i></i>
								<!-- <span class="aqi">AQI {{conditionData.aqi}}</span> -->
								<span class="aqiOptimal" v-if="conditionData.aqi=='优秀'">AQI {{conditionData.aqi}}</span>
								<span class="aqiGood" v-if="conditionData.aqi=='良好'">AQI {{conditionData.aqi}}</span>
								<span class="aqiMildPollution" v-if="conditionData.aqi=='轻度污染'">AQI {{conditionData.aqi}}</span>
								<span class="aqiModeratePollution" v-if="conditionData.aqi=='中度污染'">AQI {{conditionData.aqi}}</span>
								<span class="aqiSeverePollution" v-if="conditionData.aqi=='重度污染'">AQI {{conditionData.aqi}}</span>
								<span class="aqiSeriousPollution" v-if="conditionData.aqi=='严重污染'">AQI {{conditionData.aqi}}</span>
								<i></i>
								<span class="sunriseTime">日出：{{sunriseTime}}</span>
								<span class="sunSettingTime">日落:{{sunSettingTime}}</span>
							</div>

							<!-- 风向_湿度等情况 -->
							<div class="windIs">
								<span class="precipitation">
								<img src="../../assets/images/public_icon1.png" alt="" />
								{{conditionData.precipitation}}mm
							</span>
								<span class="direction">
								<img src="../../assets/images/public_icon2.png" alt="" />
								{{conditionData.direction}}
							</span>

								<span class="humidity">
								<img src="../../assets/images/public_icon3.png" alt="" />
								{{conditionData.humidity}}%
							</span>
								<span class="height">
								<img src="../../assets/images/public_icon4.png" alt="" />
								{{heights}}m
							</span>
								<span class="hpa">
								<img src="../../assets/images/public_icon5.png" alt="" />
								{{conditionData.hpa}}Pa
							</span>
							</div>
						</div>
					</div>

					<!-- 天气预报 -->
					<div class="weatherForecastBlock">

						<!-- 名字切换 -->
						<div class="titleBlock">
							<span :class="hoursTitle==true ? 'changes hoursTitle' : 'hoursTitle'" @click="hoursTitleClick">
							24小时天气
							<i v-if="hoursTitle==true"></i>
						</span>
							<span :class="dayTitle==true ? 'changes dayTitle' : 'dayTitle'" @click="dayTitleClick">
							未来7天天气
							<i v-if="dayTitle==true"></i>
						</span>
						</div>
						<!-- 内容切换 -->
						<div class="contentBlock">

							<!-- 滚动条组件 -->
							<div style="height:360px;width:1200px;" v-if="hoursTitle==true">
								<happy-scroll color="rgba(0,0,0,0.5)" size="10" v-if="numberHalf===1">
									<!-- <div class="scrollBarBlock" v-if="hoursTitle==true"> -->
									<!-- 24小时天气预报内容 -->
									<div class="hoursContentBlock" :style="changeHoursWeather()">

										<!-- 天气插件 !!-->
										<div class="myChart">
											<!--:style="{width:'3600px',height:'138px'}"-->
											<div id="myCharts" :style="{width:'1200px',height:'138px'}"></div>
										</div>

										<!-- 24小时内容 -->
										<div class="hoursTime" v-for="(time,index) in tHoursData" :key="index">
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
							<!-- </div> -->

							<!-- 24小时指数 -->
							<div class="scrollBarBlocks" v-if="hoursTitle==true">
								<!-- 24小时指数 -->
								<div class="hoursExponentBlock">
									<div class="blocks" v-for="(timee,indexe) in exponentData" v-if="exponentDataLength==true">
										<img :src="timee.roadImg" alt="加载错误" />
										<div class="block">
											<div class="title">{{timee.indexName}}</div>
											<div class="content">{{timee.result}}</div>
										</div>
									</div>
								</div>

							</div>

							<!-- 7天天气预报内容 -->
							<div class="dayContentBlock" v-if="dayTitle==true">

								<div class="days" v-for="(day,index) in sevenData" :key="index">
									<i></i>
									<span class="day">{{day.daysDate}}</span>
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
									<div class="daysExponentBlock">
										<span class="daysExponent" v-for="(dayExponent,indexExponent) in scenicIndexData" v-if="dayExponent.dateIndexTime===day.daysDate">
										<span class="names" >{{dayExponent.indexName}}</span>
										<span class="results">{{dayExponent.result}}</span>
										</span>
									</div>

									<!-- 7天天气预报指数小窗口 -->
									<div class="daysExponentOneBlock" v-if="daysExponentDataLength==true">
										<div class="arrows"></div>
										<span class="daysExponentOne" v-for="(dayExponent,indexExponent) in scenicIndexData" v-if="dayExponent.dateIndexTime===day.daysDate">
										<span class="names" >{{dayExponent.indexName}}:</span>
										<span class="results"> {{dayExponent.result}} ; </span>
										</span>
									</div>

								</div>
							</div>

						</div>

						<div class="nulls"></div>

					</div>

					<!-- 遮罩结束 -->
				</div>
		

			<!-- 天气情况结束 -->
		</div>

		<!-- 整体页面结束 -->
	</div>
</template>

<script src="./trafficMeteorological.js"></script>
<style>
	@import url("./trafficMeteorological.css");
</style>