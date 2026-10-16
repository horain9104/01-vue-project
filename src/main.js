import { createApp } from 'vue'
import { createPinia } from 'pinia'
// Element Plus 全局注册方式：一次性引入组件库与样式（实验阶段采用，简单直接）
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// 注册 Pinia 状态管理插件
app.use(createPinia())
// 注册 Vue Router
app.use(router)
// 注册 Element Plus（附中文语言包，弹窗按钮等文案显示为中文）
app.use(ElementPlus, { locale: zhCn })

app.mount('#app')
