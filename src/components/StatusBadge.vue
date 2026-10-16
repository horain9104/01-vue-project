<template>
  <!-- 可复用状态徽章：根据 status prop 自动配色 -->
  <span class="badge" :class="'badge--' + type">{{ status }}</span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  status: {
    type: String,
    required: true
  }
});

// 中文状态映射为 CSS 修饰类
const statusMap = {
  已完成: 'done',
  进行中: 'doing',
  计划中: 'plan'
};

const type = computed(() => statusMap[props.status] || 'plan');
</script>

<style scoped>
.badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}
.badge--done {
  background: #e6f8ee;
  color: #1a9e55;
}
.badge--doing {
  background: #e8edff;
  color: #3b54d4;
}
.badge--plan {
  background: #f1f2f5;
  color: #6b7280;
}
</style>
