<template lang="pug">
  .row.fill-height.middle-xs.center-xs
    h1 {{data.name}}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Repo extends Vue {
  @Prop()
  private data: any;
}
</script>
