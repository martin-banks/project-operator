<template>
  <div 
    :class="{
      flash: true,
      flash__warning: type === 'warning',
      flash__error: type === 'error',
      flash__info: type === 'info' || !type,
    }"
  >
    <h4 v-if="type === 'warning'"><span>⚠️ Warning</span> {{ title }}</h4>
    <h4 v-if="type === 'error'"><span>⚠️ Error</span> {{ title }}</h4>
    <h4 v-if="type === 'info' || !type"><span>ℹ Alert</span> {{ title }}</h4>
    <p>{{ message || '--' }}</p>
  </div>
</template>


<script>
  export default {
    name: 'flash-message',
    props: [
      'title',
      'message',
      'type',
    ],
    data () {
      return {}
    }
  }
</script>


<style scoped lang="sass">

</style>
