<template>
  <Nav src="/background.webp" height="155px"></Nav>
  <router-view />
</template>

<script>
import Nav from './components/Nav.vue'

export default {
  name: 'App',
  components: {
    Nav
  }
}
</script>
