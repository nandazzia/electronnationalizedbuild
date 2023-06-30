<template>
  <div class="closeComputer">
    <div class="icon-x"><i
      class="el-icon-switch-button" /></div>
    <div class="text_box">系统将于<span style="color: red">{{ count }}</span> 秒后关机</div>
    <div class="button_box">
      <el-button
        class="cancel theme-cancel-button"
        @click="quitClose">取消关机
      </el-button>
      <el-button
        class="ensure theme-login-button"
        @click="closeComputer">立即关机
      </el-button>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import { platform } from 'os'

const { exec } = require('child_process')
export default {
  name: 'CloseComputer',
  data() {
    return {
      count: 15
    }
  },
  created() {
    const times = setInterval(() => {
      this.count--
      if (this.count <= 0) {
        console.log('倒计时结束')
        clearInterval(times)
        this.closeComputer()
      }
    }, 1000)
  },
  methods: {
    closeComputer() {
      platform().includes('linux') ? exec('poweroff') : exec('shutdown /s /t 0')
    },
    quitClose() {
      ipcRenderer.send('quitClose')
    }
  }
}
</script>

<style scoped lang="scss">
.closeComputer {
  width: 100vw;
  height: 100vh;
}

.icon-x {
  width: 100vw;
  text-align: center;
  padding-top: 10vh;

  i {
    color: #5a5757;
    font-size: 15vw;
    font-weight: 600;
  }
}

.text_box {
  width: 100vw;
  padding: 10vh 0;
  text-align: center;
  font-size: 5vw;
}

.button_box {
  margin: 10vh auto 0;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  .el-button {
    margin: 0 5vw;
  }

}

</style>
