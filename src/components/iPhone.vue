<template>
    <div class="iPhone">
        <div class="ip-container">
            <slot>
                <video ref="veo" class="media" :muted="vid == 0" autoplay :src="URL + videoList[vid]" @click="switchVideo">
                </video>
            </slot>
        </div>
        <img src="https://yun.nana7mi.link/iPhone8.webp">
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const vid = ref(0)
const veo = ref(null)
const URL = ref("https://yun.nana7mi.link/video")
const videoList = ref([
    "/start.webm",
    "/可爱？抱歉！.mp4",
    "/啾、多样性。.mp4",
    "/SexyBack.mp4",
])

function switchVideo() {
    vid.value = vid.value % (videoList.value.length - 1) + 1
    veo.value.play()
}
</script>

<style scoped>
.iPhone {
    padding-top: 8px;
    width: 276px;
    height: 554px;
    z-index: 2;
}

@media screen and (max-width: 1200px) {
    .iPhone {
        padding-top: 0;
        width: calc(100vw - 17px);
        height: calc(200vw - 34px);
    }
}

.iPhone img {
    position: relative;
    top: -100%;
    left: 0;
    pointer-events: none;
    width: 100%;
    height: 100%;
}

.ip-container {
    margin: 23% 6%;
    width: 88%;
    height: 77%;
    background-color: black;
}

.media {
  height: 100%;
  width: 100%;
}
</style>
