import api from '@/api/index'
import * as types from '../types'

const state = {
  login : false,//登录状态
  userId : null,//用户id
  profile : {}, //用户信息
  songlist : {},//用户歌单
  userDetail : {}, //用户详情
}

const mutations = {
   //修改登录状态
   [types.update_login](state,login) {
    state.login = login
  },
   //保存用户id
   [types.save_userId](state,userId) {
    state.userId = userId;
  },
   //保存用户信息
   [types.save_profile](state,profile) {
    state.profile = profile;
  },
   //保存用户歌单
   [types.save_songlist](state,songlist) {
    state.songlist = songlist;
  },
   //保存用户详情
   [types.save_userDetail](state,userDetail) {
    state.userDetail = userDetail;
  },
}


const actions = {
  //修改登录状态
  updateLogin({commit, state},login) {
    commit(types.update_login,login)
  },
  //保存用户id
  saveUserId({commit, state},userId) {
    commit(types.save_userId,userId)
  },
  //保存用户信息
  saveProfile({commit, state},profile) {
    commit(types.save_profile,profile)
  },
  //保存用户歌单
  saveSonglist({commit, state},songlist) {
    commit(types.save_songlist,songlist)
  },
  //保存用户详情
  saveUserDetail({commit, state},userDetail) {
    commit(types.save_userDetail,userDetail)
  },
}

const getters = {
  login : state => state.login,
  userId : state => state.userId,
  profile : state => state.profile,
  songList : state => state.songlist,
  userDetail : state => state.userDetail,
}

export default {
  state,
  mutations,
  actions,
  getters
}