<template>
    <div class="shadow-container">
        <a :href="post.url" style="color: #2c3e50" target="_blank"><ion-icon name="arrow-redo-outline" class="goto"></ion-icon></a>
        <Card :card="post.card" style="margin: -16px"></Card>
        <p v-html="post.text"></p>
        <p style="color: grey;text-align: right;margin-bottom: 0;">{{ Format(new Date(post.time * 1000), "yy-MM-dd hh:mm:ss") }} {{ post.source }}</p>
        <Post v-if="post.repost" :post="post.repost"></Post>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import Card from './Card.vue'

const prop = defineProps({ post: Object })

switch (prop.post.type) {
    case "weibo":
        prop.post.url = `https://weibo.com/${prop.post.uid}/${prop.post.mid}`
        break
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