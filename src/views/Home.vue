<template lang="pug">
.parent
  swiper.container(:options="swiperOptions" ref="main-view")
    swiper-slide(v-for="(repo, i) in repos" :key="i")
      page(:repo="repo")
        template(v-slot:title)
          h1 {{repo.name}}
        template(v-slot:tags)
          v-icon(name="star" scale="1.5" label="tes")
          h2 {{repo.stargazers_count}}
          h2 {{repo.language}}
        p Hello
  .color-box(ref="color-box")
  
</template>

<style lang="sass">
.triangle
  background: white
.parent
  height: 100vh
.container
  width: 100%
  height: 100%
.color-box
  position: absolute
  width: 100vw
  left: 0
  z-index: 100


  background: white
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Page from '@/components/Page.vue';
import { getRepos } from '../api/gh';
import { setInterval, clearInterval } from 'timers';
import { lerp } from '@/api/scripts';
import { parse } from 'path';

@Component({
  components: {
    Page,
  },
})
export default class Home extends Vue {
  private get swiper() {
    return (this.$refs['main-view'] as any).swiper;
  }
  private repos: any[] = [];
  private swipeState: number = 0;
  private swiperOptions = {
    direction: 'vertical',
    resistanse: false,
    mousewheel: true,
    observer: true,
    speed: 600,
    on: {
      progress: () => this.setAnimating(true),
      slideChangeTransitionEnd: () => this.setAnimating(false),
    },
  };

  private animating: boolean = false;

  @Watch('animating')
  private onAnimating(val: boolean, oldVal: boolean) {
    if (oldVal) {
      return;
    }
    if (val) {
      const that = this;
      const timer = setInterval(() => {
        that.onScroll();
        if (!that.animating) {
          clearInterval(timer);
        }
      }, 1);
    }
  }
  private setAnimating(val: boolean) {
    this.animating = val;
  }
  private get animator() {
    return this.$refs['color-box'] as HTMLElement;
  }

  @Watch('swipeState')
  private onStateChanged(val: number, oldVal: number) {
    if (val === oldVal) {
      return;
    }
    const scrollPerPage = window.innerHeight;
    // let refSize = (this.$refs["color-box"] as Element);
    const skewness = 30;
    let value: number;
    if (this.swipeState < 0.5) {
      value = lerp(0, 30, this.swipeState * 2);
    } else {
      value = lerp(30, 0, this.swipeState * 2 - 1);
    }
    const path =
      'polygon(0 ' +
      value +
      '%, 100% 0%, 100% ' +
      (100 - value) +
      '%, 0% 100%)';
    // console.log(path)
    // this.animator.style['clip-path'] = path;
    this.animator.setAttribute('clip-path', path);
    this.animator.style.top =
      scrollPerPage - 2 * this.swipeState * scrollPerPage + 'px';
  }
  private onScroll() {
    const scrollPerPage = window.innerHeight;
    this.swipeState = -this.swiper.getTranslate() / scrollPerPage;
    this.swipeState = this.swipeState - Math.floor(this.swipeState);
  }
  private async loadRepos() {
    this.repos = await getRepos();
  }
  private mounted() {
    this.loadRepos();
  }
}
</script>
