<template>
  <a :href="face.face_href" target="_blank">
    <div ref="pendant" class="pendant" :url="face.pendant != ''" :style="`background-image: url(${face.pendant})`">
      <img :src="face.face_url" :style="`outline-color: ${face.pendant_color}`">
    </div>
  </a>
</template>

<script setup lang="ts">
import { defineProps, PropType, ref, onMounted } from 'vue'
import { faceInfo } from './tool'

const props = defineProps({ size: String, face: Object as PropType<faceInfo> })
const pendant = ref(null)

onMounted(() => {
    console.log(pendant.value, props.size);
    
    pendant.value.style.setProperty("--size", props.size)
})
</script>

<style>
.pendant {
  width: var(--size);
  height: var(--size);
  position: relative;
  background-size: contain;
}

.pendant[url=false] img {
  height: var(--size);
  outline-style: solid;
  outline-width: 0.0428 * var(--size);
}

.pendant img {
  position: absolute;
  height: var(--size) / 1.75;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  border-radius: 50%;
  outline-color: rgb(0, 161, 214);
}
</style>