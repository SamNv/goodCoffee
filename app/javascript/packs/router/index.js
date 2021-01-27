import Vue from "vue";
import VueRouter from "vue-router";

const HomePage = () => import(/* webpackChunkName: "Home" */ "../views/HomePage");
const AdminPage = () => import(/* webpackChunkName: "AdminPage" */ "../views/AdminPage");

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
  },
  {
    path: "/admin",
    name: "AdminPage",
    component: AdminPage
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
