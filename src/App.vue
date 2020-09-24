<template>
  <div id="app" class="g-container">
    <div class="g-view-container">
      <router-view></router-view>
    </div>
    <div class="g-footer-container">
      <c-tabber />
    </div>
  </div>
</template>

<script>
import CTabber from "components/tabber"
export default {
  name: 'App',
  components:{
    CTabber
  }
}
</script>

<style scoped>
</style>
