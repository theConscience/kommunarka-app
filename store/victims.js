import Vue from 'vue'

export const state = () => ({
  victims: {},
})
export const mutations = {
  SET_VICTIMS(state, victims) {
    state.victims = victims
  },
  SET_VICTIMS_GROUP(state, [group, victims]) {
    console.log(`M: setting victims group ${group} to ${victims}`)
    // state.victims[group] = victims
    Vue.set(state.victims, group, victims)
  },
}
export const actions = {
  setVictims({ commit }, victims) {
    commit('SET_VICTIMS', victims)
  },
  setVictimsGroup({ commit }, groupAndVictims) {
    console.log('A: setting victims group with:', groupAndVictims)
    commit('SET_VICTIMS_GROUP', groupAndVictims)
  },
}
