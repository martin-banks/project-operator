<template>
  <div class="project__wrapper">
    <div class="project__info" @click="toggleOpen">
      <div class="project__part">
        <span class="project__date">{{ file.date || '--' }}</span>
      </div>
      <div class="project__part">
        <span class="project__name">{{ file }}</span>
      </div>
      <div class="project__part">
        <span class="project__status">{{ file.status || '---' }}</span>
      </div>
    </div>
    <button class="button" @click="archiveProject">Archive</button>
    <div v-if="active" class="project__commands">
      <p>Hello world</p>
    </div>

  </div>
</template>


<script>
  export default {
    props: [
      'file'
    ],
    name: 'ProjectEntry',
    data () {
      return {
        active: false
      }
    },

    methods: {
      toggleOpen () {
        this.active = !this.active
      },
      closePoject () {
        window.alert('closing...')
      },
      archiveProject () {
        window.alert('archiving...')
      },
    }
  }
</script>


<style scoped lang='sass'>
@import ../../styleguide/index

.project
  &__wrapper
    display: grid
    grid-gap: 8px
    grid-template-columns: 1fr 100px
    padding: 3px
    margin-bottom: 4px
    +corner-round-3
    background: rgba(black, 0.2)
    cursor: pointer
    &:hover
      background: rgba(white, 0.05)
    *
      // border: solid 1px lime
    button
      margin: 0
      color: rgba(white, 0.3)
      // grid-column-start: 5
      &:hover
        color: gold
        background: rgba(brown, 0.4)
        color: black
  &__info
    position: relative
    display: grid
    grid-template-columns: 100px 1fr 100px
    grid-gap: 0
    border: solid 1px grey
  &__part
    position: relative
    border: solid 1px darkred
    span
      position: absolute
      border: solid 1px orange
      top: 50%
      width: 100%
      transform: translate(0, -50%)
      padding-left: 10px
  &__date
    position: relative
    color: rgba(white, 0.4)
  &__status
    text-align: center
    color: rgba(white, 0.4)
    padding: 0 12px




</style>
