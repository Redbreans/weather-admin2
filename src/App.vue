<template>
	<div id="app" v-if="isType">
		<homes></homes>
		<!--v-if="isRouterAlive"-->
		<router-view />
		<footers></footers>
	</div>
	<div v-else id="versionType">
		<div class="logWeather">
			<div class="logWeatherBrower">
				<img src="./assets/images/browser_logo1.png" alt="" />
				<img src="./assets/images/browser_logo2.png" alt="" />
				<span class="logTitle"></span>
			</div>
			<div class="logWeatherBrowerMore">
			         继续访问<img src="./assets/images/browser_more.png" alt=""  width="12" height="16"/>
			</div>
		</div>
		
		<div class="tips">
			温馨提示：您当前的浏览器版本过低，存在安全风险，建议升级浏览器
		</div>
		
		<div class="browserType">		
			<div class="browsers">
				<ul>
					<li>
						<img src="./assets/images/browser_icon_google.png"/>
						<p class="ge">谷歌浏览器</p>
						<div class="gotodown"><a href="https://www.google.cn/chrome/">前往下载</a></div>
					</li>
					<li>
						<img src="./assets/images/browser_icon_qq.png"/>
						<p class="qq">QQ浏览器</p>
						<div class="gotodown"><a href="http://www.mydown.com/soft/444/526715944.shtml">前往下载</a></div>
					</li>
					<li>
						
						<img src="./assets/images/browser_icon_ie.png"/>
						<p class="ie">IE浏览器</p>
						<div class="gotodown"><a href="http://d.daiyu78.cn/nb/nsoft_1076.html">前往下载</a></div>
					</li>
				</ul>
			</div>
		</div>

	</div>
</template>

<script>
	import homes from '@/views/header/header.vue'
	import footers from '@/views/footer/footer.vue'
	export default {
		name: 'App',
		//		provide(){
		//			return{
		//				reload:this.reload
		//			}
		//		},
		data() {
			return {
				//              isRouterAlive :true
				isType: true,
			}
		},
		components: {
			homes: homes,
			footers: footers
		},
		methods: {
			//			reload(){
			//				this.isRouterAlive = false;
			//				this.$nextTick(function(){
			//					this.isRouterAlive = true;
			//				})
			//			}

			//判断当前浏览类型 
			BrowserType() {
				var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串 
				var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器 
				var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器 
				var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器 
				var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器 
				var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器 
				var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器 

				if(isIE) {
					var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
					reIE.test(userAgent);
					var fIEVersion = parseFloat(RegExp["$1"]);
					if(fIEVersion == 7) {
						return "IE7";
					} else if(fIEVersion == 8) {
						return "IE8";
					} else if(fIEVersion == 9) {
						
						this.isType = false;
						return "IE9";
					} else if(fIEVersion == 10) {
						return "IE10";
					} else if(fIEVersion == 11) {
						return "IE11";
					} else {
						return "0"
					} //IE版本过低 
				} //isIE end 

				if(isFF) {
					return "FF";
				}
				if(isOpera) {
					return "Opera";
				}
				if(isSafari) {
					return "Safari";
				}
				if(isChrome) {
					return "Chrome";
				}
				if(isEdge) {
					return "Edge";
				}
			}, //myBrowser() end 

			//判断是否是IE浏览器 
			isIE() {
				var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串 
				var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器 
				if(isIE) {
					return "1";
				} else {
					return "-1";
				}
			},

			//判断是否是IE浏览器，包括Edge浏览器 
			IEVersion() {
				var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串 
				var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器 
				var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器 
				if(isIE) {
					var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
					reIE.test(userAgent);
					var fIEVersion = parseFloat(RegExp["$1"]);
					if(fIEVersion == 7) {
						return "IE7";
					} else if(fIEVersion == 8) {
						return "IE8";
					} else if(fIEVersion == 9) {
						return "IE9";
					} else if(fIEVersion == 10) {
						return "IE10";
					} else if(fIEVersion == 11) {
						return "IE11";
					} else {
						return "0"
					} //IE版本过低 
				} else if(isEdge) {
					return "Edge";
				} else {
					return "-1"; //非IE 
				}
			},

		},
		created: function() {
			this.BrowserType()
		}
	}
</script>

<style scoped>
	ul,li{
		margin:0;
		padding:0;
		list-style:none;
	}
	
	#versionType {
		width: 1200px;
		margin: 60px auto;
		height: 600px;
	}
	
	#versionType .logWeather {
		width: 1200px;
		overflow: auto;
	}
	
	#versionType .logWeather .logTitle {
		display: inline-block;
		background: url('./assets/images/browser_title.png') no-repeat;
		width: 473px;
		height: 43px;
		margin-bottom: 10px;
		margin-left: 25px;
	}
	
	.logWeatherBrower {
		float: left;
	}
	
	.logWeatherBrowerMore {
		float: right;
		text-align: center;
		margin-top: 10px;
		display: inline-block;
		width: 160px;
		height: 40px;
		line-height: 40px;
		border: 1px solid #16994D;
		color:#16994D;
	}
	
	.logWeatherBrowerMore img{	
		display: inline-block;
		vertical-align: top;
		margin-left:5px;
		margin-top:12px
	}
	.tips {
		width:1200px;
		height:109px;
		background:url('./assets/images/browser_tip.png') no-repeat;
		background-size:cover;
		margin:0 auto;
		margin-top:40px;
		text-align: center;
		line-height: 90px;
		color:#fff;
		font-size:24px;
	}
	.browserType {
		width:1200px;
		margin:0 auto;
		height:596px;
		background:url('./assets/images/browser_box.png') no-repeat;
		background-size:cover;
		margin-top:40px;
		overflow: hidden;	
	}
	.browserType .browsers {
	
		margin-left:100px;
		margin-right:100px;
		margin-top:100px;
		margin-bottom:100px;
		height:390px;
	}
	.browsers ul {
		overflow: auto;
		margin:0 auto;
		margin-left:100px;
		margin-right:80px;
	}
	.browsers li {
		float:left;
		width:33%;
		text-align: center;
	}
	.browsers li img {
		max-width:100%;
	}
	.browsers li P {
		margin-top:15px;
		padding:0;	
	}
	.browsers li P.ge {
		margin-top:30px;
	}

	.browsers li P.ie {
		margin-top:25px;
	}
	.browsers li .gotodown {
		width:120px;
		height:35px;
		line-height: 35px;
		background-color:#16994D;
		text-align: center;
		color:#fff;
		display: inline-block;
		margin-top:40px;
	}
	.browsers li .gotodown a {
		text-decoration: none;
		color:#fff;
	}
	
</style>