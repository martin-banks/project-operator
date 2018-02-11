<template>
  <div>
    <h1>My projects</h1>
    <div class="projects">
      <p>{{ files || 'Loading...' }}</p>

    </div>
  </div>
</template>

<script>
import fs from 'fs'
export default {
  name: 'my-project',
  props: [],
  components: {},
  data () {
    return {
      files: false
    }
  },
  methods: {},
  created () {},
  mounted () {
    fs.readdir(__dirname, (err, data) => {
      if (err) return window.alert(err)
      this.files = data
    })
  }
}
</script>


<style scoped lang="sass">

</style>
