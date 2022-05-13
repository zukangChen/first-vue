<template>
  <div class="four">
    <div class="nav">
      <div class="t1" @click="tabone" :class="[currentTab == 1 ? 'active' : '']">内地</div>
      <div class="t2" @click="tabtwo" :class="[currentTab == 2 ? 'active' : '']">港台</div>
      <div class="t3" @click="tabthree" :class="[currentTab == 3 ? 'active' : '']">欧美</div>
      <div class="t4" @click="tabfour" :class="[currentTab == 4 ? 'active' : '']">日本</div>
    </div>
    <div class="tabone" v-if="currentTab == 1">
      <v-recVideo :Video="inland"></v-recVideo>
    </div>
    <div class="tabtwo" v-if="currentTab == 2">
      <v-recVideo :Video="hongkong"></v-recVideo>
    </div>
    <div class="tabthree" v-if="currentTab == 3">
      <!-- <h3>{{occident}}</h3> -->
      <v-recVideo :Video="occident"></v-recVideo>
    </div>
    <div class="tabfour" v-if="currentTab == 4">
      <v-recVideo :Video="japan"></v-recVideo>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import recVideo from '@/components/recVideo'
import { mapGetters, mapMutations, mapActions } from 'vuex'
  export default {
    data() {
      return {
        currentTab : 1 ,
      }
    },
    methods:{
      tabone(){
        this.currentTab = 1
      },
      tabtwo(){
        this.currentTab = 2
      },
      tabthree(){
        this.currentTab = 3
      },
      tabfour(){
        this.currentTab = 4
      },
    },
    computed:{
      ...mapGetters([
        'inland',
        'hongkong',
        'occident',
        'japan',
      ]),
    },
    components:{
      'v-recVideo': recVideo
    },
  }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
  .four
    background-color #80808c
    .nav
      display flex
      align-items center
      justify-content space-around
      color #d4dadb
      .active
        border-bottom 1px solid #fff
        box-sizing border-box
        color #feffff
        font-size 18px
    p
      text-align: center
      height: 30px
</style>
