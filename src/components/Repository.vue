<template>
  <router-link style="display: flex" :to="{name: 'repository', params: {id: $route.params.id, repo: repo.name}}" class="repo">
    {{ repo.name }}
    <div class="align-right">* {{ repo.stargazers_count }}</div>
  </router-link>
</template>

<script>
export default {
  props: {
    repo: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
@require '../styles/helpers.styl'
a
  &.repo
    padding 10px
    display block
    margin 10px 0
    bordered(10px)
</style>
