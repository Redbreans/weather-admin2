<template>

	<footer>
		<div class="nav-footer-first">
			<div id="footer-contents">
				<div class="crolLeft">
					<!--<div class="friendLink">友情链接</div>-->
					<div class="friendLink">{{$t('text.links')}}</div>
					<div class="footer-ending">
						<div class="end-title">
							<ul>
								<li v-for="(item,index) in friendLinks">
									<a :href="item.url">{{item.name}}</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="textLeft">
					<div class="smallProgram">
						<img :src=imgUrl+publicNumbeCode alt="" />
						<!--<img :src=imgUrl+smallProgramCode alt="" />-->
						<!--<p>小程序</p>-->
						<p>{{$t('text.smallprogram')}}</p>
					</div>
					<div class="publicNumber">
						<img :src=imgUrl+smallProgramCode alt="" />
						<!--<img :src=imgUrl+publicNumbeCode alt="" />-->
						<!--<P>公众号</P>-->
						<P>{{$t('text.officialaccounts')}}</P>
					</div>
				</div>
			</div>

		</div>
		<!--回到顶部的样式-->
		<div class=" nav-footer-copy">{{contents}}</div>
		<div class="goTop" v-if="goTops" @click="goToTop"></div>
	</footer>
</template>
<script type="text/javascript" src="./footer.js"></script>

<style>
	@import url("./footer.css");
</style>