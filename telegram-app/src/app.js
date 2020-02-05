import Vue from 'vue'
import App from './App.vue'
import Vue2TouchEvents from 'vue2-touch-events'
import { createRouter } from './router/'
import { createStore } from './store/'
import { sync } from 'vuex-router-sync'
Vue.use(Vue2TouchEvents,{
  swipeTolerance: 60
});

export function createApp () {
  // create router instance
  const router = createRouter()
  const store = createStore()
  sync(store, router)
  const app = new Vue({
    // inject router into root Vue instance
    router,
    store,
    render: h => h(App)
  });

  // return both the app and the router
  return { app, router, store }
  //return { app, router }
}
