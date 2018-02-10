<template>
  <div style="-webkit-app-region: drag"></div>
</template>


<script>
  export default {
    name: 'window-drag',
  }
</script>


<style scoped lang="sass">
div
  top: 0
  left: 0
  width: 100%
  height: 38px
  position: fixed
  // background: rgba(black, 0.8)
  background: linear-gradient(#111, #222)
  opacity: 0.8
  border-bottom: solid 1px black
  z-index: 999
  backdrop-filter: blur(2px)
  -webkit-app-region: drag
  p
    text-align: center
    padding: 8px 0


</style>
