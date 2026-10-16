<template>
  <!-- 文章详情页：动态路由参数 :id 查找文章，Element Plus 重构 -->
  <section class="article-detail">
    <el-card shadow="always" class="page-card">
      <!-- 未找到文章：el-empty -->
      <el-empty v-if="!article" :description="`未找到编号为 ${route.params.id} 的文章`">
        <el-button type="primary" round @click="goList">返回文章列表</el-button>
      </el-empty>

      <!-- 正常详情 -->
      <div v-else>
        <div class="cover" :style="{ background: article.coverColor }">
          <span class="cover-text">{{ article.title.charAt(0) }}</span>
        </div>

        <h1 class="title">{{ article.title }}</h1>
        <div class="meta">
          <span class="date">📅 {{ article.createdAt }}</span>
          <!-- el-tag：文章标签 -->
          <div class="tags">
            <el-tag v-for="tag in article.tags" :key="tag" size="small" effect="plain">{{ tag }}</el-tag>
          </div>
        </div>

        <!-- el-alert：文章摘要提示框 -->
        <el-alert :title="article.summary" type="info" :closable="false" class="summary" />

        <div class="content">
          <!-- 简易 Markdown 渲染：h2 / 列表 / 加粗 -->
          <template v-for="(line, i) in parsedLines" :key="i">
            <h2 v-if="line.startsWith('## ')" class="md-h2">{{ line.replace('## ', '') }}</h2>
            <h3 v-else-if="line.startsWith('### ')" class="md-h3">{{ line.replace('### ', '') }}</h3>
            <li v-else-if="line.startsWith('- ')" class="md-li">{{ line.replace('- ', '') }}</li>
            <p v-else-if="line.trim()" class="md-p" v-html="renderBold(line)"></p>
          </template>
        </div>

        <div class="actions">
          <el-button type="primary" round @click="goBack">← 返回上一页</el-button>
          <el-button round @click="goList">返回文章列表</el-button>
        </div>
      </div>
    </el-card>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useArticleStore } from '../stores/articleStore';

const route = useRoute();
const router = useRouter();
const articleStore = useArticleStore();
const { articleById } = storeToRefs(articleStore);

// 动态路由参数为字符串，按数字编号匹配时先 Number() 转换
const article = computed(() => articleById.value(route.params.id));

// 解析文章内容（简易 Markdown）
const parsedLines = computed(() => (article.value?.content || '').split('\n'));

// 渲染 **加粗**
function renderBold(text) {
  return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

function goBack() { router.go(-1); }
function goList() { router.push({ name: 'articles' }); }
</script>

<style scoped>
.article-detail { margin-bottom: 12px; }
.page-card { border-radius: 16px; border: none; }
.cover {
  height: 140px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
}
.cover-text { font-size: 52px; font-weight: 800; color: rgba(255, 255, 255, 0.9); }
.title { font-size: 22px; font-weight: 700; color: #2c3e50; margin-bottom: 10px; }
.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #9ca3af;
  margin-bottom: 12px;
}
.tags { display: flex; gap: 4px; }
.summary { margin-bottom: 20px; }
.content { font-size: 14px; line-height: 1.9; color: #2c3e50; }
.md-h2 {
  font-size: 18px;
  font-weight: 700;
  margin: 20px 0 10px;
  color: #4f6df5;
  border-bottom: 2px solid #eef1ff;
  padding-bottom: 6px;
}
.md-h3 { font-size: 15px; font-weight: 700; margin: 16px 0 8px; color: #3b54d4; }
.md-li { list-style: none; padding-left: 16px; position: relative; }
.md-li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #4f6df5;
}
.md-p { margin: 8px 0; }
.actions { margin-top: 24px; display: flex; gap: 10px; }
</style>
