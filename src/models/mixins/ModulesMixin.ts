import { Vue, Component, Prop, Watch, Emit, Model, Inject, Provide, Mixins } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

import AssetsModule from "@/models/modules/AssetsModule";
import SiteModule from "@/models/modules/SiteModule";
import UserModule from "../modules/UserModule";

/* prettier-ignore */
@Component({ components: {} })
export default class extends Vue
{
    

// #[Props] ---------- + ---------- + ---------- + ----------


// #[Computed: Modules] ---------- + ---------- + ---------- + ----------
    get assetsModule() { return getModule(AssetsModule, this.$store); }
    get siteModule()   { return getModule(SiteModule  , this.$store); }
    get userModule()   { return getModule(UserModule  , this.$store); }

// #[Computed] ---------- + ---------- + ---------- + ----------
    get eventBus() { return this.siteModule.eventBus; }

    /** 使用者角色圖 */
    get userAvatar() { return this.userModule.userAvatar; }
    set userAvatar(value) { this.userModule.setUserAvatar(value); }

    /** 使用者筆名 */
    get nickname() { return this.userModule.nickname; }
    set nickname(value) { this.userModule.setNickname(value); }

    /** 使用者特色描述 */
    get character() { return this.userModule.character; }
    set character(value) { this.userModule.setCharacter(value); }

    /** 使用者所選職業 */
    get jobChoice() { return this.userModule.jobChoice; }
    set jobChoice(value) { this.userModule.setJobChoice(value); }

    /** 使用者所選屬性 */
    get propChoices() { return this.userModule.propChoices; }
    set propChoices(value) { this.userModule.setPropChoices(value); }

    get hasErrorMessage() { return this.siteModule.hasErrorMessage; }
    set hasErrorMessage(value) { this.siteModule.setHasErrorMessage(value); }

// #[Watch] ---------- + ---------- + ---------- + ----------


// #[Life Cycle] ---------- + ---------- + ---------- + ----------


// #[Methods] ---------- + ---------- + ---------- + ----------


}
