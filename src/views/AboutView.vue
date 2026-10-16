<template>
  <!-- 关于页面：Element Plus 重构 -->
  <section class="about-view">
    <el-card shadow="always" class="page-card">
      <template #header>
        <h2 class="section-title">关于本站</h2>
      </template>

      <p class="intro">
        本站是「Web 前端框架程序设计」课程实验作业，使用 Vue 3 组合式 API + Vue Router + Pinia +
        Element Plus 构建的单页面应用。
      </p>

      <!-- el-descriptions：作者信息描述列表 -->
      <el-descriptions title="作者信息" :column="2" border size="small" class="block">
        <el-descriptions-item label="姓名">{{ person.name }}</el-descriptions-item>
        <el-descriptions-item label="专业">{{ person.major }}</el-descriptions-item>
        <el-descriptions-item label="班级">{{ person.className }}</el-descriptions-item>
        <el-descriptions-item label="邮箱">{{ person.email }}</el-descriptions-item>
        <el-descriptions-item label="籍贯">{{ person.hometown }}</el-descriptions-item>
        <el-descriptions-item label="电话">{{ person.phone }}</el-descriptions-item>
      </el-descriptions>

      <!-- el-alert：路由模式说明 -->
      <h3 class="modes-title">路由模式说明</h3>
      <el-alert type="info" :closable="false" class="block">
        <p>当前使用 <strong>History 模式</strong>（createWebHistory），URL 形如 <code>/projects/list</code>，无 <code>#</code>。</p>
      </el-alert>
      <el-alert type="success" :closable="false">
        <p>
          切换为 <strong>Hash 模式</strong>只需将 <code>createWebHistory()</code> 换成
          <code>createWebHashHistory()</code>，URL 会变为 <code>/#/projects/list</code>。
        </p>
      </el-alert>
    </el-card>
  </section>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore();
const { person } = storeToRefs(userStore);
</script>

<style scoped>
.about-view { margin-bottom: 12px; }
.page-card { border-radius: 16px; border: none; }
.section-title { font-size: 20px; font-weight: 700; color: #2c3e50; }
.intro {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.8;
  margin-bottom: 16px;
}
.block { margin-bottom: 12px; }
.modes-title {
  font-size: 16px;
  font-weight: 700;
  color: #2c3e50;
  margin: 16px 0 10px;
  padding-left: 10px;
  border-left: 4px solid #4f6df5;
}
code {
  background: #fff;
  padding: 1px 6px;
  border-radius: 4px;
  color: #4f6df5;
  font-size: 12px;
}
</style>
