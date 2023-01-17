<template>
  <a :href="`https://live.bilibili.com/${bili.live_room.roomid}`" target="_blank">
    <img :src="bili.live_room.cover" class="topPhoto">
  </a>
  <div class="linear"></div>
  <div style="display: flex;align-items: center;z-index: 2;position: relative;">
    <a :href="`https://space.bilibili.com/${bili.mid}`" target="_blank">
      <div class="pendant" :url="bili.pendant.image != ''" :style="`background-image: url(${bili.pendant.image})`">
        <img :src="bili.face" :style="'outline-color: ' + bili.vip.nickname_color">
      </div>
    </a>
    <strong>
      <p class="title" :style="`color: ${bili.vip.nickname_color};`">{{ bili.name }}</p>
      <span class="subtitle">关注 {{ bili.following }} - 粉丝 {{ bili.follower }}</span>
    </strong>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { ref } from 'vue';

interface biliInfo {
  mid: number
  face: string
  pendant: { image: string }
  vip: { nickname_color: string }
  name: string
  top_photo: string
  live_room: { cover: string, roomid: number }
  fans_medal: { medal: string }
  sign: string
  following: number
  follower: number
}

export default {
  props: {
    uid: Number
  },
  setup(props) {
    const bili = ref({
      mid: -1,
      face: "",
      pendant: { image: "" },
      vip: { nickname_color: "" },
      name: "",
      top_photo: "",
      live_room: { cover: "", roomid: 0 },
      fans_medal: { medal: "" },
      sign: "",
      following: 0,
      follower: 0
    })

    axios.get(`https://aliyun.nana7mi.link/user.User(${props.uid}).get_user_info()?max_age=86400`).then(
      res => {
        let data: biliInfo = res.data.data
        console.log(data);

        bili.value = data
        bili.value.face = bili.value.face.replace("http:", "https:")
        bili.value.top_photo = bili.value.top_photo.replace("http:", "https:")
        bili.value.pendant.image = bili.value.pendant.image.replace("http:", "https:")
      }
    )

    axios.get(`https://aliyun.nana7mi.link/user.User(${props.uid}).get_relation_info()?max_age=86400`).then(
      res => {
        bili.value.following = res.data.data.following
        bili.value.follower = res.data.data.follower
      }
    )

    return { bili }
  }
}
</script>

<style scoped>
.topPhoto {
  width: 100%;
  border-radius: 5px 5px 0 0;
  display: block;
}

.linear {
  position: relative;
  height: 20px;
  z-index: 2;
  margin-top: -20px;
  background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))
}

.pendant {
  width: 175px;
  height: 175px;
  position: relative;
  zoom: 0.5;
  background-size: contain;
}

.pendant[url=false] img {
  --height: 110px;
  height: var(--height);
  outline-style: solid;
  outline-width: 0.0428 * var(--height);
}

.pendant img {
  position: absolute;
  height: 100px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  border-radius: 50%;
  outline-color: rgb(0, 161, 214);
}

.title {
  font-size: 1.5em;
  margin: 0;
}

.subtitle {
  color: grey;
  font-size: 8px;
}
</style>