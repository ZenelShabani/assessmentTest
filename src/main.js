import Vue from 'vue'
import store from '~/store'
import router from '~/router'
import i18n from '~/plugins/i18n'
import App from '~/components/App'
import Child from "~/components/Child";

[Child].forEach(Component => {
  Vue.component(Component.name, Component)
})

Vue.mixin({
  methods: {
    strToUpper: str => str.strToUpper()
  },
})

Vue.config.productionTip = false

new Vue({
  i18n,
  store,
  router,
  ...App
})
