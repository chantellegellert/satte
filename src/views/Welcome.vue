<template>
  <div>
    <div class="title">SatteFi™</div>
    <div class="message">
      {{ msg }}
    </div>
    <router-link to="/locate">
      <button class="paginationButton bColorRegular">Start</button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Welcome extends Vue {
  private msg = `You're just moments away from crystal-clear phone calls and all-you-can-type messaging! Let's get your antenna set up.`;
  constructor() {
    super();
    console.log("Welcome vue: constructor: created");
  }
}
</script>

<style scoped lang="less">
@import "../css/common.less";

.title {
  font-size: 35px;
  padding-top: 55px;
}

.message {
  font-size: 25px;
  padding-top: 25px;
  width: calc(100% - 60px);
}
</style>
