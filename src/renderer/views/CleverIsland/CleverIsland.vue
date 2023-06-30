<template>
  <div class="container">
    <transition name="fade">
      <div
        v-show="flag===1"
        class="tips">
        <div
          class="main-text"
          :style="'background-color:'+bgcColor">
          <p class="message-box">
            <span
              v-if="icon" :style="'color:'+color">
              <i
                v-if="icon==='lock'"
                class="el-icon-lock" />
              <!-- 人物-->
              <i
                v-if="icon==='host'"
                class="el-icon-user" />
              <i
                v-if="icon==='clock'"
                class="el-icon-alarm-clock" />
              <i
                v-if="icon==='success'"
                class="el-icon-circle-check" />
              <i
                v-if="icon==='error'"
                class="el-icon-error" />
              <i
                v-if="icon==='info'"
                class="el-icon-info" />
              <i
                v-if="icon==='loading'"
                class="el-icon-loading" />

            </span>
            <span> {{ message }} </span>
          </p>

        </div>
        <div
          v-if="time&&(methodName==='tongping'||methodName==='touping')"
          :style="'background-color:'+bgcColor"
          class="questTime">
          <p>{{ time }}</p>
        </div>
      </div>
    </transition>

    <div
      v-show="flag===2"
      class="heightBox" />
  </div>

</template>

<script>
import { ipcRenderer } from 'electron'

let closeTime = null
let questTime = null
export default {
  name: 'CleverIsland',
  data() {
    return {
      flag: 1,
      message: '',
      icon: null,
      color: 'rgba(255,255,255,1)',
      bgcColor: 'rgba(0,0,0,0.8)',
      methodName: '',
      time: 0
    }
  },
  beforeCreate() {
    document.querySelector('body').setAttribute('style', 'background-color:transparent')
  },
  created() {
    ipcRenderer.on('initIsland', (e, arg) => {
      clearTimeout(closeTime)
      clearInterval(questTime)
      this.BackInitData()// 恢复出厂设置
      console.log('监听自动关闭式提示框的数据')
      console.log(arg)
      this.message = arg.data
      // 关闭的时间
      if (arg.flag) {
        this.flag = arg.flag
      } else {
        this.flag = 1
      }
      // 图标
      this.icon = arg?.icon || null
      if (arg.color) {
        if (arg.color === 'red') {
          this.color = 'rgba(240,42,42,0.62)'
          //     this.bgcColor = 'rgba(241,98,132,0.62)'
        }
        if (arg.color === 'yellow') {
          this.color = 'rgba(248,248,1,1)'
        //  this.bgcColor = 'rgba(198,193,33,0.97)'
        }
        if (arg.color === 'green') {
          this.color = 'rgba(95,178,241,0.69)'
        //  this.bgcColor = 'rgb(7,125,195)'
        }
      }
      if (arg.method) {
        this.methodName = arg.method
      }
      if (arg.time) {
        this.time = Math.floor(arg.time / 1000)
        questTime = setInterval(() => {
          if (this.time > 0) {
            this.time--
          } else {
            clearInterval(questTime)
          }
        }, 1000)
        closeTime = setTimeout(() => {
          this.flag = 0
          if (questTime) {
            clearInterval(questTime)
          }
          ipcRenderer.send('CleverIsland-hide')
        }, arg.time)
      } else {
        this.time = null
        closeTime = setTimeout(() => {
          this.flag = 0
          if (questTime) {
            clearInterval(questTime)
          }
          ipcRenderer.send('CleverIsland-hide')
        }, 3000)
      }
    })
  },
  beforeDestroy() {
    clearInterval(questTime)
    clearTimeout(closeTime)
    ipcRenderer.removeAllListeners('initTipsAutoData')
  },
  methods: {
    BackInitData() {
      // 恢复出厂设置
      this.icon = null
      this.color = 'rgba(255,255,255,.5)'
      this.methodName = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.tips {
  width: 100vw;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  position: relative;
  overflow: hidden;

  .main-text {
    // 背景色在标签行设置
    padding: 2vw 5vw;
    border-radius: 5vw;
    overflow: hidden;
    display: flex;
    align-items: center;
    .message-box{
      color: #fff;
      font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
      text-align: center;
      font-size: 2.5vw;
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 3vw;
      span{
        margin:0 0.5vw
      }
    }
  }
  .questTime {
    width: 6.5vw;
    height: 6.5vw;
    background-color: rgba(1, 12, 15, 0.64);
    border-radius: 50%;
    border: 2px solid #fff;
    /*padding: 1vw;*/
    margin-left: 4vw;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      color: #fff;
      line-height: 10vw;
      font-size: 22px;
    }
  }

  @keyframes main {
    0% {
      filter: brightness(110%);
      background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6));
    }
    25% {
      filter: brightness(100%);
      background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
    }
    50% {
      filter: brightness(90%);
      background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8));
    }
    75% {
      filter: brightness(100%);
      background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
    }
    100% {
      filter: brightness(110%);
      background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6));
    }
  }
  @keyframes before {
    0% {
      /*transition: 2s ease-in-out;*/
      transform: rotate(-45deg) translate(0, 60px);
    }

    20% {
    }

    50% {
    }

    80% {
    }

    100% {
    }
  }

}

@keyframes IconMove {
  from {
    left: 2%;
  }
  50% {
    left: 95%;
  }
  to {
    left: 2%;
  }
}

/*最左侧的盒子*/
.method-img {
  position: absolute;
  top: 5%;
  left: 2%;
  width: calc(10vw + 2px);
  height: calc(10vw + 2px);
  overflow: hidden;
  animation: IconMove 6s ease-in-out;

  .img-box {
    height: 100%;
    width: 100%;
    padding: 1.8vw 2vw 1.2vw;
    border-radius: 50%;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
{
  opacity: 0
}

</style>
