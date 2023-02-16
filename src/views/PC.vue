<template>
  <el-scrollbar ref="scrollbar" @scroll="(evt) => OnScroll(evt)" :height="100 / theme.zoom + 'vh'">
      <Main ref="main" :isCovered="isCovered" :theme="theme"></Main>
  </el-scrollbar>
  <Spine fileName="https://api.nana7mi.link/image/build_char_1023_ghost2" lambda="4773" />
</template>
  
<script setup lang="ts">
import Main from './Main.vue'
import Spine from '../components/Spine.vue'
import { Theme } from '../components/tool'

import { ref, onMounted } from 'vue'

// 主题
const theme = ref(new Theme)

// 取消系统自带滚动条
document.body.style.overflow = "hidden"

// 滚盘判断头部是否隐藏以及是否更新早期博文
const isCovered = ref(false)
const scrollbar = ref(null)
const main = ref(null)
let OnScroll = null

onMounted(() => {
  let container = scrollbar.value.wrapRef
  OnScroll = function(evt) {
    if(evt.scrollTop >= container.firstChild.offsetHeight - container.offsetHeight - 10) main.value.GetPastPost()
    isCovered.value = 136 <= evt.scrollTop
  }
})
</script>