<template>
  <div class="item-editor">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'ItemEditorLayout',
    methods: {},
    mounted () {},
  }
</script>
<style lang="stylus" scoped>
  .item-editor
    height 100%
    width 100%
    z-index 9998
    display flex
    justify-content center
    align-items center
    .panel
      overflow hidden
      height 100%
      width 100%
      // background-color #eeeeee
      // box-shadow 0px 0px 10px rgba(250,250,250,0.8)
      border-radius 2px
      position relative
      padding 0 0 90px
      &__group
        padding 30px 50px
        background-color #f7f7f7
        &:not(:first-child)
          margin-top 18px
        &--title
          font-size 1.25rem
          font-weight 600
          font-style normal
          font-stretch normal
          line-height 1.3
          letter-spacing normal
          text-align left
          color #0db9c9
          margin-bottom 30px
      &__content
        overflow auto
        height 100%
        padding-bottom 20px
        // border-bottom 1px solid #940606
        &--item
          // width 400px
          display flex
          align-items flex-start
          line-height normal
          // margin-right 40px
          margin-bottom 20px
          .title
            font-size 1.25rem
            margin-right 58px
            height 100%
            width 100px
            min-width 100px
          .value
            font-size 1rem
            word-wrap break-word
            max-width calc(100% - 158px)
            flex 1
            >>> .warn
              border 1px solid #ddcf21                     
      &__actions
        display flex
        justify-content flex-end
        height 54px
        width 100%
        position absolute
        left 0
        bottom 25px
        padding 0
        >>> .btn
          // flex 1
          font-size 1.25rem
          width 160px
          height 54px
          display inline-flex
          justify-content center
          align-items center
          color #fff
          background-color #0db9c9
          box-shadow 0px 0px 5px rgba(100,100,100,0.5)
          border-radius 2px
          padding 5px
          cursor pointer
          margin-left 10px
          &.block, &.block:hover
            cursor not-allowed
            background-color #d2d2d2

          &:hover
            background-color #d2d2d2
            box-shadow 0px 0px 5px rgba(250,250,250,0.5)      
</style>