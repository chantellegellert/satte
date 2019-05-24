<template>
  <div>
    <div class="clock">
      <!-- height than width -->
      <ClockFace viewBox="0 0 20 249" height="75" class="clock-face"/>
      <ClockSpoke viewBox="0 0 50 47" height="10" class="clock-spoke"/>

      <HourHand
        viewBox="0 0 50 12"
        height="30"
        class="clock-hour"
        :style="{transform:'rotatez(' + clockPos.toString() + 'deg)' + 'translateY(11px)'}"
      />
      <MinuteHand viewBox="0 0 50 13" height="40" class="clock-minute"/>
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
export default class ClockMini extends Vue {
  @Prop() private useStatic!: number;
  private clockPos = 0;

  constructor() {
    super();
    console.log("Clock vue: constructor: created");
  }

  created() {
    this.clockPos = this.useStatic;
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
  width: 249px;
  height: 75px;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  left: -38px;

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
    right: 42px;
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  .clock-minute {
    position: absolute;
    right: 78px;
    transform: translateY(-5px);
  }

  .clock-hour {
    position: absolute;
    top: 30px;
    right: 88px;
    width: 2px;
    background: @sattePurple;
    z-index: 1;
    height: 12px;
  }
}
</style>
