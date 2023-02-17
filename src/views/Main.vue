<template>
  <Nav src="https://yun.nana7mi.link/7mi.webp" height="200px" :isCovered="isCovered" @search="searchHandler" :theme="theme" :face="face">
    <div v-if="face.face_href">
      <p id="p1" :style="'color: ' + face.pendant_color">{{ name }}</p>
      <p id="p2" style="color: grey;font-size:8px">{{ token }}</p>
      <p>LV{{ me.level }} {{ me.xp }} / 100</p>
      <div style="border: 1px solid rgb(230,232,234);"></div>
      <p @click="clean">
        退出登录
      </p>
    </div>
    <div v-else align="center">
      <img src="https://i0.hdslb.com/bfs/new_dyn/0de10012b4a96d7d4bcd82728f77b2051464240042.png" style="border-radius: 10px;">
      <span style="display: block;">不登录还想用？</span>
    </div>
  </Nav>

  <div class="content">
    <div class="hidden">
      <iPhone ref="Phone" />
      <div class="tool">
        <div class="fill shadow-container">
          <div style="width: 1000px;zoom: 0.284;font-size: 3em;margin:0.25em">
            <el-calendar v-model="calendar">
              <template #header="{ date }">
                <span>{{ date }}</span>
              </template>
            </el-calendar>
          </div>
        </div>
      </div>
    </div>
    <div class="post">
      <Post :key="post.type + post.mid" :opost="post" v-for="post in FilterPosts" />
      <p v-if="BeginTime <= 1675768827" style="text-align: center;">—— 到底了啦 ——</p>
    </div>
    <div class="hidden">
      <div class="fill shadow-container" style="margin-bottom: 8px;">
        <Swiper speed="2000" width="292px" :pictures="pictures" />
      </div>
      <div class="sider">
        <div class="fill shadow-container" v-for="card in cards">
          <Card :card="card" />
        </div>
        <h4 style="color: gray;margin-left: 1em;margin-bottom: 0.5em;">提交贡献者名单</h4>
        <ul style="margin: 0.5em 0;">
          <li v-for="time, poster of posters"
            v-show="poster > 0"
            :status="posters[0] - time < 12 ? 'online' : posters[0] - time < 60 ? 'wait' : 'offline'">
            <span v-if="posters[0] - time < 60">
              {{ getNmae(poster) + (posters[0] - time)  + ' 秒前'}}
            </span>
            <span v-else>
              {{ getNmae(poster) + '很久之前'}}
            </span>
          </li>
        </ul>
        <a href="https://github.com/Drelf2018/weibo-webhook/tree/main/Poster" target="_blank" style="color: gray;">
          <p style="font-size: 14px;margin-top:0.5em;text-align: right;">如何成为提交者</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'

import { ApiUrl, Theme, Picture, userInfo, faceInfo } from '../components/tool'
import { ref, Ref, defineExpose, defineProps, PropType } from 'vue'

import Nav from '../components/Nav.vue'
import Card from '../components/Card.vue'
import Post from '../components/Post.vue'
import iPhone from '../components/iPhone.vue'
import Swiper from '../components/Swiper.vue'

defineProps({
  isCovered: Boolean,
  theme: Object as PropType<Theme>
})

// 日历
const calendar = ref(new Date())

// 自动播放好运来的组件
const Phone = ref(null)

// 本地账户信息
const uid = ref(localStorage.getItem("uid"))
const token = ref(localStorage.getItem("token"))

// 服务器返回用户数据
const me = ref()
const name = ref("")
const users = ref([])
// 提交者
const posters = ref({})

// 博文数据
const PastPosts = ref([])
const FuturePosts = ref([])
const FilterPosts = ref([])

// 导航栏用户头像
const face: Ref<faceInfo> = ref({
  face_href: "",
  face_url: "",
  pendant: "",
  pendant_color: ""
})
// 右侧卡片和画框
const cards = ref([])
const pictures = ref([])

// 登录
login(uid.value, token.value).then(getFace).catch(console.log)

// 获取画框封面
TaskWaitAll([
  "BV1Nd4y1E7Xi", "BV1NV4y1s7qy", "BV1Wq4y1g7SW", "BV1WQ4y1i7NH", "BV1Y541177Rg", "BV18q4y1z7Vv",
  "BV1vJ411B7ng", "BV1n3411Y7fR", "BV1d34y1D7Vk", "BV1wT4y1r7g6", "BV1924y1R76y", "BV1JA4y1d7Bb",
  "BV1yU4y1W7Y2", "BV1tU4y1R7qu", "BV1yf4y137XH", "BV16D4y177Ef", "BV1DK4y1g7zE", "BV19K4y1p7Zh"
]).then(result => {
  pictures.value = result
  pictures.value.push(pictures.value[0])
})

// 获取博文函数
const BeginTime = ref(Math.ceil(new Date().getTime() / 1000))
async function GetPastPost() {
  if (BeginTime.value <= 1666969128) return
  BeginTime.value -= 7 * 86400
  let res = await axios.get(ApiUrl + "/post", { params: { beginTs: BeginTime.value, endTs: BeginTime.value + 7 * 86400 } })
  if (res.data.code == 0) {
    if (res.data.data.length != 0) {
      PastPosts.value = PastPosts.value.concat(res.data.data.reverse())
      searchHandler("")
    } else {
      GetPastPost()
    }
  }
}
defineExpose({ GetPastPost })

// 获取一定数量的初始博文
GetPastPost()
let PastPlan = setInterval(() => {
  if (PastPosts.value.length < 10) {
    GetPastPost()
  } else {
    clearInterval(PastPlan)
  }
}, 300)

// 更新贡献者提交时间
setInterval(() => posters.value[0] += 1, 1000)

// 每五秒获取新博文
NewPost()
setInterval(NewPost, 4500)
async function NewPost() {
  let res = await axios.get(ApiUrl + "/post")
  if (res.data.code == 0) {
    posters.value = res.data.poster
    res.data.data.forEach(async post => {
      if (FuturePosts.value.length == 0) FuturePosts.value = [post]
      else if (FuturePosts.value[0].time != post.time) FuturePosts.value.unshift(post)
      else return
      let res = await axios.get("https://aliyun.nana7mi.link/video.Video(bvid=BV1ty4y1E7w9).get_download_url(0:int,html5=1).durl")
      Phone.value.play(res.data.data[0].url)
      searchHandler("")
    })
  }
}

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

// 获取b站名字
const uid2name = {}
function getNmae(uid: number) {
  if (uid == 0) return ""
  if (!uid2name[uid]) {
    uid2name[uid] = uid
    axios.get(`https://aliyun.nana7mi.link/user.User(${uid}).get_user_info().name?max_age=86400`).then(
      res => uid2name[uid] = res.data.data + " "
    ).catch(console.log)
  }
  return uid2name[uid]
}

// 登录
async function login(uid: string, token: string) {
  let res = await axios.get(ApiUrl + "/login", { params: { uid: uid, token: token } })
  if (res.data.code != 0) throw res.data.data
  res.data.data.filter(u => u.uid == uid).forEach(u => me.value = u)
  users.value = res.data.data
}

// 获取用户头像
async function getFace() {
  let res = await axios.get(`https://aliyun.nana7mi.link/user.User(${uid.value}).get_user_info()`)
  let data = res.data.data
  let info: faceInfo = {
    face_href: `https://space.bilibili.com/${data.mid}`,
    face_url: data.face,
    pendant: data.pendant.image,
    pendant_color: data.vip.nickname_color,
  }
  name.value = data.name
  face.value = info
}

// 退出登录
function clean() {
  localStorage.setItem("token", "")
  location.reload()
}

// 搜索栏过滤函数
function searchHandler(search: string) {
  let TotalPosts = FuturePosts.value.concat(PastPosts.value).filter(
    post => {
      let watch = post.type+post.uid
      if (watch == "weibo7198559139" || uid.value == "188888131") return true
      else if (me.value && me.value.watch.length > 0 && watch in me.value.watch) return true
      return false
    }
  )
  if (search != "") {
    FilterPosts.value = TotalPosts.filter(post => post.text.includes(search))
  } else {
    FilterPosts.value = TotalPosts
  }
}

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
</script>

<style lang="scss">
#p2 {
  display: none;
}

#p1:hover + #p2 {
  display: block;
}

ul {
  color: grey;
  font-size: 14px;
  font-family:sans-serif;
}

li[status=online]::marker {
  color: green;
}

li[status=wait]::marker {
  color: orange;
}

.shadow-container {
  position: relative;
  z-index: 1;
  padding: 16px;
  margin: 8px 4px;
  border-radius: 5px;
  transition: all 0.2s;

  @include themeify{
    color: themed('shadow-container-color');
    background-color: themed('shadow-container-back');
    box-shadow: themed('shadow-container-box');
  }

  a {
    color: #eb7350;
  }
}

#app[data-theme=light] .shadow-container {
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 12%),
              0 2px 2px 0 rgb(0 0 0 / 14%),
              0 1px 5px 0 rgb(0 0 0 / 20%);
}

.post {
  width: 600px;
  z-index: 1;
}

.sider, .tool {
  position: sticky;
  top: 72px;
  z-index: 1;
}

.fill {
  padding: 0;
  transition: all 0.2s;

  @include themeify{
    opacity: themed('fill');
  }
}

.content {
  display: flex;
  justify-content: center;
}

.hidden {
  width: 300px;
}
</style>