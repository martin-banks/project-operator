<template>
  <div class="nav">
    <ul>
      <li 
        v-for="(link, i) in links" 
        :key="i"
        :style="{ opacity: active === link.path ? 1 : 0.2 }"
      >
        <router-link :to="link.path">{{ link.text }}</router-link>
      </li>
    </ul>
    <div class="track">
      <span 
        class="marker" 
        :style="{ 
          transform: `translateX(${activePos}px)`,
          width: `${activeWidth}px`
        }"
      />
    </div>
  </div>
</template>


<script>
  export default {
    name: 'nav-container',
    props: [
      'active'
    ],
    data () {
      return {
        links: [
          {
            text: 'Setup',
            path: '/setup'
          },
          {
            text: 'New project',
            path: '/newproject'
          },
          {
            text: 'My projects',
            path: '/myprojects'
          },
          {
            text: 'Archive',
            path: '/archive'
          },
        ],
        markerPos: 0,
        activeWidth: 0,
        activePos: 0,
        activeIndex: 0
      }
    },
    methods: {

    },
    computed: {
      getMarkerIndex () {
        const { active, links } = this
        const activeIndex = links
          .map((l, i) => l.path === active ? (i + 1) : false)
          .filter(l => l)[0]
        return activeIndex - 1
      },
    },
      
    beforeMount () {},
    mounted () {},
  }
</script>


<style scoped lang="sass">
.nav
  position: relative
  width: 100%
  height: 60px
  left: 0
  margin-bottom: 60px
  overflow: auto
  ul
    position: relative
    padding: 0
    margin: 0
    line-height: 1

  li
    display: block
    left: 0
    top: 0
    transition: opacity 200ms
    display: inline-block
    font-size: 24px
    line-height: 1
    margin: 0 16px
    &:first-of-type
      margin-left: 0
    &:right-of-type
      margin-right: 0
    *
      color: white
      text-decoration: none


.track
  position: absolute
  width: 100%
  height: 2px
  bottom: 0
  left: 0
  background: black
  border-radius: 2px
  .marker
    transition: all 300ms
    position: absolute
    top: 0
    left:
    width: 180px
    height: 100%
    background: gold
    border-radius: 2px

</style>
