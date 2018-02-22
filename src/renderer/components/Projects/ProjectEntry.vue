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
    
    <div v-if="active" class="project__drawer">
      <p class="project__description">Anim consectetur adipisicing esse exercitation exercitation consequat eiusmod sunt velit in. Sit est incididunt anim adipisicing dolor cupidatat. Cillum pariatur exercitation dolore sint mollit ea consectetur.</p>
      <div class="project__actions">
        <project-action
          v-for="(action, i) in actions"
          :key="i"
          :env="action.env"
          :action="action.action"
          :footer="action.footer"
        />
      </div>
    </div>

  </div>
</template>


<script>
import ProjectAction from './ProjectAction'
  export default {
    props: [
      'file'
    ],
    components: {
      ProjectAction,
    },
    name: 'ProjectEntry',
    data () {
      return {
        active: false,
        actions: [
          {
            env: 'dev',
            action: 'Setup',
            footer: false,
          },
          {
            env: 'dev',
            action: 'Start preview',
            footer: false,
          },
          {
            env: 'prod',
            action: 'Build prod',
            footer: false,
          },
          {
            env: 'prod',
            action: 'Local preview',
            footer: false,
          },
        ],
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
    &:hover
      background: rgba(black, 0.4)
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
    cursor: pointer
    // border: solid 1px grey
  &__part
    position: relative
    // border: solid 1px darkred
    span
      position: absolute
      // border: solid 1px orange
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
  &__drawer
    padding: 20px
    color: rgba(white, 0.6)
  &__description
    margin-bottom: 20px
  &__actions
    display: grid
    grid-template-columns: repeat(4, 1fr)
    // grid-template-rows: 150px
    grid-gap: 10px





</style>
