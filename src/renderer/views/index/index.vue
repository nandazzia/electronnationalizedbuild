<template>
  <div class="app-wrapper">
    <p>index</p>
  </div>
</template>

<script>
import os from 'os'
export default {
  name: 'IndexPage',
  data() {
    return {

    }
  },
  created() {

  },
  methods: {

    getDefaultData() {
      const equipmentId = localStorage.getItem('equipmentId')
      const computerUsername = os.hostname()
      const networkInterfaces = os.networkInterfaces()
      let macAddress, terminalIp, subnetMask
      for (const i in networkInterfaces) {
        for (const j in networkInterfaces[i]) {
          if (networkInterfaces[i][j]['family'] === 'IPv4' && networkInterfaces[i][j]['mac'] !== '00:00:00:00:00:00' && networkInterfaces[i][j]['address'] !== '127.0.0.1') {
            macAddress = networkInterfaces[i][j]['mac']
            terminalIp = networkInterfaces[i][j]['address']
            subnetMask = networkInterfaces[i][j]['netmask']
          }
        }
      }
      return {
        id: equipmentId,
        computerUsername,
        macAddress,
        terminalIp,
        subnetMask,
        facilityType: '1'
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  background-size: 100vw 100vh;
  background-repeat: no-repeat;
  .content {
    padding-top: 14vh;
  }
}
</style>
