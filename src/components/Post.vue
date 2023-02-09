<template>
    <div class="shadow-container">
        <a :href="post.url" style="color: inherit" target="_blank"><ion-icon name="arrow-redo-outline" class="goto"></ion-icon></a>
        <Card :card="post.card" style="margin: -9px"></Card>
        <p v-html="post.text"></p>

        <div v-if="post.repost" class="shadow-container">
            <a :href="post.repost.url" style="color: inherit" target="_blank"><ion-icon name="arrow-redo-outline" class="goto"></ion-icon></a>
            <Card :card="post.repost.card" style="margin: -9px"></Card>
            <p v-html="post.repost.text"></p>
            <img :src="src" v-for="src in post.repost.picUrls" style="width: 100%">
            <p style="color: grey;text-align: right;margin-bottom: 0;font-size: 12px;">{{ Format(new Date(post.repost.time * 1000), "yy-MM-dd hh:mm:ss") }} {{ post.repost.source }}</p>
        </div>

        <img :src="src" v-for="src in post.picUrls" style="width: 100%">
        <p style="color: grey;text-align: right;margin-bottom: 0;font-size: 12px;">{{ Format(new Date(post.time * 1000), "yy-MM-dd hh:mm:ss") }} {{ post.source }}</p>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import Card from './Card.vue'

const props = defineProps({ post: Object })
const post = handler(props.post)

function handler(post) {
    post.face = replaceUrl(post.face)
    post.pendant = replaceUrl(post.pendant)
    post.picUrls = replaceUrls(post.picUrls)
    switch (post.type) {
        case "weibo":
            post.card = {
                cover_href: null,
                cover_url: null,
                face_href: `https://weibo.com/u/${post.uid}`,
                face_url: post.face,
                pendant: post.pendant,
                pendant_color: "rgb(251, 114, 153)",
                title: post.name,
                title_color: "rgb(251, 114, 153)",
                subtitle: post.description
            }
            post.url = `https://weibo.com/${post.uid}/${post.mid}`
            break
    }
    if (post.repost) post.repost = handler(post.repost)
    return post
}

function replaceUrl(url: string) {
  let name = url.split("/").pop()
  if (name != "") {
    return "https://api.nana7mi.link/image/" + name
  }
  return ""
}

function replaceUrls(urls: [string]) {
  if (urls) return urls.map(replaceUrl)
  return []
}

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

<style scoped>
.goto {
  font-size: 1.5em;
  position: absolute;
  right: 0.5em;
  top: 0.5em;
  padding: 0.25em;
  border-radius: 1em;
  transition: all 0.2s;
  z-index: 50;
}

.goto:hover {
  color: rgb(0,161,214);
  background-color: rgba(0,0,0,0.1);
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
</style>