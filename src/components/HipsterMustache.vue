<template>
  <div>
    <div class="hipster-modal">
      <Hipster class="hipster" />
      <div class="mustache" :style="{transform:'translateY(' + moveStash.toString() + 'px)'}">
        <Mustache :class="howClose" />
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

  constructor() {
    super();
    console.log("HipsterMustache vue: constructor: created");
  }

  created() {
    // where are you currently holding the phone?
    this.myYpos = this.fakeYaxisDegree();
    this.getYaxisDegree();
    // want to get actual phone position which will be faked
    this.stashInterval = setInterval(() => {
      this.getYaxisDegree();
    }, 1000);
  }

  public destroyed() {
    clearInterval(this.stashInterval);
  }

  private get satteYaxis() {
    return getSatteYaxis();
  }

  private set satteYaxis(value) {
    setSatteYaxis(value);
  }

  private calculateDistanceAway(degree: number) {
    return degree > this.satteYaxis
      ? -(Math.abs(Math.min(degree, Math.max(this.satteYaxis + 15, 90)) - this.satteYaxis) / 15) * 110
      : Math.abs(Math.max(degree, Math.max(this.satteYaxis - 15, 0)) - this.satteYaxis) / 15 * 110;
  }

  public getYaxisDegree() {
    // assumes only returns positive numbers
    let degree = this.fakeYaxisDegree();
    this.myYpos = degree;
    this.moveStash = this.calculateDistanceAway(this.myYpos);

    this.howClose = this.inRange();
    this.setStashAlign();
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

  // keeps going until perfect note you don't have to
  // in order to be in range, also this is where phone Y axis
  // if will just return as is
  public fakeYaxisDegree() {
    // this.myYpos < 0 is for faking purposes you just pass back the phone Y axis
    if (this.myYpos === null || this.myYpos < 0) {
      // you can never have a negative number in this example
      return Math.random() * ((this.satteYaxis + 15) - Math.max(this.satteYaxis - 15, 0) + 1) + Math.max(this.satteYaxis - 15, 0);
    } else if (
      this.myYpos >= this.satteYaxis - 1 &&
      this.myYpos <= this.satteYaxis + 1
    ) {
      // if in range fake the user stopped moving phone
      return this.satteYaxis;
    } else if (this.myYpos > this.satteYaxis) {
      return this.myYpos - 1;
    } else {
      // has to be less if not more or in range
      return this.myYpos + 1;
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
