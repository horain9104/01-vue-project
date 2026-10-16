// 文章 Store：setup 函数式写法 + watch deep 自动持久化
import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

function loadFromLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}
function saveToLS(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* 静默失败 */ }
}

const DEFAULT_ARTICLES = [
  { id: 1, title: 'Vue 3 组合式 API 入门指南', summary: '从 setup() 到 <script setup>，理解 ref、reactive、computed 的核心用法。', content: '## Vue 3 组合式 API\n\n组合式 API 是 Vue 3 的核心特性...', tags: ['Vue', '前端'], createdAt: '2026-09-15', coverColor: 'linear-gradient(135deg, #4f6df5, #6f8bff)' },
  { id: 2, title: 'Pinia 状态管理最佳实践', summary: '如何划分 Store、使用 storeToRefs 保持响应式、以及本地持久化方案。', content: '## Pinia 最佳实践\n\n### Store 划分...', tags: ['Pinia', 'Vue', '状态管理'], createdAt: '2026-10-01', coverColor: 'linear-gradient(135deg, #18b8a8, #4fd6c8)' },
  { id: 3, title: 'Vue Router 嵌套路由与动态路由实战', summary: '通过项目中心和后台管理两个案例，深入理解 children 与 :id 的配合。', content: '## 嵌套路由\n\n父子路由通过 children 配置...', tags: ['Vue Router', '实战'], createdAt: '2026-10-08', coverColor: 'linear-gradient(135deg, #ff7a59, #ffa07a)' }
];

export const useArticleStore = defineStore('article', () => {
  // state
  const articles = ref(loadFromLS('article.articles', DEFAULT_ARTICLES));

  // getters
  const articleById = computed(() => (id) => articles.value.find(a => a.id === Number(id)));
  const articleCount = computed(() => articles.value.length);
  const recentArticles = computed(() =>
    [...articles.value].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3)
  );

  // actions
  function addArticle(article) {
    const maxId = articles.value.length ? Math.max(...articles.value.map(a => a.id)) : 0;
    const now = new Date();
    articles.value.push({
      id: maxId + 1, title: '新文章', summary: '请填写文章摘要',
      content: '请填写文章正文...', tags: [],
      createdAt: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`,
      coverColor: 'linear-gradient(135deg, #8b5cf6, #b392f8)',
      ...article
    });
  }
  function removeArticle(id) {
    const idx = articles.value.findIndex(a => a.id === Number(id));
    if (idx !== -1) articles.value.splice(idx, 1);
  }
  function updateArticle(id, data) {
    const a = articles.value.find(a => a.id === Number(id));
    if (a) Object.assign(a, data);
  }

  // watch deep 自动持久化
  watch(articles, (v) => saveToLS('article.articles', v), { deep: true });

  return { articles, articleById, articleCount, recentArticles, addArticle, removeArticle, updateArticle };
});
