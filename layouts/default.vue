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
  mounted() {
    document.addEventListener('contextmenu', this.onContextMenuAction)
  },
  beforeDestroy() {
    document.removeEventListener('contextmenu', this.onContextMenuAction)
  },
  methods: {
    // DISABLE RIGHT CLICK CONTEXT MENU
    onContextMenuAction(evt) {
      console.warn('User tried to open context menu')
      evt.preventDefault()
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
