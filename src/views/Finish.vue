<template>
  <div>
      <div class="title">Congratulations!</div>
      <div class="message">
        {{ msg }}
      </div>
      <button class="paginationButton bColorRev left">Fine-tune</button>
      <button class="paginationButton bColorRegular">Finish</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { getSatteName } from "../store/satellite";

@Component({
  components: {}
})
export default class Finish extends Vue {
  private msg: string;
  constructor() {
    super();
    console.log("Finish vue: constructor: created");
  }

  created() {
    this.msg = `Now you know exactly where ${
      this.satteName
    } lives. You should visit!
        But seriously, just point your antenna at the same place in the sky, and you're all set.
        If you like, you can tap "Fine-Tune" for some advanced adjustment options.
        Otherwise, welcome to SatteFi™.`;
  }

  private get satteName() {
    return getSatteName();
  }
}
</script>

<style scoped lang="less">
@import "../css/common.less";

.message {
  font-size: 25px;
  margin: 20px;
}

.left {
  left: 0px;
}
</style>
