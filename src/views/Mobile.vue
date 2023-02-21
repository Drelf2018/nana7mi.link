<template>
  <Main ref="main" :isCovered="isCovered" :theme="theme"></Main>
</template>
  
<script setup lang="ts">
import Main from './Main.vue'
import { Theme } from '../components/tool'

import { ref } from 'vue'

// 主题
const theme = ref(new Theme)

// 滚盘判断头部是否隐藏以及是否更新早期博文
const main = ref(null)
const compareHeight = Math.max(1, theme.value.zoom) * 136
const isCovered = ref(compareHeight <= 0)

window.onscroll = () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  isCovered.value = compareHeight <= scrollTop

  let clientHeight = document.documentElement.clientHeight
  let scrollHeight = document.documentElement.scrollHeight
  if (scrollTop + clientHeight >= scrollHeight - 64) main.value.GetPastPost()
}
</script>

<style>
.mobile .post {
  width: 92%;
}
</style>