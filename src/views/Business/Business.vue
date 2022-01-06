<!--
 * @Descripttion: This is one of the pages for object
 * @version: 1.0
 * @Author: Ada
 * @Date: 2022-01-05 15:51:51
 * @LastEditors: Ada
 * @LastEditTime: 2022-01-06 10:16:28
-->
<template>
  <div class="business-page">
      <div :class="{'right-option':true}">
          <div  @click="openMenuList" :class="{'isWidth':openMenu,'menu-option':true}">
            <div class="menu-title">
              <i class="iconfont iconcaidan"></i>
            </div>
            <div class="menu-list" v-if="openMenu">
              <div class="menu-list-item" v-for="(item,index) in 4" :key="index">
                <div class="sign">简易瞬态空旷法</div>
                <div class="title-sign">
                  <div class="title-span"> 川AT0X22</div>
                </div>
                <div class="item-type-sign">
                  <div class="type-item">非运营</div>
                  <div class="type-item">小型汽车</div>
                </div>
                <div class="car-info">
                  <div class="left-info">
                    <div class="info-item">
                      <span>车架号(VIN):</span>
                      <p>LBERCACBOBX110765</p>
                    </div>
                    <div class="info-item">
                      <span>车架号(VIN):</span>
                      <p>LBERCACBOBX110765</p>
                    </div>
                  </div>
                  <div class="right-info">
                    <div class="delete-icon">
                      <i class="iconfont iconshanchu"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div class="content-box">
        <div class="main-box">
          <div class="title">
            <span>业务受理</span>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: '',
  props: [],
  components: {},
  data() {
  return {
    openMenu:true
  };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    openMenuList() {
      this.openMenu = !this.openMenu
    }
  },
};
</script>
<style lang='scss' scoped>
@import './Business.scss'
</style>