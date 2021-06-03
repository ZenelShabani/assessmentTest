<template>
  <div style="display: flex" class="commit">
    <img v-if="commit.author" :src="commit.author.avatar_url" alt="" height="20">
    {{ commit.commit.message }}
  </div>
</template>

<script>
export default {
  props: {
    commit: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
@require '../styles/helpers.styl'
.commit
  padding 10px
  display block
  margin 10px 0

  img
    margin-right 20px
    bordered(50%)
</style>
