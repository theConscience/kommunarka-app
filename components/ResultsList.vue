<template>
  <ul class="results-list">
    <!-- <template v-if="filteredVictims.length"> -->
    <template v-if="searchActive">
      <li
        v-for="(item, id) in firstList"
        :key="'f_' + item.name + id"
        class="results-list__item"
      >
        <nuxt-link :to="`/person/${id}`" class="results-list__link">
          {{ item.name }}
        </nuxt-link>
      </li>
    </template>
    <template v-else>
      <li
        v-for="(item, id) in secondList"
        :key="'s_' + item.name + id"
        class="results-list__item"
      >
        <nuxt-link :to="`/person/${id}`" class="results-list__link">
          {{ item.name }}
        </nuxt-link>
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  name: 'ResultsList',
  props: {
    firstOrSecond: {
      type: Boolean,
      default: false,
    },
    firstList: {
      type: Array,
      default: () => [],
    },
    secondList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="stylus">
@import '~assets/stylus/variables'

.results-list
  font-family: $f_garamond
  overflow: hidden
  list-style: none
  display: flex
  flex-flow: column wrap
  // width: 50%
  height: $results_list_height
  padding: 0
  margin: 0
  margin-bottom: $results_list_bottom

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
</style>
