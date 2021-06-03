import Vue from 'vue'
import Vuex from 'vuex'
import lang from '~/store/modules/lang'
import repo from '~/store/modules/repo'
import commit from '~/store/modules/commit'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    lang,
    repo,
    commit
  }
})
