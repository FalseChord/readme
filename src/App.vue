<template>
  <div id="app" class="app"
    :class="{
      'login': $store.getters.isLoginPage,
      'page-not-found': isPageNotFound,
      'system-error': isSystemError,
    }">
    <ReadMeHeader class="app-header"></ReadMeHeader>
    <ReadMeAside class="app-aside"></ReadMeAside>
    <Alert></Alert>
    <LightBox></LightBox>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
    <SystemInfo></SystemInfo>
  </div>
</template>

<script>
import Alert from 'src/components/Alert.vue'
import LightBox from 'src/components/common/LightBox.vue'
import ReadMeHeader from 'src/components/header/ReadMeHeader.vue'
import ReadMeAside from 'src/components/aside/ReadMeAside.vue'
import SystemInfo from 'src/components/SystemInfo.vue'
import Tap from 'tap.js'
import { isAlink, logTrace, } from 'src/util/services'
import { get } from 'lodash'

export default {
  components: {
    Alert,
    LightBox,
    ReadMeHeader,
    ReadMeAside,
    SystemInfo,
  },
  computed: {
    me () {
      return get(this.$store, 'state.profile.id')
    },
    isPageNotFound () {
      const exp_404 = /^\/404/
      return exp_404.test(this.$route.fullPath)
    },
    isSystemError () {
      const exp_500 = /^\/500/
      return exp_500.test(this.$route.fullPath)
    },
    useragent () {
      return get(this.$store, 'state.useragent')
    },  
  },
  mounted () {
    this.$store.dispatch('UPDATE_CLIENT_SIDE_MOUNTED')
    const globalTapevent = new Tap(document)
    document.addEventListener('tap', event => {
      const checkAlink = isAlink(event.target)
      logTrace({
        category: 'whole-site',
        description: 'ele clicked',
        eventType: 'click',
        sub: this.me,
        target: event.target,
        useragent: this.useragent,
      })
    })      
  },
}
</script>

<style lang="stylus">
a, a:hover, a:link, a:visited
  text-decoration none
  color #000
  

button
  cursor pointer
  &:disabled
    cursor not-allowed
.view
  min-height calc(100vh - 60px)
  margin 0 auto
  position relative
    
.fade-enter-active, .fade-leave-active
  transition all .2s ease

.fade-enter, .fade-leave-active
  opacity 0


.app
  padding-top 60px
  padding-left 250px
  position relative
  background-color #fff
  min-height 100vh

  &-header
    position absolute
    left 0
    top 0
    z-index 2
  &-aside
    position absolute
    left 0
    top 0
    z-index 1
  &.page-not-found, &.system-error
    padding-top 0
    padding-left 0
    .app-header, .app-aside
      display none
  &.login
    padding-left 0
    padding-top 192px
    .app-aside
      display none
    .view
      min-height calc(100vh - 192px)  
@media screen and (min-width: 1200px)
  .app
    padding-left 310px

</style>
