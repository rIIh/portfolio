<template lang="pug">
  .timeline
    swiper(:options="options")
      swiper-slide(v-for="slide in entries" :key="")
        h1 test
</template>

<style lang="sass">
.timeline
  position: fixed
  top: 0
  left: 0
  width: 150px
  height: 100%
  z-index: 50
  *
    height: 100%
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";


@Component({
    components: {}
})
export default class Home extends Vue {
    @Prop()
    private data: any[] | undefined;
    @Prop()
    private entries: entry[] | undefined;

    private options = {
        direction: "vertical",
        resistanse: false,
        mousewheel: true,
        observer: true,
        speed: 600,
        slidesPerView: 4
    };

    private get getDataSwiper() {
        if (this.data !== undefined) {
            return this.data;
        }
        return {
            slides: []
        };
    }
}
</script>
