<template>
  <!-- Element Plus 导航菜单：mode="horizontal" 水平菜单，:router="true" 开启路由模式，
       index 即为跳转路径，当前路由自动高亮（替代实验三的 router-link-active 类） -->
  <header class="site-header">
    <el-menu
      mode="horizontal"
      :router="true"
      :default-active="activePath"
      :ellipsis="false"
      class="site-menu"
    >
      <el-menu-item index="/home" class="site-title-menu">{{ siteTitle }}</el-menu-item>
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index="/projects">项目</el-menu-item>
      <el-menu-item index="/articles">文章</el-menu-item>
      <el-menu-item index="/about">关于</el-menu-item>
      <!-- 登录状态下额外显示后台入口（读取 Pinia userStore 状态） -->
      <el-menu-item v-if="isLogin" index="/admin/profile">后台</el-menu-item>
      <div class="menu-flex-grow" />
      <el-menu-item v-if="!isLogin" index="/login">登录</el-menu-item>
      <el-menu-item v-else index="/login" @click="onLogout">退出登录</el-menu-item>
    </el-menu>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/userStore';

defineProps({
  siteTitle: { type: String, default: '个人主页' }
});

const route = useRoute();
const router = useRouter();

// Pinia Store：登录状态决定是否显示后台入口 / 退出按钮
const userStore = useUserStore();
const { isLogin } = storeToRefs(userStore);

// 当前激活菜单：后台子页面也保持"后台"菜单高亮效果
const activePath = computed(() => '/' + route.path.split('/')[1]);

function onLogout() {
  userStore.logout();
  ElMessage.success('已退出登录');
  router.push({ name: 'home' });
}
</script>

<style scoped>
.site-header {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(79, 109, 245, 0.18);
}
.site-menu {
  border-bottom: none;
  font-weight: 600;
}
.site-title-menu {
  font-size: 18px;
  font-weight: 800;
  color: #3b54d4;
}
/* 标题项不需要选中态样式 */
.site-title-menu:hover,
.site-title-menu.is-active {
  border-bottom: 2px solid transparent;
  color: #3b54d4;
}
.menu-flex-grow { flex-grow: 1; }
</style>
