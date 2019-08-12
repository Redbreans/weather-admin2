<template>
	<div id="routeRecommeds" :style=paddingbottom class="pages" v-if="dataAvailable" ref="routeRecommeds">
		<!--<div class="goback" @click="goBack">首页>旅游路线推荐>{{routerData.title}}</div>-->
		<div class="content">
			<p class="title">{{routerData.title}}</p>
			<!--<img :src="imgUrl+routerData.cover" alt="" v-if="routerData.cover"/>-->
			<div class="des" v-html="routerData.content" ></div>
		
		</div>
	</div>
	<div v-else :style=styles>
		
		<div id="block" @click="goBack">
			<!--<div class="goback">首页</div>-->
		</div>
	</div>
	
</template>

<script src="./routerecommend.js">
</script>

<style>
	@import url("./routerecommend.css");
</style>