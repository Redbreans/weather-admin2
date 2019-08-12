<template>
	<div class="page">
		<header class="nav-herder">
			<div id="header-contents">
				<div class="header-times" @mouseleave="leave()">
					<ul>
						<li class="language" @mouseenter="enter()">
							<div class="yuyan" v-if="languageIndexs===0">语言<img src="../../assets/images/homepage_language_down.png" alt="" /></div>
							<div class="yuyan" v-if="languageIndexs===1">EngLish<img src="../../assets/images/homepage_language_down.png" alt="" /></div>
						</li>
						<!--<li class="season" v-if="calendarFestival">{{calendarFestival}}</li>-->
						<li class="season">{{calendarFestival}}</li>
						<li>农历{{calendarMonth}}{{calendarDay}}</li>
						<li>{{year}}年{{month}}月{{day}}日</li>
						<li class="aboutUs" @click="aboutUs">{{$t('text.aboutUs')}}</li>
					</ul>
					<div class="changeLanguage" v-if="is_Show" @mouseleave="leave()">
						<p :class="languageIndexs==0 ? 'checked' :'mousezh'" @mouseleave="chooseLanguageS(1)" @click="chooseLanguage(0)" @mouseenter="chooseLanguages(0)">中文</p>
						<p :class="languageIndexs==1 ? 'checked' :'moseen'" @mouseleave="chooseLanguageS(0)" @click="chooseLanguage(1)" @mouseenter="chooseLanguages(1)">English</p>
					</div>
				</div>
				<div class="header-title">
					<img src="../../assets/images/public_logo1.png" alt="" class="header-title-imgOne" />
					<img src="../../assets/images/public_logo2.png" alt="" class="header-title-imgTwo" />
					<span id="titless"></span>
				</div>
				<div class="header-navBars">
					<div class="leftBank"></div>
					<ul class="rghtBank" v-if="defultName">
						<li v-for="(item,index) in navBarTitles" :key="index">
							<router-link :to="item.path" :class="initIndex==index ? 'active':''" @click="activeFun(index)" >{{item.name}}
								<i></i>
							</router-link>							
						</li>
					</ul>
					<ul class="changeUl" v-else>
						<li v-for="(item,index) in navBarTitles" :key="index">							
							<router-link :to="item.path" :class="initIndex==index ? 'active changeName':'changeName'" @click="activeFun(index)" >{{item.enName}}
								<i></i>
							</router-link>
						</li>
					</ul>
				</div>
			</div>

		</header>
		<!--<div class="meteorologicals">
			<div class="weatherWarning">
				<el-carousel :interval="5000" arrow="never" indicator-position="none">
					<el-carousel-item v-for="item in 4" :key="item">
						<p>hahahahhahah第三部分该卡刚回来的撒</p>
					</el-carousel-item>
				</el-carousel>
			</div>
		</div>-->
	</div>
</template>

<script src="./header.js"></script>

<style>
	@import url("./header.css");
</style>