<template>
  <div class="title">
    {{ $t('pick_one') }}
    <user v-for="user in users" :key="user.name" :user="user"/>
    Or use a custom one
    <br>
    <input v-model="customUser" placeholder="Type here .." type="text">
    <button v-if="customUser" @click="goToCustomUser" class="btn">GO</button>
  </div>
</template>

<script>
import User from '~/components/User'

export default {
  metaInfo() {
    return {
      title: this.$t('home')
    }
  },
  components: {User},
  methods: {
    goToCustomUser() {
      this.$router.push({name: 'repositories', params: {id: this.customUser}})
    }
  },
  data() {
    return {
      customUser: undefined,
      users: [
        {
          avatar: 'https://avatars.githubusercontent.com/u/2492783?v=4',
          url: 'JanDeDobbeleer',
          name: 'JanDeDobbeleer'
        },
        {
          avatar: 'https://avatars.githubusercontent.com/u/591645?v=4',
          url: 'jtpio',
          name: 'Jeremy Tuloup'
        },
        {
          avatar: 'https://avatars.githubusercontent.com/u/18649061?v=4',
          url: 'zenelshabani',
          name: 'Zenel Shabani'
        }
      ]
    }
  }
}
</script>

<style lang="stylus">
@require '../styles/helpers.styl'
.title
  text-align center

.btn
  background transparent
  color white
  padding 10px
  bordered(10px)

  &:hover
    cursor pointer


</style>
