<template lang="pug">
  .page()
    component(:is="component" :data="pageComponentData.data")
</template>

<style lang="sass" scoped>
.page
  position: relative
  height: 100%
  width: 100%
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import colors from '@/api/colors';
import { randomInteger } from '@/api/scripts';
import { PageView, RepoView } from '../api/entries';

import {PageComponent} from '@/structure/structure';
import Def from './pages/default.vue';

@Component({
})
export default class ProjectPage extends Vue {
    @Prop() private pageComponentData: PageComponent | undefined;
    private component = Def;

    private async loadComponent(){
        this.component = (await import('./pages/' + this.pageComponentData!.componentPath)).default;
    }

    private mounted() {
        this.loadComponent();
    }
}
</script>