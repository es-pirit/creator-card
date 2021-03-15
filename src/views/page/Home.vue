<template lang="pug">
    v-container#home
        v-snackbar(v-model="hasMpsnMessage" :timeout="10000" top)
            div {{ $t("messages.noMpsnHome") }}
            v-icon.ml-5(color="#ffffff" @click="hasMpsnMessage = false") mdi-close-circle

        v-img#header.mb-5(:src="require('@/assets/images/img_header.png')")
        UserOptions
        CardResult
        v-img#banner.mt-5(:src="require('@/assets/images/img_banner.jpg')" @click="linkHomePage")
        v-img#mpsn.mt-5(:src="require('@/assets/images/img_mpsnBalloon.png')" @click="hasMpsnMessage = true" contain)
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit, Model, Inject, Provide, Mixins } from "vue-property-decorator";

import ModulesMixin from "@/models/mixins/ModulesMixin";
import CommonMixin from "@/models/mixins/CommonMixin";

/* prettier-ignore */
@Component({ components: {
    CardResult : () => import(/* webpackChunkName: "vueCardResult"  */ "@/views/sections/CardResult.vue" ), 
    UserOptions: () => import(/* webpackChunkName: "vueUserOptions" */ "@/views/sections/UserOptions.vue"),
}})
export default class extends Mixins(ModulesMixin, CommonMixin) 
{
    hasMpsnMessage = false;

// #[Props] ---------- + ---------- + ---------- + ----------


// #[Computed] ---------- + ---------- + ---------- + ----------


// #[Watch] ---------- + ---------- + ---------- + ----------


// #[Life Cycle] ---------- + ---------- + ---------- + ----------
    mounted() {
        const routeOptions = this.$route.params.options as string;
        if (routeOptions && (routeOptions.includes("myth") || routeOptions.includes("puzzle"))) this.assetsModule.enableMoreOptions();
    }

// #[Events] ---------- + ---------- + ---------- + ----------
    

// #[Methods] ---------- + ---------- + ---------- + ----------
    linkHomePage() {
        window.open("https://home.gamer.com.tw/homeindex.php?owner=sundae0204", "_blank");
    }
}
</script>

<style lang="scss">
#home {
    max-width: 600px;

    #banner {
        cursor: pointer;
    }
    #mpsn {
        cursor: pointer;
        position: fixed;
        height: 200px;
        right: calc(50% - 470px);
        bottom: -20px;

        animation: float-balloon 10s infinite alternate;
    }

    @keyframes float-balloon {
        0% { opacity: 0.8; transform: scale(1) translateY(0); };
        100% { opacity: 1; transform: scale(1.1) translateY(-50px); }
    }
}
</style>
