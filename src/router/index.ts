import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import FormPage from '../views/FormPage.vue';
import HelloPage from '../views/HelloPage.vue';
import GalleryPage from '../views/GalleryPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    props:true
  },
  {
    path: '/form',
    name: 'Form',
    component: FormPage,
    props:true
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: GalleryPage,
    props:true
  },
  {
    path: '/hello/:civility:firstname:lastname/:speciality/:subjects*',
    name: 'Hello',
    component: HelloPage,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
