<template>
  <div class="main">
    <scroller :on-infinite="infinite" :on-refresh="refresh" ref="my_scroller">
      <!-- 项目内容 -->
      <!-- nav头部 -->
      <v-nav></v-nav>
      <!-- 轮播图 -->
      <!-- swiper页面 -->
      <v-swiper></v-swiper>
    </scroller>
  </div>
</template>

<script>
import nav from '@/components/nav/nav.vue';
import swiper from '@/components/swiper/swiper.vue';
import api from '@/api/index'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  data () {
    return {
      songlist : [],
      recVideos: [],
      mvVideos : [],
      offset : 0,//偏移量
      inland : [], //内地MVid
      inlandMV : [],//内地MV
      hongkong : [],//港台mvid
      hongkongMV : [],//港台mv
      occident : [],//欧美mvid
      occidentMV : [],//欧美mv
      japan : [], //日本mvid
      japanMV : [],//日本mv
    }
  },
  created(){
      const params = {
        order : 'hot'
      }
      var that = this;
      api.Recommend(params).then(res =>{
        if(res.code === 200){
          this.songlist = [];
          let length = res.playlists.length
        while(this.songlist.length<6){
          var random = Math.floor(Math.random()*(length-6+1)+1);
          //数组去重
          if (!this.songlist.includes(res.playlists[random])) {
              this.songlist.push(res.playlists[random]);
            }
           
          }
          this.$store.dispatch("reshSongList",this.songlist)
        }
      })
      //获取Mvid
      this.getMvid();
      //获取内地视频
      this.getInland();
      //获取港台
      this.gethongkong();
      //获得欧美mv
      this.getoccident();
      //获得日本mvid
      this.getjapan();
  },
  computed:{
    ...mapGetters([
      // 'songlist',
      'songs',
      'mvVideo'
    ]),
  },
  components: {
    'v-nav': nav,
    'v-swiper': swiper
  },
  methods:{
    //上拉加载
    infinite () {
　　　setTimeout(()=>{
      //因为接口有问题，offset没用，所以直接展示全部的
      //  this.getMvid()
　　　　this.$refs.my_scroller.finishInfinite(2);
　　　　},1500)
    },
    //下拉刷新
    refresh(){
      const params = {
        
        order : 'hot'
      }
      var that = this;
      api.Recommend(params).then(res =>{
        if(res.code === 200){
          this.songlist = [];
          let length = res.playlists.length
        while(this.songlist.length<6){
          var random = Math.floor(Math.random()*(length-6+1)+1);
          //数组去重
          if (!this.songlist.includes(res.playlists[random])) {
              this.songlist.push(res.playlists[random]);
            }
           
          }
          this.$store.dispatch("reshSongList",this.songlist)
        }
      })
      setTimeout(()=>{
　　　　　this.$refs.my_scroller.finishPullToRefresh()
　　　　}, 1500)
    },
    //根据id拿到mv数据
    getmvDetail(){
      // console.log(this.recVideos);
      this.recVideos.map((item)=>{
        // console.log(item.id)
        const params = {
          mvid :  item.id
        }
        api.getMVDetail(params).then( (res) =>{
          if(res.code === 200){
            this.mvVideos.push(res.data);
            // console.log(res.data)
          }
        })
      })
      this.$store.dispatch("yuncunVideo",this.mvVideos)
      // console.log(this.mvVideos)
    },
    //得到mvID
    getMvid(){
    //获取推荐视频
      const params = {
        // offset : this.offset,
        // limit:5
      }
      api.getRecVideo(params).then( (res)=>{
        if(res.code === 200){
          // console.log(res);
          // this.offset+=2;
          this.limit+=1;
          // console.log(this.limit)
          // this.recVideos= []
          this.recVideos = [...this.recVideos,...res.data]
          // console.log(this.recVideos);
          // console.log('length',this.recVideos.length)
        }
      }).then( (res) =>{
        this.getmvDetail()
      })
    },
    //获得内地mv
    getInland(){
      const params = {
        area : '内地',
        order : '最热',
        limit : 8
      }
      api.getAllMv(params).then( (res)=>{
        if(res.code === 200){
          this.inland = [...this.inland,...res.data]
        }
      }).then( (res) =>{
        this.getInlandDetail()
      })
    },
    //根据内地id拿到内地mv数据
    getInlandDetail(){
      this.inland.map((item)=>{
        const params = {
          mvid :  item.id
        }
        api.getMVDetail(params).then( (res) =>{
          if(res.code === 200){
            this.inlandMV.push(res.data);
          }
        })
      })
      this.$store.dispatch("inlandVideo",this.inlandMV)
      console.log(this.inlandMV)
    },
    //获得港台mv
    gethongkong(){
      const params = {
        area : '港台',
        order : '最热',
        limit : 8
      }
      api.getAllMv(params).then( (res)=>{
        if(res.code === 200){
          this.hongkong = [...this.hongkong,...res.data]
        }
      }).then( (res) =>{
        this.gethongkongDetail()
      })
    },
    //根据港台id拿到港台mv数据
    gethongkongDetail(){
      this.hongkong.map((item)=>{
        const params = {
          mvid :  item.id
        }
        api.getMVDetail(params).then( (res) =>{
          if(res.code === 200){
            this.hongkongMV.push(res.data);
          }
        })
      })
      this.$store.dispatch("hongkongVideo",this.hongkongMV)
      console.log(this.hongkongMV)
    },
    //获得欧美mv
    getoccident(){
      const params = {
        area : '欧美',
        order : '最热',
        limit : 8
      }
      api.getAllMv(params).then( (res)=>{
        if(res.code === 200){
          this.occident = [...this.occident,...res.data]
        }
      }).then( (res) =>{
        this.getoccidentDetail()
      })
    },
    //根据欧美id拿到欧美mv数据
    getoccidentDetail(){
      this.occident.map((item)=>{
        const params = {
          mvid :  item.id
        }
        api.getMVDetail(params).then( (res) =>{
          if(res.code === 200){
            this.occidentMV.push(res.data);
          }
        })
      })
      this.$store.dispatch("occidentVideo",this.occidentMV)
      console.log(this.occidentMV)
    },
   //获得日本mvid
    getjapan(){
      const params = {
        area : '日本',
        order : '最热',
        limit : 8
      }
      api.getAllMv(params).then( (res)=>{
        if(res.code === 200){
          this.japan = [...this.japan,...res.data]
        }
      }).then( (res) =>{
        this.getjapanDetail()
      })
    },
   //根据日本id拿到日本mv数据
    getjapanDetail(){
      this.japan.map((item)=>{
        const params = {
          mvid :  item.id
        }
        api.getMVDetail(params).then( (res) =>{
          if(res.code === 200){
            this.japanMV.push(res.data);
          }
        })
      })
      this.$store.dispatch("japanVideo",this.japanMV)
      console.log(this.japanMV)
    },
  }
}
</script>

<style scoped>
.main{
  background-color: #808c8c;
}
#outer-sjvdd{
  background-color: #808c8c;
}
</style>
