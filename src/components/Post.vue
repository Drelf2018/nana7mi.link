<template>
  <div class="shadow-container">
    <a :href="post.url" style="color: inherit" target="_blank"><ion-icon name="arrow-redo-outline" class="goto"></ion-icon></a>
    <ion-icon name="alert-circle-outline" class="goto" @click="() => NoticePost(post)"></ion-icon>
    <Card :card="post.card" style="margin: -9px"></Card>
    <p v-html="post.text"></p>
    <img :src="src" v-for="src in post.picUrls" :style="{width: imgWidth}">
    <Post v-if="post.repost" :key="post.repost.key" :opost="post.repost" />
    <p class="date" :style="[post.attachment.length != 0 ? '' : 'margin-bottom: 0']">{{ post.date }} {{ post.source }}</p>
    <Comments 
      :key="comments.mid"
      :comments="comments"
      :reply="false"
      :last="i == post.attachment.length-1"
      v-for="comments, i in post.attachment"
    />
  </div>
</template>

<script setup lang="ts">
import { ApiUrl, NoticePost, Format } from './tool';
import { ref, onMounted } from 'vue';
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
  post.card = {
    cover_href: null,
    cover_url: null,
    face_href: "",
    face_url: post.face,
    pendant: post.pendant,
    pendant_color: "",
    title: post.name,
    title_color: "#eb7350",
    subtitle: null
  }
  switch (post.type) {
    case "weibo":
      post.card.face_href = `https://weibo.com/u/${post.uid}`
      post.card.pendant_color = "#eb7350"
      post.card.subtitle = post.description
      post.url = `https://weibo.com/${post.uid}/${post.mid}`
      if(post.repost) post.repost = handler(post.repost)
      if(post.attachment) {
        let pl = []
        post.attachment.reverse().forEach(post => {
          if(post.repost == null) Set(pl, post)
          else Insert(pl, post)
        })
        post.attachment = pl.map(handler)
      }
      break
    case "weiboComment":
      post.card.face_href = `https://weibo.com/u/${post.uid}`
      post.card.pendant_color = "transparent"
      if(post.repost.length != 0) post.repost = post.repost.map(handler)
      break
  }
  return post
}

function Set(pl, post) {
  let flag = false
  for(let i=0;i<pl.length;i++) if(pl[i].mid == post.mid) {
    flag=true
    break
  }
  if(!flag) {
    post.repost = []
    pl.push(post)
  }
}

function Insert(pl, post) {
  for(let i=0;i<pl.length;i++) {
    if(post.repost.type + post.repost.mid == pl[i].key) {
      Set(pl[i].repost, post)
      return
    }
    Insert(pl[i].repost, post)
  }
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