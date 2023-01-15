<template>
  <div class="Amiya">
    <canvas ref="canvas" width="250" height="250"></canvas>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { Spine } from './spine_runtime/spine'

export default {
  props: {
    fileName: String
  },
  setup(props) {
    const canvas = ref(null)

    onMounted(() => {
      const spine = new Spine(canvas.value)
      spine.load("Amiya", props.fileName+".skel", props.fileName+".atlas", { x: -260, y: -35, scale: 2 }, "default", true).then(
        sk => {
          spine.play("Amiya")
          sk.state.addAnimation(0, "Move", true)
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
}
</style>