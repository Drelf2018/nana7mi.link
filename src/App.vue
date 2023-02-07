<template>
  <Login></Login>
  <Nav src="https://yun.nana7mi.link/7mi.webp" height="200px" :theme="theme" :face="face">
    <div v-if="face.face_href">
      <p id="p1" :style="'color: ' + face.pendant_color">{{ name }}</p>
      <p id="p2" style="color: grey;font-size:8px">{{ token }}</p>
      <p>LV{{ me.level }} {{ me.xp }} / 100</p>
      <div style="border: 1px solid rgb(230,232,234);"></div>
      <p class="btn" :theme="theme.theme" @click="clean">
        退出登录
      </p>
    </div>
    <div v-else align="center">
      <img src="https://i0.hdslb.com/bfs/new_dyn/0de10012b4a96d7d4bcd82728f77b2051464240042.png" style="border-radius: 10px;">
      <span style="display: block;">不登录还想用？</span>
    </div>
  </Nav>
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
  <Spine fileName="/build_char_002_amiya_test_1" y="-7" />
  <Spine fileName="/build_char_358_lisa_lxh_1" lambda="5000" />
  <Spine fileName="/build_char_391_rosmon_epoque_17" lambda="6000" />
</template>

<script setup lang="ts">
import axios from 'axios'

import { Theme, Picture, userInfo, faceInfo } from './components/tool'
import { ref, Ref } from 'vue'

import Nav from './components/Nav.vue'
import Card from './components/Card.vue'
import Login from './components/Login.vue'
import Spine from './components/Spine.vue'
import iPhone from './components/iPhone.vue'
import Swiper from './components/Swiper.vue'

const uid = ref(localStorage.getItem("uid"))
const token = ref(localStorage.getItem("token"))
const me = ref()
const users = ref([])
const theme = ref(new Theme)
const face: Ref<faceInfo> = ref({
  face_href: "",
  face_url: "",
  pendant: "",
  pendant_color: ""
})
const name = ref("")
const cards = ref([])
const pictures = ref([])
const msg = ref("阿米娅好可爱（戳戳试试")

TaskWaitAll([
  "BV1Nd4y1E7Xi", "BV1NV4y1s7qy", "BV1Wq4y1g7SW", "BV1WQ4y1i7NH", "BV1Y541177Rg", "BV18q4y1z7Vv",
  "BV1vJ411B7ng", "BV1n3411Y7fR", "BV1d34y1D7Vk", "BV1wT4y1r7g6", "BV1924y1R76y", "BV1JA4y1d7Bb",
  "BV1yU4y1W7Y2", "BV1tU4y1R7qu", "BV1yf4y137XH", "BV16D4y177Ef", "BV1DK4y1g7zE", "BV19K4y1p7Zh"
]).then(result => {
  pictures.value = result
  pictures.value.push(pictures.value[0])
})

axios.get("https://api.nana7mi.link/login", { params: { uid: uid.value, token: token.value } }).then(
  res => {
    if (res.data.code != 0) throw res.data.error
    users.value = res.data.data
    res.data.data.filter(u => u.uid == uid.value).forEach(u => me.value = u)
    return me.value.uid
  }
).then(
  uid => {
    axios.get(`https://aliyun.nana7mi.link/user.User(${uid}).get_user_info()`).then(
      res => {
        let data = res.data.data
        name.value = data.name
        let info: faceInfo = {
          face_href: `https://space.bilibili.com/${data.mid}`,
          face_url: data.face,
          pendant: data.pendant.image,
          pendant_color: data.vip.nickname_color,
        }
        face.value = info
      }
    )
  }
).catch(console.log)

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

function clean() {
  localStorage.setItem("token", "")
  location.reload()
}

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
#p2 {
  display: none;
}

#p1:hover + #p2 {
  display: block;
}

.btn {
  transition: all 0.2s;
  width: 100%;
}

.btn[theme=light]:hover {
  background-color: rgb(222,222,222);
  /* box-shadow: 0 1px hsl(210deg 8% 80%) */
}

.btn[theme=dark] {
  background-color: rgb(34,34,37);
  /* box-shadow: 0 1px rgb(33, 38, 45); */
}

.shadow-container {
  position: relative;
  z-index: 1;
  padding: 16px;
  margin: 8px 4px;
  border-radius: 5px;
  transition: all 0.2s;
}

div[theme=light] .shadow-container {
  background-color: rgb(255,255,255);
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 12%),
              0 2px 2px 0 rgb(0 0 0 / 14%),
              0 1px 5px 0 rgb(0 0 0 / 20%);
}

div[theme=dark] .shadow-container {
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

@media screen and (min-width: 1200px) {
    #app {
        zoom: max(1, var(--zoom));
    }
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
    width: 92%;
  }
}
</style>