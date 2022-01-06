/*
 * @Descripttion: element组件
 * @version: 1.0
 * @Author: Ada
 * @Date: 2021-12-30 14:37:53
 * @LastEditors: Ada
 * @LastEditTime: 2022-01-05 14:32:08
 */
import Vue from 'vue'
import {
  Dialog,
  Input,
  Select,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimePicker,
  Tooltip,
  Alert,
  Row,
  Col,
  Image,
  Loading,
  MessageBox,
  Form,
  FormItem,
  Message,
  Notification,
  Menu,
  CheckboxGroup,
  Checkbox,
  Icon,
  RadioGroup,
  Radio,
  Popover,
  InputNumber,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Submenu,
  MenuItem
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Dialog)
// Vue.use(Autocomplete)
Vue.use(Input)
Vue.use(Select)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(ButtonGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Tooltip)
Vue.use(Alert)
Vue.use(Row)
Vue.use(Col)
Vue.use(Image)
Vue.use(Menu)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Icon)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Popover)
Vue.use(InputNumber)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Loading)
Vue.use(Loading.directive)

// 注册Vue全局
Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

