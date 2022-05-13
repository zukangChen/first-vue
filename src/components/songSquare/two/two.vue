<template>
  <div class="one">
    <!-- 推荐歌单 -->
    <v-songtable :songlist="songlist"></v-songtable>
  </div>
</template>

<script type="text/ecmascript-6">
import songtable from '../songTable'
import api from '@/api/index'
// import { mapGetters, mapMutations, mapActions } from 'vuex'
const limit = 9 ;
export default {
  data() {
    return {
      songlist : [],
    }
  },
  created (){
    this.getRecommend();
  },
  components:{
    'v-songtable': songtable
  },
  methods:{
    //获取推荐歌单
    getRecommend () {
      const params = {
        limit,
        cat : '民谣'
      }
      api.Recommend(params).then(res =>{
        if(res.code === 200){
          console.log(res);
          this.songlist = [...this.songlist,...res.playlists];
          console.log(this.songlist);
        }
      })
    },
  }
}
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>

</style>
