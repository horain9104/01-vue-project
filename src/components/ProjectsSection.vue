<template>
  <section class="projects-section">
    <h2>项目展示</h2>

    <!-- 作用域插槽：把子组件统计的数据暴露给父组件渲染 -->
    <div class="stats">
      <slot name="stats" :total="projects.length" :done="doneCount">
        默认统计：共 {{ projects.length }} 个项目
      </slot>
    </div>

    <!-- 项目卡片网格 -->
    <div v-if="projects.length" class="project-grid">
      <ProjectCard v-for="project in projects" :key="project.id" :project="project">
        <!-- 父组件通过作用域插槽拿到当前 project，自定义操作按钮 -->
        <template #actions="{ project }">
          <button class="action-btn" @click="logClick(project)">查看</button>
          <button class="action-btn action-btn--ghost" @click="logClick(project)">
            源码
          </button>
        </template>
      </ProjectCard>
    </div>

    <!-- 具名插槽 empty：列表为空时展示，父组件可自定义空状态 -->
    <slot v-else name="empty">
      <p class="empty">暂无项目数据</p>
    </slot>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import ProjectCard from './ProjectCard.vue';

// defineProps：接收项目数组
const props = defineProps({
  projects: {
    type: Array,
    required: true
  }
});

// 已完成项目数量（组件内部派生状态）
const doneCount = computed(
  () => props.projects.filter(p => p.status === '已完成').length
);

function logClick(project) {
  console.log(`点击项目操作：${project.name}`);
}
</script>

<style scoped>
.projects-section {
  margin-top: 8px;
}
h2 {
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin: 24px 0 12px;
  padding-left: 12px;
  border-left: 4px solid #4f6df5;
}
.stats {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 14px;
}
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}
.action-btn {
  border: none;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  padding: 5px 14px;
  border-radius: 999px;
  background: #4f6df5;
  color: #fff;
  margin-right: 8px;
  transition: background 0.2s ease;
}
.action-btn:hover {
  background: #3b54d4;
}
.action-btn--ghost {
  background: #fff;
  color: #4f6df5;
  border: 1px solid #4f6df5;
}
.action-btn--ghost:hover {
  background: #eef1ff;
}
.empty {
  text-align: center;
  padding: 30px;
  color: #9ca3af;
  border: 1px dashed #d8dbe3;
  border-radius: 10px;
}
</style>
