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
  private transitionName = 'slide-left';
  constructor() {
    super();
    console.log("Welcome vue: constructor: created");
  }

  public beforeRouteUpdate (to:any, from:any, next:any) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    next()
  }

}
</script>

<style lang="less">
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
