<template>
  <main class="page page--search search">
    <h1 class="page__title">Поиск</h1>
    <form
      action=""
      method="get"
      class="search__form search-form"
      :class="{ 'search-form--active': searchActive }"
    >
      <div
        class="search-form__search"
        :class="{ 'search-form__search--tip': searchActive && !searchQuery }"
      >
        <input
          v-model="searchQuery"
          type="search"
          class="search-form__query"
          placeholder="введите имя / фамилию"
          name="search"
          @focus="enableSearch"
          @input="$fetch"
        />
        <!-- @input="filterData" -->
        <button
          v-if="searchQuery"
          type="button"
          class="search-form__remove-last"
          :class="{
            'search-form__remove-last--disabled': searchQuery.length,
          }"
          title="Удалить последний символ"
          @click.prevent="searchActive ? removeLastFromQuery(null) : null"
          @keyup.enter.space.prevent="
            searchActive ? removeLastFromQuery(null) : null
          "
        >
          Удалить
        </button>
      </div>
      <ul class="search-form__keyboard">
        <li v-for="(key, i) in keys" :key="key" class="search-form__key">
          <a
            class="search-form__key-link"
            :class="{ 'search-form__key-link--active': filterKeyId === i }"
            @click.prevent="
              searchActive ? updateSearchQuery(key) : useFilter(i)
            "
            @keyup.enter.space.prevent="
              searchActive ? updateSearchQuery(key) : useFilter(i)
            "
          >
            <!-- href="`/search?${key}`" -->
            {{ key }}
          </a>
        </li>
        <li class="search-form__key">
          <a
            href=""
            class="search-form__key-link search-form__key-link--space"
            :class="{
              'search-form__key-link--disabled':
                !searchQuery || !searchQuery.length,
            }"
            @click.prevent="searchActive ? updateSearchQuery(' ') : null"
            @keyup.enter.space.prevent="
              searchActive ? updateSearchQuery(' ') : null
            "
          >
            <!-- href="/search?_" -->
          </a>
        </li>
      </ul>
      <button
        v-if="searchActive"
        type="button"
        title="Сбросить поиск"
        class="search-form__clear"
        @click="disableSearch"
        @keyup.space.enter="disableSearch"
      >
        Сброс
      </button>
    </form>
    <ul class="results-list">
      <template v-if="filteredVictims.length">
        <li
          v-for="(victim, id) in filteredVictims"
          :key="'f_' + victim.name + id"
          class="results-list__item"
        >
          <nuxt-link :to="`/person/${id}`" class="results-list__link">{{
            victim.name
          }}</nuxt-link>
        </li>
      </template>
      <template v-else>
        <li
          v-for="(victim, id) in selectedVictims"
          :key="'s_' + victim.name + id"
          class="results-list__item"
        >
          <nuxt-link :to="`/person/${id}`" class="results-list__link">{{
            victim.name
          }}</nuxt-link>
        </li>
      </template>
    </ul>
  </main>
</template>

<script>
// import _ from 'lodash'

export default {
  async fetch() {
    console.log('fetch called!')
    const filter = this.activeFilterKey
    if (!this.searchActive) {
      console.log('Search not active: Get data & filter by slug')
      console.log('Filter by:', filter)
      if (!filter) return
      // if (!this.victims[filter]) this.victims[filter] = []
      if (!this.victims[filter]) this.$set(this.victims, filter, [])
      const victimsGroup = this.victims[filter]
      console.log(`victims in group '${filter}' are: ${victimsGroup}`)
      if (!victimsGroup.length) {
        console.log('Make new request for data...')
        this.victims[filter] = await this.$content('victims')
          // .only(['name', 'birthday'])
          // .sortBy('name')
          // .search('name', this.searchQuery || this.activeFilterKey.toUpperCase())
          // .where({ name: /^а/ })
          // .where({ id: { $gt: 2 } })
          .where({ slug: filter })
          // .search('name', searchFor)
          .fetch()

        console.log(
          `victims for group '${filter}' are loaded:`,
          this.victims[filter]
        )
      } else console.log('Victims for this group already loaded!')
    } else {
      console.log('Search active: Get data by search string')
      console.log('Search by:', this.searchQuery)
      if (!this.searchQuery.length) return
      // if (!this.victims[this.searchQuery[0]])
      //   this.victims[this.searchQuery[0]] = []
      if (!this.victims[this.searchQuery[0]])
        this.$set(this.victims, this.searchQuery[0], [])
      const victimsGroup = this.victims[this.searchQuery[0]]
      console.log(
        `victims in group '${this.searchQuery[0]}' are: ${victimsGroup}`
      )
      if (!victimsGroup.length) {
        console.log('Make new request for data...')
        this.victims[this.searchQuery[0].toLowerCase()] = await this.$content(
          'victims'
        )
          .where({
            slug: this.searchQuery[0].toLowerCase(),
          })
          .search('name', this.searchQuery)
          .fetch()

        console.log(
          `victims for group '${this.searchQuery[0]}' are loaded:`,
          this.victims[this.searchQuery[0]]
        )
      } else console.log('Victims for this group already loaded!')
    }
  },
  data() {
    return {
      searchActive: false,
      searchQuery: '',
      filterKeyId: 0,
      keys: [
        'а',
        'б',
        'в',
        'г',
        'д',
        'е',
        'ё',
        'ж',
        'з',
        'и',
        'к',
        'л',
        'м',
        'о',
        'р',
        'с',
        'т',
        'у',
        'ф',
        'х',
        'ц',
        'ч',
        'ш',
        'щ',
        'ъ',
        'ы',
        'ь',
        'э',
        'ю',
        'я',
      ],
      victims: {
        // а: [],
        // б: [],
        // в: [],
        // г: [],
        // д: [],
        // е: [],
        // ё: [],
        // ж: [],
        // з: [],
        // и: [],
        // к: [],
        // л: [],
        // м: [],
        // о: [],
        // р: [],
        // с: [],
        // т: [],
        // у: [],
        // ф: [],
        // х: [],
        // ц: [],
        // ч: [],
        // ш: [],
        // щ: [],
        // ъ: [],
        // ы: [],
        // ь: [],
        // э: [],
        // ю: [],
        // я: [],
      },
    }
  },
  // async asyncData({ $content, params }) {
  //   const table = await $content(params)
  //   return { table }
  // },
  computed: {
    activeFilterKey() {
      return this.keys[this.filterKeyId]
    },
    selectedVictims() {
      return this.victims[this.activeFilterKey]
    },
    filteredVictims() {
      return this.selectedVictims
        ? this.selectedVictims.filter((v) => v.name.includes(this.searchQuery))
        : []
    },
  },

  watch: {
    searchQuery(newVal, prevVal) {
      console.log('search query changed!')
      // this.filterData(newVal)
      this.$fetch()
    },
  },

  methods: {
    enableSearch() {
      console.log('enable search!')
      this.searchActive = true
    },
    disableSearch() {
      console.log('disable search!!')
      this.searchActive = false
    },
    updateSearchQuery(key) {
      console.log('update search query with key:', key)
      if (key) {
        const lastChar = this.searchQuery.slice(-1)
        if (!lastChar || lastChar === ' ' || lastChar === '-')
          this.searchQuery += key.toUpperCase()
        else this.searchQuery += key
      } else this.searchQuery = this.searchQuery.slice(0, -1)
    },
    removeLastFromQuery() {
      console.log('remove last from query')
      this.updateSearchQuery(null)
    },
    useFilter(keyId) {
      console.log('use filter:', keyId)
      this.filterKeyId = keyId
      this.$fetch()
    },
    // filterData(key) {
    //   console.log('filter data with key:', key)
    //   this.$fetch()
    // },
  },
}
</script>

<style lang="stylus">
@import '~assets/stylus/variables'
@import '~assets/stylus/page'

  .search
    background-color: $black

  .search-form
    position: relative
    margin-bottom: $form_bottom

  .search-form--active
    //

  .search-form__search
    position: relative
    margin-bottom: $search_bottom

  .search-form__search--tip
    &::after
      content: 'Искать'
      font-family: $f_mono
      font-size: 2.25rem
      position: absolute
      right: 20px
      top: 0
      bottom: 0
      width: auto
      height: $unitX3
      margin: auto
      text-transform: uppercase
      text-decoration: none
      color: $white
      opacity: 0.5


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
    color: $white

    &:hover,
    &:focus
      outline: none

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

  .search-form__remove-last--disabled
    opacity: 1

  .search-form__keyboard // ul
    list-style: none
    display: flex
    flex-flow: row nowrap
    justify-content: space-between
    padding: 0
    margin: 0

  .search-form__key // li
    display: inline-block

  .search-form__key-link
    display: block
    font-size: 2rem
    color: $white
    text-decoration: none
    text-transform: uppercase

  .search-form__key-link--space
    position: relative
    width: $unitX3
    height: $unitX3

    &::before
      content: ''
      position: absolute
      top: 0
      left: 0
      width: $unitX3
      height: $unitX3
      background-image: url('~assets/img/i-space.svg')
      background-size: contain
      background-position: center
      background-repeat: no-repeat


  .search-form__key-link--active
    border-bottom: 2px solid $white

  .search-form__key-link--disabled
    opacity: 0.5

  .search-form__clear
    position: absolute
    right: 0
    bottom: -1 * $unitX6 * 2
    width: $unitX6
    height: $unitX6
    background-image: url('~assets/img/i-close.svg')
    background-repeat: no-repeat
    background-position: center
    background-size: contain
    background-color: $transparent
    border-width: 0
    text-indent: -9999px

  .results-list
    padding: 0
    margin: 0
    list-style: none
    display: flex
    flex-flow: column wrap

  .results-list__item
    display: inline-block

  .results-list__link
    font-size: 1.625rem // 26px
    line-height: 1.33333 // 36px
    display: block
    color: $white
    text-decoration: none

    &:hover,
    &:focus
      text-decoration: underline
</style>
