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
          :value="searchQuery"
          type="search"
          class="search-form__query"
          placeholder="введите имя / фамилию"
          name="search"
          @focus="startSearch"
          @input="onInputUpdate"
        />
        <button
          v-if="searchQuery"
          type="button"
          class="search-form__remove-last"
          :class="{
            'search-form__remove-last--enabled': searchQuery.length,
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
        @click="stopSearch"
        @keyup.space.enter="stopSearch"
      >
        Сброс
      </button>
    </form>

    <ul
      ref="results-list"
      class="search__results results-list"
      :class="[`results-list--page-${currentPage}`]"
    >
      <!-- <template v-if="selectedGroupVictimsFiltered.length"> -->
      <template v-if="searchActive">
        <li
          v-for="(victim, id) in selectedGroupVictimsForPageFiltered"
          :key="'f_' + victim.name + victim.id + '_' + id"
          class="results-list__item"
        >
          <nuxt-link :to="`/person/${victim.id}`" class="results-list__link">{{
            victim.name
          }}</nuxt-link>
        </li>
      </template>
      <template v-else>
        <li
          v-for="(victim, id) in selectedGroupVictimsForPage"
          :key="'s_' + victim.name + id"
          class="results-list__item"
        >
          <nuxt-link :to="`/person/${victim.id}`" class="results-list__link">{{
            victim.name
          }}</nuxt-link>
        </li>
      </template>
    </ul>

    <!-- <results-list
      ref="results-list"
      :class="[`results-list--page-${currentPage}`]"
      :first-or-second="searchActive"
      :first-list="selectedGroupVictimsForPageFiltered"
      :second-list="selectedGroupVictimsForPage"
    ></results-list> -->

    <footer class="page__footer">
      <div v-if="pagesGroup > 0" ref="pagination" class="pagination">
        <button
          v-if="pagesCount.length >= pageNumbersOnPage"
          class="pagination__btn pagination__btn--prev"
          :class="{ 'pagination__btn--disabled': pagesGroup === 1 }"
          @click="pagesGroup > 1 ? decreasePagesGroup() : false"
          @keyup.enter.space="pagesGroup > 1 ? decreasePagesGroup() : false"
        >
          Назад
        </button>
        <ul v-if="currentPageGroup.length" class="pagination__pages">
          <li
            v-for="pageNum in currentPageGroup"
            :key="pageNum"
            class="pagination__page"
          >
            <a
              :href="`?page=${pageNum}`"
              class="pagination__page-link"
              :class="{
                'pagination__page-link--active': pageNum === currentPage,
              }"
              :title="`На страницу ${pageNum}`"
              @click.prevent="setCurrentPage(pageNum)"
              @keyup.enter.space.prevent="setCurrentPage(pageNum)"
            >
              {{ pageNum }}
            </a>
          </li>
        </ul>
        <button
          v-if="pagesCount.length >= pageNumbersOnPage"
          class="pagination__btn pagination__btn--next"
          :class="{
            'pagination__btn--disabled': pagesGroup === pagesGroupsCount,
          }"
          @click="pagesGroup < pagesGroupsCount ? increasePagesGroup() : false"
          @keyup.enter.space="
            pagesGroup < pagesGroupsCount ? increasePagesGroup() : false
          "
        >
          Вперёд
        </button>
      </div>
    </footer>
  </main>
</template>

<script>
/* eslint-disable no-console */
// import _ from 'lodash'
import { mapState, mapActions } from 'vuex'

export default {
  async fetch() {
    console.log('fetch called')

    if (!this.searchActive) {
      console.log('Search not active: Get data & filter by slug')
      const filter = this.activeFilterKey

      if (this.initialLoad) {
        console.log('Initial load...')

        // this.keys
        //   .reduce((p, k) => {
        //     console.log('p is:', p)
        //     console.log('key is:', k)
        //     return p
        //       .then(() => {
        //         console.log(`Loading '${k}' key filter group...`)
        //         return this.$content('victims').where({ slug: k }).fetch()
        //       })
        //       .then((loadedVictimsGroup) => {
        //         console.log(
        //           `victims for key '${k}' are loaded to client! Saving to vuex!`
        //         )
        //         return this.setVictimsGroup([k, loadedVictimsGroup])
        //       })
        //   }, Promise.resolve('beginning load...'))
        //   .then((p) => {
        //     console.log('Mega p:')
        //     console.dir(p)
        //     console.log(`All keys loaded, setting filter to 'all'`)
        //     this.resetFilterKeyId()
        //     this.initialLoad = false
        //   })

        const loadedGroups = this.keys.map((k) => {
          console.log('key is:', k)
          return this.$content('victims')
            .where({ slug: k })
            .fetch()
            .then((loadedVictimsGroup) => {
              console.log(`Victims for key '${k}' loaded to client!`)
              return this.setVictimsGroup([k, loadedVictimsGroup])
            })
        })
        Promise.all(loadedGroups).then((megaP) => {
          console.log('Mega p:')
          console.dir(megaP)
          console.log(`All keys loaded, setting filter to 'all'`)
          this.resetFilterKeyId()
          this.doneInitialLoad()
        })
      } else {
        console.log('Custom load...')
        console.log('Filter by:', filter)
        if (!filter) return
        if (!this.victims[filter]) this.setVictimsGroup([filter, []])
        const victimsGroup = this.victims[filter]
        console.log(
          `victims in group '${filter}' length are: ${victimsGroup.length}`
        )
        if (!victimsGroup.length) {
          console.log('Make new request for data...')
          const loadedVictimsGroup = await this.$content('victims')
            // .only(['name', 'birthday'])
            // .sortBy('name')
            // .search('name', this.searchQuery || this.activeFilterKey.toUpperCase())
            // .where({ name: /^а/ })
            // .where({ id: { $gt: 2 } })
            .where({ slug: filter })
            // .search('name', searchFor)
            .fetch()

          this.setVictimsGroup([filter, loadedVictimsGroup])

          console.log(
            `victims for group '${filter}' are loaded:`,
            this.victims[filter]
          )
        } else console.log('Victims for this group already loaded!')
      }
    } else {
      console.log('Search active: Get data by search string')
      console.log('Search by:', this.searchQuery)
      if (!this.searchQuery.length) return
      // const groupName = this.searchQuery[0].toLowerCase()
      const groupName = this.activeFilterKey || 'all'

      if (!this.victims[groupName]) this.setVictimsGroup([groupName, []])
      const victimsGroup = this.victims[groupName]
      console.log(`victims in group '${groupName}' are: ${victimsGroup}`)
      if (!victimsGroup.length) {
        console.log('Make new request for data...')
        const loadedVictimsGroup = await this.$content('victims')
          .where({
            slug: groupName,
          })
          .search('name', this.searchQuery)
          .fetch()

        this.setVictimsGroup([groupName, loadedVictimsGroup])

        console.log(
          `victims for group '${groupName}' are loaded:`,
          this.victims[groupName]
        )
      } else console.log('Victims for this group already loaded!')
    }
  },
  data() {
    return {
      isClient: !!process.client,
      updateTimerCount: 0,
      updateTimerCountMax: 20,
      updatePaginationTimerCount: 0,
      updatePaginationTimerCountMax: 20,
      // searchActive: false,
      // searchQuery: '',
      // filterKeyId: 0,
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
        'й',
        'к',
        'л',
        'м',
        'н',
        'о',
        'п',
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
      // victims: {},
      victimsListHeight: 1164, // default UL height
      victimItemHeight: 36, // default LI height
      columnsOnPage: 2, // default columns count
      // victimsPerPage: 64, // (1164 / 36) * 2, // 64
      paginationWidth: 1020,
      paginationListWidth: 711,
      paginationListItemWidth: 42,
      paginationPrevBtnWidth: 0,
      paginationNextBtnWidth: 0,
      // currentPage: 1,
      // pageNumbersOnPage: 20,
      // pagesGroup: 1,
      debouncedResize: null,
    }
  },
  // async asyncData({ $content, params }) {
  //   const table = await $content(params)
  //   return { table }
  // },
  computed: {
    ...mapState('search', [
      'searchActive',
      'searchQuery',
      'filterKeyId',
      'currentPage',
      'pagesGroup',
      'victimsPerPage',
      'pageNumbersOnPage',
    ]),
    ...mapState('victims', ['initialLoad', 'victims']),
    activeFilterKey() {
      return this.keys[this.filterKeyId]
    },
    selectedGroupVictims() {
      return this.victims[this.activeFilterKey] || this.victims.all || []
    },
    selectedGroupVictimsCount() {
      return this.selectedGroupVictims.length
    },
    selectedGroupVictimsFiltered() {
      // if (!this.searchQuery) return []
      return this.selectedGroupVictims
        ? this.selectedGroupVictims.filter((v) =>
            v.name.includes(this.searchQuery)
          )
        : []
    },
    selectedGroupVictimsFilteredCount() {
      return this.selectedGroupVictimsFiltered.length
    },
    pagesCountForGroup() {
      // return 9 || Math.ceil(this.selectedGroupVictimsCount / this.victimsPerPage)
      return Math.ceil(this.selectedGroupVictimsCount / this.victimsPerPage)
    },
    pagesCountForFiltered() {
      // return 9 || Math.ceil(this.selectedGroupVictimsFiltered / this.victimsPerPage)
      return Math.ceil(
        this.selectedGroupVictimsFilteredCount / this.victimsPerPage
      )
    },
    pagesCount() {
      return this.searchQuery
        ? this.pagesCountForFiltered
          ? new Array(this.pagesCountForFiltered).fill(0).map((el, i) => i + 1)
          : []
        : this.pagesCountForGroup
        ? new Array(this.pagesCountForGroup).fill(0).map((el, i) => i + 1)
        : []
    },
    selectedGroupVictimsForPage() {
      return this.selectedGroupVictims.slice(
        this.victimsPerPage * (this.currentPage - 1),
        this.victimsPerPage * this.currentPage
      )
    },
    selectedGroupVictimsForPageFiltered() {
      return this.selectedGroupVictimsFiltered.slice(
        this.victimsPerPage * (this.currentPage - 1),
        this.victimsPerPage * this.currentPage
      )
    },
    currentPageGroup() {
      return this.pagesCount.slice(
        this.pageNumbersOnPage * (this.pagesGroup - 1),
        this.pageNumbersOnPage * this.pagesGroup
      )
    },
    pagesGroupsCount() {
      console.log('this.pagesCount.length:', this.pagesCount.length)
      console.log('this.pageNumbersOnPage:', this.pageNumbersOnPage)
      return Math.ceil(this.pagesCount.length / this.pageNumbersOnPage)
    },
  },

  watch: {
    search_query(newVal, prevVal) {
      console.log('search query changed!')
      this.$fetch()
    },
    pagesCount(newVal, prevVal) {
      if (prevVal.length !== newVal.length) {
        console.log(`pages count changed from ${prevVal} to ${newVal}!`)
        // const newPage = (this.pagesGroup - 1) * this.pageNumbersOnPage
        // console.log('newPage:', newPage)
        // this.setCurrentPage(newPage || 1)
        // if (newVal.length > this.pageNumbersOnPage) {}
        this.setCurrentPage(this.currentPage)
      } else console.warn('Pages count not changed')
    },
    pagesGroupsCount(newVal, prevVal) {
      console.log(
        `Current pages group count changed from ${prevVal} to ${newVal}!`
      )
      // FIXME: this is a bit hacky way to reset page:
      if (JSON.stringify(newVal) !== JSON.stringify(prevVal)) {
        console.log('Page group count changed!')
        // this.setCurrentPage(newVal[0])
        this.setCurrentPage(1)
        this.setPagesGroup(1)
      } else {
        console.warn(
          'Seems to be same Page Group, not resetting page number...'
        )
        // this.setCurrentPage(1)
      }
      // this.setCurrentPage(1)
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => {
        this.$nuxt.$loading.finish()
        // console.log('HERE: window', window)
        // if (!this.debouncedResize)
        //   this.debouncedResize = _.debounce(this.onResize, 300)
        // window.addEventListener('resize', this.debouncedResize)
      }, 500)
    })
    if (this.isClient) {
      console.warn('This is client, updating victims count')
      this.updateVictimsPerPage()
      // this.updatePagesCountPerPage()
    } else console.warn('This is server! no getComputedProperty!')
  },
  // updated() {
  //   this.updateVictimsPerPage()
  // },
  // beforeDestroy() {
  //   console.log('HERE: window', window)
  //   window.removeEventListener('resize', this.debouncedResize)
  // },

  methods: {
    ...mapActions('search', [
      'enableSearch',
      'disableSearch',
      'setSearchQuery',
      'resetSearchQuery',
      'setFilterKeyId',
      'resetFilterKeyId',
      'setCurrentPage',
      'resetCurrentPage',
      'setPagesGroup',
      'resetPagesGroup',
      'increasePagesGroup',
      'decreasePagesGroup',
      'setVictimsPerPage',
      // 'resetVictimsPerPage',
      'setPageNumbersOnPage',
      // 'resetPageNumbersOnPage',
    ]),
    ...mapActions('victims', ['doneInitialLoad', 'setVictimsGroup']),
    async onInputUpdate($evt) {
      await this.setSearchQuery($evt.target.value)
      this.$fetch()
    },
    startSearch() {
      console.log('enable search!')
      // this.searchActive = true
      this.enableSearch()
    },
    stopSearch() {
      console.log('disable search!!')
      // this.searchQuery = ''
      this.resetSearchQuery()
      // this.searchActive = false
      this.disableSearch()
    },
    updateSearchQuery(key) {
      console.log('update search query with key:', key)
      if (key) {
        const lastChar = this.searchQuery.slice(-1)
        if (!lastChar || lastChar === ' ' || lastChar === '-')
          // this.searchQuery += key.toUpperCase()
          this.setSearchQuery(this.searchQuery + key.toUpperCase())
        // else this.searchQuery += key
        else this.setSearchQuery(this.searchQuery + key)
        // } else this.searchQuery = this.searchQuery.slice(0, -1)
      } else this.setSearchQuery(this.searchQuery.slice(0, -1))
    },
    removeLastFromQuery() {
      console.log('remove last from query')
      this.updateSearchQuery(null)
    },
    useFilter(keyId) {
      const sameFilterPressed = this.filterKeyId === keyId
      if (sameFilterPressed) {
        console.log('unuse filter:', keyId)
        console.log(`setting 'all' filter instead!`)
        this.resetFilterKeyId()
      } else {
        console.log('use filter:', keyId)
        // this.filterKeyId = keyId
        this.setFilterKeyId(keyId)
        this.resetCurrentPage()
        this.resetPagesGroup()
        this.$fetch()
      }
    },
    onResize() {
      console.log('onResize called')
      console.log('Window resized, updating')
      this.updateVictimsPerPage()
      this.updatePagesCountPerPage()
    },
    updateVictimsPerPage(timer) {
      console.log('updateVictimsPerPage() called!')
      const resultsListEl = this.$refs['results-list']
      const resultsListItemEl = resultsListEl.firstElementChild
      if (resultsListEl && resultsListItemEl) {
        // console.warn('elements found, removing timer, resetting height')
        clearTimeout(timer)
        this.victimsListHeight = Math.floor(
          parseFloat(getComputedStyle(resultsListEl).height, 10)
        )
        this.victimItemHeight = Math.floor(
          parseFloat(getComputedStyle(resultsListItemEl).height, 10)
        )
        // this.victimsPerPage = Math.floor(
        //   (this.victimsListHeight / this.victimItemHeight) * this.columnsOnPage
        // )
        let victimsCount = Math.floor(
          (this.victimsListHeight / this.victimItemHeight) * this.columnsOnPage
        )
        console.log('original victims count is:', victimsCount)
        victimsCount = victimsCount % 2 ? victimsCount - 1 : victimsCount
        console.log('victims count after transform will be:', victimsCount)
        this.setVictimsPerPage(victimsCount)
      } else {
        console.log('No elements, checking after 300ms...')
        if (this.updateTimerCount === this.updateTimerCountMax) {
          console.warn('Timer reached maximum, stopping timer')
          clearTimeout(timer)
        } else {
          timer = setTimeout(() => {
            this.updateTimerCount++
            // MEMO: RECURSION!
            this.updateVictimsPerPage(timer)
          }, 300)
        }
      }
    },
    updatePagesCountPerPage(timer) {
      console.log('updatePagesCountPerPage() called!')
      const paginationEl = this.$refs.pagination
      const paginationListEl = paginationEl.querySelector('ul')
      if (paginationListEl) {
        const paginationPrevBtnEl = paginationEl.querySelector(
          'button:first-child'
        )
        const paginationNextBtnEl = paginationEl.querySelector(
          'button:last-child'
        )
        if (paginationPrevBtnEl) {
          this.paginationPrevBtnWidth = Math.floor(
            parseFloat(
              getComputedStyle(paginationPrevBtnEl).width +
                getComputedStyle(paginationPrevBtnEl).marginRight,
              10
            )
          )
        }
        if (paginationNextBtnEl) {
          this.paginationNextBtnWidth = Math.floor(
            parseFloat(
              getComputedStyle(paginationNextBtnEl).width +
                getComputedStyle(paginationNextBtnEl).marginLeft,
              10
            )
          )
        }

        const paginationListItemEl = paginationListEl.querySelector(
          'li:last-child' // last list item, which is '20' in most cases
        )
        if (paginationListEl) {
          // console.warn('elements found, removing timer, resetting height')
          clearTimeout(timer)
          this.paginationWidth = Math.floor(
            parseFloat(getComputedStyle(paginationEl).width, 10)
          )
          this.paginationListWidth = Math.floor(
            parseFloat(getComputedStyle(paginationListEl).width, 10)
          )
          this.paginationListItemWidth = Math.floor(
            parseFloat(getComputedStyle(paginationListItemEl).width, 10)
          )
          // this.pageNumbersOnPage = Math.floor(
          //   (this.paginationWidth -
          //     this.paginationPrevBtnWidth -
          //     this.paginationNextBtnWidth) /
          //     this.paginationListItemWidth
          // )
          this.setPageNumbersOnPage(
            // FIXME: next is stupid, need to set dynamically, depends on screen size...
            // Math.max(
            //   // restrict to 20 minimum
            //   20,
            Math.min(
              20, // restrict to 20 maximum
              Math.floor(
                (this.paginationWidth -
                  this.paginationPrevBtnWidth -
                  this.paginationNextBtnWidth) /
                  this.paginationListItemWidth
              )
            )
          )
          // )
        }
      } else {
        console.log('No pagination elements, checking after 300ms...')
        if (
          this.updatePaginationTimerCount === this.updatePaginationTimerCountMax
        ) {
          console.warn('Timer reached maximum, stopping timer')
          clearTimeout(timer)
        } else {
          timer = setTimeout(() => {
            this.updatePaginationTimerCount++
            // MEMO: RECURSION!
            this.updatePagesCountPerPage(timer)
          }, 300)
        }
      }
    },
  },
  head() {
    return {
      title: 'коммунарка, поиск',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Поиск репрессированных в коммунарке',
        },
      ],
    }
  },
}
</script>

<style lang="stylus">
@import '~assets/stylus/variables'
@import '~assets/stylus/page'

  .search
    background-color: $black

  .search__form
    margin-bottom: $form_bottom
    position: relative

  .search-form
    //

  .search-form--active
    //

  .search-form__search
    position: relative
    margin-bottom: $search_bottom

  .search-form__search--tip
    &::after
      content: 'Искать'
      font-family: $f_mono
      font-size: 1.875rem // 30px
      line-height: 1
      position: absolute
      right: $rw_unitX1_666
      top: 0
      bottom: 0
      width: auto
      height: $rh_unitX3
      margin: auto
      text-transform: uppercase
      text-decoration: none
      color: $white
      opacity: 0.5

      @media screen and (min-width: 500px)
        font-size: 2.25rem // 36px

      @media screen and (max-height: 1400px)
        font-size: 1.25rem // 20px
        height: $rh_20

  $double_offset = $from_side * 2
  .search-form__query  // input[type=text]
    // box-sizing: content-box
    // width: 'calc(100% - %s)' % $double_offset
    // width: 'calc(100% - %s)' % $rw_unitX5
    font-size: 1.75rem
    width: 100%
    height: $rh_unitX6
    min-height: $unitX3
    padding-left: $rw_unitX1_666
    // padding-right: 20px
    border: $bd_min solid $white
    background-color: $transparent
    color: $white

    @media screen and (min-width: 600px)
      border: $bd_default solid $white

    &:hover,
    &:focus
      outline: none

  .search-form__remove-last
    position: absolute
    top: 0
    right: 0
    width: $rw_unitX6
    height: $rh_unitX6
    min-height: $unitX3
    background-color: $transparent
    background-image: url('~assets/img/i-remove.svg')
    background-repeat: no-repeat
    background-size: contain
    background-position: center
    text-indent: -9999px
    border: none
    opacity: 0.3
    outline: none
    cursor: pointer
    transition: opacity 0.3s ease-in

  .search-form__remove-last--enabled
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

  .search-form__key-link // a
    position: relative
    display: block
    font-size: 2rem
    color: $white
    text-decoration: none
    text-transform: uppercase
    cursor: pointer

    &::before
      content: ''
      position: absolute
      left: 0
      bottom: $rh_unit_half
      height: $bd_min
      width: 100%
      background-color: $transparent
      transition: background-color 0.4s ease-in, transform 0.4s ease-in

      @media screen and (min-width: 600px)
        height: $bd_default

    &:hover,
    &:focus
      cursor: pointer

    &:hover::before,
    &:focus::before
      background-color: $white

  .search-form__key-link--active
    cursor: default
    // border-bottom: $bd_min solid $white

    &:hover,
    &:focus
      // cursor: default
      cursor: pointer

    &::before
      background-color: $white

    &:hover::before
      // background-color: $transparent
      transform: translateY($unit_half)

  .search-form__key-link--space
    width: $rw_unitX3
    height: $rh_unitX3
    outline: none

    &::before
      content: ''
      position: absolute
      top: 0
      left: 0
      width: $rw_unitX3
      height: $rh_unitX3
      background-image: url('~assets/img/i-space.svg')
      background-size: contain
      background-position: center
      background-repeat: no-repeat

    &:hover::before,
    &:focus::before
      bottom: auto
      width: $rw_unitX3
      height: $rh_unitX3
      background-color: $transparent
  .search-form__key-link--disabled
    opacity: 0.5
    cursor: default


  .search-form__clear
    position: absolute
    right: 0
    bottom: -1 * $rh_unitX6 * 2
    width: $rw_unitX6
    height: $rh_unitX6
    background-image: url('~assets/img/i-close.svg')
    background-repeat: no-repeat
    background-position: center
    background-size: contain
    background-color: $transparent
    border-width: 0
    text-indent: -9999px
    cursor: pointer
    outline: none
    opacity: 0.75
    transition: opacity 0.3s ease-in

    &:hover,
    &:focus
      opacity: 1


  .search__results
    margin: 0
    margin-bottom: $results_list_bottom

  .results-list
    font-family: $f_garamond
    overflow: hidden
    list-style: none
    display: flex
    flex-flow: column wrap
    // width: 50%
    height: $results_list_height
    min-width: 100%
    padding: 0

  .results-list__item
    // display: inline-block
    width: 50%

  .results-list__link
    font-size: 1.625rem // 26px
    // font-size: 1.5rem // 24px
    line-height: 1.385 // 36px | 26px / 36px = 1.385
    display: block
    color: $white
    text-decoration: none

    &:hover,
    &:focus
      text-decoration: underline

  .pagination
    display: flex
    flex-flow: row nowrap
    justify-content: flex-start
    align-items: center

  .pagination__pages // ul
    font-family: $f_mono
    font-size: 2rem // 32px
    line-height: 1.2 // auto
    list-style: none
    display: flex
    flex-flow: row nowrap
    padding: 0
    margin: 0

  .pagination__page // li
    //

  .pagination__page-link // a
    position: relative
    display: block
    font-size: 2rem
    padding-left: $rw_unit_half
    padding-right: $rw_unit_half
    color: $white
    text-decoration: none
    text-transform: uppercase
    cursor: pointer

    &:hover,
    &:focus
      cursor: pointer

      &::before
        content: ''
        position: absolute
        left: 0
        right: 0
        bottom: $rh_unit_half
        height: $bd_min
        width: 60%
        margin: 0 auto
        background-color: $white

        @media screen and (min-width: 600px)
          height: $bd_default

  .pagination__page-link--active
    cursor: default
    // border-bottom: $bd_min solid $white

    &:hover,
    &:focus
      cursor: default

    &::before
      content: ''
      position: absolute
      left: 0
      right: 0
      bottom: $rh_unit_half
      height: $bd_min
      width: 60%
      margin: 0 auto
      background-color: $white

      @media screen and (min-width: 600px)
        height: $bd_default

  .pagination__btn
    display: inline-block
    width: $r_arrow_width
    height: $r_arrow_height
    margin-bottom: 4px
    border-width: 0
    color: $white
    background-color: $transparent
    background-image: url('~assets/img/i-arrow-left.svg')
    background-repeat: no-repeat
    background-position: center
    background-size: contain
    outline: none
    text-indent: -9999px
    cursor: pointer

  .pagination__btn--prev
    margin-right: $rw_unit

  .pagination__btn--next
    margin-left: $rw_unit
    transform: rotate(180deg)

  .pagination__btn--disabled
    opacity: 0.5
    cursor: default
</style>
