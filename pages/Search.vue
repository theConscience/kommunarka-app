<template>
  <main class="page page--search search">
    <h1 class="page__title">Поиск</h1>
    <form action="" method="get" class="search__form search-form">
      <div class="search-form__search">
        <input
          type="text"
          class="search-form__query"
          placeholder="введите имя / фамилию"
          name="search"
        />
        <button
          type="button"
          class="search-form__remove-last"
          title="Удалить последний символ"
        >
          Удалить
        </button>
      </div>
      <ul class="search-form__filters">
        <li class="search-form__filter">
          <nuxt-link class="search-form__filter-link" to="/search?А">
            А
          </nuxt-link>
        </li>
        <li class="search-form__filter">
          <nuxt-link class="search-form__filter-link" to="/search?Б">
            Б
          </nuxt-link>
        </li>
        <li class="search-form__filter">
          <nuxt-link class="search-form__filter-link" to="/search?В">
            В
          </nuxt-link>
        </li>
        <li class="search-form__filter">
          <nuxt-link class="search-form__filter-link" to="/search?Г">
            Г
          </nuxt-link>
        </li>
        <li class="search-form__filter">
          <nuxt-link class="search-form__filter-link" to="/search?Д">
            Д
          </nuxt-link>
        </li>
        <li class="search-form__filter">
          <nuxt-link class="search-form__filter-link" to="/search?Е">
            Е
          </nuxt-link>
        </li>
        <li class="search-form__filter">
          <nuxt-link class="search-form__filter-link" to="">Ë</nuxt-link>
        </li>
        <li class="search-form__filter">
          <nuxt-link class="search-form__filter-link" to="">Ж</nuxt-link>
        </li>
        <li class="search-form__filter">
          <nuxt-link class="search-form__filter-link" to="">З</nuxt-link>
        </li>
        <li class="search-form__filter">
          <nuxt-link class="search-form__filter-link" to="">И</nuxt-link>
        </li>
        <li class="search-form__filter">
          <nuxt-link class="search-form__filter-link" to="">Й</nuxt-link>
        </li>
        <li class="search-form__filter">
          <nuxt-link class="search-form__filter-link" to="">К</nuxt-link>
        </li>
        <li class="search-form__filter">
          <nuxt-link class="search-form__filter-link" to="">Л</nuxt-link>
        </li>
        <li class="search-form__filter">
          <nuxt-link class="search-form__filter-link" to="">М</nuxt-link>
        </li>
        <li class="search-form__filter">
          <nuxt-link class="search-form__filter-link" to="">Н</nuxt-link>
        </li>
        <li class="search-form__filter">
          <nuxt-link class="search-form__filter-link" to="">О</nuxt-link>
        </li>
        <li class="search-form__filter">
          <nuxt-link class="search-form__filter-link" to="">П</nuxt-link>
        </li>
        <li class="search-form__filter">
          <nuxt-link class="search-form__filter-link" to="">Р</nuxt-link>
        </li>
        <li class="search-form__filter">
          <nuxt-link class="search-form__filter-link" to="">С</nuxt-link>
        </li>
        <li class="search-form__filter">
          <nuxt-link class="search-form__filter-link" to="">Т</nuxt-link>
        </li>
        <li class="search-form__filter">
          <nuxt-link class="search-form__filter-link" to="">У</nuxt-link>
        </li>
        <li class="search-form__filter">
          <nuxt-link class="search-form__filter-link" to="">Ф</nuxt-link>
        </li>
        <li class="search-form__filter">
          <nuxt-link class="search-form__filter-link" to="">Х</nuxt-link>
        </li>
        <li class="search-form__filter">
          <nuxt-link class="search-form__filter-link" to="">Ц</nuxt-link>
        </li>
        <li class="search-form__filter">
          <nuxt-link class="search-form__filter-link" to="">Ч</nuxt-link>
        </li>
        <li class="search-form__filter">
          <nuxt-link class="search-form__filter-link" to="">Ш</nuxt-link>
        </li>
        <li class="search-form__filter">
          <nuxt-link class="search-form__filter-link" to="">Щ</nuxt-link>
        </li>
        <li class="search-form__filter">
          <nuxt-link class="search-form__filter-link" to="">Ъ</nuxt-link>
        </li>
        <li class="search-form__filter">
          <nuxt-link class="search-form__filter-link" to="">Ы</nuxt-link>
        </li>
        <li class="search-form__filter">
          <nuxt-link class="search-form__filter-link" to="">Ь</nuxt-link>
        </li>
        <li class="search-form__filter">
          <nuxt-link class="search-form__filter-link" to="">Э</nuxt-link>
        </li>
        <li class="search-form__filter">
          <nuxt-link class="search-form__filter-link" to="">Ю</nuxt-link>
        </li>
        <li class="search-form__filter">
          <nuxt-link class="search-form__filter-link" to="">Я</nuxt-link>
        </li>
      </ul>
    </form>
  </main>
</template>

<script>
export default {
  data() {
    return {
      searchSymbols: ['a'],
    }
  },
}
</script>

<style lang="stylus">
@import '~assets/stylus/variables'
@import '~assets/stylus/page'

  .search
    background-color: $black

  .search-form
    //

  .search-form__search
    position: relative
    margin-bottom: $search_bottom

  $double_offset = $from_side * 2
  .search-form__query  // input[type=text]
    // box-sizing: content-box
    // width: 'calc(100% - %s)' % $double_offset
    // width: 'calc(100% - %s)' % $unitX5
    font-size: 1.75rem
    width: 100%
    height: $unitX6
    padding-left: 20px
    // padding-right: 20px
    border: 2px solid $white
    background-color: $transparent

  .search-form__remove-last
    position: absolute
    top: 0
    right: 0
    width: $unitX6
    height: $unitX6
    background-color: $transparent
    background-image: url('~assets/img/i-remove.svg')
    background-repeat: no-repeat
    background-size: contain
    background-position: center
    text-indent: -9999px
    border: none
    opacity: 0.3

  .search-form__filters // ul
    list-style: none
    display: flex
    flex-flow: row nowrap
    justify-content: space-between
    padding 0
    margin 0

  .search-form__filter // li
    display: inline-block

  .search-form__filter-link
    font-size: 2rem
    color: $white
    text-decoration: none
</style>
