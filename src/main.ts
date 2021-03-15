import Vue from "vue";

Vue.config.productionTip = false;

/* prettier-ignore */
(async () => {
    const App = (await import(/* webpackChunkName: "vueApp" */ "@/views/App.vue")).default;

    new Vue({
        router : (await import(/* webpackChunkName: "router"  */ "@/models/router" )).default,
        store  : (await import(/* webpackChunkName: "store"   */ "@/models/store"  )).default,
        i18n   : (await import(/* webpackChunkName: "lang"    */ "@/models/lang"   )).default,
        vuetify: (await import(/* webpackChunkName: "vuetify" */ "@/models/vuetify")).default,
        render : create => create(App),
    }).$mount("#app");
})();
