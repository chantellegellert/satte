<template>
  <div>
    <div class="title">Pointing up</div>

    <HipsterMustache @stashAlign="setStashAlign" />

    <router-link to="/finish" v-if="stashAlign ==='perfect'">
      <button class="paginationButton bColorRegular">Next</button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";
import HipsterMustache from "../components/HipsterMustache.vue";

import { getSatteYaxis, setSatteYaxis } from "../store/satellite";

@Component({
  components: {
    HipsterMustache
  }
})
export default class UpDirTune extends Vue {
  public stashAlign: string = "";
  constructor() {
    super();
    console.log("UpDirTune vue: constructor: created");
  }

  setStashAlign(value: string) {
    this.stashAlign = value;
  }
}
</script>

<style scoped lang="less">
@import "../css/common.less";
.title {
  padding-bottom: 0px;
}
</style>
