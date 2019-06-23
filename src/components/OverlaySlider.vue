<template lang="pug">
  .overlay-slider(:style='style')
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { lerp } from '@/api/scripts';
import { stat } from 'fs';

@Component({})
export default class Overlay extends Vue {
  @Prop({required: true})
  private getter: any;
  private state = this.getter;

  private get getState(){
    if (this.state === null) { return 0; }
    return this.state();
  }

  private get style() {
    let value: number;
    const scrollPerPage = window.innerHeight;
    if (this.getState < 0.5) {
      value = lerp(0, 30, this.getState * 2);
    } else {
      value = lerp(30, 0, this.getState * 2 - 1);
    }
    const path =
      'polygon(0 ' +
      value +
      '%, 100% 0%, 100% ' +
      (100 - value) +
      '%, 0% 100%)';
    return {
      'top': scrollPerPage - 2 * this.getState * scrollPerPage + 'px',
      'clip-path': path,
    };
  }
}
</script>


<style lang="sass">
.overlay-slider
  position: absolute
  width: 100vw
  height: 100vh
  left: 0
  z-index: 100
  background: white
</style>
