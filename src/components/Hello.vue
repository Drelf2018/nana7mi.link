<template>
  <div :class="['content', `view-${theme.theme}`]">
    <div class="tool">
      <div class="date shadow-container" style="font-size: 3em;">日期</div>
    </div>
    <div class="post">
      <div class="shadow-container" style="-webkit-user-select: none;user-select: none;">
        <Spine fileName="/build_char_002_amiya_test_1"></Spine>
        <h1>{{ msg }}</h1>
      </div>
      <div class="shadow-container">
      <h3>Installed CLI Plugins</h3>
      <ul>
        <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank"
            rel="noopener">babel</a></li>
        <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank"
            rel="noopener">eslint</a></li>
      </ul>
      </div>
      <div class="shadow-container">
      <h3>Essential Links</h3>
      <ul>
        <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
        <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
        <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
        <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
        <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
      </ul></div>
      <div class="shadow-container">
      <h3>Ecosystem</h3>
      <ul>
        <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
        <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
        <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a>
        </li>
        <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
        <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
      </ul></div>
      
      <div class="shadow-container" v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]">
        <h3>Test{{ i }}</h3>
        <ul>
          <li v-for="j in ['aa', 'bb', 'cc', 'dd', 'ee']"><a href="/">vue-{{ j }}-{{ i }}</a></li>
        </ul>
      </div>
    </div>
    <div class="sider">
      <div class="shadow-container" :style="`padding:0;transition: all 0.2s;opacity:${theme.theme == 'light' ? '1' : '0.5'}`">
        <Swiper speed=2000 width="268px" :banner="banner" />
      </div>
      <div class="shadow-container" style="font-size: 3em;">你好<br />李鑫</div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, PropType } from 'vue'
import axios from 'axios'
import Swiper, { Picture } from './Swiper.vue'
import { Theme } from './theme'
import Spine from './Spine.vue'

export default {
  components: { Swiper, Spine },
  props: { 
    theme: Object as PropType<Theme>
  },
  async setup() {

    async function getPic(bvid: string) {
      let res = await axios.get(`https://aliyun.nana7mi.link/video.Video(${bvid}).get_info().pic?max_age=2592000`)
      let pic: Picture = {
        link: `https://www.bilibili.com/video/${bvid}`,
        url: res.data.data
      }
      return pic
    }

    const msg = ref("阿米娅好可爱（戳戳试试")
    const banner = ref([])

    let bvs = [
      "BV1Nd4y1E7Xi", "BV1NV4y1s7qy", "BV1Wq4y1g7SW", "BV1WQ4y1i7NH", "BV1Y541177Rg", "BV18q4y1z7Vv",
      "BV1vJ411B7ng", "BV1n3411Y7fR", "BV1d34y1D7Vk", "BV1wT4y1r7g6", "BV1924y1R76y", "BV1JA4y1d7Bb", 
      "BV1yU4y1W7Y2", "BV1tU4y1R7qu", "BV1yf4y137XH", "BV16D4y177Ef", "BV1DK4y1g7zE", "BV19K4y1p7Zh"
    ]
    for (let bvid of bvs) {
      banner.value.push(await getPic(bvid))
    }

    return { msg, banner }
  }
}
</script>

<style scoped>
.shadow-container {
  position: relative;
  z-index: 1;
  padding: 16px;
  margin: 8px 4px;
  border-radius: 5px;
  transition: background-color 0.2s ease 0, color 0.2s ease 0;
}

.view-light div .shadow-container {
  background-color: #FFF;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 12%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 20%);
}

.view-dark div .shadow-container {
  color: rgb(201, 209, 217);
  background-color: rgb(43,43,43);
  box-shadow: inset 0 0 0 1px rgb(48, 54, 61);
}

.post {
  width: 600px;
}

.sider, .tool {
  position: sticky;
  top: 64px;
  width: 276px;
}

/* .btn {
  width: max-content;
  left: 100%;
  transform: translateX(calc(-100% - 8px));
  -webkit-user-select: none;
  user-select: none;
} */

/* .btn:hover {
  background-color: rgb(245, 245, 245) !important;
  box-shadow: 0 1px 3px grey !important;
} */

.content {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

@media screen and (max-width: 1200px) {
  .content {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .sider {
    display: none;
  }

  .tool {
    position: static;
    width: 600px;
    margin-bottom: -8px;
  }
}

@media screen and (max-width: 750px) {
  .post, .tool {
    width: 80%;
  }
}
</style>
