<template>
	<div class="pages" id="countrytravel">
		<div class="contentCountryTravel">
			<div class=" countryTitle" @click="goBack">
				<span>{{parentName}}</span>>
				<!--<span>{{specialName}}</span>>-->
				<span>{{countryName}}</span>
			</div>
		</div>
		<div class="countryDetail">
			<div class="countryLeftIntroduce">
				<span class="title">{{countryData.landscapeName}}</span>
				<p class="introduceContent">{{countryData.landsDes}}</p>
			</div>
			<div class="countryRghtPicture">
				<div class="currentLive">当前天气实况</div>
				<div class="weatherIcons">
					<div class="weatherIconLeft">
						<div class="depatureConditaions"><img src="../../assets/images/public_icon7.png" /><span>{{condationData.temperature}}&#8451</span></div>
						<div><img src="../../assets/images/public_icon1.png" /><span>{{condationData.precipitation}}mm</span></div>
						<div><img src="../../assets/images/public_icon4.png" /><span>{{countryData.height}}m</span></div>
					</div>
					<div class="weatherIconRght">
						<div class="rgthConditaions"><img src="../../assets/images/public_icon6.png" /><span>{{condationData.aqi}}()</span></div>
						<div><img src="../../assets/images/public_icon3.png" /><span>{{condationData.humidity}}%</span></div>
						<div><img src="../../assets/images/public_icon5.png" /><span>{{condationData.hpa}}hPa</span></div>
					</div>
					<div class="commendtionsImg">
						<span class="recommend-index">旅游指数推荐</span>
						<span class="recommend-img">
							<img src="../../assets/images/country_index.png" v-for="(item,index) in hotLevel"/>
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
						<div class="oneDayDetail" v-for="(item,index) in foreastList" :key="index" >
							<p class="" v-for="(items,indes) in datas" :key="indes" v-if="indes==index">{{items[0]}}/{{items[1]}}</p>
							<!--<p class="oneDayTime" v-if="index==0">今天</p>
							<p class="oneDayTime" v-if="index==1">明天</p>
							<p class="oneDayTime" v-if="index==2">后天</p>
							<p class="oneDayTime" v-if="index>=3">{{item.dt}}</p>-->
							
							<!--    2019-01-10    修改  by wl    starting   -->
							<p class="oneDayTime" v-if="index==0">明天</p>
							<p class="oneDayTime" v-if="index==1">后天</p>
							<p class="oneDayTime" v-if="index>=2">{{item.dt}}</p>
							<!--    ending -->

							<div class="oneDayImg">

								<img :src="item.dayImg" alt="" />

							</div>
							<div class="oneDayImg">

								<img :src="item.nightImg" alt="" />
								<p class="imgName">{{item.weather}}</p>
							</div>
							<div class="oneDayDepature">{{item.temperatureMax}}/{{item.temperatureMin}}&#8451;</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--精彩图集-->
		<div class="wonderfulAtlas">
			<div class="wonderfulTitle">
				<p>精彩图集</p>
				<img src="../../assets/images/public_titleline1.png" alt="" />
			</div>
			<div class="aSmallTown" v-for="(item,index) in albumData" :key="index">
				<div class="albumImg">

					<div class="album_bg_img" v-if="(index+1) % 3 == 1" :title="item.name">
						<span class="albumImgName">{{item.name}}</span>
					</div>
					<div class="album_bg_img_one" v-if="(index+1) % 3 == 2" :title="item.name">
						<span class="albumImgName">{{item.name}}</span>
					</div>
					<div class="album_bg_img_two" v-if="(index+1) % 3 == 0" :title="item.name">
						<span class="albumImgName">{{item.name}}</span>
					</div>

				</div>
				<div class="pictures">
					<div class="pictureImg" v-for="(itemList,index) in item.albumImageList" :key="index" v-if="index<3" @click="jumpAlbum(item.albumId,index,item.name)">

						<div v-if="itemList.coverType=='picture'">
							<img :src="imgUrl+itemList.fileId" />
							<!--<span class="pictureImgDes">{{itemList.name}}</span>-->

							<span class="pictureImgDes" v-if=item.overName>{{itemList.des}}</span>
							<span class="pictureImgDes overName" v-else>
								<span>{{itemList.des}}</span>
							</span>

						</div>
						<div v-if="itemList.coverType=='video'" class="videos">
							<video width="282" height="210" style="object-fit: fill">
								<source :src="imgUrl+itemList.fileId" type="video/ogg">
								<source :src="imgUrl+itemList.fileId" type="video/mp4"> 你的浏览器不支持
							</video>
							<!--public_video   下面这个是图片的按播放按钮-->
							<img src="../../assets/images/public_video.png" class="video-img" />
							<!--<span class="pictureImgDes">{{itemList.name}}</span>-->
							<span class="pictureImgDes" v-if=item.overName>{{itemList.des}}</span>
							<span class="pictureImgDes overName" v-else>
								<span>{{itemList.des}}</span>
							</span>

						</div>

					</div>
				</div>
				<!--  查看更多  -->
				<div class="moreImg" @click="lookMorPictures(item.albumId,item.name)"></div>
			</div>
		</div>
		<!--评论区-->
		<div class="comments">
			<span class="totalComment">评论({{total}}条)</span>
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
				<div class="block">
					<el-pagination background @size-change="handleSizeChange" @current-change="shophouseCurrentChange" :current-page="page" :page-size="size" layout="total, prev, pager, next" :total="total" prev-text="上一页" next-text="下一页">
					</el-pagination>
				</div>
			</template>
		</div>

		<!--  遮罩层  -->
		<div class="mask-k" v-if="isMark">

			<div id="wondermark" class="pages">
				<!--<div class="wonderfulatlasName" @click="goBack">
					<!--{{parentNames}}> {{specialNames}} > {{countryName}} >{{imgName}}
				</div>-->

				<div class="totalImgs">
					<div class="containersName">{{imgName}}(<span>{{mark+1}}/{{this.AlbumImageListchild.length}}<a>页)</a></span></div>
					<div class="broadCastImg">
						<!--  左边轮播的大图片-->

						<div class="leftBroadCast" @mouseover="stop()" @mouseout="move()">
							
							<!--<p :class="prevShow ? 'prev' :'img'" @click="pre"></p>-->
							<span :class="prevShow ? 'prev' :'img'" @click="pre"></span>
							
							<el-carousel :autoplay="autoplays" :interval="2000" height="520px" ref="picImgs" loop="loop" arrow="never" indicator-position="none" @change="activeFun">
								<el-carousel-item v-for="(item, index) in AlbumImageListchild" :key="index">
									<div>
										
										<div :style="{backgroundImage:'url('+imgUrl+item.fileId+')'}" class="bg-img" v-if="item.coverType=='picture'"></div>
										<div class="bg-img" v-if="item.coverType=='video'" @click="videoPlay(item.fileId)">
											<video ref="fileIdItem" playsinline="true" webkit-playsinline="true" preload="auto" :id="item.fileId" controls="controls">
												<source :src="imgUrl+item.fileId" type="video/ogg">
												<source :src="imgUrl+item.fileId" type="video/mp4"> 你的浏览器不支持
											</video>
											<img src="../../assets/images/public_video.png" :class="isPlays==0?'video-img':'video-imgs'" />
										</div>
									</div>

								</el-carousel-item>
							</el-carousel>
							<p :class="nextShow ? 'next' :'imgOne'" @click="net"></p>
						</div>

						<!--右边滚动的缩略图片-->
						<div class="rghtBroadCast" style="width:320px;">
							<div class="containerImg">
								<div v-for="(item,index) in AlbumImageListchild" class="videosmalls">
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

						<!-- 底部文字说明-->
						<div class="picContent">
							<div v-for="(item, index) in AlbumImageListchild" :key="index" v-if="index==indexcontent">{{item.des}}

							</div>
						</div>
					</div>
					<div class="close-mark" @click="closemark()"></div>
				</div>

			</div>

		</div>
	</div>
</template>

<script src="./countryTravel.js">
</script>

<style>
	@import url("./countryTravel.css");
</style>