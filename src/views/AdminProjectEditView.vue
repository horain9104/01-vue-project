<template>
  <!-- 编辑项目：el-table 表格 + el-dialog 对话框表单，Pinia projectStore -->
  <div class="edit-projects">
    <div class="head">
      <h3 class="block-title">项目列表（{{ projects.length }}）</h3>
      <!-- el-button：打开新增对话框 -->
      <el-button type="primary" size="small" round @click="openAdd">+ 新增项目</el-button>
    </div>

    <!-- el-table：表格组件展示项目数据，data 绑定 Store 的 projects -->
    <el-table :data="projects" border stripe size="small" class="table">
      <el-table-column prop="id" label="ID" width="56" align="center" />
      <el-table-column prop="name" label="项目名称" min-width="140" />
      <!-- el-tag：状态列自定义渲染 -->
      <el-table-column prop="status" label="状态" width="92" align="center">
        <template #default="{ row }">
          <el-tag :type="statusType(row.status)" size="small">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="项目简介" min-width="200" show-overflow-tooltip />
      <el-table-column label="技术栈" min-width="150">
        <template #default="{ row }">
          <el-tag v-for="t in row.techStack" :key="t" size="small" effect="plain" class="tech-tag">
            {{ t }}
          </el-tag>
          <span v-if="!row.techStack.length" class="none">暂无</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140" align="center" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" link size="small" @click="openEdit(row)">编辑</el-button>
          <!-- el-popconfirm：删除前二次确认 -->
          <el-popconfirm
            title="确定删除该项目吗？"
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
    <el-empty v-if="projects.length === 0" description="暂无项目，点击右上角新增" :image-size="80" />

    <!-- el-dialog：新增 / 编辑项目对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="editingId ? '编辑项目' : '新增项目'"
      width="480px"
      destroy-on-close
    >
      <!-- el-form：对话框内表单 + 校验规则 -->
      <el-form ref="dialogFormRef" :model="dialogForm" :rules="dialogRules" label-width="72px">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="dialogForm.name" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <!-- el-select：状态下拉选择 -->
          <el-select v-model="dialogForm.status" style="width: 100%">
            <el-option label="已完成" value="已完成" />
            <el-option label="进行中" value="进行中" />
            <el-option label="计划中" value="计划中" />
          </el-select>
        </el-form-item>
        <el-form-item label="技术栈">
          <el-input v-model="dialogForm.techStackText" placeholder="用逗号分隔，如：Vue 3, Pinia" />
        </el-form-item>
        <el-form-item label="项目简介">
          <el-input v-model="dialogForm.description" type="textarea" :rows="3" placeholder="请填写项目简介" />
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
import { useProjectStore } from '../stores/projectStore';

const projectStore = useProjectStore();
const { projects } = storeToRefs(projectStore);

const dialogVisible = ref(false);
const dialogFormRef = ref(null);
const editingId = ref(null);

// 对话框表单模型（techStackText 逗号分隔字符串，保存时再转数组）
const dialogForm = reactive({
  name: '',
  status: '计划中',
  techStackText: '',
  description: ''
});

// 对话框表单校验规则
const dialogRules = {
  name: [{ required: true, message: '项目名称不能为空', trigger: 'blur' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }]
};

function openAdd() {
  editingId.value = null;
  Object.assign(dialogForm, { name: '', status: '计划中', techStackText: '', description: '' });
  dialogVisible.value = true;
}

function openEdit(row) {
  editingId.value = row.id;
  Object.assign(dialogForm, {
    name: row.name,
    status: row.status,
    techStackText: row.techStack.join('，'),
    description: row.description
  });
  dialogVisible.value = true;
}

function onSave() {
  dialogFormRef.value.validate((valid) => {
    if (!valid) return;
    // 逗号分隔字符串 -> 数组
    const techStack = dialogForm.techStackText
      .split(/[,，]/).map(s => s.trim()).filter(Boolean);
    const data = {
      name: dialogForm.name,
      status: dialogForm.status,
      description: dialogForm.description,
      techStack
    };
    if (editingId.value) {
      // 调用 Store 的 updateProject action（watch deep 自动持久化）
      projectStore.updateProject(editingId.value, data);
      ElMessage.success('项目已更新（Pinia + localStorage 持久化）');
    } else {
      // 调用 Store 的 addProject action
      projectStore.addProject(data);
      ElMessage.success('项目已新增（Pinia + localStorage 持久化）');
    }
    dialogVisible.value = false;
  });
}

function onRemove(id) {
  // 调用 Store 的 removeProject action
  projectStore.removeProject(id);
  ElMessage.success('项目已删除（Pinia + localStorage 持久化）');
}

function statusType(status) {
  const map = { 已完成: 'success', 进行中: 'primary', 计划中: 'info' };
  return map[status] || 'info';
}
</script>

<style scoped>
.edit-projects { padding: 4px 0; }
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.block-title { font-size: 15px; font-weight: 700; color: #2c3e50; }
.table { border-radius: 8px; }
.tech-tag { margin: 2px 4px 2px 0; }
.none { font-size: 12px; color: #9ca3af; }
</style>
