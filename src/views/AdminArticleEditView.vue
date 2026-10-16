<template>
  <!-- 编辑文章：el-table 表格 + el-dialog 对话框表单，Pinia articleStore -->
  <div class="edit-articles">
    <div class="head">
      <h3 class="block-title">文章列表（{{ articles.length }}）</h3>
      <el-button type="primary" size="small" round @click="openAdd">+ 新增文章</el-button>
    </div>

    <!-- el-table：文章数据表格 -->
    <el-table :data="articles" border stripe size="small" class="table">
      <el-table-column prop="id" label="ID" width="56" align="center" />
      <el-table-column prop="title" label="标题" min-width="180" />
      <el-table-column prop="createdAt" label="发布日期" width="110" align="center" />
      <el-table-column prop="summary" label="摘要" min-width="200" show-overflow-tooltip />
      <el-table-column label="标签" min-width="140">
        <template #default="{ row }">
          <!-- el-tag：文章标签 -->
          <el-tag v-for="t in row.tags" :key="t" size="small" effect="plain" class="tag-item">
            {{ t }}
          </el-tag>
          <span v-if="!row.tags.length" class="none">暂无</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140" align="center" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" link size="small" @click="openEdit(row)">编辑</el-button>
          <!-- el-popconfirm：删除前二次确认 -->
          <el-popconfirm
            title="确定删除该文章吗？"
            confirm-button-text="删除"
            cancel-button-text="取消"
            @confirm="onRemove(row.id)"
          >
            <template #reference>
              <el-button type="danger" link size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- el-empty：无数据空状态 -->
    <el-empty v-if="articles.length === 0" description="暂无文章，点击右上角新增" :image-size="80" />

    <!-- el-dialog：新增 / 编辑文章对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="editingId ? '编辑文章' : '新增文章'"
      width="520px"
      destroy-on-close
    >
      <el-form ref="dialogFormRef" :model="dialogForm" :rules="dialogRules" label-width="72px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="dialogForm.title" placeholder="请输入文章标题" />
        </el-form-item>
        <el-form-item label="发布日期">
          <!-- el-date-picker：日期选择器 -->
          <el-date-picker
            v-model="dialogForm.createdAt"
            type="date"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="dialogForm.tagsText" placeholder="用逗号分隔，如：Vue, Pinia" />
        </el-form-item>
        <el-form-item label="摘要">
          <el-input v-model="dialogForm.summary" type="textarea" :rows="2" placeholder="请填写文章摘要" />
        </el-form-item>
        <el-form-item label="正文">
          <el-input
            v-model="dialogForm.content"
            type="textarea"
            :rows="5"
            placeholder="支持简易 Markdown：## 标题 / - 列表 / **加粗**"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button round @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" round @click="onSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { storeToRefs } from 'pinia';
import { useArticleStore } from '../stores/articleStore';

const articleStore = useArticleStore();
const { articles } = storeToRefs(articleStore);

const dialogVisible = ref(false);
const dialogFormRef = ref(null);
const editingId = ref(null);

// 对话框表单模型（tagsText 逗号分隔字符串，保存时转数组）
const dialogForm = reactive({
  title: '',
  createdAt: '',
  tagsText: '',
  summary: '',
  content: ''
});

const dialogRules = {
  title: [{ required: true, message: '文章标题不能为空', trigger: 'blur' }]
};

function openAdd() {
  editingId.value = null;
  Object.assign(dialogForm, {
    title: '', createdAt: '', tagsText: '', summary: '', content: ''
  });
  dialogVisible.value = true;
}

function openEdit(row) {
  editingId.value = row.id;
  Object.assign(dialogForm, {
    title: row.title,
    createdAt: row.createdAt,
    tagsText: row.tags.join('，'),
    summary: row.summary,
    content: row.content
  });
  dialogVisible.value = true;
}

function onSave() {
  dialogFormRef.value.validate((valid) => {
    if (!valid) return;
    const tags = dialogForm.tagsText.split(/[,，]/).map(s => s.trim()).filter(Boolean);
    const data = {
      title: dialogForm.title,
      createdAt: dialogForm.createdAt,
      tags,
      summary: dialogForm.summary,
      content: dialogForm.content
    };
    if (editingId.value) {
      // 调用 Store 的 updateArticle action（watch deep 自动持久化）
      articleStore.updateArticle(editingId.value, data);
      ElMessage.success('文章已更新（Pinia + localStorage 持久化）');
    } else {
      // 调用 Store 的 addArticle action
      articleStore.addArticle(data);
      ElMessage.success('文章已新增（Pinia + localStorage 持久化）');
    }
    dialogVisible.value = false;
  });
}

function onRemove(id) {
  // 调用 Store 的 removeArticle action
  articleStore.removeArticle(id);
  ElMessage.success('文章已删除（Pinia + localStorage 持久化）');
}
</script>

<style scoped>
.edit-articles { padding: 4px 0; }
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.block-title { font-size: 15px; font-weight: 700; color: #2c3e50; }
.table { border-radius: 8px; }
.tag-item { margin: 2px 4px 2px 0; }
.none { font-size: 12px; color: #9ca3af; }
</style>
