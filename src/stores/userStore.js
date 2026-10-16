// 用户 Store：setup 函数式写法，watch 在 store 内部创建，避免顶层 getActivePinia 报错
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

const DEFAULT_SKILLS = [
  { id: 1, name: 'HTML / CSS', level: '熟练' },
  { id: 2, name: 'JavaScript', level: '熟练' },
  { id: 3, name: 'Vue 3', level: '学习中' },
  { id: 4, name: 'Python', level: '了解' },
  { id: 5, name: 'Git', level: '熟练' }
];
const DEFAULT_HOBBIES = ['阅读', '篮球', '摄影'];

export const useUserStore = defineStore('user', () => {
  // state：用 ref 定义
  const isLogin = ref(loadFromLS('user.isLogin', false));
  const username = ref(loadFromLS('user.username', ''));
  const person = ref(loadFromLS('user.person', {
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=hhy',
    name: 'hhy', major: '计算机科学与技术', className: '计科1班',
    bio: '热爱前端开发，正在学习 Vue 3。',
    email: 'hhy@example.com', phone: '178-0000-3075', hometown: '四川成都'
  }));
  const skills = ref(loadFromLS('user.skills', DEFAULT_SKILLS));
  const hobbies = ref(loadFromLS('user.hobbies', DEFAULT_HOBBIES));

  // getters：用 computed
  const displayName = computed(() => username.value || person.value.name);
  const profile = computed(() =>
    `${person.value.name}，${person.value.major}${person.value.className}，${person.value.bio}`
  );

  // actions
  function login(uname, pwd) {
    if (!uname || !pwd) throw new Error('用户名和密码不能为空');
    isLogin.value = true;
    username.value = uname;
    person.value.name = uname;
  }
  function logout() {
    isLogin.value = false;
    username.value = '';
  }
  function updatePerson(data) { Object.assign(person.value, data); }

  // watch deep：在 store setup 内部写，Pinia 已初始化
  watch(isLogin,   (v) => saveToLS('user.isLogin', v));
  watch(username,  (v) => saveToLS('user.username', v));
  watch(person,    (v) => saveToLS('user.person', v),   { deep: true });
  watch(skills,    (v) => saveToLS('user.skills', v),   { deep: true });
  watch(hobbies,   (v) => saveToLS('user.hobbies', v),  { deep: true });

  return { isLogin, username, person, skills, hobbies, displayName, profile, login, logout, updatePerson };
});
