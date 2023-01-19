<template>
  <Nav src="https://yun.nana7mi.link/7mi.webp" height="200px" :theme="theme"></Nav>
  <suspense><router-view :theme="theme" /></suspense>
  <Spine v-if="width + 16 >= 1200" fileName="/build_char_002_amiya_test_1"></Spine>
  <Spine v-if="width + 16 >= 1200" fileName="/build_char_358_lisa_lxh_1" x="-340" y="-5"></Spine>
</template>

<script>
import { ref } from 'vue'

import Nav from './components/Nav.vue'
import Spine from './components/Spine.vue'

export default {
  components: { Nav, Spine },
  setup() {
    const theme = ref({
      theme: localStorage.getItem("theme") || "light",
      setBackgroundColor() {
        document.getElementById("app").style.backgroundColor = this.theme == "light" ? "rgb(246,248,250)" : "rgb(30,30,30)"
      },
      modifyTheme() {
        this.theme = this.theme == "light" ? "dark" : "light"
        this.setBackgroundColor()
        localStorage.setItem("theme", this.theme)
      }
    })
    theme.value.setBackgroundColor()

    const width = ref(document.body.clientWidth)
    const appElement = document.getElementById("app")
    appElement.style.setProperty("--zoom", 0.8 * document.body.clientWidth / 1152)
    window.onresize = () => {
      width.value = document.body.clientWidth
      appElement.style.setProperty("--zoom", 0.8 * document.body.clientWidth / 1152)
    }

    return { theme, width }
  }
}
</script>