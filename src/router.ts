import Vue from 'vue';
import Router from 'vue-router';
import Welcome from './views/Welcome.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome,
    },
    {
      path: '/locate',
      name: 'locate',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Locate.vue'),
    },
    {
      path: '/rightdirinstruct',
      name: 'rightdirinstruct',
      component: () => import('./views/RightDirInstruct.vue'),
    },
    {
      path: '/rightdirtune',
      name: 'rightdirtune',
      component: () => import('./views/RightDirTune.vue'),
    },
    {
      path: '/updirinstruct',
      name: 'updirinstruct',
      component: () => import('./views/UpDirInstruct.vue'),
    },
    {
      path: '/updirtune',
      name: 'updirtune',
      component: () => import('./views/UpDirTune.vue'),
    },
    {
      path: '/finish',
      name: 'finish',
      component: () => import('./views/Finish.vue'),
    },
  ],
});
