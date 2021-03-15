import Vue from "vue";
import VueI18n from "vue-i18n";

import zh_TW from "@/assets/langs/zh_TW.json";

Vue.use(VueI18n);

/** Default language */
const locale = "zh_TW";
const messages = { zh_TW };

export default new VueI18n({
    locale,
    fallbackLocale: locale,
    messages,
});
