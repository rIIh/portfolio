<template lang="pug">
  .background(:style="{height: mousePosition.y * -40 + 140 + '%', width: mousePosition.x * -20 + 120 + '%'}")
</template>

<style lang="scss">
.background {
  position: absolute;
  height: 100%;
  width: 100%;
  background: rgba($color: #ffffff, $alpha: 0.1);
  clip-path: polygon(20% 0, 100% 0, 100% 20%);
}
</style>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

interface Vector{
  x: number;
  y: number;
}

@Component
export default class Background extends Vue {
  private mousePosition: Vector = {
    x: 0, y: 0,
  };
  private updateMousePosition(event: MouseEvent) {
    this.mousePosition = {
      x: event.clientX / window.innerWidth,
      y: event.clientY / window.innerHeight,
    };
  }

  private mounted(){
    window.addEventListener('mousemove', this.updateMousePosition);
  }
  private beforeDestroy(){
    window.removeEventListener('mousemove', this.updateMousePosition);
  }
}
</script>
