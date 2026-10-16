<template>
  <!-- 可复用卡片容器：header / 默认 / footer 三个插槽 -->
  <div class="base-card">
    <header v-if="$slots.header" class="base-card__header">
      <slot name="header"></slot>
    </header>
    <div class="base-card__body">
      <!-- 默认插槽：卡片主体 -->
      <slot></slot>
    </div>
    <footer v-if="$slots.footer" class="base-card__footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script setup>
// 纯展示型可复用组件，无 props、无状态，结构完全由插槽决定
</script>

<style scoped>
.base-card {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #eef0f5;
  box-shadow: 0 4px 14px rgba(79, 109, 245, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.base-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(79, 109, 245, 0.16);
}
.base-card__body {
  padding: 16px;
  flex: 1;
}
.base-card__footer {
  padding: 12px 16px;
  border-top: 1px solid #f0f2f7;
}
</style>
