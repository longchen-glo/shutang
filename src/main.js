import Vue from 'vue'
import Router from 'vue-router'
import App from './App'
import FeedsView from './components/FeedsView'
import ReadView from './components/ReadView'

Vue.use(Router)

var router = new Router({
  // HTML5 History have some issue at here
  // history: true,
  // root: '#!',
  // saveScrollPosition: true,
  linkActiveClass: 'active'
})

router.map({
  '/feeds': {
    name: 'feeds',
    component: FeedsView
  },
  '/read/:id': {
    name: 'read',
    component: ReadView
  }
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/'
})

router.start(App, '#app')
