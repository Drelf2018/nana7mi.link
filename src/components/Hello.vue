<template>
  <div :class="['content', `view-${theme.theme}`]">
    <div class="tool">
      <div class="date shadow-container">{{ msg }}</div>
    </div>
    <div class="post">
      <div class="shadow-container" v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]">
        <h3>Test{{ i }}</h3>
        <ul>
          <li v-for="j in ['aa', 'bb', 'cc', 'dd', 'ee']"><a href="/">vue-{{ j }}-{{ i }}</a></li>
        </ul>
      </div>
    </div>
    <div class="sider">
      <div class="fill shadow-container" :theme="theme.theme">
        <Swiper speed=2000 width="268px" :banner="banner" />
      </div>
      <div class="fill shadow-container" :theme="theme.theme" style="text-align: left;">
        <Card :uid=434334701 ></Card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { Theme } from './theme'
import { ref, PropType, watch } from 'vue'

import Card from './Card.vue'
import Swiper, { Picture } from './Swiper.vue'

export default {
  components: { Swiper, Card },
  props: {
    theme: Object as PropType<Theme>
  },
  async setup() {

    async function getPic(bvid: string) {
      let res = await axios.get(`https://aliyun.nana7mi.link/video.Video(${bvid}).get_info().pic?max_age=2592000`)
      let pic: Picture = {
        link: `https://www.bilibili.com/video/${bvid}`,
        url: res.data.data
      }
      return pic
    }

    const msg = ref("阿米娅好可爱（戳戳试试")
    const banner = ref([])

    let bvs = [
      "BV1Nd4y1E7Xi", "BV1NV4y1s7qy", "BV1Wq4y1g7SW", "BV1WQ4y1i7NH", "BV1Y541177Rg", "BV18q4y1z7Vv",
      "BV1vJ411B7ng", "BV1n3411Y7fR", "BV1d34y1D7Vk", "BV1wT4y1r7g6", "BV1924y1R76y", "BV1JA4y1d7Bb",
      "BV1yU4y1W7Y2", "BV1tU4y1R7qu", "BV1yf4y137XH", "BV16D4y177Ef", "BV1DK4y1g7zE", "BV19K4y1p7Zh"
    ]
    for (let bvid of bvs) {
      banner.value.push(await getPic(bvid))
    }

    return { msg, banner }
  }
}
</script>

<style scoped>
.shadow-container {
  position: relative;
  z-index: 1;
  padding: 16px;
  margin: 8px 4px;
  border-radius: 5px;
  transition: background-color 0.2s ease 0, color 0.2s ease 0;
}

.view-light div .shadow-container {
  background-color: #FFF;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 12%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 20%);
}

.view-dark div .shadow-container {
  color: rgb(201, 209, 217);
  background-color: rgb(43, 43, 43);
  box-shadow: inset 0 0 0 1px rgb(48, 54, 61);
}

.post {
  width: 600px;
  z-index: 1;
}

.sider, .tool {
  position: sticky;
  top: 64px;
  width: 276px;
  z-index: 1;
}

.fill {
  padding: 0;
  transition: all 0.2s;
}

.fill[theme=light] {
  opacity: 1;
}

.fill[theme=dark] {
  opacity: 0.5;
}

.content {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

@media screen and (max-width: 1200px) {
  .content {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .sider {
    display: none;
  }

  .tool {
    position: static;
    width: 600px;
    margin-bottom: -8px;
  }
}

@media screen and (max-width: 750px) {
  .post, .tool {
    width: 80%;
  }
}
</style>
