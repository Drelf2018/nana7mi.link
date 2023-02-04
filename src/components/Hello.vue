<template>
  <!-- <div class="btn" :theme="theme.theme">
      <span>你好</span>
  </div> -->
  <div class="content" :theme="theme.theme">
    <div class="hidden">
      <iPhone />
      <div class="tool">
        <div class="date shadow-container">{{ msg }}</div>
      </div>
    </div>
    <div class="post">
      <div class="shadow-container" v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]">
        <h3>Test{{ i }}</h3>
        <ul>
          <li v-for="j in ['aa', 'bb', 'cc', 'dd', 'ee']"><a href="/">vue-{{ j }}-{{ i }}</a></li>
        </ul>
      </div>
    </div>
    <div class="hidden">
      <div class="fill shadow-container" :theme="theme.theme" style="width:268px;margin-bottom: 8px;height: 167px;">
        <Swiper speed="2000" width="268px" :pictures="pictures" />
      </div>
      <div class="sider">
        <div class="fill shadow-container" :theme="theme.theme" style="text-align: left;">
          <Card v-for="card in cards" :card="card" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { Theme, Picture, userInfo } from './tool'
import { ref, PropType, defineProps } from 'vue'

import Card from './Card.vue'
import iPhone from './iPhone.vue'
import Swiper from './Swiper.vue'

const cards = ref([])
const pictures = ref([])
const msg = ref("阿米娅好可爱（戳戳试试")

axios.get(`https://aliyun.nana7mi.link/live.LiveRoom(21452505).get_room_info()`).then(res => {
  let data = res.data.data
  let info: userInfo = {
    cover_href: `https://live.bilibili.com/${data.room_info.room_id}`,
    cover_url: data.room_info.cover,
    face_href: `https://space.bilibili.com/${data.room_info.uid}`,
    face_url: data.anchor_info.base_info.face,
    pendant: "",
    pendant_color: "rgb(251, 114, 153)",
    title: data.anchor_info.base_info.uname,
    title_color: "rgb(251, 114, 153)",
    subtitle: `粉丝 ${data.anchor_info.relation_info.attention} - 舰长 ${data.guard_info.count}`
  }
  cards.value.push(info)
})

TaskWaitAll([
  "BV1Nd4y1E7Xi", "BV1NV4y1s7qy", "BV1Wq4y1g7SW", "BV1WQ4y1i7NH", "BV1Y541177Rg", "BV18q4y1z7Vv",
  "BV1vJ411B7ng", "BV1n3411Y7fR", "BV1d34y1D7Vk", "BV1wT4y1r7g6", "BV1924y1R76y", "BV1JA4y1d7Bb",
  "BV1yU4y1W7Y2", "BV1tU4y1R7qu", "BV1yf4y137XH", "BV16D4y177Ef", "BV1DK4y1g7zE", "BV19K4y1p7Zh"
]).then(result => {
  pictures.value = result
  pictures.value.push(pictures.value[0])
})

defineProps({
  theme: Object as PropType<Theme>
})

function TaskWaitAll(args: Array<String>) {
  function getPicture(bv: String) {
    return axios.get(`https://aliyun.nana7mi.link/video.Video(${bv}).get_info().pic?max_age=2592000`).then(
      res => {
        let pic: Picture = {
          link: `https://www.bilibili.com/video/${bv}`,
          url: res.data.data
        }
        return pic
      }
    )
  }
  let taskall = []
  for (let arg of args) taskall.push(getPicture(arg))
  return Promise.all(taskall)
}
</script>

<style>
.btn {
  height: 40px;
  position: sticky;
  top: 64px;
  z-index: 50;
  transition: all 0.2s;
}

.btn[theme=light] {
  background-color: white;
  box-shadow: 0 1px hsl(210deg 8% 80%)
}

.btn[theme=dark] {
  background-color: rgb(34,34,37);
  box-shadow: 0 1px rgb(33, 38, 45);
}

.shadow-container {
  position: relative;
  z-index: 1;
  padding: 16px;
  margin: 8px 4px;
  border-radius: 5px;
  transition: all 0.2s;
}

.content[theme=light] .shadow-container {
  background-color: rgba(255,255,255,0.75);
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 12%),
              0 2px 2px 0 rgb(0 0 0 / 14%),
              0 1px 5px 0 rgb(0 0 0 / 20%);
}

.content[theme=dark] .shadow-container {
  color: rgb(201, 209, 217);
  background-color: rgb(43, 43, 43);
  box-shadow: 0 0 0 1px rgb(48, 54, 61);
}

.content[theme=dark] .iPhone {
  opacity: 0.5;
}

.post {
  width: 600px;
  z-index: 1;
}

.sider, .tool {
  position: sticky;
  top: 72px;
  /* top: 112px; */
  width: 276px;
  z-index: 1;
}

.fill {
  padding: 0;
  transition: all 0.2s;
}

.fill[theme=dark] {
  opacity: 0.5;
}

.content {
  display: flex;
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

  .hidden {
    display: none;
  }

  /* .tool {
    position: static;
    width: 600px;
    margin-bottom: -8px;
  } */
}

@media screen and (max-width: 750px) {
  .post, .tool {
    width: 80%;
  }
}
</style>
