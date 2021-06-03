import store from '~/store'
import {loadTranslations} from '~/plugins/i18n'

export default async (to, from, next) => {
  loadTranslations(store.getters['lang/item'])
  next()
}
