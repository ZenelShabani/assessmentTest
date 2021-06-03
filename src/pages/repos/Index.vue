<template>
  <div v-if="!isLoading">
    <div class="sort-item">
      <div class="top-bar">
        {{ $route.params.id }}
        <button style="height: 25px; width: 100px" v-on:click="ascending = !ascending" class="sort-button">
          {{ ascending ? 'asc' : 'desc' }}
        </button>
      </div>
      <input class="align-right" type="text" placeholder="search ..." v-model="searchValue"/>
    </div>
    <hr>
    <div v-if="Object.keys(itemsFiltered).length">
      Results {{ itemsFiltered.length }}

      <Repository v-for="repo in itemsFiltered" :key="repo.id" :repo="repo"/>
    </div>
    <div v-else>
      No results
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Repository from "../../components/Repository";

export default {
  components: {Repository},
  data: () => {
    return {
      ascending: true,
      sortBy: 'stars',
      searchValue: '',
      isLoading: true
    }
  },
  mounted() {
    this.getItems({
      user: this.$route.params.id,
      sort: this.sortBy
    }).then(() => {
      this.isLoading = false
    })
  },
  computed: {
    ...mapGetters({
      items: 'repo/items'
    }),
    itemsFiltered() {
      let allRepos = this.items

      if (this.searchValue !== '' && this.searchValue) {
        allRepos = allRepos.filter((item) => {
          return item.name
            .toUpperCase()
            .includes(this.searchValue.toUpperCase())
        })
      }

      allRepos = allRepos.sort((a, b) => a.stargazers_count - b.stargazers_count)
      if (this.ascending) {
        allRepos.reverse()
      }

      return allRepos
    }
  },
  methods: {
    ...mapActions({
      getItems: 'repo/getItems',
    })
  }
}
</script>

<style lang="stylus" scoped>
.sort-item
  display flex
  flex-flow: row wrap;
</style>
