<template>
  <div class="container error">
    <h1 v-if="error.statusCode === 404">Страница не найдена</h1>
    <h1 v-else>Произошла ошибка: {{ error }}</h1>
    <NuxtLink to="/" class="error__back-btn">На главную</NuxtLink>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  layout: 'default', // you can set a custom layout for the error page
}
</script>

<style lang="stylus">
@import '~/assets/stylus/variables'
  .container
    flex-direction: column
    justify-content: center
    align-content: center

  .error__back-btn
    font-family: $f_mono
    font-size: 2.25rem
    display: block
    width: auto
    margin: auto
    text-transform: uppercase
    text-decoration: none
    color: $white
</style>
