<template>
  <main class="page page--person person">
    <!-- <h1 class="page__title">Страница о человеке</h1> -->
    <nuxt-link to="/search" class="page__link page__link--back">
      Назад к поиску
    </nuxt-link>
  </main>
</template>

<script>
export default {
  data() {
    return {
      victim: {
        name: '',
        birthday: '',
        bio: '',
        death: '',
        img: '',
        title: '',
      },
    }
  },
}
</script>

<style lang="stylus">
@import '~assets/stylus/variables'
@import '~assets/stylus/page'

  .person
    background-color: $black
</style>
