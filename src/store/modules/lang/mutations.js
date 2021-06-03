import * as types from './mutation-types'
import defaultState from './state'
import jsCookie from "js-cookie";

export default {
  [types.SET_ITEM](state, item) {
    jsCookie.set('locale', item, { expires: 365 })
    Object.assign(state, { item })
  },
  [types.UPDATE_ITEM](state, item) {
    state.item = Object.assign({}, state.item, item)
  },
  [types.SET_ITEMS](state, items) {
    Object.assign(state, { items })
  },
  [types.SET_ERROR](state, error) {
    Object.assign(state, { error })
  },
  [types.SET_ERRORS](state, errors) {
    Object.assign(state, { errors })
  },
  [types.RESET](state) {
    Object.assign(state, defaultState())
  }
}
