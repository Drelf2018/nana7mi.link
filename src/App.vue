<template>
  <Nav src="https://yun.nana7mi.link/7mi.webp" height="200px"></Nav>
  <suspense><router-view /></suspense>
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
