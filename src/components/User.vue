<template>
  <router-link :to="{name: 'repositories', params: {id: user.url}}" class="user">
    <img :src="user.avatar" height="50" alt="">
    <strong>{{ user.name }}</strong>
  </router-link>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
@require '../styles/helpers.styl'

.user
  padding 20px
  bordered(20px)
  margin 15px 0
  text-align left
  display flex

  img
    height 60px
    bordered(50%)
    margin 10px 30px 10px 10px

  strong
    align-self center
</style>
