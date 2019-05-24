<template>
  <div>
    <div class="satteWorld">
      <Spinner v-if="!foundSatellite"></Spinner>
      <World class="world"/>

      <div class="faddedSatellites">
        <Satellite class="topLeft" v-if="!foundSatellite"/>
        <Satellite class="bottomRight" v-if="!foundSatellite"/>
        <Satellite class="bottomLeft" v-if="!foundSatellite"/>
      </div>

      <div :class="foundSatellite ? 'foundSatellite' : 'faddedSatellites'" class="topRight">
        <Satellite />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import World from "../static/icons/world.svg";
import Satellite from "../static/icons/satellite.svg";
import Spinner from "./Spinner.vue";

@Component({
  components: {
    World,
    Satellite,
    Spinner
  }
})
export default class FindSatteImg extends Vue {
  @Prop() private foundSatellite: boolean;

  constructor() {
    super();
    console.log("FindSatteImg vue: constructor: created");
  }
}
</script>

<style scoped lang="less">
.logo {
  display: block;
  text-indent: -9999px;
  width: 100px;
  height: 82px;
  background: url(../static/icons/world.svg);
  background-size: 100px 82px;
  fill: black;
  background-color: black;
}

.loading {
  position: absolute;
  top: 10px;
  right: calc(50% - 32px);
}

.foundSatellite svg path {
  opacity: 1;
}

.faddedSatellites svg path {
  opacity: 0.504092262;
}

.satteWorld {
  height: 300px;
  width: 300px;
  position: relative;
  margin: auto;
  .world {
    position: absolute;
    top: calc(50% - 65px);
    right: calc(50% - 65px);
  }
  .topLeft {
    position: absolute;
    top: 0;
    left: 0;
  }
  .topRight {
    position: absolute;
    top: 0;
    right: 0;
    transform: rotate(90deg);
    transform-origin: 50% 50%;
  }
  .bottomRight {
    position: absolute;
    bottom: 0;
    right: 0;
    transform: rotate(180deg);
    transform-origin: 50% 50%;
  }
  .bottomLeft {
    position: absolute;
    bottom: 0;
    left: 0;
    transform: rotate(270deg);
    transform-origin: 50% 50%;
  }
}
</style>
