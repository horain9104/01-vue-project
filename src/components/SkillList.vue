<template>
  <!-- 技能列表：Element Plus 重构（el-input 搜索 + el-progress 熟练度条） -->
  <section class="skill-section">
    <h2>技能列表</h2>

    <!-- el-input：可清空输入框，v-model 双向绑定搜索关键词 -->
    <el-input
      v-model="keyword"
      class="search-input"
      placeholder="输入关键词搜索技能，如：Vue"
      clearable
      size="large"
    />

    <p class="search-tip" v-if="keyword">
      当前搜索关键词：<span class="keyword">{{ keyword }}</span>，匹配到
      <span class="count">{{ filteredSkills.length }}</span> 项
    </p>

    <div class="skill-list">
      <div v-for="skill in filteredSkills" :key="skill.id" class="skill-item">
        <div class="skill-head">
          <span class="skill-name">{{ skill.name }}</span>
          <!-- el-tag：根据熟练度显示不同颜色的标签 -->
          <el-tag :type="levelTagType(skill.level)" size="small" effect="light">
            {{ skill.level }}
          </el-tag>
        </div>
        <!-- el-progress：进度条直观展示熟练度 -->
        <el-progress
          :percentage="levelPercent(skill.level)"
          :color="levelColor(skill.level)"
          :stroke-width="10"
        />
      </div>
    </div>

    <!-- el-empty：无匹配数据时的空状态提示 -->
    <el-empty v-if="filteredSkills.length === 0" description="没有找到匹配的技能" :image-size="80" />
  </section>
</template>

<script setup>
import { computed } from 'vue';

// defineProps：父组件传入技能列表（单向数据流，子组件只读不直接改）
const props = defineProps({
  skills: {
    type: Array,
    required: true
  }
});

// defineModel：父子组件双向同步搜索关键词
const keyword = defineModel({ default: '' });

// 内部计算属性：根据 keyword 筛选 props.skills
const filteredSkills = computed(() => {
  const kw = keyword.value.trim().toLowerCase();
  if (!kw) return props.skills;
  return props.skills.filter(skill =>
    skill.name.toLowerCase().includes(kw)
  );
});

// 熟练度文字 -> 进度百分比
function levelPercent(level) {
  const map = { 精通: 95, 熟练: 80, 学习中: 60, 了解: 40 };
  return map[level] || 50;
}
// 熟练度文字 -> 标签类型（控制 el-tag 颜色）
function levelTagType(level) {
  const map = { 精通: 'danger', 熟练: 'success', 学习中: 'warning', 了解: 'info' };
  return map[level] || 'info';
}
// 熟练度文字 -> 进度条颜色
function levelColor(level) {
  const map = { 精通: '#f56c6c', 熟练: '#67c23a', 学习中: '#e6a23c', 了解: '#909399' };
  return map[level] || '#4f6df5';
}
</script>

<style scoped>
.skill-section { margin-bottom: 8px; }
h2 {
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin: 24px 0 16px;
  padding-left: 12px;
  border-left: 4px solid #4f6df5;
}
.search-input { margin-bottom: 14px; }
.search-tip {
  font-size: 13px;
  color: #6b7280;
  margin: 8px 0 14px;
}
.search-tip .keyword { color: #ff7a59; font-weight: 600; }
.search-tip .count { color: #4f6df5; font-weight: 700; }
.skill-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 14px;
}
.skill-item {
  padding: 12px 16px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}
.skill-item:hover {
  transform: translateY(-2px);
  border-color: #4f6df5;
  box-shadow: 0 6px 16px rgba(79, 109, 245, 0.12);
}
.skill-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.skill-name { font-weight: 600; color: #2c3e50; font-size: 14px; }
</style>
