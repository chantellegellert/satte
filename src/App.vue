<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>


</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "./css/colors.less";


.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}


#app {
  position: relative;
  max-width: 480px;
  min-width: 320px;
  width: calc(100vw - 10px); // 10 for margin
  height: calc(100vh - 10px); // 10 for margin
  margin: auto;
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #e9e9e9;
  background-color: #4a90e2;
}
</style>
