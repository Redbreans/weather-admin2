<template>
	<div class="pages" id="specialTourist">
		<div class="touristInfo">
			<div class="touristInfoDescription">
				<div class="introduction">
					<span><img src="../../assets/images/public_title_line.png" alt="" /></span>
					<!--<span>阿坝州旅游简介</span>-->
					<span>{{$t('text.abatourism')}}</span>
				</div>
				<div class="content">
					<p class="titles">{{bannersContentData}}</p>
				</div>
			</div>
			<!--  旅游banner数据    图片动画   -->
			<div class="touristPictureSpecial">
				<div class="Pictures">
					<!--<div class="slide">
						<div class="slideshow">
							<ul>
								<li v-for="(img, index) in imgArray" v-show="index===mark" :key="index">
									<a href="#">
										<img :src='imgUrl+img.media'>
									</a>
								</li>
							</ul>
						</div>
						<div class="bar">
							<span v-for="(item, index) in imgArray" :class="{ 'is_active':index===mark }" :key="index" @click="change(index)"></span>
						</div>
					</div>-->

					<el-carousel :interval="showTime" arrow="never">
						<el-carousel-item v-for="(img, index) in imgArray" :key="index">
							<div class="bg-imgs" @click="getUrlConent(img.url,img.name)">
								<img :src='imgUrl+img.media'>
							</div>

						</el-carousel-item>
					</el-carousel>
				</div>
			</div>
		</div>
		<div class="touristContent">
			<!--  旅游分类数据     specialData   newArrs-->
			<div class="touristSigns">
				<div class="touristIcon" v-for="(item,index) in newArrs" :key="index">

					<div :class="indexNum == index ? 'isshow':''" :title="item.name">
						<div class="signs" @click="getSpecialData(item.scenicClassId,index,item.name)">{{item.name}}</div>
					</div>
				</div>
			</div>
			<!-- 旅游分类文字说明  -->
			<div class="containerSpecialContent" v-for="(item,index) in newArrs" :key="index" v-if="indexNum==index">
				<div class="LandscapeCharacteristics">{{item.des}}</div>
			</div>
			<!-- 旅游分类下面的图片数据  -->
			<div class="specialPictures landscapeArea">
				<div class="landscapeAreaPicture" v-for="(item,index) in defultShowAddress" :key="index">
					<div class="areasContent" @click="jumpTravel(item.scenicPointId,index,item.name)">
						<div>
							<img :src="imgUrl+item.coverFileId" alt="" />
						</div>
						<p class="landscapeName landscapeNames">{{item.name}}</p>
					</div>
				</div>
				<!--测试测试-->
				<!--<div class="landscapeAreaPicture" v-for="(item,index) in defultShowAddressS" :key="index">
					<div class="areasContent">
						<img :src="item.srcs" alt="" />
						<p class="landscapeName landscapeNames">{{item.names}}</p>
					</div>
				</div>-->
			</div>
			<!-- 点击查看更多信息  -->
			<div v-if="specialPicture.length>8">
				<div class="lookMores" v-if="takeUp">
					<div class="lookMore" @click="loadMore">
						<!--查看更多-->
						{{$t('text.viewmore')}}
						<img src="../../assets/images/homepage_more.png" alt="" />
					</div>
				</div>
				<div class="lookMores" v-else>
					<div class="lookMore" @click="loadMore">
						<!--收起-->
						{{$t('text.takeup')}}
						<img src="../../assets/images/homepage_more2.png" alt="" />
					</div>
				</div>
			</div>
		</div>
		<div class="specialRecommend">
			<div class="containers">
				<!--<p class="specialTitle">旅游线路推荐</p>-->
				<p class="specialTitle">{{$t('text.routerRecommendation')}}</p>
				<img src="../../assets/images/public_titleline1.png" />
			</div>
			<div class="specialPictures">
				<div class="specialPicturesMore" v-for="(item,index) in defaultShowRecommendList" :key="index">
					<div class="areasContents" @click="goToRecommend(item.articleId)">
						<div >
							<img :src="imgUrl+item.cover" alt="" />
						</div>
						<p class="landscapeName">{{item.title}}
					</p>
					</div>
				</div>
			</div>
			<!--<div class="lookMores">
				<div class="lookMore">查看更多
					<img src="../../assets/images/homepage_more.png" alt="" />
				</div>
			</div>-->
			<div v-if="specialRecommendData.length>=3">
				<div class="lookMores" v-if="takeUps">
					<div class="lookMore" @click="loadMores">
						<!--查看更多-->
						{{$t('text.viewmore')}}
						<img src="../../assets/images/homepage_more.png" alt="" />
					</div>
				</div>
				<div class="lookMores" v-else>
					<div class="lookMore" @click="loadMores">
						<!--收起-->
						{{$t('text.takeup')}}
						<img src="../../assets/images/homepage_more2.png" alt="" />
					</div>
				</div>
			</div>
		</div>

	</div>
</template>
<script src="./specialTourism.js"></script>
<style>
	@import url("./specialTourism.css")
</style>