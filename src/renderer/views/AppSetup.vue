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
    }
  },
  methods: {
    chooseLocation () {
      this.$electron.ipcRenderer.send('openFileBrowser')
    },
  },
  computed: {
    recieveLocation () {
      this.$electron.ipcRenderer.on('fileLocation', (e, data) => {
        console.log('fileLocation data', data)
        this.location = data

      })
    }
  }

}
</script>


<style scoped lang="sass">
@import ../styleguide/index

</style>
