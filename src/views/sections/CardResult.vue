<template lang="pug">
    v-container#card-result
        div.panel-title.mb-2 {{ $t("roleTitle") }}
        canvas#creator-card.mb-2(ref="creatorCard" resize)
        v-img#downloader.buttonize.d-inline-flex(:src="require(`@/assets/images/btn_download.png`)" @click="onClickDownloader($event)")
        div#previewer(@click="scrollTo($refs.creatorCard)")
            div.preview-title.ma-2.my-1 
                v-icon.d-inline-block(color="#71392f") mdi-download
                span {{ $t("roleTitle") }}
            v-img.ma-2.mt-1(:src="preview" contain)
        a(ref="link")
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit, Model, Inject, Provide, Mixins } from "vue-property-decorator";
import { Color, Group, Path, PaperScope, Point, PointText, Raster, Rectangle } from "paper";

import Events from "@/models/helpers/Events";
import ModulesMixin from "@/models/mixins/ModulesMixin";
import CommonMixin from "@/models/mixins/CommonMixin";

/* prettier-ignore */
@Component({ components: { } })
export default class extends Mixins(ModulesMixin, CommonMixin) 
{
    paper = new PaperScope();

    cardSize = { width: 460, height: 640 };
    jobSize = { width: 105, height: 105 };
    propSize = { width: 74, height: 89 };

    preview = "";

// #[Props] ---------- + ---------- + ---------- + ----------


// #[Computed] ---------- + ---------- + ---------- + ----------
    get cardChoice() {
        const routeOptions = this.$route.params.options as string;
        if (routeOptions) {
            if (routeOptions.includes("rare")) return this.assetsModule.cardsInfo[1];
            else if (routeOptions.includes("super")) return this.assetsModule.cardsInfo[2];
        }

        const random = Math.random();
        if (random < 0.5) return this.assetsModule.cardsInfo[0];
        else if (random < 0.8) return this.assetsModule.cardsInfo[1];
        else return this.assetsModule.cardsInfo[2];
    }

// #[Watch] ---------- + ---------- + ---------- + ----------
    @Watch("userAvatar") upUserAvatar() {
        this.redrawCanvas();
    }
    @Watch("nickname") upNickname() {
        this.redrawCanvas();
    }
    @Watch("character") upCharacter() {
        this.redrawCanvas();
    }
    @Watch("jobChoice") upJobChoice() {
        this.redrawCanvas();
    }
    @Watch("propChoices", { deep: true }) upPropsChoices() {
        this.redrawCanvas();
    }

// #[Life Cycle] ---------- + ---------- + ---------- + ----------
    mounted() {
        this.paper.setup(this.$refs.creatorCard as HTMLCanvasElement);
        this.redrawCanvas();
    }
    updated() {
        this.redrawCanvas();
    }

// #[Events] ---------- + ---------- + ---------- + ----------
    onClickDownloader(e: MouseEvent) {
        this.tweenButton(e.currentTarget!);
        this.eventBus.$emit(Events.VERIFY_OPTIONS);

        setTimeout(() => {
            console.log(this.hasErrorMessage);
        if (!this.hasErrorMessage) {
            const canvas = this.$refs.creatorCard as HTMLCanvasElement;

            const resizedCanvas = document.createElement("canvas");
                resizedCanvas.width = this.cardSize.width;
                resizedCanvas.height = this.cardSize.height;
                resizedCanvas.getContext("2d")!.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, this.cardSize.width, this.cardSize.height);
            
            const link = this.$refs.link as HTMLLinkElement;
                link.setAttribute("download", "MyRoleCard.png");
                link.setAttribute("href", resizedCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
                link.click();
        }
        }, 200);
    }

// #[Methods] ---------- + ---------- + ---------- + ----------
    redrawCanvas() {
        this.paper.activate();
        this.paper.project!.clear();

        const canvas = this.$refs.creatorCard as HTMLCanvasElement;

        // Reset the canvas's size
        const dpi = 1;    //TODO for mobile: (window.devicePixelRatio || 1);

        const canvasStyle = getComputedStyle(canvas);
        const canvasW = +canvasStyle.width!.slice(0, -2);
        const canvasH = +canvasStyle.height!.slice(0, -2);

        canvas.width = canvasW * dpi;
        canvas.height = canvasH * dpi;

        const scale = (canvasW > canvasH) ? (canvasH / this.cardSize.height) : (canvasW / this.cardSize.width);
        const realCardSize = { width: this.cardSize.width * scale, height: this.cardSize.height * scale };

        // Display the user's avatar
        if (this.userAvatar) {
            const avatar = new Raster(this.userAvatar);
                  avatar.scale(scale, scale);

            const avatarMask = new Path.Rectangle(new Rectangle(-realCardSize.width / 2, -realCardSize.height / 2, realCardSize.width, realCardSize.height));
                  avatarMask.clipMask = true;

            const group = new Group([avatar, avatarMask]);
                  group.position = new Point(canvasW / 2, avatar.height! / 2);
        }

        // Display the card's frame
        const img_card = new Raster(require(`@/assets/images/cards/img_${ this.cardChoice }.png`));
              img_card.scale(scale, scale);
              img_card.position = new Point(canvasW / 2, canvasH / 2);

        // Display the user's nickname and character
        this.createText(canvasW / 2, (canvasH + 345 * scale) / 2, `${ this.nickname }`, 26, true);
        this.createText(canvasW / 2, (canvasH + 430 * scale) / 2, `${ this.character }`);

        // Display the user's choices of jobs and properties
        if (this.jobChoice) {
            const img_job = new Raster(require(`@/assets/images/jobs/img_${ this.jobChoice }.png`));
                  img_job.scale(scale, scale);
                  img_job.pivot = new Point(-this.jobSize.width / 2, -this.jobSize.height / 2);
                  img_job.position = new Point((canvasW - realCardSize.width) / 2, (canvasH - realCardSize.height) / 2);
        }

        if (this.propChoices && this.propChoices.length >= 0) {
            for (let i = 0, max = this.propChoices.length; i < max; i++) {
                const propChoice = this.propChoices[i];
                const offset = (27 + this.propSize.width) * scale * i + (i > 0 ? 50 : 0);
                const newScale = scale * (i > 0 ? 0.64 : 1);

                const img_prop = new Raster(require(`@/assets/images/props/img_${ propChoice }.png`));
                      img_prop.scale(newScale ,newScale);
                      img_prop.pivot = new Point(this.propSize.width / 2, this.propSize.height / 2);
                      img_prop.position = new Point((canvasW + realCardSize.width - 40 - offset) / 2, (canvasH + realCardSize.height) / 2 - 28);
            }
        }

        // Update the preview
        window.setTimeout(() => {
            this.preview = canvas.toDataURL("image/png");
        }, 200);
    }

    createText(x: number, y: number, content: string, fontSize = 22, isBold = false, color = "#ffffff") {
        const txt = new PointText(new Point(0, 0));
              txt.fontFamily = "Roboto, Microsoft JhengHei, PingFang TC, Heiti TC, DroidSansFallback, Noto Sans TC, monospace, sans-serif";
              txt.fontSize = fontSize;
              txt.content = content;
              txt.fontWeight = isBold ? "bold" : "normal";
              txt.fillColor = new Color(color);

              // Force refresh the position based on the content
              txt.position = new Point(x, y);
        return txt;
    }
}
</script>

<style lang="scss">
$panel-top: 16px;

#card-result {
    margin-top: 12px;
    padding: 12px 12px #{12px + $panel-top} 12px;

    border-radius: 10px;
    background: rgba(#ffffff, 0.85);

    height: #{ 460px + 180px };

    #creator-card[resize] {
        width: 460px;
        height: 640px;

        transform: translateY(-17.5%) scale(0.65);
    }

    #downloader {
        transform: translateY(-220px);
    }

    #previewer {
        cursor: pointer;
        z-index: 1;
        position: fixed;
        top: 12.5px;
        right: calc(50% - 440px);

        border-radius: 5px;
        background: rgba(#ffffff, 0.85);

        .v-image {
            width: 125px;
        }
        .preview-title {
            color: $c-title;
            font-size: 14px;
            font-weight: bold;
            text-align: left;
        }
    }

    .panel-title {
        color: $c-title;
        font-size: 30px;
        font-weight: bold;
    }
}
</style>
