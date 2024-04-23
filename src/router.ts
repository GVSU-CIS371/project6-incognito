import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "./components/Home.vue";
import addItemView from "./components/addItem.vue"; 

const routes = [
  {
    path: "/",
    name: "home",
    props: true,
    component: HomeView,
  },
  {
    path: "/add-item",
    name: "add-item",
    component: addItemView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
