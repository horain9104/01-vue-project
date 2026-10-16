<template>
  <!-- 文章列表页：Element Plus 重构 -->
  <section class="article-list-view">
    <el-card shadow="always" class="page-card">
      <template #header>
        <h2 class="section-title">文章中心</h2>
        <p class="section-desc">共 {{ articles.length }} 篇技术文章</p>
      </template>

      <div v-if="articles.length" class="article-grid">
        <article v-for="a in articles" :key="a.id" class="article-card">
          <div class="cover" :style="{ background: a.coverColor }">
            <span class="cover-text">{{ a.title.charAt(0) }}</span>
          </div>
          <div class="content">
            <h3 class="title">{{ a.title }}</h3>
            <p class="summary">{{ a.summary }}</p>
            <div class="meta">
              <span class="date">📅 {{ a.createdAt }}</span>
              <!-- el-tag：文章标签 -->
              <div class="tags">
                <el-tag v-for="tag in a.tags" :key="tag" size="small" effect="plain">{{ tag }}</el-tag>
              </div>
            </div>
            <RouterLink :to="{ name: 'article-detail', params: { id: a.id } }" class="read-more">
              阅读全文 →
            </RouterLink>
          </div>
        </article>
      </div>

      <!-- el-empty：无文章时显示空状态 -->
      <el-empty v-else description="暂无文章，前往后台添加" />
    </el-card>
  </section>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useArticleStore } from '../stores/articleStore';

// useXxxStore() 获取 Store 实例，storeToRefs 解构保持响应式
const articleStore = useArticleStore();
const { articles } = storeToRefs(articleStore);
</script>

<style scoped>
.article-list-view { margin-bottom: 12px; }
.page-card { border-radius: 16px; border: none; }
.section-title { font-size: 20px; font-weight: 700; color: #2c3e50; margin-bottom: 4px; }
.section-desc { font-size: 13px; color: #6b7280; }
.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}
.article-card {
  background: #f9fafb;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.article-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(79, 109, 245, 0.14);
}
.cover { height: 100px; display: flex; align-items: center; justify-content: center; }
.cover-text { font-size: 36px; font-weight: 800; color: rgba(255, 255, 255, 0.9); }
.content { padding: 14px 16px; }
.title { font-size: 16px; font-weight: 700; color: #2c3e50; margin-bottom: 6px; }
.summary {
  font-size: 12px;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  gap: 6px;
}
.date { font-size: 11px; color: #9ca3af; white-space: nowrap; }
.tags { display: flex; gap: 4px; flex-wrap: wrap; }
.read-more {
  font-size: 13px;
  font-weight: 600;
  color: #4f6df5;
  text-decoration: none;
}
</style>
