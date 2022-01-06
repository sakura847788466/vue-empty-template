<!--
 * @Descripttion: 顶部导航栏组件
 * @version: 1.0
 * @Author: Ada
 * @Date: 2021-12-30 13:56:07
 * @LastEditors: Ada
 * @LastEditTime: 2022-01-05 15:41:08
-->
<template>
  <div class="top-part">
    <div class="logo">
      <img src="../../../assets/logo.png" alt />
      <span>机动车环保检验管理平台系统</span>
    </div>
    <div class="nav-menu">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item :index="index.toString()" v-for="(item,index) in menuList" :key="index">
          <template slot="title">
              <img :src="activeIndex === index.toString()?item.activeImage:item.defaluatImg" alt />
              <span class="menu-text">{{item.text}}</span>
          </template>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>
<script>
export default {
  name: "top",
  props: [],
  components: {},
  data() {
    return {
      activeIndex: '0',
      menuList:[{
        path:'',
        defaluatImg:require('../../../assets/navdefalut.png'),
        activeImage:require('../../../assets/nav.png'),
        text:'业务受理'
      },{
        path:'',
        defaluatImg:require('../../../assets/defCar.png'),
        activeImage:require('../../../assets/car.png'),
        text:'待检车辆'
      },{
        path:'',
        defaluatImg:require('../../../assets/defReport.png'),
        activeImage:require('../../../assets/report.png'),
        text:'监测报告'
      },{
        path:'',
        defaluatImg:require('../../../assets/defPeople.png'),
        activeImage:require('../../../assets/people.png'),
        text:'申请审核'
      },{
        path:'',
        defaluatImg:require('../../../assets/defFind.png'),
        activeImage:require('../../../assets/find.png'),
        text:'查询统计'
      },{
        path:'',
        defaluatImg:require('../../../assets/defMange.png'),
        activeImage:require('../../../assets/mange.png'),
        text:'系统管理'
      }]
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handleSelect(index) {
      this.activeIndex = index.toString()
      // eslint-disable-next-line no-console
      console.log(index)
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./top.scss";
</style>