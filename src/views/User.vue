<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-page-header :icon="ArrowLeft" title="主页" @back="onBack" style="padding: 14px 0;">
          <template #content>
            <div class="flex items-center">
              <el-avatar :size="32" class="mr-3" src="/favicon.ico" />
              <span class="text-large font-600 mr-3"> 编辑配置文件 </span>
              <span class="text-sm mr-2" style="font-size: 14px; color: var(--el-text-color-regular)">
                您的密钥：{{ token }}
              </span>
            </div>
          </template>
          <template #extra>
            <div class="flex items-center">
              <el-button @click="checkYAML">检查</el-button>
              <el-button @click="commit" type="primary" class="ml-2">提交</el-button>
            </div>
          </template>
        </el-page-header>
      </el-header>
      <el-divider style="margin: 0" />
      <el-container>
        <el-aside width="350px" style="padding: 12px 4px 0;margin: 0 16px;">
          <Post :opost="post" v-for="post in PastPosts"></Post>
        </el-aside>
        <el-main style="padding: 20px 0;">
          <Code ref="code" class="code"></Code>
        </el-main>
        <el-aside width="350px">
          <el-timeline style="padding: 20px;">
            <el-timeline-item v-for="(activity, index) in activities" :key="index" :icon="activity.icon"
              :type="activity.type" :color="activity.color" :size="activity.size" :hollow="activity.hollow"
              :timestamp="activity.timestamp" placement="top">
              <el-card>
                <div v-html="activity.content"></div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>
 
<script setup>
import axios from 'axios'
import Code from '../components/Code.vue'
import Post from '../components/Post.vue'
import { ArrowLeft } from '@element-plus/icons-vue'
import { ApiUrl, Theme, Format } from '../components/tool'
import jsYaml from 'js-yaml'

import { ref } from 'vue'

// 主题
const theme = ref(new Theme)
// 代码区
const code = ref(null)

const uid = ref(localStorage.getItem("uid"))
const token = ref(localStorage.getItem("token"))

const activities = ref([
  {
    content: '等待检查',
    timestamp: Format(new Date(), "yy-MM-dd hh:mm:ss"),
    type: 'primary'
  }
])

setInterval(() => {
  activities.value[0].timestamp = Format(new Date(), "yy-MM-dd hh:mm:ss")
}, 1000)

login(uid.value, token.value).then(getWatch).catch(console.log)

let PostInfo = ""

const DefaultConfig = `listening:
- weibo7198559139
- weiboComment7198559139
jobs:
- patten: weibo7198559139
  method: POST
  url: https://httpbin.org/post
  headers: {}
  data:
    user_id: "123465"
    message: '收到{name}新动态: {text}'
- patten: weiboComment7198559139
  method: POST
  url: https://httpbin.org/post
  headers: {}
  data:
    user_id: "123465"
    message: '收到{name}新评论: {text}'
`
// 获取博文函数
const PastPosts = ref([])
// 获取一定数量的初始博文
GetPastPost()
async function GetPastPost() {
  let res = await axios.get(ApiUrl + "/post", { params: { beginTs: 1676917807, endTs: 1676919151 } })
  if (res.data.code == 0) {
    if (res.data.data.length != 0) {
      let tp = res.data.data.reverse()
      let key2index = {}
      for (let i = 0; i < tp.length; i++) {
        tp[i].key = tp[i].type + tp[i].mid
        key2index[tp[i].key] = i
      }
      for (let i = 0; i < tp.length; i++) {
        if (tp[i].type == "weiboComment") {
          let j = key2index[tp[i].attachment[0]]
          if (j) tp[j].attachment.push(tp[i])
        }
      }
      PastPosts.value = PastPosts.value.concat(tp.filter(post => post.type + post.uid == "weibo7198559139"))
      let post = PastPosts.value[0]
      let picUrls = ""
      for (let i in post.picUrls) {
        picUrls += "\n    - " + post.picUrls[i]
      }
      PostInfo = `# 仓库 https://github.com/Drelf2018/weibo-webhook/blob/main/network.go#L113-L135
# 接口 https://api.nana7mi.link/post?beginTs=1676917807&endTs=1676919151
# 以下为 post 格式 不必修改 如需使用值请用 {arg} 形式
post:
  mid: ${post.mid}
  time: ${post.time}
  text: ${post.text}
  type: ${post.type}
  source: ${post.source}
  uid: ${post.uid}
  name: ${post.name}
  face: ${post.face}
  pendant: ${post.pendant}
  description: ${post.description}
  follower: ${post.follower}
  following: ${post.following}
  picUrls: ${picUrls}
  repost: ${post.repost}
`
    } else {
      await GetPastPost()
    }
  }
}

function onBack() {
  window.location = '/'
}

function commit() {
  let yml = checkYAML()
  if(yml) axios.post(ApiUrl + `/config?token=${token.value}`, {listening: yml.listening, jobs: yml.jobs})
}

function checkYAML() {
  let data = code.value.getEditor()
  try {
    let yml = jsYaml.load(data)
    activities.value = [{
      content: '检查成功',
      color: '#0bbd87',
      timestamp: Format(new Date(), "yy-MM-dd hh:mm:ss"),
      type: 'primary',
    }]
    return yml
  } catch (error) {
    activities.value[0] = {
      content: error,
      color: 'red',
      timestamp: Format(new Date(), "yy-MM-dd hh:mm:ss"),
      type: 'primary',
    }
  }
  return null
}

// 登录
async function login(uid, token) {
  let res = await axios.get(ApiUrl + "/login", { params: { uid: uid, token: token } })
  if (res.data.code != 0) throw res.data.data
  let url = ""
  res.data.data.filter(u => u.uid == uid).forEach(u => url = u.file)
  return url
}

// 获取 watch
async function getWatch(url) {
  if(url) axios.get(`https://api.nana7mi.link/yml${url}`).then(
    res => {
      let yml = jsYaml.load(res.data)
      if(yml) {
        code.value.changeEditor(res.data + PostInfo)
      } else {
        code.value.changeEditor(DefaultConfig + PostInfo)
      }
    }
  )
}
</script>

<style lang="scss">
.code {
  width: 100%;
  height: calc(100vh - 160px);
  border-radius: 10px;
  overflow: hidden;
}

.flex {
  display: flex;
  align-items: center;

  * {
    margin: 0 5px;
  }
}
</style>