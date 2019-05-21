<template>
  <div>
    <div class="hipster-modal">
      <Hipster class="hipster"/>
      <div class="mustache" :style="{transform:'translateY(' + moveStash.toString() + 'px)'}">
        <Mustache :class="howClose"/>
      </div>
    </div>
    <img class="perfectHundred" v-if="howClose ==='perfect'" src="../static/100emoji.png">
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from "vue-property-decorator";
import Hipster from "../static/icons/hipster.svg";
import Mustache from "../static/icons/mustache.svg";

import { getSatteYaxis, setSatteYaxis } from "../store/satellite";

@Component({
  components: {
    Hipster,
    Mustache
  }
})
export default class HipsterMustache extends Vue {
  private myYpos = -1;
  private stashInterval: any;
  private howClose = "far";
  private moveStash = 0;
  public output: any;

  constructor() {
    super();
    console.log("HipsterMustache vue: constructor: created");
  }

  created() {
    window.addEventListener("deviceorientation", this.handleOrientation, true);
  }

  private get satteYaxis() {
    return getSatteYaxis();
  }

  private set satteYaxis(value) {
    setSatteYaxis(value);
  }

  public handleOrientation(event: any) {
    console.log("handleOrientation");
    var beta = event.beta;

    let degree = this.calculateDistanceAway(beta);
    this.moveStash = degree;
    this.myYpos = beta;

    this.howClose = this.inRange();
    this.setStashAlign();
  }

  // only need to lift up so 0 to 90 is only valid
  private calculateDistanceAway(degree: number) {
    if (degree > Math.min(this.satteYaxis + 15, 90)) return -110;
    if (degree < Math.max(this.satteYaxis - 15, 0)) return 110;

    return degree > this.satteYaxis
      ? -(
          Math.abs(
            Math.min(degree, Math.max(this.satteYaxis + 15, 90)) -
              this.satteYaxis
          ) / 15
        ) * 110
      : (Math.abs(
          Math.max(degree, Math.max(this.satteYaxis - 15, 0)) - this.satteYaxis
        ) /
          15) *
          110;
  }

  @Emit("stashAlign")
  setStashAlign() {
    console.log(
      "HipsterMustache vue: setStashAlign: howClose: ",
      this.howClose
    );
    return this.howClose;
  }

  // picked -2 +2 good enough, picked -6 +6 close
  public inRange() {
    if (
      this.myYpos > this.satteYaxis - 2 &&
      this.myYpos <= this.satteYaxis + 2
    ) {
      return "perfect";
    } else if (
      this.myYpos > this.satteYaxis - 6 &&
      this.myYpos <= this.satteYaxis + 6
    ) {
      return "close";
    } else {
      return "far";
    }
  }
}
</script>

<style scoped lang="less">
@import "../css/common.less";

.hipster-modal {
  position: relative;
}

.mustache {
  top: 300px; // 110px / 15 degree
  width: 100%;
  z-index: 1;
  position: absolute;
}

.perfectHundred {
  height: 50px;
  width: 50px;
}
</style>
