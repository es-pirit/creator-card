import { VuexModule, Module, Mutation, Action, MutationAction } from "vuex-module-decorators";

import store from "@/models/store";

/* prettier-ignore */
@Module({ namespaced: true, dynamic: true, name: "userModule", store })
export default class extends VuexModule
{
    /** 使用者角色圖 */
    userAvatar = "";
    /** 使用者筆名 */
    nickname = "";
    /** 使用者特色描述 */
    character = "";

    /** 使用者所選職業 */
    jobChoice = "";

    /** 使用者所選屬性 */
    propChoices: string[] = [];

// #[Getters] ---------- + ---------- + ---------- + ----------


// #[Mutations] ---------- + ---------- + ---------- + ----------
    @Mutation setUserAvatar(value: string) {
        sessionStorage.setItem("userAvatar", value);
        this.userAvatar = value;
    }
    @Mutation setNickname(value: string) {
        this.nickname = value;
    }
    @Mutation setCharacter(value: string) {
        this.character = value;
    }

    @Mutation setJobChoice(value: string) {
        this.jobChoice = value;
    }
    @Mutation setPropChoices(value: string[]) {
        this.propChoices = value;
    }

// #[Actions] ---------- + ---------- + ---------- + ----------

}
