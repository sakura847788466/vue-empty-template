<!--
 * @Descripttion: 系统设置
 * @version: 1.0
 * @Author: Ada
 * @Date: 2021-12-30 11:31:09
 * @LastEditors: Ada
 * @LastEditTime: 2022-01-04 16:45:18
-->

<template>
  <div class="main-box-container">
    <div class="left">
      <div class="option-list">
        <div class="title">
          <img src="../../../assets/title-sign.png" alt="">
          <span>操作选项</span>
        </div>
        <div class="option-btn">
           <el-button type="primary" @click="openAddStation">添加站点</el-button>
           <el-button type="primary">添加区域名称</el-button>
        </div>
            <el-dialog
              title="添加站点"
              :visible.sync="dialogVisible"
              width="30%"
              custom-class="addStationDialog"
              :before-close="handleClose">
              <div class="dialog-container">
                <el-form ref="stationForm" :model="staionInfo" label-width="80px" :rules="rules">
                  <el-form-item  label="经纬度" >
                    <el-form-item class="latlng" prop="lon">
                      <el-input v-model="staionInfo.lon" placeholder="请输入经度"></el-input>
                    </el-form-item>
                    <p class="sign">-</p>
                     <el-form-item class="latlng" prop="lat">
                      <el-input v-model="staionInfo.lat" placeholder="请输入纬度"></el-input>
                    </el-form-item>
                  </el-form-item>
                  <el-form-item  label="站点状态" >
                      <el-radio v-model="staionInfo.status" :label="0">正常</el-radio>
                      <el-radio v-model="staionInfo.status" :label="1">异常</el-radio>
                      <el-radio v-model="staionInfo.status" :label="2">禁用</el-radio>
                  </el-form-item>
                   <el-form-item  label="站点名称" prop="name">
                      <el-input v-model="staionInfo.name" placeholder="请输入站点名称"></el-input>
                  </el-form-item>
                </el-form>
                <div class="isTrueAdd" @click="addOnlyStation">
                  <span>添加</span>
                </div>
              </div>
            </el-dialog>
      </div>
      <div class="option-list">
        <div class="title">
          <img src="../../../assets/title-sign.png" alt="">
          <span>台风相关</span>
        </div>
        <div class="option-btn">
           <el-button type="primary">绘制台风</el-button>
           <el-button type="primary">清除当前台风</el-button>
        </div>
      </div>
      <div class="option-list">
        <div class="title">
          <img src="../../../assets/title-sign.png" alt="">
          <span>图层相关</span>
        </div>
        <div class="option-btn">
           <el-button type="primary" @click="changeLayer">{{layerStatus?'图层切换(天地图)':'图层切换(遥感图)'}}</el-button>
           <el-button type="primary" @click="geoJsonDraw">{{geoJsonStatus?'geoJson区域移除':'geoJson区域描边'}}</el-button>
        </div>
      </div>
        <div class="option-list">
        <div class="title">
          <img src="../../../assets/title-sign.png" alt="">
          <span>风场相关</span>
        </div>
        <div class="option-btn">
           <el-button type="primary" @click="addWindyAllGlobal">{{windGlobalStatus?'移除风场效果(全球)':'添加风场效果(全球)'}}</el-button>
           <el-button type="primary" @click="addWindyOnlyPart">{{windPartStatus?'移除风场效果(局部)':'添加风场效果(局部)'}}</el-button>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="nav-option">
        <ul>
          <li v-for="(item,index) in optionsList" :key="index" @click="item.clickEvent(index)" :class="{'isActive':currentActive === index}">
            <i :class="item.iconClass"></i>
            <span>{{item.text}}</span>
          </li>
        </ul>
        <!-- 定位输入框 -->
        <div class="position-box">
          <div class="position-left">
            <el-input v-model.number="position.lat" placeholder="请输入经度"></el-input>
            <p>-</p>
            <el-input v-model.number="position.lng" placeholder="请输入纬度"></el-input>
          </div>
          <div class="position-right" @click="mapPosition">定位</div>
        </div>
      </div>
      <div id="map"></div>
    </div>
  </div>
</template>
<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "@/utils/leaflet.ChineseTmsProviders.js";
import '@/utils/wind/leaflet-velocity.css'
import '@/utils/wind/leaflet-velocity'
import areaData from '@/utils/data/area.js'
import Axios from 'axios'
export default {
  name: 'user',
  props: [],
  components: {},
  data() {
    var validateLongitude = (rule, value, callback) => {
      let reg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,8})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,8}|180)$/g
      if (!value) {
        callback(new Error("请输入经度"));
      }else if(!reg.test(value)) {
        callback(new Error("请输入正确的经度，范围:-180~180"));
      } 
      else {
        callback();
      }
    };
     var validateLatitude = (rule, value, callback) => {
      let reg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,8})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,8}|180)$/g
      if (!value) {
        callback(new Error("请输入纬度"));
      }else if(!reg.test(value)) {
        callback(new Error("请输入正确的纬度，范围:-180~180"));
      } 
      else {
        callback();
      }
    };
    var validateStationName = (rule,value,callback) => {
      if (!value) {
        callback(new Error("请输入站点名称"));
      }else {
        callback();
      }
    }
  return {
    map:null,
    normal:null, //当前图层
    vectorMap:null,//遥感图层
    featureGroup:null, //map实例图层组集合
    optionsList:[{
      iconClass:'iconfont iconceju',
      text:'测距',
      clickEvent: index => {
        return this.mapDistance(index)
      }
    },{
      iconClass:'iconfont iconjuxingxuanze',
      text:'矩形',
      clickEvent: index => {
        return this.mapRectangle(index)
      }
    },{
      iconClass:'iconfont icondingwei',
      text:'定位',
      clickEvent: index => {
        return this.openPosition(index)
      }
    },{
      iconClass:'iconfont iconceshi',
      text:'测试',
      clickEvent: index => {
        return this.mapTest(index)
      }
    },{
      iconClass:'iconfont iconceshi',
      text:'清除',
      clickEvent: index => {
        return this.removeRectagle(index)
      }
    }],
    // 弹窗
    dialogVisible:false,
    currentActive:null,
    rules:{
      lat: [{ validator: validateLatitude, trigger: "blur" }],
      lon: [{ validator: validateLongitude, trigger: "blur" }],
      name:[{ validator: validateStationName,trigger: "blur"}]
    },
    staionInfo: {
      lat:'',
      lon:'',
      status:0,
      name:''
    },
    position:{
      lat:'',
      lng:''
    },
    velocityLayer:null,//风场图层
    windGlobalStatus:false,
    windPartStatus:false,
    geoJsonLayer:null,//行政区域图层
    geoJsonStatus:false,
    layerStatus:false,
    wenzhouData:[],
    latlngs:[],//起始点经纬度
    endlatlngs:[],//结束点经纬度
    tmprect:null, //临时矩形
  };
  },
  computed: {},
  created() {},
  mounted() {
    this.initMap()
    this.addRectangle()
    this.addStation()
    this.loadWenzhouRectangle()
  },
  methods: {
     initMap() {
      let imgm = L.tileLayer.chinaProvider("TianDiTu.Satellite.Map", {
          maxZoom: 18,
          minZoom: 1
        }),
        imga = L.tileLayer.chinaProvider("TianDiTu.Satellite.Annotion", {
          maxZoom: 18,
          minZoom: 1
        }),
        normalm = L.tileLayer.chinaProvider("TianDiTu.Normal.Map", {
          maxZoom: 18,
          minZoom: 1
        }),
        normala = L.tileLayer.chinaProvider("TianDiTu.Normal.Annotion", {
          maxZoom: 18,
          minZoom: 1
        });
      this.normal = L.layerGroup([normalm, normala]);
      this.vectorMap = L.layerGroup([imgm, imga]);
      this.map = L.map("map", {
        center: [40.68038, 122.37968],
        minZoom: 1,
        maxBounds: L.latLngBounds(L.latLng(90, -180), L.latLng(-90, 270)),
        layers: [this.normal],
        zoomControl: false,
        preferCanvas: true,
      }).setView([40.40053, 122.3488], 8);
      // this.featureGroup = new L.featureGroup().addTo(this.map); //要素图层组
      // this.map.on("click", e => { //全局监听点击
      //   // eslint-disable-next-line no-console
      //   console.log(e);
      // });
    },
     addRectangle() {
      areaData.data.forEach(item => {
        let itemLatandLng = [
          [item.topLeftLatitude, item.topLeftLongitude],
          [item.bottomRightLatitude, item.bottomRightLongitude]
        ];
        // 绑定区域弹窗 bindPopup
        let popupHtml =`<div>我是${item.name}</div>`
        let rectangle = L.rectangle(itemLatandLng, { color: "#ff7800", weight: 2 }).bindPopup(popupHtml,{maxWidth:300}).addTo(
          this.map
        )
        // 区域添加名称
         let myIcon = L.divIcon({
            html: item.name,
            className: 'my-div-icon',
            iconSize:30
        });
        L.marker([rectangle.getCenter().lat, rectangle.getCenter().lng], { icon: myIcon }).addTo(this.map);
      });
    },
    // 测距
    mapDistance (index) {
      this.currentActive = index
    },
    // 矩形区域框选
    mapRectangle(index) {
        // 先确定中心点坐标
        let _this = this;
        _this.currentActive = index
        L.DomUtil.addClass(_this.map._container, "leaflet-cursor-pointer"); //添加鼠标样式
        _this.map.on("click", e => {
          _this.drangeLeftTopPoint(e);
        }); //点击地图 绘制左上方起点
    },
    drangeLeftTopPoint(e) {
      let _this = this;
      let tmprect = null //临时矩形
      let rectangle = null //最终矩形
      
      _this.latlngs = [e.latlng.lat, e.latlng.lng]; //latlngs 四角经纬度
      // 定义起始点
      _this.map.off("mousedown");
      // 监控拖动事件绘制
      _this.map
        .on("mousemove", e => {
          _this.map.off('click')
          _this.endlatlngs = [e.latlng.lat, e.latlng.lng];
          _this.finalLng = [_this.latlngs, _this.endlatlngs];
          // 绘制下一个的时候把上一个的去掉，否则图层会叠加
          if (tmprect) {
            tmprect.remove();
          }
         tmprect = L.rectangle(_this.finalLng, {
            color: "#409eff",
            weight: 3,
            fillColor: "#FFFFFF",
            fillOpacity: 0.7,
          }).addTo(_this.map); //临时矩形
        })
        .on("dblclick", () => {
          _this.map.off("mousemove").off("click").off('dblclick');
          _this.currentActive = null
          if (tmprect) {
            tmprect.remove();
          }
          if(rectangle) {
            rectangle.remove()
          }
          rectangle = L.rectangle(_this.finalLng, {
            color: "red",
            fillColor:'rgba(255, 255, 255, 0.1)',
            weight: 1
          });
          rectangle.addTo(_this.map);
          L.DomUtil.removeClass(_this.map._container, "leaflet-cursor-pointer"); //恢复鼠标样式
          // 设置框选中心点
          _this.map.fitBounds(_this.finalLng)
        });
    },
    // 矩形清除
    removeRectagle() {

    },
    // 添加全球风场
    async addWindyAllGlobal() {
      if(this.velocityLayer) {
        this.map.removeLayer(this.velocityLayer)
        this.windGlobalStatus = false
        this.velocityLayer = null
      }else {
        let windyData = ((await Axios.get(`https://datacenter.istrongcloud.com/data/gfs/fcdata/202112/20/08/006.json?v=1639982791935`)).data)['2021122014']
        this.velocityLayer = L.velocityLayer({
              displayValues: true,
              displayOptions: {},
              velocityScale: 0.01,
              colorScale: ["rgba(95, 144, 250, 1)", "rgba(108, 115, 249, 1)"],
              data: windyData,
              minVelocity: 10,
              maxVelocity: 15
            }).addTo(this.map);
        }
        this.windGlobalStatus = true
    },
    // 添加局部风场(表现形式&&加载方法都一样,只是对应数据不同)
    async addWindyOnlyPart() {
      if(this.velocityLayer) {
        this.windPartStatus = false
        this.map.removeLayer(this.velocityLayer)
        this.velocityLayer = null
      }else {
        this.windPartStatus = true
        let windPartData = (await Axios(`./data/wind-part.json`)).data
        this.map.flyTo([-18.145851771694467, 144.14062500000003], 6);
        this.velocityLayer = L.velocityLayer({
                displayValues: true,
                displayOptions: {},
                velocityScale: 0.01,
                colorScale: ["rgba(95, 144, 250, 1)", "rgba(108, 115, 249, 1)"],
                data: windPartData,
                minVelocity: 10,
                maxVelocity: 15
              }).addTo(this.map);
      }
     
    },
    // 添加单点数据
    addOnlyStation() {
      this.$refs['stationForm'].validate(value => {
        if(value) {
          this.getStationMarker(this.staionInfo)
          this.map.flyTo([this.staionInfo.lat,this.staionInfo.lon])
          this.dialogVisible= false
        }
      })
    
    },
    // 温州数据加载
    async loadWenzhouRectangle() {
      let wenzhouData = ((await Axios('./data/wenzhou.json')).data).data
      wenzhouData.forEach(item => {
        let itemString = JSON.parse(item.boundary)
        this.wenzhouData.push(itemString.coordinates)
      })
    },
    openPosition(index) {
      this.currentActive = index
    },
    openAddStation() {
      this.dialogVisible = true
    },
    // 站点弹窗
    handleClose() {

    },
    // 图层切换
    changeLayer() {
      this.layerStatus = !this.layerStatus
       if (this.layerStatus) {
        this.map.removeLayer(this.normal);
        this.map.addLayer(this.vectorMap);
      } else {
        this.map.removeLayer(this.vectorMap);
        this.map.addLayer(this.normal);
      }
    },
    // 添加geoJson行政区域
    async geoJsonDraw() {
       if(this.geoJsonLayer) {
         this.geoJsonLayer.remove()
         this.geoJsonLayer = null
         this.geoJsonStatus = false
        }else {
           let geoJsonData = (await Axios.get(`./data/liaoningGeo.json`)).data
           this.geoJsonLayer = L.geoJSON(geoJsonData, {
                style: () => {
                  return { color: "#1c79ed" };
                }
            }).addTo(this.map);
            this.geoJsonStatus = true
        }
    },
    // 添加站点
    async addStation() {
      let data = ((await Axios.get('./data/station.json')).data).data
      data.forEach(item => {
        this.getStationMarker(item)
      })
    },
    // 设置站点状态marker status:0 正常 1 异常 2 停用
    getStationMarker(obj) { //1异常时加载报警动画,切换成divIcon渲染
    this.getStationImage(obj.status)
      let myIcon = null
      if(obj && obj.status && obj.status === 1 ){ 
        let stationHtml = `<div class="error-station">
          <img src="${require('../../../../public/image/warn_storm_tide.png')}">
            <span></span><span></span>
          </img>
          </div>`
          myIcon = L.divIcon({
            className: 'my-div-icon',
            html:stationHtml,
            iconSize: [90, 36]
            })
      }else {
            myIcon = L.icon({
              iconUrl: this.getStationImage(obj.status),
              iconSize: [100, 120],
              iconAnchor:[20,40],
              className:'marker-icon'
            })
        // if(obj && (obj.status??3 !== 3)) {
        //    myIcon = L.icon({
        //       iconUrl: this.getStationImage(obj.status),
        //       iconSize: [100, 120],
        //       iconAnchor:[20,40],
        //       className:'marker-icon'
        //     })
        // }else{
        //   // eslint-disable-next-line no-undef
        //   conosle.log(`数据缺失`)
        // }
      }
      L.marker([obj.lat, obj.lon], {icon: myIcon}).addTo(this.map);
    },
    getStationImage(type) {
      return {
        0:require('../../../../public/image/normal_storm_tide.png'),
        1:require('../../../../public/image/warn_storm_tide.png'),
        2:require('../../../../public/image/maintain_storm_tide.png')
      }[type]
    },
    // 地图定位
    mapPosition() {
      this.map.setView([this.position.lng,this.position.lat])
    },
    // 测试方法
    mapTest(index) {
      this.currentActive = index
    }
  },
};
</script>
<style lang='scss' scoped>
@import './User.scss'
</style>