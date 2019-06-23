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
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import colors from "@/api/colors";
import { randomInteger } from "@/api/scripts";
import { PageView, RepoView } from "../api/entries";

@Component
export default class ProjectPage extends Vue {
    //   @Prop() private msg!: string;
    @Prop() public repo: any | null;

    @Prop() private data: PageView | RepoView | undefined;
    private themeIndex: number = 0;

    private loadTemplate() {
      if(this.data typeof RepoView){

      }
    }

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
    private mounted() {
        this.themeIndex = randomInteger(0, colors.length - 1);
        this.loadTemplate();
    }
}
</script>