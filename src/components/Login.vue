<template>
  <div ref="hidden" id="hidden-login-form" style="display: none;">
    <div id="popLayer"></div>
    <div class="container">
      <ion-icon name="close" class="close" @click="close"></ion-icon>
      <div class="glass">
        <div class="login-form">
          <h2>
            登录到 <span style="color: rgb(0, 161, 214)">Nana7mi.link</span>
            <br />
            <em><span style="color: grey;font-size: 8px;">账号不存在会自动注册</span></em>
          </h2>
          <input type="text" v-model="uid" placeholder="B站UID">
          <button @click="getToken">获取验证码</button>
          <div class="split"></div>
          <span :class="{'no-token': token == '验证码', 'token': true}">
            {{ token }}
          </span>
          <span style="color: rgb(60,60,60);font-size: 12px;margin: 0.5em 0;">
            <em>发送验证码至 </em>
            <a href="https://t.bilibili.com/643451139714449427" style="color: rgb(255 74 64);" target="_blank">动态评论</a>
            <em> 验证账号</em>
          </span>
          <div class="split"></div>
          <button @click="login">{{ canLogin ? '登录' : token == '验证码' ? '等待中' : '验证中' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

const uid = ref("")
const token = ref("验证码")
const canLogin = ref(false)

const hidden = ref(null)

let secret = ""
let plan = null

function close() {
  hidden.value.style.display = "none"
}

function getToken() {
  let bid = parseInt(uid.value)
  if (isNaN(bid)) return
  axios.get("https://api.nana7mi.link/token?uid="+uid.value).then(
    res => {
      secret = res.data.data[0]
      token.value = res.data.data[1]
      if (plan) clearInterval(plan)
      plan = setInterval(async () => {
        let res = await axios.get("https://aliyun.nana7mi.link/comment.get_comments(643451139714449427,type,1:int).replies?var=type%3C-comment.CommentResourceType.DYNAMIC")
        res.data.data.filter(r => r.member.mid == uid.value).forEach(r => {
          if (r.content.message == token.value) {
            canLogin.value = true
            clearInterval(plan)
            plan = null
          }
        })
      }, 5000)
    }
  )
}

function login() {
  if (!canLogin.value) return
  axios.get("https://api.nana7mi.link/register?uid="+uid.value+"&token="+secret).then(
    res => {
      if (res.data.code == 0) {
        localStorage.setItem("uid", uid.value)
        localStorage.setItem("token", res.data.data)
        location.reload()
      }
    }
  )
}
</script>

<style scoped>
#popLayer {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 110;
    background-color: rgba(0,0,0,0.5);
}
.container {
  position: fixed;
  width: 800px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: flex-start;
  padding: 2em;
  background: url("https://yun.nana7mi.link/afternoon.webp") 0px center / cover no-repeat fixed;
  z-index: 120;
  border-radius: 10px;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 32%),
              0 2px 2px 0 rgb(0 0 0 / 34%),
              0 1px 5px 0 rgb(0 0 0 / 40%);
}

.glass {
  width: 300px;
  position: relative;
  border-radius: 20px;
  padding: 0.5em 1em;
  box-shadow: 0 0 10px 0px rgb(0 0 0 / 30%);
  overflow: hidden;
  z-index: 2;
  background: inherit;
}

.glass::before {
  content: "";
  position: absolute;
  width: calc(100% + 2em);
  height: calc(100% + 2em);
  top: -1em;
  left: -1em;
  background: inherit;
  box-shadow: 0 0 0 182px rgba(255, 255, 255, 0.4) inset;
  filter: blur(7px);
  z-index: -1;
}

.close {
  font-size: 1.5em;
  position: absolute;
  right: 0.5em;
  top: 0.5em;
  padding: 0.25em;
  border-radius: 1em;
  color: white;
  transition: all 0.2s;
}

.close:hover {
  color: rgba(255, 0, 0, 0.75);
  background-color: white;
  box-shadow: 0 1px 3px white;
}

.login-form {
  display: flex;
  flex-direction: column;
  margin: 20px 30px;
  text-align: center;
  position: relative;
}

.split {
  width: 98%;
  margin: 0.5em auto;
  border-bottom: solid 2px rgba(128,128,128,0.75);
}

.token {
  line-height: 28px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0.5em;
  margin: 6px 0;
  padding: 6px;
}

.no-token {
  color: rgb(60,60,60);
  font-style: italic;
}

.login-form h2 {
  font-size: 18px;
  font-weight: 400;
}

.login-form input,
.login-form button {
  margin: 6px 0;
  height: 40px;
  border: none;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0.5em;
  padding: 0 14px;
  color: #3d5245;
  font-family: HarmonyOS_Bold;
  font-size: 16px;
  transition: all 0.2s;
}

.login-form input::placeholder {
  color: #3d5245;
}

.login-form button:focus,
.login-form input:focus {
  outline: 0;
}

.login-form button:hover, .login-form input:hover {
  background-color: rgba(255, 255, 255, 0.75)
}
</style>