<template lang="pug">
.container
  vue-scroll-snap.scroll(v-scroll="onScroll"  ref="scroll-area")
    Page(v-for="(repo, i) in repos" :ref="'page-' + i" :key="repo.fullname" :repo="repo")
  .color-box(ref="color-box")
</template>


<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import Rest from "@octokit/rest";
import { getRepos } from "../api/gh";
import VueScrollSnap from "vue-scroll-snap";
import Page from "@/components/ProjectPage.vue";

function lerp(start: number, end: number, amt: number) {
  return (1 - amt) * start + amt * end;
}

enum Direction {
  up,
  down,
  none
}

@Component({
  components: {
    Page,
    VueScrollSnap
  }
})
export default class Home extends Vue {
  //   @Prop() private msg!: string;
  private repos = [];
  private scrollPerPage = 0;
  private scrollTop = 0;
  private direction: Direction = Direction.none;
  get state() {
    if (this.scrollPerPage === 0) {
      return 0;
    }
    let value = this.scrollTop / this.scrollPerPage;
    value = value - Math.floor(value);
    return value;
  }
  @Watch("scrollTop")
  onScrollChanged(val: number, oldVal: number) {
    let delta = oldVal - val;
    if (this.state === 1 || this.state === 0) {
      this.direction = Direction.none;
      return;
    }
    this.direction =
      delta < 0 ? Direction.down : delta > 0 ? Direction.up : Direction.none;
  }
  public snap() {
    const scrollArea = (this.$refs["scroll-area"] as Vue).$el;
    switch (this.direction) {
      case Direction.up:
        if (this.current === 0) {
          return;
        }
        scrollArea.scrollTo(
          0,
          lerp(this.scrollTop, (this.current - 1) * this.scrollPerPage, 0.5)
        );
        this.direction = Direction.none;
        break;
      case Direction.down:
        if (this.current === this.repos.length - 1) {
          return;
        }
        scrollArea.scrollTo(
          0,
          lerp(this.scrollTop, (this.current - 1) * this.scrollPerPage, 0.5)
        );
        // scrollArea.scrollTo(0, (this.current + 1) * this.scrollPerPage);
        this.direction = Direction.none;
        break;
      default:
        return;
    }
  }
  get current() {
    let value = (this.scrollTop + this.scrollPerPage / 2) / this.scrollPerPage;
    return Math.floor(value);
  }
  private async loadRepos() {
    this.repos = await getRepos();
  }
  private updateSize() {
    this.scrollPerPage = window.innerHeight;
  }
  private onScroll(
    e: any,
    position: { scrollTop: number; scrollLeft: number }
  ) {
    this.scrollTop = position.scrollTop;
    this.$refs["color-box"].style.top =
      this.scrollPerPage - 2 * this.state * this.scrollPerPage + "px";
    // -(this.state * this.scrollPerPage * 2 - this.scrollPerPage) +
    // this.scrollTop +
    // "px";
  }
  private mounted() {
    this.loadRepos();
    this.updateSize();
    window.addEventListener("resize", this.updateSize);
    setInterval(this.snap, 500);
  }
}
</script>

<style lang="sass">
.container
  overflow: hidden
  height: 100%
.scroll
  overflow-y: scroll
  height: 100%
.color-box
  position: absolute

  height: 100vh
  width: 100vw
  left: 0
  background: white
</style>
