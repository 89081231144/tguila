import Vue from 'vue';
import Router from 'vue-router';
//import Home from '../components/Home.vue';
//import About from '../components/About.vue';

Vue.use(Router);

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', component: () => import('../components/Home.vue'), name: 'home' , props: true },
      { path: '/:username', component: () => import('../components/ChatViewMount.vue'),name: 'chatView', props: true }
    ]
  });
}
