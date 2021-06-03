<template>
  <div :style="{
    width: `${loaded}%`,
    height: height,
    opacity: show ? 1 : 0,
    'background-color': canSuccess ? color : failedColor
  }" class="progress"
  />
</template>

<script>
export default {
  data: () => ({
    loaded: 0,
    show: false,
    canSuccess: true,
    duration: 3000,
    height: '5px',
    color: '#70eea2',
    failedColor: 'red'
  }),

  methods: {
    start() {
      this.show = true
      this.canSuccess = true
      if (this._timer) {
        clearInterval(this._timer)
        this.loaded = 0
      }
      this._cut = 10000 / Math.floor(this.duration)
      this._timer = setInterval(() => {
        this.increase(this._cut * Math.random())
        if (this.loaded > 95) {
          this.finish()
        }
      }, 100)
      return this
    },
    set(num) {
      this.show = true
      this.canSuccess = true
      this.loaded = Math.floor(num)
      return this
    },
    get() {
      return Math.floor(this.loaded)
    },
    increase(num) {
      this.loaded = this.loaded + Math.floor(num)
      return this
    },
    decrease(num) {
      this.loaded = this.loaded - Math.floor(num)
      return this
    },
    finish() {
      this.loaded = 100
      this.hide()
      return this
    },
    pause() {
      clearInterval(this._timer)
      return this
    },
    hide() {
      clearInterval(this._timer)
      this._timer = null
      setTimeout(() => {
        this.show = false
        this.$nextTick(() => {
          setTimeout(() => {
            this.loaded = 0
          }, 200)
        })
      }, 500)
      return this
    },
    fail() {
      this.canSuccess = false
      return this
    }
  }
}
</script>

<style lang="stylus" scoped>
.progress
  position fixed
  top 0
  left 0
  right 0
  height 10px
  width 0
  transition width 0.2s, opacity 0.4s
  opacity 1
  background-color red
  z-index 999999
</style>
