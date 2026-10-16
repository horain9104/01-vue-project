<template>
  <!-- 项目列表：用 Pinia projectStore，Element Plus 重构 -->
  <div>
    <!-- el-alert：统计信息提示条 -->
    <el-alert
      type="info"
      :closable="false"
      class="stats"
    >
      <template #title>
        共 <strong>{{ projects.length }}</strong> 个项目，已完成
        <strong>{{ doneProjects.length }}</strong> 个，进行中
        <strong>{{ projects.length - doneProjects.length }}</strong> 个
      </template>
    </el-alert>

    <div v-if="projects.length" class="project-grid">
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :project="project"
      >
        <template #actions="{ project }">
          <!-- el-button：查看详情按钮，点击跳转动态路由详情页 -->
          <el-button type="primary" size="small" round
            :router="false"
            @click="goDetail(project.id)"
          >查看</el-button>
          <el-tag size="small" :type="statusType(project.status)">{{ project.status }}</el-tag>
        </template>
      </ProjectCard>
    </div>
    <!-- el-empty：列表为空时的空状态 -->
    <el-empty v-else description="暂无项目数据，请前往后台添加" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import ProjectCard from '../components/ProjectCard.vue';
import { useProjectStore } from '../stores/projectStore';

const router = useRouter();

// storeToRefs 解构 Store 的 state 和 getters 保持响应式
const projectStore = useProjectStore();
const { projects, doneProjects } = storeToRefs(projectStore);

// 编程式导航到项目详情（动态路由 :id）
function goDetail(id) {
  router.push({ name: 'project-detail', params: { id } });
}
// 项目状态 -> 标签颜色类型
function statusType(status) {
  const map = { 已完成: 'success', 进行中: 'primary', 计划中: 'info' };
  return map[status] || 'info';
}
</script>

<style scoped>
.stats { margin-bottom: 16px; }
.stats strong { color: #4f6df5; }
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}
</style>
