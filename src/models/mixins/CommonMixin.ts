import { Vue, Component, Prop, Watch, Emit, Model, Inject, Provide, Mixins } from "vue-property-decorator";
import { TimelineLite, Back, TweenLite } from "gsap";

/* prettier-ignore */
@Component({ components: {} })
export default class extends Vue
{
    clickTween: TimelineLite | null = null;

// #[Props] ---------- + ---------- + ---------- + ----------
    

// #[Computed] ---------- + ---------- + ---------- + ----------
    

// #[Watch] ---------- + ---------- + ---------- + ----------


// #[Life Cycle] ---------- + ---------- + ---------- + ----------
    

// #[Methods] ---------- + ---------- + ---------- + ----------
    tweenButton(target: EventTarget) {
        // Run click scale animation
        if (this.clickTween) this.clickTween.kill();

        this.clickTween = new TimelineLite()
                .fromTo(target, 0.1, { scale: 1 }, { scale: 0.95 })
                .to(target, 0.2, { scale: 1, ease: Back.easeOut, delay: 0.1 });
    }

    /** Convert the specific file to Base64 format */
    getBase64(file: File) {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = error => reject(error);
        });
    }

    scrollTo(y: Element | number | "top" | "bottom") {
        if (typeof y === "string") {
            y = (y === "top" ? 0 : document.body.scrollHeight);
        }
        else if (typeof y !== "number") {
            const top = y.getBoundingClientRect().top;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            y = top + scrollTop;
        }
        
        const scroll = { y: window.pageYOffset };
        TweenLite.to(scroll, 0.5, { y, onUpdate: () => window.scrollTo(0, scroll.y) });
    }
}
