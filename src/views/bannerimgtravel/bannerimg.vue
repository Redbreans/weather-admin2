	
<template>
	
	<div id="routeRecommeds" :style=paddingbottom class="pages" v-if="dataAvailable" ref="routeRecommeds">
		<!--<div class="goback" @click="goBack">首页</div>-->
		<div class="content">
			<p class="title">{{name}}</p>
			<!--<img :src="imgUrl+routerData.cover" alt="" v-if="routerData.cover"/>-->
			<div class="des" v-html="bannerInfoData" ></div>
		
		</div>
	</div>
	<div v-else :style=styles>
		
		<div id="block" @click="goBack">
			<!--<div class="goback">首页</div>-->
		</div>
	</div>
	
</template>


<script src="./bannerimg.js">
</script>

<style>
	@import url("bannerimg.css");
</style>