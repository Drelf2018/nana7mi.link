<template>
  <Login />
  <el-scrollbar ref="scrollbar" @scroll="(evt) => OnScroll(evt)" :height="100 / theme.zoom + 'vh'">
      <Main ref="main" :isCovered="isCovered" :theme="theme">
        <template #left>
          <StickyArea>
            <template #normal>
              <iPhone ref="Phone" />
            </template>
            <template #sticky>
              <div class="fill shadow-container">
                <div style="width: 1000px;zoom: 0.284;font-size: 3em;margin:0.25em">
                  <el-calendar v-model="calendar">
                    <template #header="{ date }">
                      <span>{{ date }}</span>
                    </template>
                  </el-calendar>
                </div>
              </div>
            </template>
          </StickyArea>
        </template>
        <template #right="{ posters }">
          <StickyArea>
            <template #normal>
              <div class="fill shadow-container" v-for="card in cards">
                <Card :card="card" />
              </div>
            </template>
            <template #sticky>
              <div class="fill shadow-container" style="margin-bottom: 8px;">
                <Swiper speed="2000" width="292px" :pictures="pictures" />
              </div>
              <p style="color: gray;margin-left: 0.75em;margin-bottom: 0.5em;">提交者名单</p>
              <ul style="margin: 0.5em 0;">
                <li v-for="time, poster of posters"
                  v-show="poster > 0"
                  :class="posters[0] - time < 12 ? 'online' : posters[0] - time < 60 ? 'wait' : 'offline'">
                  <span v-if="posters[0] - time < 60">
                    {{ getName(poster) + (posters[0] - time)  + ' 秒前'}}
                  </span>
                  <span v-else>
                    {{ getName(poster) + '很久之前'}}
                  </span>
                </li>
              </ul>
              <a href="https://github.com/Drelf2018/weibo-webhook/tree/main/Poster" target="_blank" style="color: gray;">
                <p style="font-size: 14px;margin-top:0.5em;text-align: right;">如何成为提交者</p>
              </a>
            </template>
          </StickyArea>
        </template>
      </Main>
  </el-scrollbar>
  <Spine fileName="https://api.nana7mi.link/image/build_char_1023_ghost2" lambda="4773" />
</template>
  
<script setup lang="ts">
import Main from './Main.vue'
import Card from '../components/Card.vue'
import Login from '../components/Login.vue'
import Spine from '../components/Spine.vue'
import iPhone from '../components/iPhone.vue'
import Swiper from '../components/Swiper.vue'
import StickyArea from '../components/StickyArea.vue'

import { Theme, userInfo, Picture } from '../components/tool'

import { ref, onMounted } from 'vue'

import axios from 'axios'

// 主题
const theme = ref(new Theme)
// 日历
const calendar = ref(new Date())
// 右侧卡片和画框
const cards = ref([])
const pictures = ref([])

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

// 获取画框封面
TaskWaitAll([
  "BV1Nd4y1E7Xi", "BV1NV4y1s7qy", "BV1Wq4y1g7SW", "BV1WQ4y1i7NH", "BV1Y541177Rg", "BV18q4y1z7Vv",
  "BV1vJ411B7ng", "BV1n3411Y7fR", "BV1d34y1D7Vk", "BV1wT4y1r7g6", "BV1924y1R76y", "BV1JA4y1d7Bb",
  "BV1yU4y1W7Y2", "BV1tU4y1R7qu", "BV1yf4y137XH", "BV16D4y177Ef", "BV1DK4y1g7zE", "BV19K4y1p7Zh"
]).then(result => {
  pictures.value = result
  pictures.value.push(pictures.value[0])
})

// 卡片
axios.get(`https://aliyun.nana7mi.link/live.LiveRoom(21452505).get_room_info()`).then(res => {
  let data = res.data.data
  let info: userInfo = {
    cover_href: `https://live.bilibili.com/${data.room_info.room_id}`,
    cover_url: data.room_info.cover.replace("http://", "https://"),
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

function TaskWaitAll(args: Array<String>) {
  function getPicture(bv: String) {
    return axios.get(`https://aliyun.nana7mi.link/video.Video(${bv}).get_info().pic?max_age=2592000`).then(
      res => {
        let pic: Picture = {
          link: `https://www.bilibili.com/video/${bv}`,
          url: res.data.data.replace("http://", "https://")
        }
        return pic
      }
    )
  }
  let taskall = []
  for (let arg of args) taskall.push(getPicture(arg))
  return Promise.all(taskall)
}

// 获取b站名字
const uid2name = {}
function getName(uid: number) {
  if (uid == 0) return ""
  if (!uid2name[uid]) {
    uid2name[uid] = uid
    axios.get(`https://aliyun.nana7mi.link/user.User(${uid}).get_user_info().name?max_age=86400`).then(
      res => uid2name[uid] = res.data.data + " "
    ).catch(console.log)
  }
  return uid2name[uid]
}
</script>

<style>
@media screen and (min-width: 1200px) {
  .pc {
    zoom: var(--zoom);
  }
}

@media screen and (max-width: 1200px) {
  .pc {
    zoom: calc(1.15 * var(--zoom));
  }
}
</style>