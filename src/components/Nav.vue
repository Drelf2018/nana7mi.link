<template>
  <div class="nav-container" :theme="theme.theme" :style="'--height: ' + height">
    <div class="nav-picture" :style="`background-image: url(${src})`"></div>
    <div :class="[isCovered === true ? 'nav-covered' : '', 'nav-header']">
      <div class="nav-controler" @click="theme.modifyTheme">
        <ion-icon :id="`ion-${theme.theme}`" :name="theme.theme == 'light' ? 'sunny' : 'moon'" style="vertical-align: -4px;"></ion-icon>
      </div>
      <input id="roomid" type="text" placeholder="支持模糊搜索动态">
      <Face id="face" :login="face.face_href != ''" :face="face" style="--size: 34px" />
      <div id="info" class="shadow-container" @mouseenter="info" @mouseleave="info">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, PropType, defineProps, onMounted } from 'vue'
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

function info(evt) {
  switch(evt.type) {
    case "mouseenter":
      let style = window.getComputedStyle(evt.target)
      if (style.opacity != "0") {
        evt.target.classList.add(["show-info"])
        document.getElementById("face").classList.add("show-face")
      }
      break
    case "mouseleave":
      evt.target.classList.remove(["show-info"])
      document.getElementById("face").classList.remove("show-face")
      break
  }
}

onMounted(() => {
  let f1 = document.getElementById("face")
  let f2 = document.getElementById("info")
  f2.style.left = f1.offsetLeft + f1.offsetWidth / 2 + "px"
})
</script>

<style scoped>
#info {
  /* width: 150px; */
  position: fixed;
  top: 48px;
  transform: translateX(-50%);
  opacity: 0;
  transition: all 0.35s ease 0.25s;
  z-index: 105;
  overflow: hidden;
  padding: 16px;
}

.show-info {
  top: 64px !important;
  opacity: 1 !important;
  transition: all 0.25s !important;
}

#face:hover + #info {
  top: 64px;
  opacity: 1;
  transition: all 0.25s;
}

#face {
  z-index: 107;
  transition: all 0.35s ease 0.25s;
}

#face[login=true]:hover {
  transform: translateY(35%);
  transition: all 0.25s;
  scale: 2;
}

.show-face[login=true] {
  transform: translateY(35%);
  transition: all 0.25s;
  scale: 2;
}

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

.nav-container[theme=dark] .nav-header {
  color: rgb(201, 209, 217);
}

.nav-covered {
  text-shadow: none;
  transition: all 0.2s;
}

.nav-container[theme=light] .nav-covered {
  background-color: white;
  box-shadow: 0 1px hsl(210, 8%, 80%)
}

.nav-container[theme=dark] .nav-covered {
  background-color: rgb(34,34,37);
  box-shadow: 0 1px hsl(215, 15%, 15%);
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

.nav-container[theme=dark] .nav-picture {
  opacity: 0.5;
}

input {
  display: block;
  box-sizing: border-box;
  width: calc(92% - 8px);
  max-width: 592px;
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
  .nav-container #face {
    display: none;
  }

  .nav-container .nav-controler {
    display: none;
  }
}
</style>
