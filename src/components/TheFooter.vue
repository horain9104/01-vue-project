<template>
  <!-- 底部版权信息（被 App.vue 的 el-footer 包裹） -->
  <footer class="site-footer">
    <p class="copyright">© {{ year }} {{ author }} · 个人主页 · 重庆工程学院</p>
    <p class="footer-sub">Vue 3 + Vue Router + Pinia + Element Plus 综合实验项目</p>
  </footer>
</template>

<script setup>
// defineProps：父组件传入作者与年份（展示型数据，单向数据流）
defineProps({
  author: {
    type: String,
    default: '佚名'
  },
  year: {
    type: [String, Number],
    default: 2026
  }
});
</script>

<style scoped>
.site-footer {
  text-align: center;
  color: #6b7280;
  font-size: 13px;
  line-height: 1.8;
  padding: 12px 16px;
}
.copyright {
  font-weight: 600;
  color: #3b54d4;
}
.footer-sub {
  font-size: 12px;
  color: #9aa0aa;
}
</style>
