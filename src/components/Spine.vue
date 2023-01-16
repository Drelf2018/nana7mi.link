<template>
  <div class="Amiya">
    <canvas ref="canvas" width="250" height="250"></canvas>
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
    const cns = getCurrentInstance()
    const debounce = cns.appContext.config.globalProperties.$debounce
    const throttle = cns.appContext.config.globalProperties.$throttle


    onMounted(() => {
      let canvasElement: HTMLCanvasElement = canvas.value
      new Spine(canvasElement).load("Amiya", props.fileName+".skel", props.fileName+".atlas", { x: -260, y: -35, scale: 2 }, "default", true).then(
        (skeleton: Skeleton) => {
          skeleton.state.data.skeletonData.animations.forEach(
            (animation: spine.Animation) => {
              console.log(animation);
            }
          )
          skeleton.state.addAnimation(0, "Move", true, 0)
          const move: Function = debounce(() => skeleton.state.setAnimation(0, "Move", true))
          canvasElement.parentElement.style.opacity = "1"
          canvasElement.onclick = throttle(() => {
            skeleton.state.setAnimation(0, "Interact", false)
            move()
          }, 1000)
        }
      )
    })

    return { canvas }
  }
}
</script>

<style scoped>
.Amiya {
  position: relative;
  width: 250px;
  height: 250px;
  margin: auto;
  opacity: 0;
  transition: opacity 0.3s;
}
</style>