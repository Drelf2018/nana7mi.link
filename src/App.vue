<template>
  <Nav src="/bg.png" height="155px"></Nav>
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
