// Vue Router 路由配置 + Pinia Store 配合守卫
import { createRouter, createWebHistory } from 'vue-router';

// 路由组件
import HomeView from '../views/HomeView.vue';
import ProjectsView from '../views/ProjectsView.vue';
import ProjectsListView from '../views/ProjectsListView.vue';
import ProjectDetailView from '../views/ProjectDetailView.vue';
import AboutView from '../views/AboutView.vue';
import LoginView from '../views/LoginView.vue';
import AdminView from '../views/AdminView.vue';
import AdminProfileEditView from '../views/AdminProfileEditView.vue';
import AdminProjectEditView from '../views/AdminProjectEditView.vue';
import AdminArticleEditView from '../views/AdminArticleEditView.vue';
import ArticleListView from '../views/ArticleListView.vue';
import ArticleDetailView from '../views/ArticleDetailView.vue';
import NotFoundView from '../views/NotFoundView.vue';

// 路由表
const routes = [
  { path: '/', redirect: '/home' },

  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: { title: '首页 | hhy 个人主页' }
  },

  // 嵌套路由：项目中心
  {
    path: '/projects',
    name: 'projects',
    component: ProjectsView,
    redirect: '/projects/list',
    meta: { title: '项目中心 | hhy 个人主页' },
    children: [
      { path: 'list', name: 'projects-list', component: ProjectsListView, meta: { title: '项目列表 | hhy 个人主页' } },
      { path: ':id', name: 'project-detail', component: ProjectDetailView, meta: { title: '项目详情 | hhy 个人主页' } }
    ]
  },

  // 文章列表 + 动态路由详情
  {
    path: '/articles',
    name: 'articles',
    component: ArticleListView,
    meta: { title: '文章中心 | hhy 个人主页' }
  },
  {
    path: '/articles/:id',
    name: 'article-detail',
    component: ArticleDetailView,
    meta: { title: '文章详情 | hhy 个人主页' }
  },

  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: { title: '关于 | hhy 个人主页' }
  },

  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { title: '登录 | hhy 个人主页' }
  },

  // 嵌套路由：后台管理（需登录）
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    redirect: '/admin/profile',
    meta: { title: '后台管理 | hhy 个人主页', requiresAuth: true },
    children: [
      { path: 'profile',  name: 'admin-profile',  component: AdminProfileEditView,  meta: { title: '编辑简介 | hhy 个人主页', requiresAuth: true } },
      { path: 'projects', name: 'admin-projects', component: AdminProjectEditView, meta: { title: '编辑项目 | hhy 个人主页', requiresAuth: true } },
      { path: 'articles', name: 'admin-articles', component: AdminArticleEditView, meta: { title: '编辑文章 | hhy 个人主页', requiresAuth: true } }
    ]
  },

  // 404 通配符
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView, meta: { title: '页面未找到 | hhy 个人主页' } }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

// 全局前置守卫：更新标题 + Pinia Store 配合的登录拦截
// 注意：在守卫函数内部调用 useXxxStore，而非模块顶层调用，
// 以确保 Pinia 已完成初始化（先于守卫执行）
router.beforeEach((to, from, next) => {
  // 1. 更新页面标题
  if (to.meta?.title) {
    document.title = to.meta.title;
  }

  // 2. 访问控制：在守卫内部 useUserStore()，确保 Pinia 已注册
  if (to.meta?.requiresAuth) {
    // 动态导入避免循环依赖（router ↔ store）
    import('../stores/userStore.js').then(({ useUserStore }) => {
      const userStore = useUserStore();
      if (!userStore.isLogin) {
        next({ name: 'login', query: { redirect: to.fullPath } });
      } else {
        next();
      }
    });
  } else {
    next();
  }
});

export default router;
