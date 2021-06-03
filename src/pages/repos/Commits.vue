<template>
  <div v-if="!isLoading">
    <div v-if="Object.keys(itemsFiltered).length">
      <div class="sort-item">
        <div class="top-bar">
          {{ $route.params.id }}/<strong>{{ $route.params.repo }}</strong>
        </div>
        <input class="align-right" type="text" placeholder="search ..." v-model="searchValue"/>
      </div>
      <hr>
      <div @scroll="onScroll" style="height: 80vh; overflow-y: scroll">
        Results {{ itemsFiltered.length }}

        <Commit v-for="(commit, index) in itemsFiltered" :key="index" :commit="commit"/>
      </div>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Commit from "../../components/Commit";

export default {
  components: {Commit},
  data: () => {
    return {
      canGetNewData: true,
      endOfPages: false,
      searchValue: '',
      event: undefined,
      listener: true,
      limit: 20,
      page: 1,
      isLoading: true
    }
  },
  mounted() {
    this.getNextPage()
    this.$store.commit('commit/COMMIT_SET_ITEMS', [])
  },
  computed: {
    ...mapGetters({
      items: 'commit/items'
    }),
    itemsFiltered() {
      let allCommits = this.items

      if (this.searchValue !== '' && this.searchValue) {
        allCommits = allCommits.filter(item => {
          return item.commit.message
            .toUpperCase()
            .includes(this.searchValue.toUpperCase())
        })
      }

      return allCommits
    }
  },
  methods: {
    ...mapActions({
      getItems: 'commit/getItems',
    }),
    onScroll(e) {
      let {scrollTop, clientHeight, scrollHeight} = e.target;
      if (!this.endOfPages && this.canGetNewData && scrollTop + clientHeight >= scrollHeight * 4 / 5) {
        ++this.page
        this.getNextPage()
        this.canGetNewData = !this.canGetNewData
        const throttle = setTimeout(() => {
          this.canGetNewData = true
          clearInterval(throttle)
        }, 500)
      }

    },
    getNextPage() {
      this.getItems({
        user: this.$route.params.id,
        repo: this.$route.params.repo,
        limit: this.limit,
        page: this.page
      }).then(d => {
        if (d.length === 0) {
          this.endOfPages = true
        }
        this.isLoading = false
      }).catch(e => console.log(e))
    }
  }
}
</script>

<style lang="stylus">
.sort-item
  display flex
  flex-flow: row wrap

  .top-bar
    display: flex;
    justify-content flex-end
    flex-direction column
    flex 1

    strong, button
      display contents
</style>
