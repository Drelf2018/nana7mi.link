<template>
  <div class="bg"></div>
  <div class="content">
    <div class="date">
      <div class="shadow-container">
        <Swiper speed=2000 width="236px" :banner="banner"></Swiper>
      </div>
      <div class="shadow-container" style="font-size: 3em;">你好<br />李鑫</div>
    </div>
    <div class="post">
      <div class="shadow-container">
        <img alt="Vue logo" src="../assets/logo.png">
        <h1>{{ msg }}</h1>
        <p>
          For a guide and recipes on how to configure / customize this project,<br>
          check out the
          <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
        </p>
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
    <div class="date">
      <div class="shadow-container" style="font-size: 3em;">日期</div>
      <div class="btn shadow-container" style="width: max-content;">切换背景</div>
    </div>
  </div>

</template>

<script>
import { ref } from 'vue'
import Swiper from './Swiper.vue'

export default {
  components: {
    Swiper
  },
  setup() {
    const banner = ref([
      {
        link: "https://www.bilibili.com/video/BV1vJ411B7ng",
        url: "https://i2.hdslb.com/bfs/archive/7fe8272ef4c90d07ba2dba968638392f8d5bf490.jpg"
      },
      {
        link: "https://www.bilibili.com/video/BV1he4y1r79x",
        url: "https://i1.hdslb.com/bfs/archive/ca796b3fe2a213c652ebb32469d81511036c7117.jpg"
      },
      {
        link: "https://www.bilibili.com/video/BV1tG411g7Fo",
        url: "https://i0.hdslb.com/bfs/archive/b7868c38077aaa66e233499723a4d7490804f861.png"
      },
      {
        link: "https://www.bilibili.com/video/BV1T24y1R7wd",
        url: "https://i1.hdslb.com/bfs/archive/ab9738d7aee96044183b61c7dd9c95eb1ec17ed1.jpg"
      },
      {
        link: "https://www.bilibili.com/video/BV1pR4y1W7M7",
        url: "https://i0.hdslb.com/bfs/new_dyn/8b90b7582c6fa3023eda3ffb58bf8eeb1464240042.png"
      },
      {
        link: "",
        url: "src/assets/logo.png"
      }
    ])
    return { banner }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg {
  z-index: -1;
  position: fixed;
  top: 0;
  left: 50%;
  width: 100%;
  height: 100vw;
  transform: translateX(-50%);
  background-color: rgb(246,248,250);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: top;
}

.shadow-container {
  position: relative;
  z-index: 1;
  padding: 16px;
  margin: 8px 4px;
  border-radius: 5px;
  background-color: #FFF;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 12%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 20%)
}

.post {
  width: 600px;
}

.date {
  position: sticky;
  top: 64px;
  width: 276px;
}

.btn:hover {
  background-color: rgb(245, 245, 245);
  box-shadow: 0 1px 3px grey;
}

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
</style>
