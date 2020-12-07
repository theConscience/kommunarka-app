/* eslint-disable no-console */
export const state = () => ({
  searchActive: false,
  searchQuery: '',
  defaultFilterKey: -1,
  filterKeyId: -1,
  currentPage: 1,
  pagesGroup: 1,
  victimsPerPage: 64,
  pageNumbersOnPage: 20,
})

export const mutations = {
  ENABLE_SEARCH(state) {
    state.searchActive = true
  },
  DISABLE_SEARCH(state) {
    state.searchActive = false
  },
  SET_SEARCH_QUERY(state, query) {
    state.searchQuery = query
  },
  RESET_SEARCH_QUERY(state) {
    state.searchQuery = ''
  },
  SET_FILTER_KEY_ID(state, keyId) {
    state.filterKeyId = keyId
  },
  RESET_FILTER_KEY_ID(state) {
    state.filterKeyId = state.defaultFilterKey
  },
  SET_CURRENT_PAGE(state, pageNum) {
    state.currentPage = pageNum
  },
  RESET_CURRENT_PAGE(state) {
    state.currentPage = 1
  },
  SET_PAGES_GROUP(state, groupNum) {
    state.pagesGroup = groupNum
  },
  RESET_PAGES_GROUP(state) {
    state.pagesGroup = 1
  },
  SET_VICTIMS_PER_PAGE(state, count) {
    state.victimsPerPage = count
  },
  RESET_VICTIMS_PER_PAGE(state) {
    state.victimsPerPage = 64
  },
  SET_PAGE_NUMBERS_ON_PAGE(state, count) {
    state.pageNumbersOnPage = count
  },
  RESET_PAGE_NUMBERS_ON_PAGE(state) {
    state.pageNumbersOnPage = 20
  },
}

export const actions = {
  enableSearch({ commit }) {
    commit('ENABLE_SEARCH')
  },
  disableSearch({ commit }) {
    commit('DISABLE_SEARCH')
  },
  setSearchQuery({ commit }, query) {
    commit('SET_SEARCH_QUERY', query)
  },
  resetSearchQuery({ commit }) {
    commit('RESET_SEARCH_QUERY')
  },
  setFilterKeyId({ commit }, keyId) {
    console.log(`Setting filterKeyId to ${keyId}`)
    commit('SET_FILTER_KEY_ID', keyId)
  },
  resetFilterKeyId({ commit }) {
    commit('RESET_FILTER_KEY_ID')
  },
  setCurrentPage({ commit }, pageNum) {
    console.log(`Setting current page to ${pageNum}`)
    commit('SET_CURRENT_PAGE', pageNum)
  },
  resetCurrentPage({ commit }) {
    commit('RESET_CURRENT_PAGE')
  },
  setPagesGroup({ commit }, pageGroupNum) {
    console.log(`Setting current page group to ${pageGroupNum}`)
    commit('SET_PAGES_GROUP', pageGroupNum)
  },
  decreasePagesGroup({ state, commit }) {
    console.log(`Decreasing current page group`)
    commit('SET_PAGES_GROUP', state.pagesGroup - 1)
  },
  increasePagesGroup({ state, commit }) {
    console.log(`Increasing current page group`)
    commit('SET_PAGES_GROUP', state.pagesGroup + 1)
  },
  resetPagesGroup({ commit }) {
    commit('RESET_PAGES_GROUP')
  },
  setVictimsPerPage({ commit }, count) {
    commit('SET_VICTIMS_PER_PAGE', count)
  },
  resetVictimsPerPage({ commit }) {
    commit('RESET_VICTIMS_PER_PAGE')
  },
  setPageNumbersOnPage({ commit }, count) {
    commit('SET_PAGE_NUMBERS_ON_PAGE', count)
  },
  resetPageNumbersOnPage({ commit }) {
    commit('RESET_PAGE_NUMBERS_ON_PAGE')
  },
}
