import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// Define and import store's modules
/* prettier-ignore */
interface StoreType {
    assetsModule: import("@/models/modules/AssetsModule").default;
    siteModule  : import("@/models/modules/SiteModule"  ).default;
    userModule  : import("@/models/modules/UserModule"  ).default;
}

export default new Vuex.Store<StoreType>({});
