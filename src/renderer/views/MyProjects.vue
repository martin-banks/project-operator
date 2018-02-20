<template>
  <div>
    <h1>My projects</h1>
    <div class="projects">
      <p v-for="(file, i) in fileList">
        {{ file }}
      </p>

    </div>
  </div>
</template>

<script>
import fs from 'fs'
import path from 'path'

export default {
  name: 'my-project',
  props: [
    'userSettings',
  ],
  components: {},
  data () {
    return {
      fileList: false
    }
  },

  mounted () {
    fs.readdir(path.resolve(this.userSettings.project_location), (err, data) => {
      if (err) return console.log(err)
      console.log({ data })
      this.fileList = data

    })
  },

}
</script>


<style scoped lang="sass">

</style>
