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
                            <el-button type="primary" class="ml-2">提交</el-button>
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
                        <el-timeline-item 
                          v-for="(activity, index) in activities"
                          :key="index"
                          :icon="activity.icon"
                          :type="activity.type"
                          :color="activity.color"
                          :size="activity.size"
                          :hollow="activity.hollow"
                          :timestamp="activity.timestamp"
                          placement="top"
                        >
                            <el-card><div v-html="activity.content"></div></el-card>
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
      for(let i=0;i<tp.length;i++) {
        tp[i].key = tp[i].type + tp[i].mid
        key2index[tp[i].key] = i
      }
      for(let i=0;i<tp.length;i++) {
        if(tp[i].type == "weiboComment") {
          let j = key2index[tp[i].attachment[0]]
          if(j && tp[i].uid == tp[j].uid) tp[j].attachment.push(tp[i])
        }
      }
      PastPosts.value = PastPosts.value.concat(tp.filter(post => post.type+post.uid == "weibo7198559139"))
      let post = PastPosts.value[0]
      let picUrls = ""
      for(let i in post.picUrls) {
        picUrls += "\n    - " + post.picUrls[i]
      }
      let text = `# 仓库 https://github.com/Drelf2018/weibo-webhook/blob/main/post.go#L8
# 接口 https://api.nana7mi.link/post?beginTs=1676917807&endTs=1676919151
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
  attachment: # 内容不确定 可以尝试阅读源码
  picUrls: ${picUrls}
  repost: ${post.repost}
# 上述为 post 格式 不必修改 如需使用值请用 {arg} 的形式 例如下文 {text}
watchs:
  - ${post.type+post.uid}
jobs:
  ${post.type+post.uid}: 
    url: https://api.nana7mi.link/recv
    data:
      msg: "收到{name}新动态: {text}[CQ:image,file={picUrls[0]}]"
      # 那么发送时会转换为 {msg: "收到${post.name}新动态: ${post.text}[CQ:image,file=${post.picUrls[0]}]"}
`
      code.value.changeEditor(text)
    } else {
      await GetPastPost()
    }
  }
}

function onBack() {
    // window.history.go(-1)
    window.location = '/'
}

function checkYAML() {
    let data = code.value.getEditor()
    try{
        let yml = jsYaml.load(data)
        activities.value = [{
            content: '检查成功',
            color: '#0bbd87',
            timestamp: Format(new Date(), "yy-MM-dd hh:mm:ss"),
            type: 'primary',
        }]
    } catch(error) {
        activities.value[0] = {
            content: '等待检查',
            timestamp: Format(new Date(), "yy-MM-dd hh:mm:ss"),
            type: 'primary'
        }
        activities.value.push({
            content: error,
            color: 'red',
            timestamp: Format(new Date(), "yy-MM-dd hh:mm:ss"),
            type: 'primary',
        })
    }
    if(activities.value.length > 5) {
        activities.value.splice(1,1)
    }
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