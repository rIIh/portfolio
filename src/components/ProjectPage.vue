<template lang="pug">
  .page(:style="{background: theme.a200}" :class="textColor")
    .page-content.page-label(:style="{background: theme.a400}")
      h1 {{format(getRepo.name)}}
    .page-content.page-stars(:style="{background: theme.a400}")
      v-icon(name="star" scale="1.5" label="tes")
      h1 {{getRepo.stargazers_count}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import _ from "lodash";
import colors from "@/api/colors";
import { randomInteger, idealTextColor } from '@/api/scripts'


@Component
export default class ProjectPage extends Vue {
  //   @Prop() private msg!: string;
  @Prop() public repo: any | null;
  public textColor: string = "dark";
  private themeIndex: number = 0;

  private get theme() {
    return colors[this.themeIndex];
  }
  public format(target: string) {
    return _.startCase(target);
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
    this.textColor = idealTextColor(this.theme.a100);
    // this.background = _.size()
  }
}
</script>

<style lang="sass">
.page
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
  &.page-label
    left: 0
  &.page-stars
    right: 0

</style>


