import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store"

const HomePage = () => import(/* webpackChunkName: "Home" */ "../views/HomePage");
const AdminPage = () => import(/* webpackChunkName: "AdminPage" */ "../views/AdminPage");

Vue.use(VueRouter);

const requireAdmin = (to, from, next) => {
  if (!localStorage.signedIn) {
    next({ name: "HomePage" })
  } else {
    next()
  }
}
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
    component: AdminPage,
    beforeEnter: requireAdmin
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
