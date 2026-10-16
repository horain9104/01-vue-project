<template>
  <!-- 项目详情：Pinia projectStore + 动态路由参数，Element Plus 重构 -->
  <div class="detail">
    <!-- 未找到项目：el-empty + 返回按钮 -->
    <el-empty v-if="!project" :description="`未找到编号为 ${route.params.id} 的项目`">
      <el-button type="primary" round @click="backToList">返回项目列表</el-button>
    </el-empty>

    <div v-else>
      <div class="cover" :style="{ background: project.coverColor }">
        <span class="cover-text">{{ project.name.charAt(0) }}</span>
      </div>
      <div class="head">
        <h3 class="name">{{ project.name }}</h3>
        <el-tag :type="statusType(project.status)" effect="dark" round>{{ project.status }}</el-tag>
      </div>
      <p class="desc">{{ project.description }}</p>

      <!-- el-descriptions：结构化展示项目信息 -->
      <el-descriptions :column="2" border size="small" class="block">
        <el-descriptions-item label="项目编号">
          route.params.id = {{ route.params.id }}
        </el-descriptions-item>
        <el-descriptions-item label="当前状态">{{ project.status }}</el-descriptions-item>
        <el-descriptions-item label="技术栈" :span="2">
          <!-- el-tag 渲染技术栈列表 -->
          <el-tag
            v-for="tech in project.techStack"
            :key="tech"
            size="small"
            class="tech-tag"
          >{{ tech }}</el-tag>
          <span v-if="!project.techStack.length" class="none">暂无</span>
        </el-descriptions-item>
      </el-descriptions>

      <div class="actions">
        <!-- el-button：编程式路由导航 -->
        <el-button type="primary" round @click="goBack">← 返回上一页（go(-1)）</el-button>
        <el-button round @click="backToList">返回列表（push）</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useProjectStore } from '../stores/projectStore';

const route = useRoute();
const router = useRouter();
const projectStore = useProjectStore();
const { projectById } = storeToRefs(projectStore);

// getters 返回函数，调用获取结果
const project = computed(() => projectById.value(route.params.id));

function goBack() { router.go(-1); }
function backToList() { router.push({ name: 'projects-list' }); }
function statusType(status) {
  const map = { 已完成: 'success', 进行中: 'primary', 计划中: 'info' };
  return map[status] || 'info';
}
</script>

<style scoped>
.detail { padding: 4px 0; }
.cover {
  height: 130px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}
.cover-text { font-size: 48px; font-weight: 800; color: rgba(255, 255, 255, 0.9); }
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 10px;
}
.name { font-size: 20px; font-weight: 700; color: #2c3e50; }
.desc { font-size: 14px; line-height: 1.8; color: #6b7280; margin-bottom: 16px; }
.block { margin-bottom: 4px; }
.tech-tag { margin-right: 6px; }
.none { font-size: 12px; color: #9ca3af; }
.actions { margin-top: 20px; display: flex; gap: 10px; flex-wrap: wrap; }
</style>
