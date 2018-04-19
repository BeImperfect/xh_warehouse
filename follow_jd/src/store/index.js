import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import mutaions from './mutations'
import actions from './actions'

export default new Vuex.Store({
    modules: {
        mutations
    },
    actions
})