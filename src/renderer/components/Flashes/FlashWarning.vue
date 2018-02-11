<template>
  <div class="flash flash__warning">
    <h4><span>⚠️ Warning</span> {{ title }}</h4>
    <p>{{ message || '--' }}</p>
  </div>
</template>


<script>
  export default {
    name: 'flash-warning',
    props: [
      'title',
      'message'
    ],
    data () {
      return {}
    }
  }
</script>


<style scoped lang="sass">

</style>
