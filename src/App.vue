<!--
 * @Descripttion: 系统主入口
 * @version: 1.0
 * @Author: Ada
 * @Date: 2021-12-30 11:01:10
 * @LastEditors: Ada
 * @LastEditTime: 2021-12-30 14:25:42
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html,
body,
#app {
  height: 100%;
}
</style>
