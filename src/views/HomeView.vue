<template>
  <!-- 首页：复用个人信息 / 技能 / 兴趣组件，el-card 作为统一卡片容器 -->
  <main class="home-view">
    <el-card shadow="always" class="home-card">
      <PersonInfo :person="person" />
      <SkillList :skills="skills" v-model="keyword" />
      <HobbyList :hobbies="hobbies" />
    </el-card>
  </main>
</template>

<script setup>
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import PersonInfo from '../components/PersonInfo.vue';
import SkillList from '../components/SkillList.vue';
import HobbyList from '../components/HobbyList.vue';
import { useUserStore } from '../stores/userStore';

// useXxxStore() 获取 Store 实例
const userStore = useUserStore();
// storeToRefs 解构保持响应式：直接解构 Store 实例会丢失响应性
const { person, skills, hobbies } = storeToRefs(userStore);

const keyword = ref('');

watch(keyword, (newVal, oldVal) => {
  console.log(`首页搜索关键词变化："${oldVal}" -> "${newVal}"`);
});
</script>

<style scoped>
.home-view { margin-bottom: 12px; }
.home-card { border-radius: 16px; border: none; }
.home-card :deep(.el-card__body) { padding: 28px; }
</style>
