/* eslint-disable no-console */
export const state = () => ({
  idle_time: 0,
})

export const mutations = {
  UPDATE_IDLE_TIME(state, newIdleTime) {
    state.idle_time = newIdleTime
  },
}

export const actions = {
  onIdle({ state, commit }, [cbIdleTime, cb]) {
    console.log('▲ ACTION (sync): dispatching on_idle')

    setInterval(() => timerIncrement(), 60 * 1000)

    if (process.client) {
      console.log('Is Client!')
      document.addEventListener('mousemove', () =>
        commit('UPDATE_IDLE_TIME', 0)
      )
      document.addEventListener('keydown', () => commit('UPDATE_IDLE_TIME', 0))
    } else {
      console.log('is server! no Idle reset set')
    }

    function timerIncrement() {
      commit('UPDATE_IDLE_TIME', state.idle_time + 1)
      const minutesBeforeReset = cbIdleTime / (60 * 1000)
      // console.log('idle time is over', state.idle_time, 'minute, call cb() in over', minutes_before_reset, 'minutes')
      if (state.idle_time >= minutesBeforeReset) {
        // minutes
        // console.log('Going to call cb() in on_idle timerIncrement() action')
        cb()
      }
    }
  },
}
