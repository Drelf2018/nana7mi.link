<template>
    <div class="iPhone">
        <div class="ip-container">
            <slot>
                <video ref="video" class="media" :muted="vid == 0" autoplay :src="src == '' ? URL + videoList[vid] : src" @click="switchVideo">
                </video>
            </slot>
        </div>
        <img src="https://yun.nana7mi.link/iPhone8.webp">
    </div>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue'

const vid = ref(0)
const src = ref("")
const URL = ref("https://yun.nana7mi.link/video")
const videoList = ref([
    "/start.webm",
    "/可爱？抱歉！.mp4",
    "/啾、多样性。.mp4",
    "/SexyBack.mp4",
])
const video = ref(null)

function switchVideo() {
    src.value = ""
    vid.value = vid.value % (videoList.value.length - 1) + 1
    video.value.play()
}

function play(url: string) {
    src.value = url
    video.value.play()
}

defineExpose({ play })
</script>

<style scoped>
.iPhone {
    padding-top: 8px;
    width: 276px;
    height: 554px;
    z-index: 2;
    position: relative;
}

.iPhone img {
    position: absolute;
    top: 8px;
    left: 0;
    pointer-events: none;
    width: 100%;
}

.ip-container {
    margin: 23% 6% 0;
    width: 88%;
    height: 77%;
    background-color: black;
}

.media {
  height: 100%;
  width: 100%;
}
</style>
