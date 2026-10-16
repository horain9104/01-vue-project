// 项目 Store：setup 函数式写法 + watch deep 自动持久化
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

const DEFAULT_PROJECTS = [
  { id: 1, name: '个人主页网站', description: '基于 Vue 3 组合式 API 的响应式个人主页，支持技能搜索与详情展开。', status: '已完成', techStack: ['Vue 3', 'Vite'], coverColor: 'linear-gradient(135deg, #4f6df5, #6f8bff)' },
  { id: 2, name: '待办事项应用', description: '支持任务增删改、状态筛选与 localStorage 本地持久化的 Todo 应用。', status: '进行中', techStack: ['Vue 3', 'Pinia'], coverColor: 'linear-gradient(135deg, #ff7a59, #ffa07a)' },
  { id: 3, name: '天气查询应用', description: '调用第三方天气 API，根据城市名称实时查询天气与未来预报。', status: '计划中', techStack: ['Fetch API', 'Axios'], coverColor: 'linear-gradient(135deg, #18b8a8, #4fd6c8)' },
  { id: 4, name: '图书管理系统', description: '课程设计项目：实现图书信息增删改查与学生借阅登记管理。', status: '已完成', techStack: ['Python', 'Flask'], coverColor: 'linear-gradient(135deg, #8b5cf6, #b392f8)' }
];

export const useProjectStore = defineStore('project', () => {
  // state
  const projects = ref(loadFromLS('project.projects', DEFAULT_PROJECTS));

  // getters
  const doneProjects = computed(() => projects.value.filter(p => p.status === '已完成'));
  const doingProjects = computed(() => projects.value.filter(p => p.status === '进行中'));
  const projectById = computed(() => (id) => projects.value.find(p => p.id === Number(id)));

  // actions
  function addProject(project) {
    const maxId = projects.value.length ? Math.max(...projects.value.map(p => p.id)) : 0;
    projects.value.push({
      id: maxId + 1, name: '新项目', description: '请填写项目简介',
      status: '计划中', techStack: [],
      coverColor: 'linear-gradient(135deg, #94a3b8, #cbd5e1)',
      ...project
    });
  }
  function removeProject(id) {
    const idx = projects.value.findIndex(p => p.id === Number(id));
    if (idx !== -1) projects.value.splice(idx, 1);
  }
  function updateProject(id, data) {
    const p = projects.value.find(p => p.id === Number(id));
    if (p) Object.assign(p, data);
  }

  // watch deep 自动持久化
  watch(projects, (v) => saveToLS('project.projects', v), { deep: true });

  return { projects, doneProjects, doingProjects, projectById, addProject, removeProject, updateProject };
});
