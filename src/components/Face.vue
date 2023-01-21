<template>
  <a v-if="face.face_href" :href="face.face_href" target="_blank">
    <div ref="pendant" class="pendant" :url="face.pendant != ''" :style="`background-image: url(${face.pendant})`">
      <img :src="face.face_url" :style="`outline-color: ${face.pendant_color}`">
    </div>
  </a>
  <a v-else href="/login"><div class="pendant">登录</div></a>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { faceInfo } from './tool'

defineProps({ face: Object as PropType<faceInfo> })
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

a[href="/login"] {
  font-size: 14px;
  color: white;
  text-decoration: none;
  border-radius: 50%;
  overflow: hidden;
}

a[href="/login"] div {
  line-height: 34px;
  text-align: center;
  background-color: rgb(0, 161, 214);
  text-shadow: none !important;
}
</style>