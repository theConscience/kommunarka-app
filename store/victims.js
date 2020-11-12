export const state = () => ({
  victims: [],
})
export const mutations = {
  SET_VICTIMS(state, victims) {
    state.victims = victims
  },
}
export const actions = {
  setVictims({ commit }, payload) {
    commit('SET_VICTIMS', payload)
  },
}
