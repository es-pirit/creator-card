import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/:options?",
            name: "home",
            meta: {
                title: "siteTitle.home",
            },
            component: () => import(/* webpackChunkName: "home" */ "@/views/page/Home.vue"),
        },
    ],
});
