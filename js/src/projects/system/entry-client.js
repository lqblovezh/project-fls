import { createApp } from './app'

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}


router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)

    let diffed = false
    const activated = matched.filter((component, i) => {
      return diffed || (diffed = prevMatched[i] !== component)
    })

    if (!activated.length) {
      return next()
    }

    Promise.all(
      activated.map(component => {
        if (component.asyncData) {
          return component.asyncData({ store, route: to })
        }
      })
    )
      .then(() => {
        next()
      })
      .catch(next)
  })

  app.$mount('#app')
})
