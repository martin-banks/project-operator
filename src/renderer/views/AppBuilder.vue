<template>
  <div>
    <p>{{ location || '-- no project selected --' }}</p>
    <button @click="chooseProject">Choose a project</button>
    <button
      v-if="location"
      @click="install"
    >
      Install
    </button>
    <button
      v-if="location"
      @click="startDev"
    >
      Start dev server
    </button>
    <pre v-if="processMessage">processMessage: {{ processMessage }}</pre>
    <pre v-if="processError">processError: {{ processError }}</pre>
  </div>
</template>


<script>
import { ipcRenderer } from 'electron'

ipcRenderer.on('devRunning', (event, response) => {
  devRunning = true
  dump = response
})

export default {
  name: 'app-builder',
  data () {
    return {
      location: null,
      dump: null,
      devRunning: false,
      // processMessage: this.$root.processMessage,
    }
  },
  methods: {
    chooseProject () {
      this.$electron.ipcRenderer.send('chooseProjectLocation')
      this.$electron.ipcRenderer.on('chosenLocation', (event, data) => {
        console.log(data)
        this.location = data
      })
    },
    install () {
      this.$electron.ipcRenderer.send('installDependancies', { location: this.location })
      this.$electron.ipcRenderer.on('installComplete', (event, data) => {
        console.log(event, data)
        this.dump = JSON.stringify({ event, data }, 'utf-8', 2)
      })
    },
     startDev () {
       this.$electron.ipcRenderer.send('startDev', { location: this.location })
     },

  },
  computed: {
    processMessage () {
      return this.$root.processMessage
    },
    processError () {
      return this.$root.processError
    }
  }
}
</script>


<style scoped lang="sass">
@import ../styleguide/index


</style>
