<template>
  <main class="page page--person person">
    <!-- <h1 class="page__title">Страница о человеке</h1> -->
    <nuxt-link to="/search" class="page__link page__link--back">
      Назад к поиску
    </nuxt-link>
    <h1>Личное дело №{{ id }}</h1>
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
  computed: {
    id() {
      return this.$route.params.id
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  },
  head() {
    return {
      title: 'личное дело #' + this.id,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Личное дело #' + this.id,
        },
      ],
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
