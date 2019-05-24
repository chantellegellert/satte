<template>
  <div>
    <div class="title">Finding You're Sattelite</div>
    <div class="message">{{ msg }}</div>

    <FindSatteImg :foundSatellite="foundSatellite"/>

    <router-link to="/rightdirinstruct" v-if="foundSatellite">
      <button class="paginationButton bColorRegular">Next</button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { dataService } from "../services/dataService";
import FindSatteImg from "../components/FindSatteImg.vue";

import {
  getSatteName,
  setSatteName,
  getSatteZaxis,
  setSatteZaxis,
  getSatteYaxis,
  setSatteYaxis,
  getPlatform,
  setPlatform
} from "../store/satellite";

@Component({
  components: {
    FindSatteImg
  }
})
export default class Locate extends Vue {
  private foundSatellite = false;
  private msg = "";

  constructor() {
    super();
    console.log("Locate vue: constructor: created");
  }

  created() {
    this.msg = `We have lots of sattelites. We're looking for a good match...`;

    console.log("Locate vue: created: platform: ", navigator);
    this.platform = navigator.platform;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.sendToDB(position.coords.longitude, position.coords.latitude);
        },
        error => {
          alert(`Error: ${error.message}`);
          console.log(error.message);
          this.sendToDB(190.3, 30);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000
        }
      );
    } else {
      console.log(`Geolocation is not supported by this browser.`);
    }
  }

  private get satteName() {
    return getSatteName();
  }

  private set satteName(name: string) {
    setSatteName(name);
  }

  private get satteZaxis() {
    return getSatteZaxis();
  }

  private set satteZaxis(zaxis: number) {
    setSatteZaxis(zaxis);
  }

  private get satteYaxis() {
    return getSatteYaxis();
  }

  private set satteYaxis(yAxis: number) {
    setSatteYaxis(yAxis);
  }

  private get platform() {
    return getPlatform();
  }

  private set platform(platform: string) {
    setPlatform(platform);
  }

  private sendToDB(long: number, lat: number) {
    // This would be a service call but no DB
    dataService
      .getSatteNameDB(long, lat)
      .then(res => {
        console.log("Locate vue: sendToDB: DB res: ", res);
        this.foundSatellite = true;

        this.satteName = res.name;
        this.satteZaxis = res.coord.z;
        this.satteYaxis = res.coord.y;

        this.msg = `We've found the best satellite for you at your current location. Say 'hello' to your new best friend, ${
          this.satteName
        }.`;
      })
      .catch(err => {
        console.log("Locate vue: sendToDB: error ", err);
      });
  }
}
</script>

<style scoped lang="less">
@import "../css/common.less";

.message {
  height: 60px;
  font-size: 20px;
}
</style>
