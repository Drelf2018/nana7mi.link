<template>
  <div class="nav-container" :theme="theme.theme" :style="'--height: ' + height">
    <div class="nav-picture" :style="`background-image: url(${src})`"></div>
    <div :class="[isCovered === true ? 'nav-covered' : '', 'nav-header']">
      <div class="nav-controler" @click="theme.modifyTheme">
        <ion-icon :id="`ion-${theme.theme}`" :name="theme.theme == 'light' ? 'sunny' : 'moon'" style="vertical-align: -4px;"></ion-icon>
      </div>
      <input id="roomid" type="text" placeholder="支持模糊搜索动态">
      <Face :face="face" style="--size: 34px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, PropType, defineProps } from 'vue'
import { Theme, faceInfo } from './tool'

import Face from './Face.vue'

const props = defineProps({
  src: String,
  height: String,
  face: Object as PropType<faceInfo>,
  theme: Object as PropType<Theme>
})

const compareHeight = Math.max(1, props.theme.zoom) * (parseInt(props.height) - 64)
const isCovered = ref(compareHeight <= 0)

if (!isCovered.value) window.onscroll = () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  isCovered.value = compareHeight <= scrollTop
}
</script>

<style scoped>
.nav-controler {
  width: 34px;
  height: 34px;
  font-size: 24px;
  border-radius: 17px;
  transition: all 0.2s;
}

#ion-light {
  color: rgb(255,130,0);
}

#ion-dark {
  color: rgb(255,228,53);
}

.nav-container[theme=light] .nav-header .nav-controler {
  background-color: rgba(255,255,255,0.75);
}

.nav-container[theme=light] .nav-header .nav-controler:hover {
  background-color: rgba(255,255,255,1);
}

.nav-container[theme=dark] .nav-header .nav-controler {
  background-color: rgba(255,255,255,0.25);
}

.nav-container[theme=dark] .nav-header .nav-controler:hover {
  background-color: rgba(255,255,255,0.35);
}

.nav-container[theme=dark] .nav-covered .nav-controler {
  background-color: inherit;
}

.nav-container[theme=light] .nav-covered .nav-controler:hover {
  background-color: rgba(0,0,0,0.1);
}

.nav-container[theme=dark] .nav-covered .nav-controler:hover {
  background-color: rgba(255,255,255,0.25);
}

.nav-container {
  height: var(--height);
}

.nav-header {
  position: fixed;
  z-index: 2;
  top: 0;
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  transition: background-color 0.2s;
  z-index: 100;
}

.nav-container[theme=light] .nav-header {
  color: rgb(255, 255, 255);
  text-shadow: 0px 1px 3px black;
}

.nav-container[theme=dark] .nav-header {
  color: rgb(201, 209, 217);
}

.nav-container[theme=light] .nav-covered {
  color: black;
  text-shadow: none;
  background-color: white;
  box-shadow: 0 1px hsl(210deg 8% 80%)
}

.nav-container[theme=dark] .nav-covered {
  text-shadow: none;
  background-color: rgb(34,34,37);
  box-shadow: 0 1px rgb(33, 38, 45);
}

.nav-picture {
  position: absolute;
  top: 0;
  width: 100%;
  height: var(--height);
  background-repeat: no-repeat;
  background-position: center 0%;
  background-size: cover;
  transition: opacity 0.2s;
}

/* .nav-picture::before {
  content: "";
  display: block;
  width: 100%;
  position: relative;
  height: 20%;
  top: 80%;
  z-index: 2;
  transition: all 0.2s;
}

.nav-container[theme=light] .nav-picture::before {
  background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))
} */

.nav-container[theme=dark] .nav-picture {
  opacity: 0.5;
}

input {
  display: block;
  box-sizing: border-box;
  width: 592px;
  height: 40px;
  font-size: 1em;
  font-weight: 540;
  padding: 1px 0 0 0.5em;
  border: 1px solid #ced4da;
  border-radius: 0.5em;
  transition: all 0.2s;
  opacity: 0.65;
}

input:hover {
  opacity: 0.85;
}

input:focus {
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
  opacity: 1;
}

@media screen and (max-width: 1200px) {
  .nav-picture {
    background-position: 53%;
  }
}

.nav-container[theme=dark] input:focus {
  box-shadow: 0 0 0 0.1rem rgba(13, 109, 253, 0.1);
}

@media screen and (max-width: 750px) {
  input {
    width: calc(80% - 8px);
  }
}
</style>
