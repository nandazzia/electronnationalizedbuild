<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import os from 'os'
export default {
  created() {
    const systemType = os.type().toLowerCase()
    localStorage.setItem('system', systemType)
  }
}
</script>

<style lang="scss" scoped>
/* CSS */

</style>
