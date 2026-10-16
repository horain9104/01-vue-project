<template>
  <!-- 兴趣爱好：Element Plus 重构 -->
  <section class="hobby-section">
    <h2>兴趣爱好</h2>
    <!-- el-tag：动态渲染兴趣标签，可关闭交互 -->
    <div class="hobby-tags">
      <el-tag
        v-for="(hobby, index) in hobbies"
        :key="index"
        size="large"
        effect="plain"
        class="hobby-tag"
      >
        {{ hobby }}
      </el-tag>
    </div>
  </section>
</template>

<script setup>
// defineProps：父组件传入兴趣数组（单向数据流）
defineProps({
  hobbies: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
.hobby-section { margin-top: 8px; }
h2 {
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin: 24px 0 16px;
  padding-left: 12px;
  border-left: 4px solid #4f6df5;
}
.hobby-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.hobby-tag {
  border-radius: 999px;
  padding: 4px 12px;
}
</style>
