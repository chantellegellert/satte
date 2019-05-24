<template>
  <div>
    <div class="clock">
      <!-- Can't figure out editing size -->
      <ClockFace :class="howClose" class="clock-face"/>
      <ClockSpoke :class="howClose" class="clock-spoke"/>

      <div class="clock-donutHole"></div>
      <HourHand
        class="clock-hour"
        :style="{transform:'rotatez(' + clockPos.toString() + 'deg)' + 'translateY(10px)'}"
      />
      <MinuteHand class="clock-minute"/>
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
    window.addEventListener("deviceorientation", this.handleOrientation, true);
  }

  public handleOrientation(event: any) {
    console.log("handleOrientation");
    var alpha = event.alpha; // absolute, alpha, beta, gamma
    let relative = this.calculateDistanceAway(alpha);
    this.clockPos = relative - this.satteZaxis;

    this.howClose = this.inRange();
    this.setAlignment();
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
    // TODO: get what top is intially and base rest on that
    let newDeg = 0;
    if (degree < 264) return -(degree - 264);

    if (degree >= 264) return 360 - (degree - 264);

    return 0;
  }

  @Emit("alignment")
  setAlignment() {
    console.log("Clock vue: setAlignment: howClose: ", this.howClose);
    return this.howClose;
  }

  public inRange() {
    // if in range this perfect, in range is within 15 degree
    if (
      this.clockPos % 360 >= 345 ||
      (this.clockPos % 360 >= -15 && this.clockPos % 360 <= 0) ||
      (this.clockPos % 360 <= 15 && this.clockPos >= 0)
    ) {
      return "perfect";
    } else if (
      this.clockPos % 360 >= 315 ||
      (this.clockPos % 360 >= -45 && this.clockPos % 360 < -15) ||
      (this.clockPos % 360 <= 45 && this.clockPos > 15)
    ) {
      // close enough is within 45 degree
      return "close";
    } else {
      return "far";
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
