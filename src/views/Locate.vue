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
import FindSatteImg from "../components/FindSatteImg.vue";
// import orientation from "../assets/Orientation.js";

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

export interface ISatteCoordinates {
  z: number;
  y: number;
}

export interface ISatte {
  name: string;
  coord: ISatteCoordinates;
}

@Component({
  components: {
    FindSatteImg
  }
})
export default class Locate extends Vue {
  private foundSatellite = false;
  private satteliteLoc: { [key: string]: ISatte } = {}; // this will all be in data base
  private msg = "";

  constructor() {
    super();
    console.log("Locate vue: constructor: created");
  }

  created() {
    this.satteliteLoc["kitchener"] = {
      name: "SATTEFI-US-117",
      coord: {
        z: 190.3,
        y: 30
      }
    };

    this.satteliteLoc["austin"] = {
      name: "SATTEFI-US-117",
      coord: {
        z: 211.1,
        y: 30
      }
    };
    this.msg = `We have lots of sattelites. We're looking for a good match...`;

    console.log("Locate vue: created: platform: ", navigator);
    this.platform = navigator.platform;

    console.log("Locate vue: created: satteliteLoc: ", this.satteliteLoc);
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
    this.getSatteNameDB(long, lat)
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

  // I am assuming I do a DB call with the long and lat of where I am at
  // The data base would then come back with the name of satellite I am
  // Looking for and z / y axis of where I need to go
  // This should have its own DB service 
  private async getSatteNameDB(long: number, lat: number) {
    return new Promise<ISatte>((resolve, reject) => {
      setTimeout(() => {
        // Kitchener 190.3, Austin 211.1
        // Kitchener Long: -80.4777 lat: 43.4343
        // Assume Kitchener long is between -80.00 and -81.00
        // Assume Kitchener lat is between 43.00 and 44.00
        // Assume anything else is Austin since only 2 locations to consider
        // Data base would do look up tables based on long and lat better than this
        if (long < -80 && long > -81 && lat > 43 && lat < 44) {
          var selectLoc = this.satteliteLoc["kitchener"];
        } else {
          var selectLoc = this.satteliteLoc["austin"];
        }

        resolve(selectLoc);
      }, 3000); // artificial delay
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
