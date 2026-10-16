<template>
  <!-- 项目页面父布局：el-card 共享标题 + 子路由出口 -->
  <section class="projects-view">
    <el-card shadow="always" class="page-card">
      <template #header>
        <div class="card-head">
          <h2 class="section-title">项目中心</h2>
          <p class="section-desc">这里展示我参与和开发的项目，点击卡片可查看详情。</p>
        </div>
      </template>

      <!-- 子路由出口：项目列表 / 项目详情 渲染在这里 -->
      <RouterView />
    </el-card>
  </section>
</template>

<script setup>
// 嵌套路由父组件：仅提供共享布局，具体内容由子路由组件渲染
</script>

<style scoped>
.projects-view { margin-bottom: 12px; }
.page-card { border-radius: 16px; border: none; }
.card-head { padding: 4px 0; }
.section-title {
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 4px;
}
.section-desc { font-size: 13px; color: #6b7280; }
</style>
