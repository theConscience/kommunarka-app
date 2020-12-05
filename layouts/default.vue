<template>
  <div id="app" class="app">
    <header class="app__header">
      <nav-bar class="app__nav" />
    </header>
    <Nuxt class="app__content" />
  </div>
</template>

<script>
/* eslint-disable no-console */
import { mapActions } from 'vuex'
import NavBar from '~/components/NavBar.vue'
export default {
  // MEMO: next running on Server side, and though document is not available
  //       rewrite with window.onNuxtready
  // middleware({ store, redirect }) {
  //   const idleTime = 1 * 60 * 1000
  //   store.dispatch('onIdle', [
  //     idleTime,
  //     () => {
  //       store.dispatch('search/disableSearch')
  //       store.dispatch('search/resetSearchQuery')
  //       store.dispatch('search/resetFilterKeyId')
  //       redirect('/search')
  //     },
  //   ])
  // },
  components: {
    NavBar,
  },
  mounted() {
    document.addEventListener('contextmenu', this.onContextMenuAction)
    window.onNuxtReady(() => this.resetIdle())
  },
  beforeDestroy() {
    document.removeEventListener('contextmenu', this.onContextMenuAction)
  },
  methods: {
    ...mapActions(['onIdle']),
    ...mapActions('search', [
      'disableSearch',
      'resetSearchQuery',
      'resetFilterKeyId',
    ]),
    // DISABLE RIGHT CLICK CONTEXT MENU
    onContextMenuAction(evt) {
      console.warn('User tried to open context menu')
      evt.preventDefault()
    },
    resetIdle(idleTime = 5 * 60 * 1000) {
      // console.log('resetIdle in 5 mins!')
      // 5 mins
      this.onIdle([idleTime, () => this.reset()])
    },
    reset() {
      // console.log('Reset by timer!')
      this.disableSearch()
      this.resetSearchQuery()
      this.resetFilterKeyId()
      window.$nuxt.$router.push('/search')
    },
  },
}
</script>

<style lang="stylus">
@import '~/assets/stylus/variables'
@import '~/assets/stylus/l-default'

  .app__header
    margin-bottom: $header_bottom
</style>
