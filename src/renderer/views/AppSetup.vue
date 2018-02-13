<template>
  <div>
    <h1>Setting up ...</h1>
    <flash-message
      :title="flashes.dropbox.title"
      :message="flashes.dropbox.message"
      :type="flashes.dropbox.type"
    />
    <h4>Choose a folder to save you projects</h4>
    <button
      @click="chooseLocation"
    >
      Choose location
    </button>
    <p v-if="location">received: {{ location }}</p>
      

  </div>
</template>


<script>
import fs from 'fs'
import path from 'path'

import FlashMessage from '@/components/Flashes/FlashMessage'

export default {
  name: 'app-default',
  props: [],
  components: {
    FlashMessage,
  },
  data () {
    return {
      flashes: {
        dropbox: {
          title: '',
          message: 'Dropbox locations are not supported',
          type: 'warning',
        }
      },
      location: null,
      settingsLocation: null,
      userSettings: {},
      readStuff: null
    }
  },
  methods: {
    chooseLocation () {
      this.$electron.ipcRenderer.send('openFileBrowser')
    },
    writeSettings () {
      const settings = JSON.stringify(this.userSettings, 'utf-8', 2)
      fs.writeFile(`${this.settingsLocation}/operatorSettings.json`, settings, (err, data) => {
        if (err) return console.error(err)
        console.log('done writing')
        this.readSettings()
      })
    },
    readSettings () {
      console.log('starting read')
      const file = `${this.settingsLocation}/operatorSettings.json`
      fs.readFile(file, (err, data) => {
        if (err) return console.error(err)
        const settings = JSON.parse(data)
        console.log({settings})
        this.readStuff = settings

      })
    },
    
  },
  computed: {
    receiveLocation () {
      this.$electron.ipcRenderer.on('fileLocation', (e, data) => {
        console.log('fileLocation data', data)
        // this.location = data.newLocation
        this.userSettings.project_location = data.newLocation
        this.writeSettings()
      })
    },
  },
  // lifecycle
  beforeMount () {
    this.settingsLocation = this.$electron.remote.app.getPath('userData')
    this.readSettings()
  },
  mounted () {
    // this.$electron.ipcRenderer.send('loaded')
    // this.$electron.ipcRenderer.on('home', (e, data) => this.location = data)
  }

}
</script>


<style scoped lang="sass">
@import ../styleguide/index

</style>
