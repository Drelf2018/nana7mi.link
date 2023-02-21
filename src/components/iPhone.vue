<template>
    <div class="iPhone">
        <div>
            <slot>
                <video ref="video" :muted="vid == 0" autoplay :src="src == '' ? URL + videoList[vid] : src" @click="switchVideo">
                </video>
            </slot>
        </div>
        <img src="https://yun.nana7mi.link/iPhone8.webp">
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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

function play(url: string) {
    src.value = url
    setTimeout(() => video.value.play().catch(console.log), 1)
}

function switchVideo() {
    vid.value = vid.value % (videoList.value.length - 1) + 1
    play("")
}

defineExpose({ play })
</script>

<style lang="scss" scoped>
.iPhone {
    padding-top: 8px;
    width: 276px;
    height: 554px;
    z-index: 2;
    margin: auto;
    position: relative;

    @include themeify{
        opacity: themed('fill');
    }

    div {
        margin: 22.5% 6% 0;
        width: 88%;
        height: 77.5%;
        background-color: black;

        video {
            height: 100%;
            width: 100%;
        }
    }

    img {
        position: absolute;
        top: 8px;
        left: 0;
        pointer-events: none;
        width: 100%;
    }
}
</style>
