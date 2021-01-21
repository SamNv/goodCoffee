import Vue from "vue";
import VueRouter from "vue-router";

const HomePage = () => import(/* webpackChunkName: "Home" */ "../views/HomePage");

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "home"
  },
  {
    path: "/home",
    name: "HomePage",
    component: HomePage
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
