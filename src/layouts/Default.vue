<template>
  <main>
    <navbar/>
    <div class="container">
      <child/>
    </div>
  </main>
</template>

<script>
import Navbar from '~/components/Navbar'
import Child from '~/components/Child'

export default {
  components: {Child, Navbar}
}
</script>

<style lang="stylus">
  @require "../styles/main.styl"
</style>
