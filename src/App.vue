<template>
  <router-view />
</template>

<style lang="scss">
.shadow-container {
  position: relative;
  z-index: 1;
  padding: 16px;
  margin: 8px 4px;
  border-radius: 5px;
  transition: all 0.2s;

  @include themeify{
    color: themed('shadow-container-color');
    background-color: themed('shadow-container-back');
    box-shadow: themed('shadow-container-box');
  }

  a {
    color: #eb7350;
  }
}

#app[data-theme=light] .shadow-container {
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 12%),
              0 2px 2px 0 rgb(0 0 0 / 14%),
              0 1px 5px 0 rgb(0 0 0 / 20%);
}
</style>