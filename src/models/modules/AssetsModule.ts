import { VuexModule, Module, Mutation, Action, MutationAction } from "vuex-module-decorators";

import store from "@/models/store";

/* prettier-ignore */
@Module({ namespaced: true, dynamic: true, name: "assetsModule", store })
export default class extends VuexModule
{
    /** 職業資訊 */
    jobsInfo = ["artist", "writer", "bloger", "translator", "coser", "reader", "musician", "streamer", "guider", "player", "developer", "passerby"];

    /** 屬性資訊 */
    propsInfo = ["fire", "poison", "water", "thunder", "earth", "golden", "wind", "flower", "shadow", "moon", "light", "empty", "beast"];

    /** 卡片框資訊 */
    cardsInfo = ["normal", "rare", "super"];

// #[Getters] ---------- + ---------- + ---------- + ----------


// #[Mutations] ---------- + ---------- + ---------- + ----------
    @Mutation enableMoreOptions() {
        this.jobsInfo.push("puzzlerian");
        this.propsInfo.push("mystery");
    }

// #[Actions] ---------- + ---------- + ---------- + ----------

}
