<template>
<div>
  <div class="navlist">
   <ul>
    <li class="navli" v-for="(item,index) in navList" :key="index" 
    :class="{'activeT':nowIndex===index}"
    @click="tabClick(index)">
    <i>{{item.name}}</i>
    </li>
   </ul>
  </div>
  <div class="swiper-container swiper_con">
   <div class="swiper-wrapper">
    <!-- 第一个swiper -->
    <div class="swiper-slide" ref="viewBox">1111
    </div>
    <!-- 第二个swiper -->
    <div class="swiper-slide">2222
    </div>
   </div>
  </div>
 </div>
</template>

<script>
 export default {
  name: "swiper",
  data() {
   return {
    navList:[
     {name:'热门答疑'},
     {name:'北清状元'}
    ],
    nowIndex:0,
   }
  },
  components:{
  },
  mounted() {
   var that=this
   that.mySwiper = new Swiper('.swiper-container',{
     initialSlide:0,
     autoplay:false,
     keyboardControl:true,
     autoHeight:true,
     observer:true,
     observeParents:true,
     onSlideChangeStart:function(){
      // console.log(that.mySwiper.activeIndex)
      that.nowIndex=that.mySwiper.activeIndex
     }
    });
   // this.getList();
  },
  methods: {
   tabClick(index){
    this.nowIndex = index
    this.mySwiper.slideTo(index,1000,false)
   },
  },
 created(id){
  
 }
}
</script>
<style>
.navlist{
 width:100%;
 height:40px;
 border-bottom:1px solid rgba(151,151,151,0.1);
 position:relative;
}
.navli{
 padding:10px 0px;
 text-align:center;
 float:left;
 margin:0 1.2rem;
}
.navli i{
 font-style: normal;
 font-size: 16px;
}
.activeT{
 color:#00ba6b;
 padding-bottom: .3rem;
 border-bottom: 2px solid #00ba6b;
}
.swiper_con{
 width:100%;
 margin-bottom:40px;
 position:relative;
} 
.choosegrand{
 position:absolute;
 top:-3;
 right:0;
}
.show{
 display:block;
}
.none{
 display:none;
}
</style>
