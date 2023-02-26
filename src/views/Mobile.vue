<template>
  <Main ref="main" :isCovered="true" :theme="theme"></Main>
</template>
  
<script setup lang="ts">
import Main from './Main.vue'
import { Theme } from '../components/tool'

import { ref } from 'vue'

// 主题
const theme = ref(new Theme)
</script>

<style>
.mobile .post {
  width: 92%;
}
</style>