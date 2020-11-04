<template>
  <nav class="main-nav">
    <nuxt-link to="/" class="main-nav__link">
      <img
        src="~/assets/img/img-logo.svg"
        class="main-nav__logo"
        alt="На главную"
      />
    </nuxt-link>
  </nav>
</template>

<style lang="stylus">
@import '~assets/stylus/variables'

  .main-nav__link
    display: block

  .main-nav__logo
    display: block
    width: 100%
    height: auto
</style>
