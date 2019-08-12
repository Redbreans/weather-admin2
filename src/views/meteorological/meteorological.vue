<template>
	<!-- 气象景观 -->
	<div class="pageMeteor pages">
		<div class="containers">

			<div class="meteIntroduceAll">
				<div class="meteIntroduce" id="meteIntroduce">
					<div class="introduction">
						<img src="../../assets/images/public_title_line.png" alt="" />
						 <!--气象景观简介-->
						 {{$t('text.introductionlandscape')}}
					</div>
					<div class="content">
						<p class="titles" v-html=bannersContentData></p>
					</div>
				</div>
				<!--  气象景观banner图片数据   /视频    -->
				<div class="landscapePictures landscapeBaner" id="landscapeBaner">
					<div class="Pictures">
						<el-carousel :interval="showTime" arrow="never">
							<el-carousel-item v-for="(img, index) in MeteorologyBanner" :key="index">
								<div class="bg-imgs" @click="getUrlConent(img.url,img.name)">
									<img :src='imgUrl+img.media'>
								</div>
							</el-carousel-item>
						</el-carousel>
					</div>
				</div>
			</div>
		</div>
		<div class="landscapeDistribution">
			<div class="distribution"><img src="../../assets/images/public_title_line.png" alt="" class="imgTitleLine" />
			<!--阿坝州气象景观分布-->
			{{$t('text.abameteorlogical')}}
			</div>
			<!--  气象景观小图标   -->
			<div class="meteorologicalName">
				<span v-for="(item,index) in MeteorologyData" :key="index" @click="changeBg(item.scenicClassId,index)" :class="item.scenicClassId==indexBg ? 'is-active' : ''">{{item.name}}</span>
			</div>
			<div class="containerDistribution">
				<!--   地图    -->
				<div class="landsMaps">
					<template>
						<div id="mapSiteMeteorgy"></div>
					</template>
				</div>
				<!--   小图标具体详情(——地图的右边数据部分)  -->
				<div class="landsDetails">
					<div class="landscontent" v-if="index==indexDefault" v-for="(item,index) in MeteorologyData" :key="index">
						<p class="landsTitle">{{item.name}}</p>
						<div class="landsPicture" v-if="item.coverFileId">
							<img :src="imgUrl+item.coverFileId" alt="" class="animated fadeIn" />
						</div>

						<div class="landsTimeDetailInfo">
							<div class="landsTime_where">观赏地点</div>
						</div>
						<div class="firejr">
							<div class="detailLandscapes">
								<!-- :class="inde==latInde?'xianshis':'nameOne'"          scenicPointId          -->
								<span :class="item.scenicPointId==latInde?'xianshis':'nameOne'" v-for="(item,inde) in bodyData" :key="inde" @click="goToMeteorological(item.name,item.scenicPointId,inde)">{{item.name}}</span>
								<!--<span :class="inde==latInde?'xianshis':'nameOne'" v-for="(item,inde) in bodyData" :key="inde" @click="goToMeteorological(item.name,item.scenicPointId,inde)">{{item.name}}</span>-->
								<!--<span :class="inde==latInde?'xianshis':'nameOne'" v-for="(item,inde) in bodyData" :key="inde" @click="goToMeteorological(item.name,item.scenicPointId,inde)">{{item.name}}</span>-->
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="landsRecommend">
			<div class="recomemendTitle"><img src="../../assets/images/public_title_line.png" alt="" class="imgTitleLine" />
			<!--气象景观推荐-->
			{{$t('text.meteorologicalrecommend')}}
			</div>
			<div class="recomemendPictures" ref="rep">
				<div class="prev" @click="prevImages()">
					<span @click="prevImages()"></span>
				</div>
				<div class="showBroadCast">
					<ul ref="ulContantLength" :style="changeMarginLeft()">
						<li v-for="(item,index) in imgDatas" :key="index" v-show="testshow>=item.showit" @click="goToMeteorological(item.name,item.scenicPointId)">
							<div class="show-img">
								<div class="img-yinc">
									<img :src="imgUrl+item.coverFileId" />
								</div>
								<p>{{item.name}}</p>
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
<script src="./meteorological.js"></script>
<style>
	@import url("./meteorological.css");
</style>