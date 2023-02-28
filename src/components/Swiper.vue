<template>
    <div v-if="pictures.length" class="swiper-container" @mouseenter="stop" @mouseleave="start">
        <div class="swiper-hidden">
            <div :class="[keepMove ^ (selected == 1 ? 1 : 0) ? 'swiper-scroll-back' : 'swiper-scroll-move', 'swiper-scroll']" :style="`left: ${(selected-1)*-100}%`">
                <a v-for="pic in pictures" :href="pic.link" target="_blank">
                    <div class="blur-image" :style="`width: ${width};background-image: url(${pic.url});`"></div>
                    <img :src="pic.url" />
                </a>
            </div>
        </div>
        <div class="dotList">
            <div class="dot" v-for="i in pictures.length - 1" :style="{opacity: selected == i ? '1' : '0.5'}" @click="() => tp(i)"></div>
        </div>
        <ion-icon name="chevron-back-circle" class="swiper-btn" style="left: 0px" @click="() => move(-1)"></ion-icon>
        <ion-icon name="chevron-forward-circle" class="swiper-btn" style="right: 0px" @click="() => move(1)"></ion-icon>
    </div>
</template>

<script setup lang="ts">
import { throttle, Picture } from './tool'
import { ref, onMounted } from 'vue'

const props = defineProps({
    speed: String,
    width: String,
    pictures: Array<Picture>
})
    
const keepMove = ref(0)
const selected = ref(1)
const move: Function = throttle(moveNow, 550)
let timer = null

onMounted(start)

function stop() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}

function start() {
    timer = setInterval(() => {
        selected.value += 1
        if (selected.value >= props.pictures.length)
            setTimeout(() => selected.value = 1, 505)
    }, parseInt(props.speed))
}

function tp(i: number) {
    if (i == 1) {
        keepMove.value = 1
        setTimeout(() => keepMove.value = 0, 505)
    } else {
        keepMove.value = 0
    }
    selected.value = i
}

function moveNow(fro: number) {
    stop()
    if (fro == 1 && selected.value == props.pictures.length - 1) setTimeout(() => selected.value = 1, 505)
    else if (fro == -1) {
        if (selected.value == 2) {
            keepMove.value = 1
            setTimeout(() => keepMove.value = 0, 505)
        }
        else if (selected.value == 1) {
            keepMove.value = 1
            selected.value = props.pictures.length
            setTimeout(() => {
                keepMove.value = 0
                selected.value -= 1
            }, 5)
            return
        }
    }
    selected.value += fro
}
</script>

<style scoped>
.swiper-container {
    border-radius: 5px;
}

.swiper-btn {
    color: #F5F5F7;
    font-size: 40px;
    height: 20%;
    top: 40%;
    position: absolute;
    cursor: pointer;
    transition: all 0.3s;
    opacity: 0;
}

.dotList {
    position: absolute;
    display: flex;
    bottom: 0.5em;
    right: 0.5em;
    opacity: 0.75;
    transition: all 0.3s;
}

.dot {
    --r: 4px;
    background-color: white;
    width: calc(2*var(--r));
    height: calc(2*var(--r));
    border-radius: var(--r);
    margin-left: var(--r);
    transition: all 0.3s;
    box-shadow: 0 2px 3px grey;
}

.swiper-container:hover .swiper-btn {
    opacity: 0.75;
}

.swiper-btn:hover {
    opacity: 1 !important;
}

.swiper-container:hover .dotList {
    opacity: 1;
}

.swiper-hidden {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: inherit;
}

.swiper-scroll {
    position: relative;
    display: flex;
}

.swiper-scroll-move {
    transition: all 0.5s;
}

.swiper-scroll-back {
    transition: none;
}

.blur-image {
    height: 100%;
    position: relative;
    background-size: cover;
    background-position: center;
    /* filter: blur(5px); */
    /* opacity: 0.5; */
}

img {
    position: relative;
    top: -100%;
    width: 100%;
    vertical-align: middle;
}
</style>
