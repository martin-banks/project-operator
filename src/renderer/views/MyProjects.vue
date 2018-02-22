<template>

    <div class="project__list">
      <project-entry 
        v-for="(file, i) in fileList" 
        :key="i" 
        :file="file"
      />
    </div>

</template>

<script>
import fs from 'fs'
import path from 'path'
import blacklist from '../../blacklist'
import ProjectEntry from '../components/Projects/ProjectEntry'

export default {
  name: 'my-project',
  props: [
    'userSettings',
  ],
  components: {
    ProjectEntry,
  },
  data () {
    return {
      fileList: false,
    }
  },

  methods: {
    
  },

  mounted () {
    fs.readdir(path.resolve(this.userSettings.project_location), (err, data) => {
      if (err) return console.log(err)
      console.log({ data })

      this.fileList = data
        .filter(d => blacklist.files.indexOf(d) < 0)
        .sort((a, b) => a > b )

    })
  },

}
</script>


<style scoped lang="sass">
@import ../styleguide/index

.project__list


</style>
