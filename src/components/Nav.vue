<template>
  <div :class="['nav-container', `nav-${theme.theme}`]" :style="'--height: ' + height">
    <div class="nav-picture" :style="`background-image: url(${src})`"></div>
    <div :class="[isCovered === true ? 'nav-covered' : '', 'nav-header']">
      <div class="nav-controler" @click="theme.modifyTheme">
        <ion-icon :id="`ion-${theme.theme}`" :name="theme.theme == 'light' ? 'sunny' : 'moon'" style="vertical-align: -2px;"></ion-icon>
      </div>
      <input id="roomid" type="text" placeholder="支持模糊搜索动态">
      <span>登录</span>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, PropType } from 'vue'
import { Theme } from './theme'

export default {
  props: {
    src: String,
    height: String,
    theme: Object as PropType<Theme>
  },
  setup(props) {
    const isCovered = ref(false)
    const totalHeight = parseInt(props.height.replace("px", ""))

    window.addEventListener("scroll", () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      isCovered.value = totalHeight <= (64 + scrollTop)
    })

    return { isCovered }
  }
}
</script>

<style scoped>
.nav-controler {
  font-size: 24px;
  border-radius: 17px;
  padding: 2px 5px 0px;
  transition: all 0.2s;
}

#ion-light {
  color: rgb(255,130,0);
}

#ion-dark {
  color: rgb(255,228,53);
}

.nav-light .nav-header .nav-controler {
  background-color: rgba(255,255,255,0.75);
}

.nav-light .nav-header .nav-controler:hover {
  background-color: rgba(255,255,255,1);
}

.nav-dark .nav-header .nav-controler {
  background-color: rgba(255,255,255,0.25);
}

.nav-dark .nav-header .nav-controler:hover {
  background-color: rgba(255,255,255,0.35);
}

.nav-dark .nav-covered .nav-controler {
  background-color: inherit;
}

.nav-light .nav-covered .nav-controler:hover {
  background-color: rgba(0,0,0,0.1);
}

.nav-dark .nav-covered .nav-controler:hover {
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

.nav-light .nav-header {
  color: rgb(255, 255, 255);
  text-shadow: 0px 1px 3px black;
}

.nav-dark .nav-header {
  color: rgb(201, 209, 217);
}

.nav-light .nav-covered {
  color: black;
  text-shadow: none;
  background-color: white;
  box-shadow: inset 0 -1px hsl(210, 8%, 80%);
}

.nav-dark .nav-covered {
  text-shadow: none;
  background-color: rgb(34,34,37);
  box-shadow: inset 0 -1px rgb(33, 38, 45);
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

.nav-dark .nav-picture {
  opacity: 0.5;
}

@media screen and (max-width: 1200px) {
  .nav-picture {
    background-position: 53%;
  }
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
  opacity: 0.5;
}

.nav-dark input:focus {
  /* background-color: rgb(13, 17, 23); */
  box-shadow: inset 0 -1px rgb(33, 38, 45);
}

input:hover {
  opacity: 0.75;
}

input:focus {
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
  opacity: 1;
}

@media screen and (max-width: 750px) {
  input {
    width: calc(80% - 8px);
  }
}
</style>
