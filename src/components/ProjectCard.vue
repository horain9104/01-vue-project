<template>
  <!-- 单个项目卡片：复用 BaseCard 的三个插槽 -->
  <BaseCard>
    <!-- header 具名插槽：封面 + 标题行 -->
    <template #header>
      <div class="cover" :style="{ background: project.coverColor }">
        <span class="cover-text">{{ project.name.charAt(0) }}</span>
      </div>
      <div class="title-row">
        <h3 class="name">{{ project.name }}</h3>
        <StatusBadge :status="project.status" />
      </div>
    </template>

    <!-- 默认插槽内容：简介 + 技术栈 -->
    <p class="desc">{{ project.description }}</p>
    <ul class="tech-list">
      <li v-for="tech in project.techStack" :key="tech" class="tech-item">
        {{ tech }}
      </li>
    </ul>

    <!-- footer 具名插槽中的【作用域插槽】：把 project 暴露给父组件，
         父组件可自定义操作按钮；不传时使用默认内容 -->
    <template #footer>
      <slot name="actions" :project="project">
        <span class="default-action">查看详情 →</span>
      </slot>
    </template>
  </BaseCard>
</template>

<script setup>
import BaseCard from './BaseCard.vue';
import StatusBadge from './StatusBadge.vue';

// defineProps：接收父组件传入的项目对象（只读，遵循单向数据流）
defineProps({
  project: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.cover {
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cover-text {
  font-size: 40px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.9);
}
.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 12px 16px 0;
}
.name {
  font-size: 16px;
  font-weight: 700;
  color: #2c3e50;
}
.desc {
  font-size: 13px;
  line-height: 1.7;
  color: #6b7280;
  margin-bottom: 12px;
}
.tech-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.tech-item {
  font-size: 12px;
  padding: 2px 10px;
  border-radius: 999px;
  background: #f3f5fa;
  color: #4f6df5;
}
.default-action {
  font-size: 13px;
  color: #4f6df5;
  font-weight: 600;
}
</style>
