<template>
  <div class="nav">
    <ul class="nav-list">
      <li class="item"
       v-for="(item,index) in navList" :key="index"
        :class="{'active': nowIndex===index}"
         @click="tabClick(index)">
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import VueRouter from 'vue-router';

  export default {
    data() {
      return {
        navList: [
          {name: '华语'},
          {name: '民谣'},
          {name: '轻音乐'},
          {name: '电子'},
          {name: '欧美'}
        ],
        nowIndex: 0
      }
    },
    mounted() {
      this.$nextTick(() => {
        // 初始化，保证刷新页面后内容区和导航键一致
        this.initPage();
      });
      // 接收swiper组件发射的index进行导航按钮切换高亮和更新模板地址
      this.$root.eventHub.$on('slideTab', this.slideTab);
    },
    methods: {
      initPage() {
        this.nowIndex = this.$route.path === '/one' ? 0 : this.$route.path === '/two' ? 1 : this.$route.path === '/three' ? 2 : this.$route.path === '/four' ? 3 : this.$route.path === '/five' ? 4 : 0;
      },
      tabClick(index) {
        this.nowIndex = index;
        // 点击导航按钮时向swiper组件发射index
        this.$root.eventHub.$emit('changeTab', index);
      },
      slideTab(index) {
        this.nowIndex = index;
        let router = new VueRouter();
        let href = index === 0 ? '/one' : index === 1 ? '/two' : index === 2 ? '/three' : index === 3 ? '/four' : index === 4 ? '/five' : '/one';
        // 利用路由的push方法更新路径地址
        router.push(href);
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
  .nav
    margin-bottom: 20px
    .nav-list
      width: 100%
      overflow: hidden
      padding 0
      color #fff
      .item
        width: 20%
        display: inline-block
        text-align: center
        height: 48px
        line-height: 48px
        &.active
          // background-color: #ccc
          border-bottom 1px solid #fff
</style>
