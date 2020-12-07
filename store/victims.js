/* eslint-disable no-console */
import Vue from 'vue'

export const state = () => ({
  initialLoad: true,
  victims: {
    all: [],
  },
})
export const mutations = {
  RESET_INITIAL_LOAD(state) {
    state.initialLoad = true
  },
  DONE_INITIAL_LOAD(state) {
    state.initialLoad = false
  },
  SET_ALL_VICTIMS(state, victims) {
    state.victims.all = victims
  },
  UPDATE_ALL_VICTIMS(state, victims) {
    console.log(`M: adding victims to 'all' group:`)
    // console.log(`M: adding victims ${victims} to 'all' group:`)
    state.victims.all.push(...victims)
  },
  SET_VICTIMS_GROUP(state, [group, victims]) {
    console.log(`M: setting victims group '${group}'`)
    // console.log(`M: setting victims group '${group}' to ${victims}`)
    // state.victims[group] = victims
    Vue.set(state.victims, group, victims)
  },
  SET_VICTIM(state, [group, victim]) {
    console.log(`M: setting victim ${victim} to group '${group}'`)
    state.victims[group].push(victim)
  },
}
export const actions = {
  resetInitialLoad({ commit }) {
    commit('RESET_INITIAL_LOAD')
  },
  doneInitialLoad({ commit }) {
    commit('DONE_INITIAL_LOAD')
  },
  setAllVictims({ commit }, victims) {
    commit('SET_ALL_VICTIMS', victims)
  },
  setVictimsGroup({ commit }, [group, victims]) {
    // console.log(`A: setting group '${group}' with victims ${victims}`)
    console.log(`A: setting group '${group}' with victims`)
    commit('SET_VICTIMS_GROUP', [group, victims])
    commit('UPDATE_ALL_VICTIMS', victims)
    return true
  },
  setVictim({ commit }, [group, victim]) {
    console.log(`A: setting victim ${victim} to group '${group}'`)
    commit('SET_VICTIM', [group, victim])
    commit('UPDATE_ALL_VICTIMS', [victim])
  },
}
