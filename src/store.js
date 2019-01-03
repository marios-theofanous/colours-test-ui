import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    people: [],
    colours: [],
    personEdit: {},
    isSaving: false
  },
  mutations: {
    setPeople (state, peopleList) {
      state.people = peopleList
    },
    setPersonEdit (state, person) {
      state.personEdit = person
    },
    setColours (state, colourList) {
      state.colours = colourList

      state.personEdit
    },
    disableAllColours (state) {
      state.colours = state.colours.map(colour => {
        return {
          ...colour,
          isEnabled: false
        }
      })
    },
    enableColours (state, colourList) {
      state.colours.forEach(colour => {
        if (colourList.includes(colour.colourId)) {
          colour.isEnabled = true
        }
      })
    }
  },
  actions: {
    savePerson ({ state, dispatch }, person) {
      let data = {
        ...person,
        favouriteColours: state.colours && state.colours.filter(colour => colour.isEnabled)
      }
      return axios.put(`people`, data)
        .then(res => {
          dispatch('getPeople')
          return res
        })
    },
    getPeople ({ commit }) {
      axios.get('people')
        .then(res => {
          commit('setPeople', res.data)
        })
    },
    getPerson ({ commit }, personId) {
      commit('disableAllColours')
      return axios.get(`people/${personId}`)
        .then(res => {
          let enabledColours = res.data.favouriteColours.map(colour => {
            return colour && colour.colourId
          })
          commit('enableColours', enabledColours) // Enable the colours of this person
          return res // Return response to be used by component
        })
    },
    getColours ({ commit, state }) {
      axios.get('colour')
        .then(res => {
          let colours = res.data.map(colour => {
            // Disable the colours by default
            return {
              ...colour,
              isEnabled: false
            }
          })
          commit('setColours', colours)
          return res
        })
    }
  }
})
