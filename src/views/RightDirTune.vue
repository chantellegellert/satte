<template>
  <div>
    <div class="title">Pointing in the right direction</div>
    <div class="message">
      <!-- Unsure how to make this in string without breaking string up -->
      The <b>minute hand</b> is where you're pointing
    </div>

    <Clock :useStatic="-1" @alignment="setAlignment" />

    <div class="message">
        The 
        <span class="purple"><b>hour hand</b></span> 
        is {{ satteName }}
    </div>

    <router-link to="/updirinstruct" v-if="alignment ==='perfect'">
      <button class="paginationButton bColorRegular">Next</button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";
import { getSatteName } from "../store/satellite";

import Clock from "../components/Clock.vue";

@Component({
  components: {
    Clock
  }
})
export default class RightDirTune extends Vue {
  public alignment: string = "";
  constructor() {
    super();
    console.log("RightDirTune vue: constructor: created");
  }

  public get satteName() {
    return getSatteName();
  }

  setAlignment(value: string) {
    this.alignment = value;
  }
}
</script>

<style scoped lang="less">
@import "../css/colors.less";
@import "../css/common.less";

.purple {
  color: @sattePurple;
}
</style>
