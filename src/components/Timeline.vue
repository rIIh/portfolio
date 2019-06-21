<template lang="pug">
  .timeline
    swiper()
      swiper-slide(v-for="slide in getDataSwiper.slides" :key="")
        h1 test
</template>

<style lang="sass">
.timeline
  position: fixed
  top: 0
  left: 0
  width: 150px
  height: 100%
  background: grey
  z-index: 50
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  components: {
  }
})
export default class Home extends Vue {
  @Prop()
  private data: any[] | undefined;



  private get getDataSwiper(){
    if(this.data !== undefined){
      return this.data;
    }
    return {
      slides: []
    }
  }
}
</script>
