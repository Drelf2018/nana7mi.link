<template>
  <Suspense><Nav v-if="!phone" src="https://yun.nana7mi.link/7mi.webp" height="200px" :theme="theme"></Nav></Suspense>
  <router-view :theme="theme" />
  <Spine v-if="!phone" fileName="/build_char_002_amiya_test_1" y="-7" />
  <Spine v-if="!phone" fileName="/build_char_358_lisa_lxh_1" lambda="5000" />
  <Spine v-if="!phone" fileName="/build_char_391_rosmon_epoque_17" lambda="6000" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Theme } from './components/tool'

import Nav from './components/Nav.vue'
import Spine from './components/Spine.vue'

const phone = ref(window.location.pathname == "/phone")
const theme = ref(new Theme(phone.value))
</script>