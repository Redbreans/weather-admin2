<template>
	<!-- 气象景观次级页面 -->
	<div class="pages" id="meteorologicalsecondary">

		<!-- 页面内容 -->
		<div class="meteorologicalsecondaryBox">

			<!-- 导航 -->
			<div class="contentCountryTravel">
				<div class=" countryTitle" @click="goBack">
					<span>{{parentName}}</span>>
					<span>{{countryName}}</span>
				</div>
			</div>

			<!-- 简介及实况 -->
			<div class="countryDetail">
				<div class="countryLeftIntroduce">
					<span class="title">{{countryData.landscapeName}}</span>
					<p class="introduceContent">{{countryData.landsDes}}</p>
				</div>
				<!-- 当前天气实况 -->
				<div class="countryRghtPicture">
					<!--<div class="currentLive">当前天气实况</div>-->
					<div class="currentLive">{{$t('text.currentcondition')}}</div>
					<div class="weatherIcons">
						<div class="weatherIconLeft">
							<div class="depatureConditaions"><img src="../../assets/images/public_icon7.png" /><span>{{condationData.temperature}}&#8451;</span></div>
							<div><img src="../../assets/images/public_icon1.png" /><span>{{condationData.precipitation}}mm</span></div>
							<div><img src="../../assets/images/public_icon4.png" /><span>{{countryData.height}}m</span></div>
						</div>
						<div class="weatherIconRght">
							<div class="rgthConditaions"><img src="../../assets/images/public_icon6.png" /><span>{{condationData.aqi}}</span></div>
							<div><img src="../../assets/images/public_icon3.png" /><span>{{condationData.humidity}}%</span></div>
							<div><img src="../../assets/images/public_icon5.png" /><span>{{condationData.hpa}}hPa</span></div>
						</div>
						<div class="commendtionsImg">
							<span class="recommend-index" v-if="this.$i18n.locale=='zh-cn'">旅游指数推荐</span>
							<span class="recommend-index" v-if="this.$i18n.locale=='en-us'" style="background:url('../../assets/images/Travel--Recommendation--Index2.png')"></span>
							<span class="recommend-img">
								<img src="../../assets/images/country_index.png" v-for="(item,index) in hotLevel" :key="index"/>
								<!--<img src="../../assets/images/country_index.png"/>
								<img src="../../assets/images/country_index.png"/>
								<img src="../../assets/images/country_index.png"/>
								<img src="../../assets/images/country_index.png"/>-->
							</span>
						</div>
					</div>
					<!--7天-->
					<div class="weatherCondations">
						<div class="foreast">7天天气预报</div>
						<div class="oneDayParent">
							<div class="oneDayDetail" v-for="(item,index) in foreastList" :key="index">
								<div class="oneDays" v-for="(items,indes) in datas" :key="indes" v-if="indes==index">{{items[0]}}/{{items[1]}}</div>

								<!--<div class="oneDayTime" v-show="index==0">今天</div>
								<div class="oneDayTime" v-show="index==1">明天</div>
								<div class="oneDayTime" v-show="index==2">后天</div>-->
								<div class="oneDayTime" v-show="index==0">明天</div>
								<div class="oneDayTime" v-show="index==1">后天</div>
								<div class="oneDayTime" v-if="index>=2">{{item.dt}}</div>

								<div class="oneDayImg">
									<img :src="item.dayImg" alt="" />
								</div>

								<div class="oneDayNightImg">
									<img :src="item.nightImg" alt="" />
								</div>

								<div class="imgName">{{item.weather}}</div>
								<div class="oneDayDepature">{{item.temperatureMax}}/{{item.temperatureMin}}&#8451;</div>

							</div>
						</div>
					</div>
				</div>
			</div>
			
			<!--精彩图集-->
			<div class="wonderfulAtlas" id="wonderfulAtlas">
				<div class="wonderfulTitle">
					<!--<p>精彩图集</p>-->
					<p>{{$t('text.wonderatlas')}}</p>
					<img src="../../assets/images/public_titleline1.png" alt="" />
				</div>
				<div class="secondaryMeteorolgical">
					<div class="childrenImg" v-for="(item,index) in albumData" :key="index">
						<!--封面图片样式-->
						<!--<div class="imgcover" ref="imgcovers" @mouseenter="addNamefirst()" @mouseleave="reduNamefirst()">
							<div @click="jumpAlbum(item.albumId,index,item.name)">
								<img :src="imgUrl+item.coverFileId" alt="" />
								<p class="childDetail "></p>
								<!<span class="fly-content ">{{item.name}}</span>-->
						<!--<span class="fly-content" v-if=item.overName>{{item.name}}</span>
								<span class="fly-content overName" v-else>
								<span>{{item.name}}</span>
								</span>
							</div>																																																			
						</div>-->

						<!--   2019-01-10  10:40    修改样式 startingone    改为首页图片效果相似      bywl-->
						<div class="imgcover" ref="imgcovers">
							<div @click="jumpAlbum(item.albumId,index,item.name)">
								<img :src="imgUrl+ImageListOne" alt="" />
								<span class="imgtitle" v-if=item.overName>{{item.name}}</span>
								<span class="imgtitle overName" v-else>
									<span>{{item.name}}</span>
								</span>
							</div>
						</div>
						<!--          endingone    -->

						<!-- 图集里面的小图片-->
					
							<div class="contentSecondary" ref="divs" @mouseenter="addName(index)" @mouseleave="reduName(index)" v-for="(items,index) in albumImageLists" :key="index" v-if="index<7">

								<!--<div v-if="items.coverType=='picture'" @click="jumpAlbum(item.albumId,index,item.name)">
								<img :src="imgUrl+items.fileId" alt="" />
								<p class="nameDetail "></p>-->
								<!--<span class="fly-content">{{items.name}}</span>-->
								<!--<span class="fly-content" v-if=item.overName>{{items.name}}</span>
								<span class="fly-content overName" v-else>
								<span>{{items.name}}</span>
								</span>
							</div>																					-->
								<!--public_video   下面这个是图片的按播放按钮-->
								<!--<div v-if="items.coverType=='video'" class="videos" @click="jumpAlbum(item.albumId,index,item.name)">
								<video>
									<source :src="imgUrl+items.fileId" type="video/ogg">
									<source :src="imgUrl+items.fileId" type="video/mp4"> 你的浏览器不支持
								</video>
								<img src="../../assets/images/public_video.png" class="video-img" />-->
								<!--<span class="pictureImgDes">{{items.name}}</span>-->
								<!--<span class="fly-content" v-if=item.overName>{{items.name}}</span>
								<span class="fly-content overName" v-else>
								<span>{{items.name}}</span>
								</span>

							</div>-->

								<!--   2019-01-10  10:40    修改样式 startingtwo    改为首页图片效果相似      bywl-->

								<div v-if="items.coverType=='picture'" @click="jumpAlbum(item.albumId,index,item.name)">
									<img :src="imgUrl+items.fileId" alt="" />
									<!--<span class="childtitle">{{items.des}}</span>-->
									<span class="childtitle" v-if=item.overName>{{items.des}}</span>
									<span class="childtitle overName" v-else>
									<span>{{items.des}}</span>
									</span>

								</div>
								<!--public_video   下面这个是图片的按播放按钮-->
								<div v-if="items.coverType=='video'" class="videos" @click="jumpAlbum(item.albumId,index,item.name)">
									<video>
										<source :src="imgUrl+items.fileId" type="video/ogg">
										<source :src="imgUrl+items.fileId" type="video/mp4"> 你的浏览器不支持
									</video>
									<img src="../../assets/images/public_video.png" class="video-img" />
									<!--<span class="childtitle">{{items.des}}</span>-->

									<span class="childtitle" v-if=item.overName>{{items.des}}</span>
									<span class="childtitle overName" v-else>
									<span>{{items.des}}</span>
									</span>
								</div>
								<!--   endingtwo     -->

							</div>					

					</div>

				</div>
				<!--  查看更多图集  -->
				<div class="secondarymoreimg" v-for="(item,index) in albumData" :key="index">
					<div class="moreImg" @click="lookMorPictures(item.albumId,item.name)">
						<!--更多图集-->
						{{$t('text.moreatlas')}}
					</div>
				</div>
			</div>

			<!--评论区-->
			<div class="comments">
				<span class="totalComment">
					<!--评论-->
					{{$t('text.comments')}}
					({{total}}条)</span>
				<div class="singleComment" v-for="(item,index) in commends" :key="index">

					<img :src=item.userHeadImage class="usersImage" alt="图片错误" v-if=item.userHeadImage>
					<img src='../../assets/images/public_default_ head.png' class="usersImage" alt="图片错误" v-else>
					<div class="usersInfo">
						<span class="usersName">{{item.userName}}</span>
						<p class="otherInfo">{{item.createTime}}</p>
						<p class="usersQuestion">{{item.content}}
							<span v-if="item.commentList.length>0">
							  <span style="color:#F7AA24">|@{{item.commentList[0].userName}}</span>
							<span>:{{item.commentList[0].content}}</span>
							</span>
						</p>
					</div>
				</div>
				<!--  分页 -->
				<template>
					<div class="pagingI"></div>
					<div class="paging">
						<el-pagination background @size-change="handleSizeChange" @current-change="shophouseCurrentChange" :current-page="page" :page-size="size" layout="total, prev, pager, next" :total="total" prev-text="上一页" next-text="下一页">
						</el-pagination>
					</div>
				</template>

			</div>

		</div>

		<!-- 弹框遮罩 -->
		<div class="BouncedBoxShade" v-if="BouncedBoxShade"></div>

		<!-- 弹框内容 -->
		<div class="BouncedBox" v-if="BouncedBoxShade">

			<div id="wonderfulatlass">
				<!-- <img src="../../assets/images/public_photo_out.png" /> -->
				<div class="close" @click="BouncedBoxShade=false"></div>
				<!-- 标题 -->
				<div class="containersName">{{this.imgName}}(<span>{{mark+1}}/{{this.AlbumImageList.length}}<a>页)</a></span></div>

				<div class="totalImgs">
					<div class="broadCastImg">
						<div class="leftBroadCast" @mouseover="stop()" @mouseout="move()">
							<p :class="prevShow ? 'prev' :'img'" @click="pre"></p>
							<el-carousel :interval="5000" height="670px" ref="picImgs" arrow="never" indicator-position="none" @change="activeFun">
								<el-carousel-item v-for="(item, index) in AlbumImageList" :key="index">
									<div>
										<div :style="{backgroundImage:'url('+imgUrl+item.fileId+')'}" class="bg-img" v-if="item.coverType=='picture'"></div>
										<div class="bg-img" v-if="item.coverType=='video'">
											<video autoplay width="100%" height="100%" controls="controls">
												<source :src="imgUrl+item.fileId" type="video/ogg">
												<source :src="imgUrl+item.fileId" type="video/mp4"> 你的浏览器不支持
											</video>
										</div>
									</div>

								</el-carousel-item>
							</el-carousel>
							<p :class="nextShow ? 'next' :'imgOne'" @click="net"></p>
						</div>

						<!--右边滚动的缩略图片-->
						<div class="rghtBroadCast" style="width:320px;">
							<!--<div style="width:20px;height:520px;position:absolute;top:0;right:0;background-color:#fff;opacity: 0;"></div>-->
							<div class="containerImg">
								<div v-for="(item,index) in AlbumImageList" class="videosmalls">
									<div v-if="item.coverType=='picture'" class="videosmall-one" @click="changes(index)">
										<img :src="imgUrl+item.fileId" alt="" @mouseover="stops()" @mouseout="moves()" @click="changes(index)" :key="index" :class="{is_active:index==mark}">
									</div>
									<div v-if="item.coverType=='video'" :class="index==mark?'is_active videosmall-one':'videosmall-one'" @click="changes(index)" @mouseover="stops()" @mouseout="moves()">
										<video style="object-fit: fill">
											<source :src="imgUrl+item.fileId" type="video/ogg">
											<source :src="imgUrl+item.fileId" type="video/mp4"> 你的浏览器不支持
										</video>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- 底部文字说明-->
				<div class="picContent">
					<div v-for="(item, index) in AlbumImageList" :key="index" v-if="index==indexs">{{item.des}}

					</div>
				</div>
			</div>

		</div>

	</div>

</template>

<script src="./meteorologicalSecondary.js">
</script>

<style>
	@import url("./meteorologicalSecondary.css");
</style>