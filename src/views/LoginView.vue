<template>
  <!-- 登录页：Element Plus 表单重构 -->
  <section class="login-view">
    <el-card shadow="always" class="login-card">
      <template #header>
        <h2 class="section-title">后台登录</h2>
      </template>

      <!-- el-form：表单容器，:model 绑定数据、:rules 校验规则 -->
      <el-form
        ref="formRef"
        :model="loginForm"
        :rules="rules"
        label-width="64px"
        @submit.prevent="handleSubmit"
      >
        <!-- el-form-item：表单项 + 校验信息展示 -->
        <el-form-item label="用户名" prop="username">
          <!-- el-input：文本输入框 -->
          <el-input v-model="loginForm.username" placeholder="请输入用户名" clearable />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <!-- el-button：提交与取消按钮 -->
          <el-button type="primary" native-type="submit" round>登录</el-button>
          <el-button round @click="router.push({ name: 'home' })">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useUserStore } from '../stores/userStore';

const formRef = ref(null);
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

// el-form 数据模型（reactive 表单对象）
const loginForm = reactive({ username: '', password: '' });

// el-form 校验规则
const rules = {
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
};

function handleSubmit() {
  // validate：触发整表校验，通过后再调用 Pinia action
  formRef.value.validate((valid) => {
    if (!valid) return;
    try {
      // 调用 Pinia Store 的 action，内部会自动持久化到 localStorage
      userStore.login(loginForm.username, loginForm.password);
      ElMessage.success('登录成功');
      // replace 跳转避免返回时再回到登录页
      const redirect = route.query.redirect || '/admin/profile';
      router.replace(redirect);
    } catch (e) {
      ElMessage.error(e.message);
    }
  });
}
</script>

<style scoped>
.login-view {
  max-width: 460px;
  margin: 0 auto 12px;
}
.login-card { border-radius: 16px; border: none; }
.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
}
</style>
