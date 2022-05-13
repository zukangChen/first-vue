import api from '../../api/index'
import * as types from '../types'

const state = {
  mvVideos : [],
  inland : [],
  hongkong : [],
  occident : [],
  japan : [],
}


const mutations = {
    //获取云村精选视频
    [types.yuncun_video](state, mvVideos) {
      state.mvVideos = mvVideos;
      // console.log(state.mvVideos)
    },
    //获取内地视频
    [types.inland_video](state, mvVideos) {
      state.inland = mvVideos;
      // console.log(state.inland)
    },
    //获取港台视频
    [types.hongkong_video](state, mvVideos) {
      state.hongkong = mvVideos;
    },
    //获取欧美视频
    [types.occident_video](state, mvVideos) {
      state.occident = mvVideos;
    },
    //获取日本视频
    [types.japan_video](state, mvVideos) {
      state.japan = mvVideos;
    },
}

const actions = {
  //获取云村精选视频
    yuncunVideo ({commit, state}, mvVideos) {
    // console.log(mvVideos);
    commit(types.yuncun_video, mvVideos)
  },
  //获取内地视频
  inlandVideo({commit, state}, mvVideos) {
    commit(types.inland_video, mvVideos)
  },
  //获取港台视频
  hongkongVideo({commit, state}, mvVideos) {
    commit(types.hongkong_video, mvVideos)
  },
  //获取欧美视频
  occidentVideo({commit, state}, mvVideos) {
    commit(types.occident_video, mvVideos)
  },
  //获取日本视频
  japanVideo({commit, state}, mvVideos) {
    commit(types.japan_video, mvVideos)
  },
}

const getters = {
  mvVideo : state=> state.mvVideos,
  inland : state => state.inland,
  hongkong : state => state.hongkong,
  occident : state => state.occident,
  japan : state => state.japan,
}

export default {
  state,
  mutations,
  actions,
  getters
}