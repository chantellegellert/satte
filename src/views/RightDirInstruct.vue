<template>
  <div>
    <div class="title">Pointing in the right direction</div>
    <div class="message">
      {{ msg }}
    </div>

    <ClockMini :useStatic="45" />
    
    <router-link to="/rightdirtune">
      <button class="paginationButton bColorRegular">Next</button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ClockMini from "@/components/ClockMini.vue";

@Component({
  components: {
    ClockMini
  }
})
export default class RightDirInstruct extends Vue {
  private msg = `Stand with your phone in your hand, arm extended, 
    screen facing up, and rotate on your feet until the two clock hands 
    on the next screen are midnight.`;
  constructor() {
    super();
    console.log("Right Dir Instruct vue: constructor: created");
  }
}
</script>

<style lang="scss" scoped>
@import "../css/common.less";
</style>
