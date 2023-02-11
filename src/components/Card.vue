<template>
  <div>
    <a :href="card.cover_href" target="_blank"><img class="cover" :src="card.cover_url"></a>
    <div v-if="card.cover_href" class="linear"></div>
    <div class="show">
      <Face :face="card" style="--size: 50px;margin: 12px;" />
      <strong>  
        <p :style="`color: ${card.title_color};`">{{ card.title }}</p>
        <span>{{ card.subtitle }}</span>
      </strong>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'
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

  p {
    font-size: 1.5em;
    margin: 0;
  }

  span {
    font-size: 14px;
    color: grey;
  }
}
</style>