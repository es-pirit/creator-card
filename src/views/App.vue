<template lang="pug">
    v-app#app
        v-content
            router-view
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit, Model, Inject, Provide, Mixins } from "vue-property-decorator";

import ModulesMixin from "@/models/mixins/ModulesMixin";
import CommonMixin from "@/models/mixins/ModulesMixin";

/* prettier-ignore */
@Component({ components: {} })
export default class extends Mixins(ModulesMixin, CommonMixin) 
{


// #[Props] ---------- + ---------- + ---------- + ----------


// #[Computed] ---------- + ---------- + ---------- + ----------
    updated() {
        document.title = this.$t(this.$route.meta.title).toString();
    }

// #[Watch] ---------- + ---------- + ---------- + ----------


// #[Life Cycle] ---------- + ---------- + ---------- + ----------
    

// #[Events] ---------- + ---------- + ---------- + ----------


// #[Methods] ---------- + ---------- + ---------- + ----------


}
</script>

<style lang="scss">
/* prettier-ignore */
body, input, label, button, #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    font-family: "Roboto", "Microsoft JhengHei", "PingFang TC", "Heiti TC", "DroidSansFallback", "Noto Sans TC", monospace, sans-serif !important;
    font-size: 18px;
    text-align: center;
}
input[type="password"] {
    font-family: "Roboto", "Times New Roman", monospace, sans-serif !important;
}

body {  
    background: url("../assets/images/img_bg.jpg") $c-background;
}
#app {
    color: $c-title;
    background: url("../assets/images/img_bg.jpg") $c-background;

    a {
        color: $c-link;
        text-decoration: none;
    }
}
</style>
