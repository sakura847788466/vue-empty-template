<!--
 * @Descripttion: layout入口文件、项目主图视图
 * @version: 1.0
 * @Author: Ada
 * @Date: 2021-12-30 13:54:09
 * @LastEditors: Ada
 * @LastEditTime: 2021-12-30 15:22:39
-->
<template>
  <div id="main-layout">
    <div class="top">
    </div>
    <div class="main-content">
      <div class="left-slider">
      </div>
      <div class="main-box">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'layout',
  props: [],
  components: {
  },
  data() {
  return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang='scss' scoped>
@import './index.scss'
</style>