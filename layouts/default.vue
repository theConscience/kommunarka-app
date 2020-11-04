<template>
  <div id="app" class="app">
    <header class="app__header">
      <nav-bar class="app__nav" />
    </header>
    <Nuxt class="app__content" />
  </div>
</template>

<script>
import NavBar from '~/components/NavBar.vue'
export default {
  components: {
    NavBar,
  },
}
</script>

<style lang="stylus">
@import '~/assets/stylus/variables'
@import '~/assets/stylus/l-default'

  .app__header
    margin-bottom: $header_bottom
</style>
