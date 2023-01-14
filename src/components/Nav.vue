<template>
  <div class="nav-container" :style="'--height: ' + height">
    <div class="nav-picture" :style="'background-image: url(' + src + ')'"></div>
    <div :class="[isCovered === true ? 'nav-covered' : '', 'nav-header']">
      <span>主页</span>
      <span>搜索</span>
      <span>登录</span>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onUnmounted } from 'vue'

export default {
  props: {
    src: String,
    height: String,
  },
  setup(props) {
    const isCovered = ref(false)
    const totalHeight = parseInt(props.height.replace("px", ""))

    function handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      isCovered.value = totalHeight <= (64 + scrollTop)
    }

    window.addEventListener("scroll", handleScroll)
    onUnmounted(() => window.removeEventListener("scroll", handleScroll))

    return { isCovered }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
}

.nav-light .nav-header {
  color: white;
  text-shadow: 0px 1px 3px black;
}

.nav-dark .nav-header {
  color: black;
  /* text-shadow: 0px 1px 3px black; */
}

.nav-light .nav-covered {
  color: black;
  text-shadow: none;
  background-color: white;
  box-shadow: inset 0 -1px hsl(210, 8%, 80%);
}

.nav-dark .nav-covered {
  color: white;
  text-shadow: none;
  background-color: rgb(22, 27, 34);
  /* box-shadow: inset 0 -1px hsl(210, 8%, 80%); */
}

.nav-picture {
  position: absolute;
  top: 0;
  width: 100%;
  height: var(--height);
  background-repeat: no-repeat;
  background-position: center;
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
</style>
