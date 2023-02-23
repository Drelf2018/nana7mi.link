<template>
  <div style="font-size: 50px;">
    <a :href="card.cover_href" target="_blank"><img class="cover" :src="card.cover_url"></a>
    <div v-if="card.cover_href" class="linear"></div>
    <div class="show">
      <Face :face="card" style="margin: 0.24em;" />
      <span>  
        <div :class="{cmt: card.subtitle == null}">
          <span :style="{color: card.title_color}">{{ card.title }}</span>
          <slot></slot>
        </div>
        <p>{{ card.subtitle }}</p>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { userInfo } from './tool'

import Face from './Face.vue'

defineProps({ card: Object as PropType<userInfo> })
</script>

<style lang="scss" scoped>
.cover {
  width: 100%;
  border-radius: 5px 5px 0 0;
  display: block;
}

.linear {
  position: relative;
  height: 20px;
  z-index: 2;
  margin-top: -20px;

  @include themeify{
    background-image: themed('linear');
  }
}

.show {
  display: flex;
  align-items: center;
  z-index: 2;
  position: relative;

  div {
    font-size: 0.48em;
  }

  p {
    font-size: 0.28em;
    margin: 0;
    color: grey;
  }
}

.pc .cmt {
  font-size: 0.43em !important;
}

.mobile .cmt {
  font-size: 0.5em !important;
}
</style>