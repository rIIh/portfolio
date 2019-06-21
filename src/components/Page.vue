<template lang="pug">
  .page(:style="{background: theme.a200}")
    .page-content.page-top-left(:style="{background: theme.a400}")
      slot(name="title")
    .page-content.page-top-right(:style="{background: theme.a400}")
      slot(name="tags")
    .page-content.page-main(:style="{background: theme.a400}")
      slot
</template>

<style lang="sass" scoped>
.page
  position: relative
  height: 100%
  width: 100%
  &.dark
    *
      color: white
  &.light
    * 
      color: black

.page-content
  position: absolute
  margin: 32px
  *
    display: inline
    padding: 0 8px
  &.page-top-left
    left: 0
  &.page-top-right
    right: 0
  &.page-main
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    margin: 0
    width: 100%
    height: 80%
    background: grey

</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import colors from "@/api/colors";
import { randomInteger } from "@/api/scripts";

@Component
export default class ProjectPage extends Vue {
  //   @Prop() private msg!: string;
  @Prop() public repo: any | null;
  private themeIndex: number = 0;

  private get theme() {
    return colors[this.themeIndex];
  }
  get getRepo() {
    return this.repo
      ? this.repo
      : {
          url: "#",
          name: "test"
        };
  }
  mounted() {
    this.themeIndex = randomInteger(0, colors.length - 1);
    // this.background = _.size()
  }
}
</script>