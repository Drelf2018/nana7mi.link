<template>
  <div class="shadow-container">
    <a :href="post.url" style="color: inherit" target="_blank"><ion-icon name="arrow-redo-outline" class="goto"></ion-icon></a>
    <ion-icon name="alert-circle-outline" class="goto" @click="() => NoticePost(post)"></ion-icon>
    <Card :card="post.card" style="margin: -9px"></Card>
    <p v-html="post.text"></p>
    <img :src="src" v-for="src in post.picUrls" :style="{width: imgWidth}">
    <Post v-if="post.repost" :key="post.repost.key" :opost="post.repost" />
    <p class="date" :style="[post.attachment.length != 0 ? '' : 'margin-bottom: 0']">{{ post.date }} {{ post.source }}</p>
    <Comments :comments="comments" v-for="comments in post.attachment"></Comments>
  </div>
</template>

<script setup lang="ts">
import { ApiUrl, NoticePost } from './tool';
import { defineProps, ref, onMounted } from 'vue';
import Card from './Card.vue'
import Comments from './Comments.vue'

const props = defineProps({ opost: Object })
const post = ref(handler(props.opost))
const imgWidth = ref("100%")

onMounted(() => {
  imgWidth.value = 100 / Math.ceil(Math.sqrt(post.value.picUrls.length)) + "%"
})

function handler(post) {
  post.face = replaceUrl(post.face)
  post.pendant = replaceUrl(post.pendant)
  post.picUrls = replaceUrls(post.picUrls)
  post.date = Format(new Date(post.time * 1000), "yy-MM-dd hh:mm:ss")
  switch (post.type) {
    case "weibo":
    case "weiboComment":
      post.card = {
        cover_href: null,
        cover_url: null,
        face_href: `https://weibo.com/u/${post.uid}`,
        face_url: post.face,
        pendant: post.pendant,
        pendant_color: post.type == "weibo" ? "#eb7350" : "transparent",
        title: post.name,
        title_color: "#eb7350",  //"rgb(251, 114, 153)"
        subtitle: post.description
      }
      if(post.type == "weibo") post.url = `https://weibo.com/${post.uid}/${post.mid}`
      else post.url = `https://weibo.com/${post.uid}/${post.attachment[0].replace("weibo", "")}`
      break
  }
  if(post.repost) post.repost = handler(post.repost)
  if(post.type=="weibo" && post.attachment) post.attachment = post.attachment.map(handler)
  return post
}

function replaceUrl(url: string) {
  if (url != "") {
    return ApiUrl + "/url/" + url
  }
  return ""
}

function replaceUrls(urls: [string]) {
  if (urls) return urls.map(replaceUrl)
  return []
}

// 格式化时间
function Format(date, fmt) {
    var o = {
        "M+": date.getMonth() + 1, //月份 
        "d+": date.getDate(), //日 
        "h+": date.getHours(), //小时 
        "m+": date.getMinutes(), //分 
        "s+": date.getSeconds(), //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
</script>

<style lang="scss" scoped>
.goto {
  font-size: 1.5em;
  position: absolute;
  padding: 0.25em;
  border-radius: 1em;
  transition: all 0.2s;
  z-index: 50;
  top: 0.5em;

  &[aria-label="arrow redo outline"] {
    right: 0.5em;
  }

  &[aria-label="alert circle outline"] {
    right: 2.25em;
  }
}

.goto:hover {
  color: rgb(0,161,214);
  background-color: rgba(0,0,0,0.1);
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.date {
  color: grey;
  text-align: right;
  font-size: 12px;
}
</style>