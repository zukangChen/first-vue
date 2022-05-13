import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main.vue';
import songdetail from '@/components/songdetail.vue';
import songSquare from '@/components/songSquare/songSquare.vue';
import search from '@/components/search.vue';
import searchDetail from '@/components/searchDetail.vue';
import singer from '@/components/singer.vue';
import ranking from '@/components/ranking.vue';
import rankingDetail from '@/components/rankingDetail.vue';
import one from '@/components/one/one.vue';
import daySongs from '@/components/daySongs.vue';
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', component: Main},
    {
      path: '/songdetail',
      name:songdetail,
      component: songdetail
    },
    //歌单广场
    {
      path: '/songSquare/songSquare',
      name:songSquare,
      component: songSquare
    },
    //搜索页
    {
      path: '/search',
      name:search,
      component: search
    },
    //搜索详情页
    {
      path: '/searchDetail',
      name:searchDetail,
      component: searchDetail
    },
    //歌手
    {
      path: '/singer',
      name:singer,
      component: singer
    },  
    //排行榜
    {
      path: '/ranking',
      name:ranking,
      component: ranking
    },  
    //排行榜详情页
    {
      path: '/rankingDetail',
      name:rankingDetail,
      component: rankingDetail
    },  
    //用户歌单
    {
      path: '/one',
      name:one,
      component: one
    }, 
    //每日推荐歌曲
    {
      path: '/daySongs',
      name:daySongs,
      component: daySongs
    },
  ]
})
