<template>
  <div id="app">
    <div class="background"></div>
    <window-drag />
    <!-- <div class="drag" ></div> -->
    <div class="view__wrapper">
      <nav-container :active="active"/>
      <router-view :userSettings="userSettings" />
    </div>
  </div>
</template>

<script>
import NavContainer from '@/components/Nav/NavContainer'
import WindowDrag from '@/components/Nav/WindowDrag'
export default {
  name: 'project-operator',
  components: {
    NavContainer,
    WindowDrag,
  },
  data () {
    return {
      active: this.$route.path,
      userSettings: {},
    }
  },
  beforeMount () {
    this.$electron.ipcRenderer.send('readSettings')

    this.$electron.ipcRenderer.on('userSettings', (event, response) => {
      console.log('user settings', response)
      this.userSettings = response.settings
    })
  },
  watch: {
    $route: function (val) {
      console.log({ val })
      this.active = val.path
    }
  }

}
</script>

<style lang="sass">
@import ./styleguide/reset
@import ./styleguide/index.sass

div.background
  position: fixed
  z-index: -1
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: linear-gradient(#333, #111)
  // transform: scale(1.5)
  // +sample

.view__wrapper
  position: relative
  padding: 0 60px



</style>
