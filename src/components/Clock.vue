<template>
<div>
    <div class="clock">
    <!-- Can't figure out editing size -->
    <ClockFace :class="howClose" class="clock-face" />
    <ClockSpoke :class="howClose" class="clock-spoke" />

    <div class="clock-donutHole"></div>
    <HourHand class="clock-hour" :style="{transform:'rotatez(' + clockPos.toString() + 'deg)' + 'translateY(10px)'}" />
    <MinuteHand class="clock-minute" />
    <div v-if="howClose === 'perfect'" :class="howClose" class="perfectText">Perfect!</div>

    </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";
import ClockFace from "../static/icons/clock face.svg";
import ClockSpoke from "../static/icons/clock spoke.svg";
import HourHand from "../static/icons/hour hand.svg";
import MinuteHand from "../static/icons/minute hand.svg";

import { setSatteZaxis, getSatteZaxis } from "../store/satellite";

@Component({
  components: {
    ClockFace,
    ClockSpoke,
    HourHand,
    MinuteHand
  }
})
export default class RightDirInstruct extends Vue {
  @Prop() private useStatic!: number;
  private myZpos = -1;
  private clockInterval: any; // is not reactive
  private howClose = "far";
  private clockPos = 0;

  constructor() {
    super();
    console.log("Clock vue: constructor: created");
  }

  created() {
    // if want static image then just pass number to clockPos
    this.clockPos = this.useStatic;
    // if want moving clock pass it -1
    if (this.useStatic < 0) {
      this.getZaxisDegree();
      this.clockInterval = setInterval(() => {
        this.getZaxisDegree();
      }, 1000);
    }
  }

  public destroyed() {
    clearInterval(this.clockInterval);
  }

  private get satteZaxis() {
    return getSatteZaxis();
  }

  private set satteZaxis(value) {
    setSatteZaxis(value);
  }

  private calculateDistanceAway(degree: number) {
    return degree % 360 > this.satteZaxis
      ? 360 - Math.abs(degree % 360 - this.satteZaxis)
      : 0 + Math.abs(degree % 360 - this.satteZaxis);
  }

  public getZaxisDegree() {
    if (this.myZpos != this.satteZaxis) {
      let degree = this.fakeZaxisDegree();
      this.myZpos = degree;
      this.clockPos = this.calculateDistanceAway(this.myZpos);
      this.howClose = this.inRange();
      this.setAlignment();
    }
  }

  @Emit("alignment")
  setAlignment() {
    console.log("Clock vue: setAlignment: howClose: ", this.howClose);
    return this.howClose;
  }

  public inRange() {
    // if in range this perfect, in range is within 15 degree
    if (this.clockPos % 360 >= 345 || this.clockPos % 360 <= 15) {
      return "perfect";
    } else if (this.clockPos % 360 > 315 || this.clockPos % 360 < 45) {
      // close enough is within 45 degree
      return "close";
    } else {
      return "far";
    }
  }

  // assume only get positive coordinates back from 0 - 360
  // phone Z info will just be returned as is this is all faking it
  public fakeZaxisDegree() {
    // return perfect number if in range
    // Note: you are still in range if perfect number not returned
    console.log("Clock vue: fakeZaxisDegree: this.myZpos: ", this.myZpos);
    if (this.myZpos === null || this.myZpos < 0) {
      return Math.random() * (360 - 0 + 1) + 0; // edit this number for different starting positions
    } else if (
      this.myZpos % 360 >= this.satteZaxis - 15 &&
      this.myZpos % 360 <= this.satteZaxis + 15
    ) {
      // if close enough go to perfect
      return this.satteZaxis;
    } else if (
      this.myZpos % 360 > this.satteZaxis &&
      this.myZpos % 360 < this.satteZaxis + 180
    ) {
      // if im closer to right pretend user keeps going right, higher angle
      return this.myZpos - 10;
    } else {
      // if closer to left pretend user keeps going left
      // has to be add if not subtract or in range, lower angle
      return this.myZpos + 10;
    }
  }
}
</script>

<style lang="less" scoped>
@import "../css/colors.less";
@import "../css/common.less";

.perfectText {
  position: absolute;
  bottom: 80px;
  left: 100px;
  font-size: 30px;
  font-weight: bolder;
}

.message {
  overflow-wrap: break-word;
}

.clock {
  width: 300px;
  height: 300px;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  text-align: center;

  .clock-face {
    top: 25px;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    font-size: 14px;
  }

  .clock-donutHole {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 24px;
    height: 24px;
    transform: translate(-50%, -50%);
    border-radius: 100%;
    background-color: @background;
    z-index: 2;
    box-sizing: border-box;
  }

  .clock-spoke {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  .clock-hour,
  .clock-minute {
    width: 12px;
    border-radius: 40px;
    position: absolute;
    left: 48%;
    transform-origin: bottom; // key for rotation
  }

  .clock-minute {
    transform: rotatez(0deg);
    top: 15%;
    height: 35%;
    background-color: #fff;
    transform: translateY(10px);
  }

  .clock-hour {
    top: 25%;
    z-index: 1;
    height: 25%;
    background-color: @sattePurple;
  }
}
</style>
