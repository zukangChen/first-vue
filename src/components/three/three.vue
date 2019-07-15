<template>
  <div class="three">
    <div class="wrapper">
      <ul>
        <li>
          <div class="left"></div>
          <div class="right"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {

  }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/css/function'
  .three
    .wrapper
      ul,li
        list-style none 
        li
          display flex
          .left
            flex 0 0 px2rem(66px)
            border 1px solid #000
          .right
            flex 1
            border 1px solid #000
</style>
