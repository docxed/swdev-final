import { createWebHistory, createRouter } from "vue-router"
import Swal from "sweetalert2"

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    meta: { guess: true },
    component: () => import("../views/Signup.vue"),
  },
  {
    path: "/signin",
    name: "Signin",
    meta: { guess: true },
    component: () => import("../views/Signin.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    meta: { login: true },
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/changepassword",
    name: "changepassword",
    meta: { login: true },
    component: () => import("../views/Changepassword.vue"),
  },
  {
    path: "/reserve",
    name: "Reserve",
    meta: { login: true },
    component: () => import("../views/Reserve.vue"),
  },
  {
    path: "/success",
    name: "Success",
    meta: { login: true },
    component: () => import("../views/Success.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem("token")

  if (to.meta.login && !isLoggedIn) {
    Swal.fire({
      title: "โปรดลงชื่อเข้าสู่ระบบ",
      icon: "warning",
      showConfirmButton: true,
    })
    next({ path: "/signin" })
    return
  }
  if (to.meta.guess && isLoggedIn) {
    next({ path: "/reserve" })
    return
  }
  next()
})

export default router
