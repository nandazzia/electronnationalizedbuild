<template>
  <div
    class="app-wrapper">
    <Navbar />
    <AppMain />
  </div>
</template>

<script>
import { Navbar, AppMain } from './components'
export default {
  name: 'Layout',
  components: {
    Navbar,
    AppMain
  },
  data: () => ({

  })
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

    .app-wrapper {
        position: relative;
        height: 100vh;
        width: 100vw;
        background-size: 100vw 100vh;
        background-repeat: no-repeat;
    }
</style>
