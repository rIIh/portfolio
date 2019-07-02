<template lang="pug">
  .timeline(:style="{width: syncedWidth + 'px'}")
    swiper(:options="options" ref="timeline")
      swiper-slide(v-for="(slide, index) in entries" :key="" :class="dataActiveIndex === index ? 'slide-active' : ''")
        .breaker.up(v-show="slide.breaker === 1")
        //- .timeline-item()
        v-icon.timeline-item(name="regular/circle")
        .breaker(v-show="slide.breaker === 2")
    .timeline-line
</template>

<style lang="scss">
.timeline{
  position: fixed;
  top: 0;
  left: 0;
  width: 50px;
  height: 100%;
  z-index: 50;
  .timeline-line{
    width: 1px;
    height: 100%;
    position: absolute;
    left: 50%;
    top: 0;
    background: white;
  }
  .swiper-container {
    height: 100%;
  }
  .breaker{
    border-bottom: 1px solid white;
    width: 50%;
    left: 50%;
    top: 100%;
    position: absolute;
    transform: translateX(-50%);
    &.up{
      top: 0;
    }
  }
  .timeline-item{
    position: absolute;
    top: 50%;
    // left: 50%;
    transform: translateX(-50%);
    // clip-path: circle(closest-side);
    // width: 75%;
    // background: white;
    color: white;
    background: $background-color;
    transition: 0.25s;
    // height: 100%;
  }
  .timeline-item-label{
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    left: 20%;
  }
  .slide-active .timeline-item {
    color: lightcoral !important;
    * {
      color: lightcoral !important;
    }
  }
  .timeline-item:hover {
    color: lightgoldenrodyellow;
    * {
      color: lightgoldenrodyellow
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch, PropSync } from 'vue-property-decorator';
import { PageView, RepoView } from '../api/entries';
import { setInterval } from 'timers';

@Component({
  components: {},
})
export default class Timeline extends Vue {
  private get timelineSwiper(){
    return (this.$refs.timeline as any).swiper;
  }

  private get dataActiveIndex(){
    return this.syncedSwiperData.activeIndex;
  }

  @PropSync('swiperData')
  private syncedSwiperData: any | undefined;
  @Prop()
  private entries: PageView[] | undefined;
  @PropSync('width')
  private syncedWidth: number | undefined;

  private options = {
    direction: 'vertical',
    resistanse: false,
    mousewheel: true,
    observer: true,
    speed: 100,
    slidesPerView: 5,
    centeredSlides: true,
    freeMode: true,
    slideToClickedSlide: true,
    roundLengths: true,
    centerInsufficientSlides: true,
    preventClicks: false,
    preventClicksPropagation: false,
    on: {
      click: this.onClick,
    }
  };
  private onClick(){
    this.syncedSwiperData.slideTo(this.timelineSwiper.clickedIndex);
  }

  @Watch('syncedSwiperData')
  private onDataChanged(val: any, oldVal: any){
    const that = this;
    val.on('slideChange', () => {
      that.timelineSwiper.slideTo(that.dataActiveIndex, 300, false);
    });
  }
}
</script>