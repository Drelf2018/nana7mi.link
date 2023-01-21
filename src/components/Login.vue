<template>
  <div class="container">
    <div class="glass">
      <ion-icon v-drag name="move-outline" class="move"></ion-icon>
      <div class="login-form">
        <h2>
          登录到 <span style="color: rgb(0, 161, 214)">Nana7mi.link</span>
          <br />
          <em><span style="color: grey;font-size: 8px;">账号不存在会自动注册</span></em>
        </h2>
        <input type="text" v-model="uid" placeholder="B站UID">
        <input type="password" v-model="token" placeholder="密码">
        <em><span style="color: grey;font-size: 8px;">发送密码至
          <a href="https://space.bilibili.com/1464240042" style="color: rgb(0, 161, 214)">@七海今天喝什么</a> 验证账号
        </span></em>
        <button @click="login">登录</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

const uid = ref("")
const token = ref("")

function login() {
  axios.get("https://api.nana7mi.link:5784/login", { params: { uid: uid.value, token: token.value } }).then(
    res => {
      localStorage.setItem("uid", uid.value)
      localStorage.setItem("token", res.data.token)
      window.history.go(-1)
    }
  )
}
</script>

<style>
.container {
  display: flex;
  /* justify-content: center; */
  align-items: flex-start;
  height: calc(100vh - 64px);
  background: url("https://danmu.nana7mi.link/bg.png") 0px center / cover no-repeat fixed;
  overflow: hidden;
}

.glass {
  width: 300px;
  top: 16px;
  left: calc(50vw - 150px);
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
  box-shadow: 0 0 0 152px rgba(255, 255, 255, 0.2) inset;
  filter: blur(10px);
  z-index: -1;
}

.move {
  font-size: 1.5em;
  position: absolute;
  left: 0.4em;
  top: 0.4em;
  padding: 0.25em;
  border-radius: 10px;
}

.move:hover {
  box-shadow: 0 1px 3px grey;
}

.login-form {
  display: flex;
  flex-direction: column;
  margin: 20px 30px;
  text-align: center;
  position: relative;
}

.login-form h2 {
  font-size: 18px;
  font-weight: 400;
}

.login-form input,
.login-form button {
  margin: 6px 0;
  width: 100%;
  height: 36px;
  border: none;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0.5em;
  padding: 0 14px;
  color: #3d5245;
  font-family: HarmonyOS_Bold;
}

.login-form input::placeholder {
  color: #3d5245;
}

.login-form button:focus,
.login-form input:focus {
  outline: 0;
}

.login-form button {
  margin-top: 24px;
  font-size: 16px;
  transition: all 0.2s;
}

.login-form button:hover {
  background-color: rgba(255, 255, 255, 0.75)
}
</style>