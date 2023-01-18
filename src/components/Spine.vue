<template>
  <div class="Amiya" style="left: 0;">
    <canvas :class="{'reverse': reverse}" ref="canvas" width="500" height="500"></canvas>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, getCurrentInstance } from 'vue';
import { Spine, Skeleton } from './spine_runtime/spine'
import spine from './spine_runtime/spine-webgl';

export default {
  props: {
    fileName: String
  },
  setup(props) {
    const canvas = ref(null)
    const reverse = ref(false)
    const cns = getCurrentInstance()
    const debounce = cns.appContext.config.globalProperties.$debounce
    const throttle = cns.appContext.config.globalProperties.$throttle

    onMounted(() => {
      let canvasElement: HTMLCanvasElement = canvas.value
      let amiya = {
        element: canvasElement.parentElement,
        direction: 1,
        lambda: 7500,
        plan: null,
        state: null,
        waitForStart: null,
        getEnd() {
          let alpha = 0.5 * Math.random() + 0.5
          let m = parseFloat(this.element.offsetLeft)
          if (this.direction == -1) return Math.round(alpha * m)
          else {
            let n = document.body.clientWidth - this.element.offsetWidth
            return Math.round(alpha * (n - m))
          }
        },
        show() { 
          this.element.style.opacity = "1"
          this.start()
        },
        start() {
          this.state.setAnimation(0, "Move", true)
          this.element.style.left = parseFloat(this.element.style.left) + this.direction * this.lambda + "px"
          this.plan = setTimeout(() => this.reverse(), this.getEnd() / this.lambda * 100 * 1000)
        },
        stop(Ani: string, loop: boolean = false) {
          if (this.plan) {
            clearTimeout(this.plan)
            this.plan = null
          }
          this.state.setAnimation(0, Ani, loop)
          this.element.style.left = parseFloat(this.element.offsetLeft) + "px"
          if (Ani == "Interact") {
            setTimeout(() => this.state.setAnimation(0, "Relax", true), 1000)
            this.waitForStart()
          }
        },
        reverse() {
          this.stop("Relax", true)
          this.direction *= -1
          setTimeout(() => reverse.value = !reverse.value, 1000) // Relax 1000ms
          // rotateY 500ms
          let alpha = 1 + Math.max(-1, Math.floor((Math.random() - 0.6) / 0.2))
          // 0  0.59 0.6 0.61 0.79 0.8 0.81
          // -3 -0.. 0   0..  0.9. 1   1..
          let stay = [-1000, 13366, 3000][alpha]
          let Ani = [null, "Special", "Sleep"][alpha]
          setTimeout(() => { if (Ani) this.state.setAnimation(0, Ani, false) }, 2500)
          setTimeout(() => this.state.setAnimation(0, "Relax", false), stay + 2500)
          setTimeout(() => this.start(), stay + 1000 + 2500) // Relax 2500 - 1000 - 500 = 1000ms
        }
      }

      new Spine(canvasElement).load("Amiya", props.fileName+".skel", props.fileName+".atlas", { x: -280, y: -5, scale: 1 }, "default", true).then(
        (skeleton: Skeleton) => {
          skeleton.state.data.skeletonData.animations.forEach(
            (animation: spine.Animation) => {
              // console.log(animation);
            }
          )

          amiya.state = skeleton.state
          amiya.waitForStart = debounce(() => amiya.start(), 2000),       
          canvasElement.onclick = throttle(() => amiya.stop("Interact"), 1000)
          amiya.show()
        }
      )
    })

    return { canvas, reverse }
  }
}
</script>

<style scoped>
.Amiya {
  position: fixed;
  top: 100%;
  transform: translateY(-100%);
  width: 150px;
  height: 150px;
  margin: auto;
  opacity: 0;
  transition: opacity 0.3s, left 100s linear;
  z-index: 80;
}

.reverse {
  transform:rotateY(180deg);
}

canvas {
  zoom: 0.3;
  transition: all 0.5s;
}
</style>