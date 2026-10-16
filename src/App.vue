<template>
  <!-- Element Plus 布局组件：el-container 外层容器，垂直排列 header / main / footer -->
  <el-container class="app-container">
    <!-- 顶部导航：含文章、后台入口 -->
    <el-header class="app-header" height="auto">
      <TheHeader :site-title="siteTitle" />
    </el-header>

    <!-- 主内容区：路由出口 -->
    <el-main class="app-main">
      <RouterView />
    </el-main>

    <!-- 底部 -->
    <el-footer class="app-footer" height="auto">
      <TheFooter :author="displayName" :year="currentYear" />
    </el-footer>
  </el-container>

  <!-- el-backtop：返回顶部按钮，滚动超过 400px 时出现 -->
  <el-backtop :right="30" :bottom="30" :visibility-height="400" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';
import { useUserStore } from './stores/userStore';

const userStore = useUserStore();
const { displayName } = storeToRefs(userStore);

const siteTitle = ref('hhy 个人主页');
const currentYear = new Date().getFullYear();

onMounted(() => {
  console.log('页面加载完成！Pinia + Vue Router + Element Plus 已启用');
});
</script>

<style>
:root {
  --bg-1: #e0eafc;
  --bg-2: #cfdef3;
  --primary: #4f6df5;
  --primary-dark: #3b54d4;
  --text: #2c3e50;
  --text-light: #6b7280;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: "Segoe UI", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
  min-height: 100vh;
  color: var(--text);
  background: linear-gradient(135deg, var(--bg-1) 0%, var(--bg-2) 100%);
}
</style>

<style scoped>
.app-container { max-width: 960px; margin: 0 auto; min-height: 100vh; }
.app-header { padding: 16px 4px 0; }
.app-main { padding: 16px 4px 8px; }
.app-footer { padding: 0 4px 16px; }
</style>
