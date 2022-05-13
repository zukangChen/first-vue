import api from '@/api/index'
import * as types from '../types'

const state = {
 songlist : [],
 songs : '可乐',
 searchHistory : ['薛之谦']
}

const mutations = {
  // 上拉刷新歌单
  [types.RESH_SONG_LIST](state, songlist) {
    state.songlist = songlist;
    // console.log(state.songlist)
  },
  //保存搜索历史
  [types.SAVE_SEARCH_HISTORY](state, searchHistory) {
    //数组去重,避免用户搜索相同关键字多次而加入相同的关键字
    if(!state.searchHistory.includes(searchHistory)){
      state.searchHistory.unshift(searchHistory)
    }
    // console.log(state.searchHistory)
  },
   //删除搜索历史 DELETE_SEARCH_HISTORY
   [types.DELETE_SEARCH_HISTORY](state) {
    state.searchHistory = []
  },
}


const actions = {
  // 上拉刷新歌单
  reshSongList ({commit, state}, songlist) {
    console.log(songlist);
    // let playHistory = state.playHistory.slice()
    // playHistory = [...playHistory, song]
    commit(types.RESH_SONG_LIST, songlist)
  },
  //保存搜索历史
  saveSearchHistory({commit, state}, searchHistory) {
    console.log(searchHistory);
    commit(types.SAVE_SEARCH_HISTORY, searchHistory)
  },
  //删除搜索历史 DELETE_SEARCH_HISTORY
  deleteSearchHistory({commit, state}) {
    commit(types.DELETE_SEARCH_HISTORY)
  },
}

const getters = {
  songlist: state => state.songlist,
  songs : state => state.songs,
  searchHistory : state => state.searchHistory,
}

export default {
  state,
  mutations,
  actions,
  getters
}