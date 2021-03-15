<template lang="pug">
    v-container#user-options
        v-snackbar(v-model="hasErrorMessage" color="error darken-2" :timeout="10000" top)
            div {{ notDoneMessage }}
            v-icon.ml-5(color="#ffffff" @click="hasErrorMessage = false") mdi-close-circle
            
        v-expansion-panels(v-model="displayedPanels", popout, multiple, focusable)
            v-expansion-panel
                v-expansion-panel-header STEP 1
                v-expansion-panel-content
                    v-img.buttonize.d-inline-flex(:src="require(`@/assets/images/btn_upload.png`)" @click="onClickUploader($event)")
                    v-file-input.mt-2(
                      ref="fileInput" :label="$t(`input.label.avatar`)" :hint="$t(`input.rule.avatar`)" 
                      :rules="[avatarSizeRule || `${ $t(`input.rule.avatar`) } ${ $t(`input.rule.avatarSize`, [avatarSize.width, avatarSize.height]) }`]" 
                      prepend-icon="mdi-clipboard-account-outline" accept="image/png, image/jpeg" color="#71392f"
                      persistent-hint dense outlined clearable show-size
                      @change="onUploadImage($event)")

            v-expansion-panel
                v-expansion-panel-header STEP 2 
                v-expansion-panel-content
                    v-text-field.mt-2(
                      v-model="nickname" :label="$t(`input.label.nickname` )" :hint="$t(`input.rule.nickname`)" :rules="[t => getTextLength(t, `name`) <= textRules.name.max || $t(`input.rule.nickname`)]" 
                      prepend-icon="mdi-account-edit" :maxlength="textRules.name.max - textRules.name.numFullwidths" counter color="#71392f"
                      persistent-hint dense outlined clearable)
                    v-text-field.mt-2(
                      v-model="character" :label="$t(`input.label.character`)" :hint="$t(`input.rule.character`)" :rules="[t => getTextLength(t, `char`) <= textRules.char.max || $t(`input.rule.character`)]" 
                      prepend-icon="mdi-account-details" :maxlength="textRules.char.max - textRules.char.numFullwidths" counter color="#71392f"
                      persistent-hint dense outlined clearable)
                      
            v-expansion-panel
                v-expansion-panel-header STEP 3
                v-expansion-panel-content
                    div.panel-message
                        span.panel-title.mr-2 {{ $t("jobs.title") }}
                        span.panel-prompt {{ $t("jobs.prompt") }}
                    v-radio-group.ma-0(v-model="jobChoice")
                        v-radio.mr-0.mb-4(v-for="value in assetsModule.jobsInfo" :key="value" :value="value" color="#71392f" hide-details)
                            template(slot="label")
                                v-img.img-choice.mr-2(:src="require(`@/assets/images/jobs/img_${ value }.png`)" contain)
                                div.text-choice
                                    span(v-for="text in $t(`jobs.description.${ value }`)" v-html="getHtmlText(text)")

            v-expansion-panel
                v-expansion-panel-header STEP 4
                v-expansion-panel-content
                    div.panel-message
                        span.panel-title.mr-2 {{ $t("props.title") }}
                        span.panel-prompt {{ $t("props.prompt", [maxProps, propChoices.length]) }}
                    v-container.pa-0
                        v-row(v-for="row in (assetsModule.propsInfo.length / 2 >> 0) + 1" :key="`prop-row-${ row }`")
                            v-col.py-0(:class="[(i >= assetsModule.propsInfo.length) && `d-none d-sm-flex`]" v-for="col in 2" :key="`prop-${ i = (row - 1) * 2 + (col - 1) }`")
                                v-checkbox(v-if="i < assetsModule.propsInfo.length" :value="assetsModule.propsInfo[i]" v-model="propChoices" @change="onSelectProps()" color="#71392f")
                                    template(slot="label")
                                        v-img.img-choice.mr-2(:src="require(`@/assets/images/props/img_${ assetsModule.propsInfo[i] }.png`)" contain)
                                        div.text-choice
                                            div.strong {{ $t(`props.description.${ assetsModule.propsInfo[i] }[0]`) }}
                                            span.content {{ $t(`props.description.${ assetsModule.propsInfo[i] }[1]`) }}
                                            
            v-expansion-panel
                v-expansion-panel-header STEP 5
                v-expansion-panel-content
                    v-img.buttonize.d-inline-flex(:src="require(`@/assets/images/btn_start.png`)" @click="onClickCreator($event)")
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit, Model, Inject, Provide, Mixins } from "vue-property-decorator";

import Events from "@/models/helpers/Events";
import ModulesMixin from "@/models/mixins/ModulesMixin";
import CommonMixin from '@/models/mixins/CommonMixin';

/* prettier-ignore */
@Component({ components: {} })
export default class extends Mixins(ModulesMixin, CommonMixin) 
{
    displayedPanels = [0];

    avatarSizeRule = true;
    avatarSize = { width: 0, height: 0 };

    maxProps = 7;
    
    textRules = {
        name: { max: 16, numFullwidths: 0 },
        char: { max: 26, numFullwidths: 0 },
    };
    
    notDoneMessage = "";

// #[Props] ---------- + ---------- + ---------- + ----------


// #[Computed] ---------- + ---------- + ---------- + ----------
    

// #[Watch] ---------- + ---------- + ---------- + ----------


// #[Life Cycle] ---------- + ---------- + ---------- + ----------
    mounted() {
        this.eventBus.$on(Events.VERIFY_OPTIONS, this.onClickCreator);
    }

    beforeDestroy() {
        if (this.clickTween) this.clickTween.kill();
    }

// #[Events] ---------- + ---------- + ---------- + ----------
    onClickUploader(e: MouseEvent) {
        this.tweenButton(e.currentTarget!);

        // Popup the file picker window
        (this.$refs.fileInput as Vue).$el.getElementsByTagName("input")[0].click();
    }

    onClickCreator(e?: MouseEvent) {
        if (e) this.tweenButton(e.currentTarget!);
        
        let isDone = true;
        let notDoneItems: string[] = [];

        if (!this.userAvatar) {
            isDone = false;
            notDoneItems.push(this.$t("messages.uploadedAvatar").toString());
        }
        if (!this.nickname || !this.character) {
            isDone = false;
            notDoneItems.push(this.$t("messages.inputedInfo").toString());
        }
        if (!this.jobChoice) {
            isDone = false;
            notDoneItems.push(this.$t("messages.selectedJob").toString());
        }
        if (this.propChoices.length === 0) {
            isDone = false;
            notDoneItems.push(this.$t("messages.selectedProps").toString());
        }

        // Hide all panels
        if (isDone) this.displayedPanels = [];
        else {
            this.hasErrorMessage = true;
            this.notDoneMessage = this.$t("messages.notDone", [notDoneItems.join(this.$t("symbol.serial").toString())]).toString();
        }
    }

    onSelectProps() {
        if (this.propChoices.length > this.maxProps) this.propChoices.length = this.maxProps;
    }

    async onUploadImage(file: File) {
        if (!file) {
            this.avatarSizeRule = true;
            return;
        }

        this.userAvatar = await this.getBase64(file);

        // Check the size of the image
        const img = new Image();
              img.src = this.userAvatar;
              img.onload = () => {
                    this.avatarSize.width = img.width;
                    this.avatarSize.height = img.height;
                    this.avatarSizeRule = (img.width >= 460 && img.height >= 640);

                    // Display other panels
                    if (this.avatarSizeRule) this.displayedPanels = [1, 2, 3, 4];
              };
    }

// #[Methods] ---------- + ---------- + ---------- + ----------
    /** Caculate the length of the specific text in byte */
    getTextLength(text?: string, field?: "name" | "char") {
        if (!text) return 0;

        let length = 0;
        let numFullwidths = 0;
        for (let i = 0, max = text.length; i < max; i++) {
            let char = text.charCodeAt(i);
            let count = 0;
            while (char > 0) {
                char = char >> 8;
                count++;
                length++;
            }
            if (count > 1) numFullwidths++;
        }

        if (field) this.textRules[field].numFullwidths = numFullwidths;
        
        return length;
    }

    /** Convert the text in Markdown style to Html style */
    getHtmlText(value: string) {
        return value.replace(/\*(.*?)\*/g, `<span class="strong">$1</span>`);
    }

    checkImageSize(file: File | File[]) {
        return new Promise<boolean>(resolve => {
            if (file instanceof File) {
                const img = new Image();
                      img.src = this.userAvatar;
                      img.onload = () => resolve(img.width >= 460 && img.height >= 640);
            }
            resolve(true);
        });
    }
}
</script>

<style lang="scss">
$panel-top: 16px;

#user-options {
    padding: 12px 12px #{12px + $panel-top} 12px;

    border-radius: 10px;
    background: rgba(#ffffff, 0.85);

    .v-snack {
        font-weight: bold;
    }
    .v-expansion-panel {
        margin-top: $panel-top;
        background: transparent;

        &::before {
            box-shadow: unset;
        }
        .v-expansion-panel-header {
            display: unset;
            padding: 12px 24px;
            min-height: 42px;

            border-radius: 50px;
            background: rgba($c-panel-header, 0.7);

            color: #ffffff;
            text-align: center;
            font-weight: bold;
            font-size: 20px;

            .v-expansion-panel-header__icon {
                position: absolute;
                top: 5px;
                right: 2.5%;
                height: 100%;
            }
        }
        .v-expansion-panel-content__wrap {
            padding: 16px 24px;
        }
    }
    .v-expansion-panel.v-expansion-panel--active {
        .v-expansion-panel-header {
            min-height: 48px;
            background: rgba($c-panel-header, 0.95);

            font-size: 28px;
        }
    }

    .v-text-field {
        input[type="text"] {
            text-align: left;
        }

        .v-messages:not(.error-text) {
            color: $c-text;
            font-size: 13.5px;
        }
    }

    .v-radio,
    .v-input--checkbox {
        position: relative;
    }
    .v-radio:last-child {
        margin-bottom: 0 !important;
    }
    .v-radio.v-item--active::before,
    .v-input--checkbox.v-input--is-label-active::before {
        content: "";
        position: absolute;
        width: 105%;
        height: 110%;
        left: -2.5%;
        top: -5%;

        border-radius: 10px;
        background: rgba($c-background, 0.25);
    }

    .v-input--checkbox {
        .v-input__slot {
            margin-bottom: 0;
        }
    }

    .img-choice {
        width: 80px;
        height: 80px;
    }
    .text-choice {
        color: $c-text;
        text-align: justify;

        .strong {
            font-weight: bold;
            text-decoration: underline;
        }
        .content {
            font-size: 15px;
        }
    }

    .panel-message {
        text-align: left;

        .panel-title {
            color: $c-title;
            font-size: 30px;
            font-weight: bold;
        }
        .panel-prompt {
            color: $c-prompt;
            font-weight: bold;
        }
    }
}
</style>
