<template>
  <a v-if="face.face_href" :href="face.face_href" target="_blank">
    <div class="face">
      <img id="pendant" :src="face.pendant">
      <img id="profile" :src="face.face_url" :url="face.pendant != ''" :style="`border-color: ${face.pendant_color}`">
    </div>
  </a>
  <a v-else href="javascript:;" class="login" @click="login"><div>登录</div></a>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { faceInfo } from './tool'

defineProps({ face: Object as PropType<faceInfo> })

function login() {
  document.getElementById("hidden-login-form").style.display = "block"
}
</script>

<style lang="scss" scoped>
.face {
  width: var(--size);
  height: var(--size);
  position: relative;
  background-size: contain;

  #pendant {
    --alpha: 1.6;
    height: calc(var(--size) * var(--alpha));
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  #profile {
    position: absolute;
    height: var(--size);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    border-radius: 50%;
    border-color: rgb(0, 161, 214);
  }
  
  #profile[url=false]  {
    border-style: solid;
    border-width: calc(0.05 * var(--size));
  }
}

.login {
  font-size: 14px;
  color: white;
  text-decoration: none;
  border-radius: 50%;
  overflow: hidden;

  div {
    width: 34px;
    line-height: 34px;
    text-align: center;
    background-color: rgb(0, 161, 214);
    text-shadow: none !important;
  }
}
</style>