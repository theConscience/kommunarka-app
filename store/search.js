export const state = () => ({
  searchActive: false,
  searchQuery: '',
  filterKeyId: 0,
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
    state.filterKeyId = 0
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
    commit('SET_FILTER_KEY_ID', keyId)
  },
  resetFilterKeyId({ commit }) {
    commit('RESET_FILTER_KEY_ID')
  },
}
