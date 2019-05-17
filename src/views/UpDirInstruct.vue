<template>
  <div>
    <div class="title">Pointing up</div>
    <div class="body-modal">
      <Hipster class="hipster" />
      <div class="message">
        {{ msg }}
      </div>
    </div>
    <router-link to="/updirtune">
      <button class="paginationButton bColorRegular">Next</button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Hipster from "../static/icons/hipster.svg";

import { getSatteYaxis, setSatteYaxis } from "../store/satellite";

@Component({
  components: {
    Hipster
  }
})
export default class UpDirInstruct extends Vue {
  private msg = `Now we ask, "How high?" You need to point 
    ${this.satteYaxis.toString()}° up from the ground. We don\'t know what that means, either, but with your arm out, 
    like before, raise and lower it until the handlebar mustache fits`;

  constructor() {
    super();
    console.log("UpDirInstruct vue: constructor: created");
  }

  private get satteYaxis() {
    return getSatteYaxis();
  }
}
</script>

<style scoped lang="less">
@import "../css/common.less";
.message {
  font-size: 25px;
  top: 35px;
  position: absolute;
  padding: 15px;
}

.hipster {
  opacity: 0.2;
}

.body-modal {
  position: relative;
  margin: auto;
  width: calc(100vw - 10px);
  max-width: 480px;
}

.title {
  padding-bottom: 0px;
}
</style>
