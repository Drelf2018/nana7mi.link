<template>
  <Login></Login>
  <Nav src="https://yun.nana7mi.link/7mi.webp" height="200px" @search="searchHandler" :theme="theme" :face="face">
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
      <iPhone :src="src"/>
      <div class="tool">
        <div class="date shadow-container">鲨鱼好可爱（戳戳试试</div>
      </div>
    </div>
    <div class="post">
      <Post :key="post.type + post.mid" :opost="post" v-for="post in FilterPosts"></Post>
      <p v-if="AllPasts" style="text-align: center;">—— 到底了啦 ——</p>
    </div>
    <div class="hidden">
      <div class="fill shadow-container" :theme="theme.theme" style="width:268px;margin-bottom: 8px;height: 167px;">
        <Swiper speed="2000" width="268px" :pictures="pictures" />
      </div>
      <div class="sider">
        <div class="fill shadow-container" :theme="theme.theme">
          <Card v-for="card in cards" :card="card" />
        </div>
      </div>
    </div>
  </div>
  <Spine fileName="https://api.nana7mi.link/image/build_char_1023_ghost2" lambda="4773" />
</template>

<script setup lang="ts">
import axios from 'axios'

import { Theme, Picture, userInfo, faceInfo } from './components/tool'
import { ref, Ref } from 'vue'

import Nav from './components/Nav.vue'
import Card from './components/Card.vue'
import Post from './components/Post.vue'
import Login from './components/Login.vue'
import Spine from './components/Spine.vue'
import iPhone from './components/iPhone.vue'
import Swiper from './components/Swiper.vue'

// 自动播放好运来
const src = ref("")

// 本地账户信息
const uid = ref(localStorage.getItem("uid"))
const token = ref(localStorage.getItem("token"))

// 服务器返回用户数据
const me = ref()
const name = ref("")
const users = ref([])

// 博文数据
const AllPasts = ref(false)
const PastPosts = ref([])
const FuturePosts = ref([])
const FilterPosts = ref([])

// 主题
const theme = ref(new Theme)
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
let NowTime = new Date().getTime() / 1000
const GetPastPost = function(NowTime: number) {
  let BeginTime = NowTime
  return async function() {
    BeginTime -= 86400 
    let res = await axios.get("https://api.nana7mi.link/post", { params: { beginTs: BeginTime, stopTs: BeginTime + 86400 } })
    if (res.data.code == 0) {
      PastPosts.value = PastPosts.value.concat(res.data.data.reverse())
      if (PastPosts.value[PastPosts.value.length-1].time == 1675768827) AllPasts.value = true      
    }
    searchHandler("")
  }
}(NowTime)

// 获取一定数量的初始博文
GetPastPost()
let PastPlan = setInterval(() => {
  if (PastPosts.value.length < 10) {
    GetPastPost()
  } else {
    clearInterval(PastPlan)
  }
}, 300)

// 每五秒获取新博文
setInterval(async () => {
  let res = await axios.get("https://api.nana7mi.link/post")
  if (res.data.code == 0) {
    if (res.data.data.length > 0) {
      src.value = "https://upos-sz-mirrorhw.bilivideo.com/upgcxcode/22/20/313232022/313232022-1-16.mp4?e=ig8euxZM2rNcNbRVhwdVhwdlhWdVhwdVhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1675958683&gen=playurlv2&os=hwbv&oi=2032715548&trid=15cd8158b1f64542a2c52f7d052d29f0h&mid=0&platform=html5&upsig=5ec226af31c0f1503576750df9d55cbf&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform&bvc=vod&nettype=0&bw=53007&logo=80000000"
      FuturePosts.value = res.data.data.reverse().concat(FuturePosts.value)
      searchHandler("")
    } 
  }
}, 5000)

// 滚动到底获取更久之前博文
window.addEventListener('scroll', () => {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  let clientHeight = document.documentElement.clientHeight;
  let scrollHeight = document.documentElement.scrollHeight;
  if (scrollTop + clientHeight >= scrollHeight) {
    if (!AllPasts.value) GetPastPost()
  }
})

// 登录
axios.get("https://api.nana7mi.link/login", { params: { uid: uid.value, token: token.value } }).then(
  res => {
    if (res.data.code != 0) throw res.data.data
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

// 卡片
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

// 搜索栏过滤函数
function searchHandler(search: string) {
  let TotalPosts = FuturePosts.value.concat(PastPosts.value)
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