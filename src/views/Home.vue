<template lang="pug">
.parent
  background
  
  header.fill-width.row.end-xs.pa20
    h3.px10.box Hello
    a.pl10.box(href="https://github.com/rIIh")
        h3 Github
  swiper.container(:options="swiperOptions" ref="swiper" key="swiper")
    swiper-slide(v-for="entry in structure")
      page(:style="'padding-left: ' + timelineWidth + 'px'" :pageComponentData="entry")
  timeline(:swiperData="swiper" :entries="structure" :width="timelineWidth" @update:width="val => timelineWidth = val")
  overlay-slider(:getter="getState" key="overlay")
</template>

<style lang="sass">
.triangle
  background: white
.parent
  position: relative
  height: 100vh
.container
  position: relative
  width: 100%
  height: 100%
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import Page from "@/components/Page.vue";
import Background from "@/components/Background.vue";
import { getRepos } from "../api/gh";
import { setInterval, clearInterval } from "timers";
import { lerp } from "@/api/scripts";
import OverlaySlider from "@/components/OverlaySlider.vue";
import Timeline from "@/components/Timeline.vue";
import { PageView, RepoView } from '@/api/entries';
import {PageComponent, loadStructure} from '@/structure/structure';

let timer!: NodeJS.Timeout | undefined;

@Component({
    components: {
        Page,
        OverlaySlider,
        Timeline,
        Background
    }
})
export default class Home extends Vue {
    private get swiper() {
        if (!this.isMounted) {
            return;
        }
        return (this.$refs.swiper as any).swiper;
    }
    private structure: PageComponent[] = [];
    private isMounted: boolean = false;
    private swipeState: number = 0;
    private animating: boolean = false;
    private timelineWidth: number = 50;
    private swiperOptions = {
        direction: 'vertical',
        resistanse: false,
        mousewheel: true,
        observer: true,
        speed: 600,
        on: {
            progress: () => this.setAnimating(true),
            transitionEnd: () => this.setAnimating(false)
        }
    };

    private getState() {
        return this.swipeState;
    }

    @Watch('animating')
    private onAnimating(val: boolean, oldVal: boolean) {
        if (oldVal || !val) {
            return;
        }
        if (val) {
            const that = this;
            // console.log(that)
            if (timer) {
                return;
            }
            timer = setInterval(() => {
                that.onScroll();
                if (!that.animating) {
                    clearInterval(timer!);
                    timer = undefined;
                }
            }, 10);
        }
    }

    private setAnimating(val: boolean) {
        this.animating = val;
    }

    private onScroll() {
        const scrollPerPage = window.innerHeight;
        let state = -this.swiper.getTranslate() / scrollPerPage;
        state = state - Math.floor(state);
        if (this.swipeState === state) {
            return;
        }
        this.swipeState = state;
    }

    private async loadStructure(){
        this.structure = await loadStructure();
    }

    private mounted() {
        this.loadStructure();
        this.isMounted = true;
    }
}
</script>
