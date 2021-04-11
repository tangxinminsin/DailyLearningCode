import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import CategoryCreate from '../views/CategoryCreate.vue'
import CategoryList from '../views/CategoryList.vue'
import ItemCreate from '../views/ItemCreate.vue'
import ItemList from '../views/ItemList.vue'
import ArticleCreate from '../views/ArticleCreate.vue'
import ArticleList from '../views/ArticleList.vue'
import AdminUserCreate from '../views/AdminUserCreate.vue'
import AdminUserList from '../views/AdminUserList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { isPublic: true }
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      { path: '/categories/create', component: CategoryCreate },
      { path: '/categories/edit/:id', component: CategoryCreate, props: true },
      { path: '/categories/list', component: CategoryList },

      { path: '/items/create', component: ItemCreate },
      { path: '/items/edit/:id', component: ItemCreate, props: true },
      { path: '/items/list', component: ItemList },

      { path: '/articles/create', component: ArticleCreate },
      { path: '/articles/edit/:id', component: ArticleCreate, props: true },
      { path: '/articles/list', component: ArticleList },

      { path: '/admin_user/create', component: AdminUserCreate },
      { path: '/admin_user/edit/:id', component: AdminUserCreate, props: true },
      { path: '/admin_user/list', component: AdminUserList },
    ]
  },
]

const router = new VueRouter({
  mode: "history",
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})

export default router
