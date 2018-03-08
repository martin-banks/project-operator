import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'app-setup',
    //   component: require('@/views/AppSetup').default
    // },
    {
      path: '/',
      name: 'app-builder',
      component: require('@/views/AppBuilder').default
    },

    // {
    //   path: '/setup',
    //   name: 'app-setup',
    //   component: require('@/views/AppSetup').default
    // },
    {
      path: '/newproject',
      name: 'new-project',
      component: require('@/views/NewProject').default,
    },
    {
      path: '/myprojects',
      name: 'my-projects',
      component: require('@/views/MyProjects').default,
    },
    {
      path: '/archive',
      name: 'archive-projects',
      component: require('@/views/ArchiveProjects').default,
    },
    {
      path: '/settings',
      name: 'app-settings',
      component: require('@/views/AppSettings').default,
    },
  ]
})
