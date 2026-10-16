<template>
  <!-- 编辑个人简介：el-form 表单重构，Pinia userStore + watch 自动持久化 -->
  <div class="edit-profile">
    <el-form :model="person" label-width="72px" class="profile-form">
      <div class="form-grid">
        <el-form-item label="姓名"><el-input v-model="person.name" /></el-form-item>
        <el-form-item label="专业"><el-input v-model="person.major" /></el-form-item>
        <el-form-item label="班级"><el-input v-model="person.className" /></el-form-item>
        <el-form-item label="邮箱"><el-input v-model="person.email" /></el-form-item>
        <el-form-item label="电话"><el-input v-model="person.phone" /></el-form-item>
        <el-form-item label="籍贯"><el-input v-model="person.hometown" /></el-form-item>
        <el-form-item label="简介" class="form-item--full">
          <el-input v-model="person.bio" type="textarea" :rows="3" placeholder="一句话介绍自己" />
        </el-form-item>
      </div>

      <el-form-item>
        <!-- el-button：保存（调用 action，watch deep 自动写入 localStorage） -->
        <el-button type="primary" round @click="onSave">保存</el-button>
        <el-button round @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore();
const { person } = storeToRefs(userStore);

function onSave() {
  // watch deep 已自动持久化到 localStorage
  userStore.updatePerson({});
  ElMessage.success('个人简介已保存（Pinia + localStorage 持久化）');
}

function onCancel() {
  ElMessage.info('已取消修改（数据仍为当前值）');
}
</script>

<style scoped>
.edit-profile { padding: 4px 0; }
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 16px;
}
.form-item--full { grid-column: 1 / -1; }
@media (max-width: 640px) {
  .form-grid { grid-template-columns: 1fr; }
}
</style>
