import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UploadView from "../views/UploadView.vue";
import MyImages from "../views/MyImages.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/cats",
    redirect: { name: "my" },
    children: [
      {
        name: "new",
        path: "new",
        component: UploadView,
        meta: { layout: "upload" },
      },
      {
        name: "my",
        path: "my",
        component: MyImages,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
