<template>
  <div class="Amiya">
    <canvas ref="canvas" width="800" height="500"></canvas>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import visibility from 'vue-visibility-change'

import { Spine } from './spine_runtime/spine'
import spine from './spine_runtime/spine-webgl'

import { throttle, debounce } from './tool'

interface ani {
  name: string
  time: number
  loop: boolean
}

class Amiya {
  plan: NodeJS.Timeout = null
  element: HTMLElement = null
  canvas: HTMLCanvasElement = null
  state: spine.AnimationState = null
  lambda: number = 7500
  direction: number = Math.random() >= 0.5 ? 1 : -1
  waitForStart: Function = debounce(() => this.start(), 2000)
  animations: ani[] = [
    null,
    { name: "Sleep", time: 6000, loop: true },
    { name: "Special", time: 13366, loop: false },
    { name: "Interact", time: 1000, loop: false }
  ]
  constructor (canvas: HTMLCanvasElement, state: spine.AnimationState) {
    this.state = state
    state.data.skeletonData.animations.forEach(ani => {
      if (ani.name == "Special") this.animations[2].time = Math.floor(1000 * ani.duration)
      if (ani.name == "Interact") this.animations[3].time = Math.floor(1000 * ani.duration)
    })

    this.canvas = canvas
    this.canvas.className = this.direction == -1 ? "reverse" : ""
    
    this.element = canvas.parentElement
    this.element.style.left = (document.body.clientWidth - this.element.offsetWidth) * Math.random() + "px"
    this.element.style.opacity = "1"
    this.element.onclick = throttle(() => this.stop("Interact"), 1000)
    
    this.stop("Relax", true)
    setTimeout(this.waitForStart, 8000 * Math.random())
    
    visibility.change((evt: any, hidden: boolean) => hidden ? this.stop("Relax", true) : this.start())
  }
  getEnd() {
    let alpha = 0.5 * Math.random() + 0.5 // [0.5, 1)
    let m = this.element.offsetLeft
    if (this.direction == -1)
      return Math.round(alpha * m)
    else {
      let n = document.body.clientWidth - this.element.offsetWidth
      return Math.round(alpha * (n - m))
    }
  }
  start() {
    if (!this.plan) {
      this.state.setAnimation(0, "Move", true)
      this.element.style.left = parseFloat(this.element.style.left) + this.direction * this.lambda + "px"
      this.plan = setTimeout(() => this.reverse(), this.getEnd() / this.lambda * 100 * 1000)
    }
  }
  stop(Ani: string, loop: boolean = false) {
    if (this.plan) {
      clearTimeout(this.plan)
      this.plan = null
    }
    this.state.setAnimation(0, Ani, loop)
    this.element.style.left = this.element.offsetLeft + "px"
    if (Ani == "Interact") {
      setTimeout(() => this.state.setAnimation(0, "Relax", true), this.animations[3].time)
      this.waitForStart()
    }
  }
  reverse(p0: number = 0.6) {
    this.stop("Relax", true)
    this.plan = setTimeout(() => {
      this.direction *= -1
      this.canvas.className = this.direction == -1 ? "reverse" : ""
      let alpha = 1 + Math.max(-1, Math.floor((Math.random() - p0) * 2 / (1-p0)))
      let Ani = this.animations[alpha]
      this.plan = setTimeout(() => { 
        if (Ani) {
          this.state.setAnimation(0, Ani.name, Ani.loop)
          this.plan = setTimeout(() => {
            this.state.setAnimation(0, "Relax", false)
            this.plan = setTimeout(() => {
              clearTimeout(this.plan)
              this.plan = null
              this.start()
            }, 1000)
          }, Ani.time)
        }
        else {
          clearTimeout(this.plan)
          this.plan = null
          this.start()
        }
      }, 1500)
    }, 1000)
  }
}

export default {
  props: {
    fileName: String,
    x: {
      type: String,
      default: "-380"
    },
    y: {
      type: String,
      default: "-7"
    }
  },
  setup(props) {
    const canvas = ref(null)

    onMounted(() => {
      new Spine(canvas.value).load(
        props.fileName,
        props.fileName+".skel",
        props.fileName+".atlas",
        { x: parseInt(props.x), y: parseInt(props.y), scale: 1 },
        "default",
        true
      ).then(skeleton => new Amiya(canvas.value, skeleton.state))
    })

    return { canvas } 
  }
}
</script>

<style scoped>
.Amiya {
  position: fixed;
  top: 100%;
  transform: translateY(-100%);
  width: 240px;
  height: 150px;
  margin: auto;
  opacity: 0;
  transition: opacity 0.5s ease 0.5s, left 100s linear;
  z-index: 80;
}

.reverse {
  transform: rotateY(180deg);
}

canvas {
  zoom: 0.3;
  transition: all 0.5s;
}
</style>