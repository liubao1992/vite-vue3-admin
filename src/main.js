import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as echarts from "echarts";
import App from './App.vue'
import router from './router/index'
import axios from 'axios'
import 'element-plus/theme-chalk/index.css' //默认css样式
const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.config.globalProperties.$echarts = echarts
app.config.globalProperties.$axios= axios
app.mount('#app')
