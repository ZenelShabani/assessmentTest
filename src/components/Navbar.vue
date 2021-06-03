<template>
  <div class="navigation">
    <div class="nav-items align-left">
      <router-link active-class="active" :to="{name: 'home'}" class="navbar-brand">
        {{ $t('home') }}
      </router-link>
      <router-link to="/doesNotExist" class="navbar-brand">
        404
      </router-link>
    </div>
    <div class="align-right">
      <a v-for="(value, key) in locales"
         :key="key"
         href="#"
         v-if="locale !== value"
         @click.prevent="setLocale(value)"
      >
        {{ value.toUpperCase() }}
      </a>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {loadTranslations} from '~/plugins/i18n'

export default {
  computed: mapGetters({
    locale: 'lang/item',
    locales: 'lang/items'
  }),
  methods: {
    ...mapMutations({
      setItem: 'lang/LANG_SET_ITEM'
    }),
    setLocale(locale) {
      if (this.$i18n.locale !== locale) {
        loadTranslations(locale)
        this.setItem(locale)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@require './../styles/helpers.styl'
.navigation
  padding 20px 30px
  width 100%
  border-bottom 1px solid white
  display flex
  flex-flow: row wrap;

  .nav-items
    a
      padding 0 20px

      &.router-link-exact-active
        color getColor(text-color-active)
</style>
