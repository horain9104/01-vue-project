<template>
  <!-- 后台管理父布局：el-menu 垂直子导航 + 子路由出口 -->
  <section class="admin-view">
    <el-card shadow="always" class="page-card">
      <template #header>
        <div class="head">
          <h2 class="section-title">后台管理</h2>
          <!-- el-popconfirm：删除/退出等敏感操作的气泡确认框 -->
          <el-popconfirm
            title="确定要退出登录吗？"
            confirm-button-text="确定"
            cancel-button-text="取消"
            @confirm="handleLogout"
          >
            <template #reference>
              <el-button type="danger" plain size="small" round>退出登录</el-button>
            </template>
          </el-popconfirm>
        </div>
      </template>

      <div class="admin-layout">
        <!-- el-menu：垂直菜单作为后台子导航，:router="true" 按路径跳转 -->
        <el-menu
          class="sub-menu"
          :router="true"
          :default-active="activePath"
          style="width: 160px"
        >
          <el-menu-item index="/admin/profile">编辑简介</el-menu-item>
          <el-menu-item index="/admin/projects">编辑项目</el-menu-item>
          <el-menu-item index="/admin/articles">编辑文章</el-menu-item>
          <el-menu-item index="/home">返回首页</el-menu-item>
        </el-menu>

        <div class="admin-content">
          <RouterView />
        </div>
      </div>
    </el-card>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useUserStore } from '../stores/userStore';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

// 后台子菜单高亮：取 /admin/xxx 第二段
const activePath = computed(() => {
  const parts = route.path.split('/');
  return '/' + (parts[1] || 'admin') + '/' + (parts[2] || 'profile');
});

function handleLogout() {
  // action 会自动清除 localStorage 中的登录态
  userStore.logout();
  ElMessage.success('已退出登录');
  // replace 替换历史，避免按返回又回到后台触发守卫
  router.replace({ name: 'login' });
}
</script>

<style scoped>
.admin-view { margin-bottom: 12px; }
.page-card { border-radius: 16px; border: none; }
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.section-title { font-size: 20px; font-weight: 700; color: #2c3e50; }
.admin-layout {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
.sub-menu { border-right: 1px solid #eef0f5; }
.admin-content { flex: 1; min-width: 280px; }
</style>
