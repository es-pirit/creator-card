import { VuexModule, Module, Mutation, Action, MutationAction } from "vuex-module-decorators";
import Vue from "vue";

import store from "@/models/store";

/* prettier-ignore */
@Module({ namespaced: true, dynamic: true, name: "siteModule", store })
export default class extends VuexModule
{
    version = "0.0.1";
    eventBus = new Vue();

    hasErrorMessage = false;

// #[Getters] ---------- + ---------- + ---------- + ----------


// #[Mutations] ---------- + ---------- + ---------- + ----------
    @Mutation setHasErrorMessage(value: boolean) {
        this.hasErrorMessage = value;
    }

// #[Actions] ---------- + ---------- + ---------- + ----------

}
