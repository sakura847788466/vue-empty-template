<!--
 * @Descripttion: layout入口文件、项目主图视图
 * @version: 1.0
 * @Author: Ada
 * @Date: 2021-12-30 13:54:09
 * @LastEditors: Ada
 * @LastEditTime: 2022-01-05 16:02:41
-->
<template>
  <div id="main-layout">
    <div class="top">
      <Top />
    </div>
    <div :class="{'changeBg':this.$route.name === 'business','main-content':true}">
      <div class="left-slider" v-if="this.$route.meta.isLeft">
      </div>
      <div class="main-box">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import Top from '../layout/components/top/top'
export default {
  name: 'layout',
  props: [],
  components: {
    Top
  },
  data() {
  return {};
  },
  computed: {},
  created() {},
  mounted() {
    // eslint-disable-next-line no-console
    console.log(this.$route)
  },
  methods: {},
};
</script>
<style lang='scss' scoped>
@import './index.scss'
</style>