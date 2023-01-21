<template>
  <Nav v-if="!phone" src="https://yun.nana7mi.link/7mi.webp" :height="height" :theme="theme" :face="face"></Nav>
  <router-view :theme="theme" />
  <Spine v-if="!phone" fileName="/build_char_002_amiya_test_1" y="-7" />
  <Spine v-if="!phone" fileName="/build_char_358_lisa_lxh_1" lambda="5000" />
  <Spine v-if="!phone" fileName="/build_char_391_rosmon_epoque_17" lambda="6000" />
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, Ref } from 'vue'
import { Theme, faceInfo } from './components/tool'

import Nav from './components/Nav.vue'
import Spine from './components/Spine.vue'

const height = ref(window.location.pathname == "/login" ? "64px" : "200px")
const phone = ref(window.location.pathname == "/phone")
const theme = ref(new Theme(phone.value, height.value == "64px"))

const face: Ref<faceInfo> = ref({
  face_href: "",
  face_url: "",
  pendant: "",
  pendant_color: ""
})

axios.get("https://api.nana7mi.link:5784/login", { params: { uid: localStorage.getItem("uid"), token: localStorage.getItem("token") } }).then(
  res => {
    if (res.data.code != 0) throw res.data.error
    localStorage.setItem("token", res.data.token)
    return res.data.url
  }
).then(
  url => axios.get(url).then(
    res => {
      let data = res.data.data
      let info: faceInfo = {
        face_href: `https://space.bilibili.com/${data.mid}`,
        face_url: data.face,
        pendant: "",
        pendant_color: data.vip.nickname_color,
      }
      face.value = info
    }
  )
).catch(console.log)

</script>

<style>
input {
  display: block;
  box-sizing: border-box;
  width: 592px;
  height: 40px;
  font-size: 1em;
  font-weight: 540;
  padding: 1px 0 0 0.5em;
  border: 1px solid #ced4da;
  border-radius: 0.5em;
  transition: all 0.2s;
  opacity: 0.65;
}

input:hover {
  opacity: 0.85;
}

input:focus {
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
  opacity: 1;
}
</style>