import Vue from 'vue'
import Vuex from 'vuex'

// import com from './modules/com'
import music from './modules/music'
import video from './modules/video'
import myLogin from './modules/myLogin'

Vue.use(Vuex)

export default new Vuex.Store({
  modules : {
    // com,
    music,
    video,
    myLogin,
  }
})