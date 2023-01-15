<template>
  <Nav src="https://yun.nana7mi.link/7mi.webp" height="200px" :theme="theme"></Nav>
  <suspense><router-view :theme="theme" /></suspense>
</template>

<script>
import Nav from './components/Nav.vue'
import { ref } from 'vue'

export default {
  components: { Nav },
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
    return { theme }
  }
}
</script>