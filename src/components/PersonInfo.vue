<template>
  <!-- 个人信息卡片：Element Plus 重构 -->
  <section class="person-card">
    <div class="person-header">
      <!-- el-avatar：头像组件 -->
      <el-avatar :size="110" :src="person.avatar" class="avatar" />
      <div class="info">
        <p class="name-line">{{ person.name }}</p>
        <p class="major-line">{{ person.major }} · {{ person.className }}</p>
        <p class="bio">{{ person.bio }}</p>
      </div>
    </div>

    <!-- el-descriptions：描述列表展示详细联系方式 -->
    <el-descriptions title="联系方式" :column="3" border size="small" class="contact">
      <el-descriptions-item label="邮箱">{{ person.email }}</el-descriptions-item>
      <el-descriptions-item label="电话">{{ person.phone }}</el-descriptions-item>
      <el-descriptions-item label="籍贯">{{ person.hometown }}</el-descriptions-item>
    </el-descriptions>

    <!-- el-timeline：时间线展示学习经历（本次实验新增） -->
    <h3 class="timeline-title">学习经历</h3>
    <el-timeline class="timeline">
      <el-timeline-item
        v-for="item in studyTimeline"
        :key="item.time"
        :timestamp="item.time"
        :type="item.type"
        :hollow="item.hollow"
        placement="top"
      >
        <div class="tl-body">
          <p class="tl-school">{{ item.title }}</p>
          <p class="tl-desc">{{ item.desc }}</p>
        </div>
      </el-timeline-item>
    </el-timeline>
  </section>
</template>

<script setup>
import { ref } from 'vue';

// defineProps：父组件传入个人信息对象（单向数据流，子组件只读）
defineProps({
  person: {
    type: Object,
    required: true
  }
});

// 学习经历时间线数据（Element Plus 时间线示例数据）
const studyTimeline = ref([
  {
    time: '2021-09 至 2024-06',
    title: '高中阶段',
    desc: '打下数学与信息技术基础，开始接触编程入门知识。',
    type: 'primary',
    hollow: true
  },
  {
    time: '2024-09 至今',
    title: '重庆工程学院 · 计算机科学与技术',
    desc: '系统学习程序设计、数据结构、数据库与 Web 前端开发课程。',
    type: 'primary',
    hollow: false
  },
  {
    time: '2025-06',
    title: '自学前端框架',
    desc: '开始学习 Vue 3 组合式 API、组件化开发与工程化工具链。',
    type: 'success',
    hollow: false
  },
  {
    time: '2026-10',
    title: 'Web 前端框架课程实验',
    desc: '完成 Vue Router、Pinia、Element Plus 综合实验，掌握 SPA 全流程开发。',
    type: 'warning',
    hollow: false
  }
]);
</script>

<style scoped>
.person-card {
  margin-bottom: 8px;
}
.person-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}
.avatar {
  border: 4px solid #fff;
  box-shadow: 0 8px 20px rgba(79, 109, 245, 0.25);
  background: #f3f4f6;
  transition: transform 0.3s ease;
}
.avatar:hover { transform: scale(1.05) rotate(2deg); }
.info { text-align: center; }
.name-line { font-size: 20px; font-weight: 700; color: #2c3e50; }
.major-line { font-size: 14px; color: #3b54d4; font-weight: 600; margin-top: 2px; }
.info p.bio { margin-top: 6px; font-size: 14px; color: #6b7280; font-style: italic; }
.contact { margin-bottom: 8px; }
.timeline-title {
  font-size: 16px;
  font-weight: 700;
  color: #2c3e50;
  margin: 18px 0 14px;
  padding-left: 10px;
  border-left: 4px solid #4f6df5;
}
.timeline { padding-left: 6px; }
.tl-body .tl-school { font-size: 14px; font-weight: 700; color: #2c3e50; }
.tl-body .tl-desc { font-size: 13px; color: #6b7280; margin-top: 2px; }
</style>
