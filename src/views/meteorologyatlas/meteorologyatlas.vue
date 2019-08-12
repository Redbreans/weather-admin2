<template>
	<div id="wonderfulatlas" class="pages">
		<div class="wonderfulatlasName" @click="goBack">
			{{parentName}}> {{countryName}} >{{imgName}}
		</div>
		<div class="containersName">{{imgName}}(<span>{{mark+1}}/{{this.AlbumImageList.length}}<a>页)</a></span></div>
		<div class="totalImgs">
			<div class="broadCastImg">
				<div class="leftBroadCast" @mouseover="stop()" @mouseout="move()">
					<p :class="prevShow ? 'prev' :'img'" @click="pre"></p>
					<el-carousel :interval="5000" height="670px" ref="picImgs" arrow="never" indicator-position="none" @change="activeFun">
						<el-carousel-item v-for="(item, index) in AlbumImageList" :key="index">
							<div>
								<div :style="{backgroundImage:'url('+imgUrl+item.fileId+')'}" class="bg-img" v-if="item.coverType=='picture'"></div>
								<div class="bg-img" v-if="item.coverType=='video'">
									<video autoplay>
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
				<div class="rghtBroadCast">
					<div class="containerImg">
						<div v-for="(item,index) in AlbumImageList" class="videosmalls">
							<div v-if="item.coverType=='picture'" class="videosmall-one" @click="changes(index)">
								<img :src="imgUrl+item.fileId" alt="" @mouseover="stop1()" @mouseout="move1()" @click="changes(index)" :key="index" :class="{is_active:index==mark}">
							</div>
							<div v-if="item.coverType=='video'" class="videosmall-one" @click="changes(index)" @mouseover="stop1()" @mouseout="move1()">
								<video width="160" height="160" style="object-fit: fill">
									<source :src="imgUrl+item.fileId" type="video/ogg">
									<source :src="imgUrl+item.fileId" type="video/mp4"> 你的浏览器不支持
								</video>
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

<script src="./meteorologyatlas.js">
</script>

<style>
	@import url("./meteorologyatlas.css");
</style>