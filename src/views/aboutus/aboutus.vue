<template>
  <div class="aboutusPage">
    <div id="aboutus" v-if="routerData!=[] || routerData!=undefined || routerData!=''">
      <div class="contents">
        <p class="title">{{routerData.title}}</p>
        <!--<img :src="imgUrl+routerData.cover" alt="" v-if="routerData.cover"/>-->
        <div class="content" v-html="routerData.content"></div>
      </div>
    </div>
    <div v-else>
      <div class="nulls">暂无数据</div>
    </div>
  </div>
</template>

<script src="./aboutus.js">
</script>

<style>
@import url("./aboutus.css");
</style>