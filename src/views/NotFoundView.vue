<template>
  <!-- 404 页面：通配符路由匹配，Element Plus el-result 结果页组件 -->
  <section class="not-found">
    <el-card shadow="always" class="page-card">
      <el-result icon="warning" title="404" sub-title="页面走丢了……">
        <template #sub-title>
          <p class="tip">您访问的路径 <code>{{ wrongPath }}</code> 不存在</p>
        </template>
        <template #extra>
          <el-button type="primary" round @click="goHome">返回首页</el-button>
        </template>
      </el-result>
    </el-card>
  </section>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
// 显示用户输错的路径
const wrongPath = route.fullPath;
function goHome() {
  router.push({ name: 'home' });
}
</script>

<style scoped>
.not-found { margin-bottom: 12px; }
.page-card { border-radius: 16px; border: none; }
.tip {
  font-size: 14px;
  color: #6b7280;
}
code {
  background: #f3f5fa;
  padding: 2px 6px;
  border-radius: 4px;
  color: #ef4444;
  font-size: 13px;
}
</style>
