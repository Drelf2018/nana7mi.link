<template>
  <Nav src="https://yun.nana7mi.link/7mi.webp" height="200px" :isCovered="isCovered" @search="searchHandler" :theme="theme" :face="face">
    <div v-if="face.face_href">
      <p :style="{color: face.pendant_color}">{{ name }}</p>
      <p>LV{{ me.level }} XP{{ me.xp }}</p>
      <el-button type="primary" @click="clean">退出登录</el-button>
    </div>
    <div v-else align="center">
      <img src="https://i0.hdslb.com/bfs/new_dyn/0de10012b4a96d7d4bcd82728f77b2051464240042.png" style="border-radius: 10px;">
      <span style="display: block;">不登录还想用？</span>
    </div>
  </Nav>

  <div class="content">
    <slot name="left"></slot>
    <div v-infinite-scroll="GetPastPost" :infinite-scroll-immediate="false" class="post">
      <Post :key="post.key" :opost="post" v-for="post in FilterPosts" />
      <p v-if="BeginTime <= 1675768827" style="text-align: center;color: grey">
        <span style="font-size: 0.5em;">◥</span> 
        到底了啦
        <span style="font-size: 0.5em;">◤</span>
      </p>
    </div>
    <slot name="right" :posters="posters"></slot>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'

import { ApiUrl, Theme, faceInfo, NoticePost } from '../components/tool'
import { ref, Ref, PropType } from 'vue'

import Nav from '../components/Nav.vue'
import Post from '../components/Post.vue'

const props = defineProps({
  isCovered: Boolean,
  theme: Object as PropType<Theme>
})

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

// 登录
if(props.theme.isPC) login(uid.value, token.value).then(getFace).catch(console.log)

// 获取博文函数
const BeginTime = ref(Math.ceil(new Date().getTime() / 1000))
// 获取一定数量的初始博文
GetPastPost()
async function GetPastPost() {
  if (BeginTime.value <= 1675768827 - 7 * 86400) return
  BeginTime.value -= 7 * 86400
  let res = await axios.get(ApiUrl + "/post", { params: { beginTs: BeginTime.value, endTs: BeginTime.value + 7 * 86400 } })
  if (res.data.code == 0) {
    if (res.data.data.length != 0) {
      let tp = res.data.data.reverse()
      let key2index = {}
      for(let i=0;i<tp.length;i++) {
        tp[i].key = tp[i].type + tp[i].mid
        key2index[tp[i].key] = i
      }
      for(let i=0;i<tp.length;i++) {
        if(tp[i].type == "weiboComment") {
          let j = key2index[tp[i].attachment[0]]
          if(j) tp[j].attachment.push(tp[i])
        }
      }
      PastPosts.value = PastPosts.value.concat(tp.filter(
        (post, idx, _) => key2index[post.key] == idx
      ))
      searchHandler("")
    } else {
      await GetPastPost()
    }
  }
}
defineExpose({ GetPastPost })

// 更新贡献者提交时间
if(props.theme.isPC) setInterval(() => posters.value[0] += 1, 1000)

// 每五秒获取新博文
if(props.theme.isPC) {
  NewPost()
  setInterval(NewPost, 4500)
}
async function NewPost() {
  let res = await axios.get(ApiUrl + "/post")
  if (res.data.code == 0) {
    posters.value = res.data.poster
    res.data.data.forEach(async post => {
      post.key = post.type + post.mid
      if (FuturePosts.value.length == 0) FuturePosts.value = [post]
      else if (FuturePosts.value[0].time != post.time) FuturePosts.value.unshift(post)
      else return
      let res = await axios.get("https://aliyun.nana7mi.link/video.Video(bvid=BV1ty4y1E7w9).get_download_url(0:int,html5=1).durl")
      Phone.value.play(res.data.data[0].url)
      NoticePost(post)
      searchHandler("")
    })
  }
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
    face_href: `/user`,
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
      if (watch == "weibo7198559139") return true
      else if ((me.value && me.value.watch.length > 0) && ("*" in me.value.watch || watch in me.value.watch)) return true
      return false
    }
  )
  if (search != "") {
    FilterPosts.value = TotalPosts.filter(post => post.text.includes(search))
  } else {
    FilterPosts.value = TotalPosts
  }
}
</script>

<style lang="scss">
ul {
  color: grey;
  font-size: 14px;
  font-family:sans-serif;
}

li.online::marker {
  color: green;
}

li.wait::marker {
  color: orange;
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