import Vue from 'vue'
import axios from 'axios'
const vue = new Vue()

// axios配置
axios.defaults.timeout = 10000
axios.defaults.baseURL = '/'

// 返回状态判断
axios.interceptors.response.use((res) => {
  if (res.data.code !== 200) {
    console.log('网络异常')
    vue.$toast('网络异常')
    vue.$hideLoading()
    return Promise.reject(res)
  }
  return res
}, (error) => {
  console.log('网络异常')
  vue.$toast('网络异常')
  vue.$hideLoading()
  return Promise.reject(error)
})

export function fetchGet(url, param) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: param
    })
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default {
  // 用户登录
  Login(params) {
    return fetchGet('/login', params)
  },
  // banners
  BannerList() {
    return fetchGet('/banner')
  },
  //歌单
  DiscLists(params) {
    return fetchGet('/top/playlist', params)
  },
  // 歌单详情
  SongList(params) {
    return fetchGet('/playlist/detail', params)
  },
  //歌曲搜索
  MusicSearch(params) {
    return fetchGet('/search', params)
  },
  //歌曲url
  SongUrl(params) {
    return fetchGet('/song/url', params)
  },
  // //热门搜索
  HotSearchKey() {
    return fetchGet('/search/hot')
  },
  //获取歌词
  MusicLyric(id) {
    return fetchGet('/lyric', {
      id
    })
  },
  //获取歌曲的url
  MusicUrl(id) {
    return fetchGet('/top/playlist', {
      id
    })
  },
  //获取推荐歌单
  Recommend(params) {
    return fetchGet('/top/playlist', params)
  },
  //歌曲详情
  Song(params) {
    return fetchGet('/song/detail', params)
  },
  //获取热门歌手
  hotSinger(params) {
    return fetchGet('/top/artists', params)
  },
  //获取歌手
  getSinger(params) {
    return fetchGet('/artist/list', params)
  },
  //获取推荐视频
  getRecVideo(params) {
    return fetchGet('/mv/exclusive/rcmd', params)
  },
  //根据id获取mv数据
  getMVDetail(params) {
    return fetchGet('/mv/detail', params)
  },
  //获取全部mv
  getAllMv(params) {
    return fetchGet('/mv/all', params)
  },
  //获取排行榜单
  getRanking(params) {
    return fetchGet('/top/list', params)
  },
  //手机号登录
  phoneLogin(params) {
    return fetchGet('/login/cellphone', params)
  },
  //登录后根据用户id获取用户歌单
  getUserSonglist(params) {
    return fetchGet('/user/playlist', params)
  },
  //登录后根据用户id获取用户详情
  getUserDetail(params) {
    return fetchGet('/user/detail', params)
  },
  //登录后,获取每日推荐歌曲
  getRecommendSongs() {
    return fetchGet('/recommend/songs')
  },
  // 测试
  getChen() {
    return fetchGet('/chen')
  }
}