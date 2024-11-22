import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/show",
    name: "ShowHN",
    component: () => import("../views/ShowHN.vue"),
  },
  {
    path: "/ask",
    name: "AskHN",
    component: () => import("../views/AskHN.vue"),
  },
  {
    path: "/polls",
    name: "Polls",
    component: () => import("../views/Polls.vue"),
  },
  {
    path: "/jobs",
    name: "Jobs",
    component: () => import("../views/Jobs.vue"),
  },
  {
    path: "/starred",
    name: "Starred",
    component: () => import("../views/Starred.vue"),
  },
  {
    path: "/hot",
    name: "Hot",
    component: () => import("../views/Hot.vue"),
  },
  {
    path: "/shipow",
    name: "Shipow",
    component: () => import("../views/Shipow.vue"),
  },
  {
    path: "/starred",
    name: "Starred",
    component: () => import("../views/Starred.vue"),
  },
  {
    path: "/post/:id",
    name: "PostDetails",
    component: () => import("../components/PostDetails.vue"),
    props: true, // Pass route params as props to the component
  },
  {
    path: "/:pathMatch(.*)*", // Catch-all route for 404
    name: "NotFound",
    component: () => import("../views/404NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
