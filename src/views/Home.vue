<template lang="pug">
.parent
  swiper.container(:options="swiperOptions" ref="swiper" key="swiper")
    swiper-slide(v-for="(repo, i) in repos" :key="i")
      page(:repo="repo" style="padding-left: 150px")
        template(v-slot:title)
          h1 {{repo.name}}
        template(v-slot:tags)
          //- v-icon(name="star" scale="1.5" label="tes")
          h2 {{repo.stargazers_count}}
          h2 {{repo.language}}
        p Hello
  timeline(:data="swiper")
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
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Page from '@/components/Page.vue';
import { getRepos } from '../api/gh';
import { setInterval, clearInterval } from 'timers';
import { lerp } from '@/api/scripts';
import OverlaySlider from '@/components/OverlaySlider.vue';
import Timeline from '@/components/Timeline.vue';

let timer!: NodeJS.Timeout | undefined;

@Component({
  components: {
    Page,
    OverlaySlider,
    Timeline
  },
})
export default class Home extends Vue {
  private get swiper() {
    if(!this.isMounted) { return; }
    return (this.$refs.swiper as any).swiper;
  }
  private isMounted: boolean = false;
  private repos: any[] = [];
  private swipeState: number = 0;
  private animating: boolean = false;
  private swiperOptions = {
    direction: 'vertical',
    resistanse: false,
    mousewheel: true,
    observer: true,
    speed: 600,
    on: {
      progress: () => this.setAnimating(true),
      transitionEnd: () => this.setAnimating(false),
    },
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
      if (timer) { return; }
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

  private async loadRepos() {
    this.repos = await getRepos();
  }

  private mounted() {
    this.loadRepos();
    this.isMounted = true;
  }
}
</script>
