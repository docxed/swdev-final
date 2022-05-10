<template>
  <div>
    <!-- Nav bar -->
    <nav class="navbar navbar-light bg-light fixed-top">
      <div class="container">
        <router-link class="navbar-brand" to="/"> AIS </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="offcanvas offcanvas-end"
          tabindex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">AIS</h5>
            <button
              type="button"
              class="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <div class="row text-center" v-if="!user">
              <router-link class="nav-link col me-auto" to="/signup">
                <span class="badge bg-success">ลงทะเบียนเข้าใช้งาน</span>
              </router-link>
              <router-link class="nav-link col ms-auto" to="/signin">
                ลงชื่อเข้าใช้งาน
              </router-link>
            </div>
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <router-link class="nav-link" to="/"
                  ><span class="text-center">
                    <i class="fas fa-home" style="width: 5vh"></i>
                  </span>
                  หน้าแรก</router-link
                >
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/reserve"
                  ><span class="text-center">
                    <i class="fa-solid fa-syringe" style="width: 5vh"></i>
                  </span>
                  ลงทะเบียนรับวัคซีน</router-link
                >
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/success"
                  ><span class="text-center">
                    <i
                      class="fa-solid fa-clock-rotate-left"
                      style="width: 5vh"
                    ></i>
                  </span>
                  ประวัติการจองของฉัน</router-link
                >
              </li>
              <template v-if="user">
                <div class="dropdown-divider"></div>
                <li class="nav-item">
                  <router-link class="nav-link text-dark" to="">
                    เบอร์ : {{ user.phone }}</router-link
                  >
                </li>
                <!-- <li class="nav-item">
                  <router-link class="nav-link" to="/profile"
                    ><span class="text-center">
                      <i class="fa-solid fa-gear" style="width: 5vh"></i>
                    </span>

                    ข้อมูลส่วนตัว</router-link
                  >
                </li> -->
                <li class="nav-item">
                  <a class="nav-link" @click="logout()">
                    <span class="text-center text-danger">
                      <i
                        class="fa-solid fa-right-from-bracket"
                        style="width: 5vh"
                      ></i>
                    </span>
                    <span class="text-danger">ออกจากระบบ</span>
                  </a>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <!-- Router views -->
    <br /><br />
    <div class="container mt-5">
      <router-view
        :key="$route.fullPath"
        @auth-change="onAuthChange()"
        :user="user"
      ></router-view>
    </div>
  </div>
</template>
<script>
import axios_mod from "./plugins/axios"

export default {
  data() {
    return { user: null }
  },
  methods: {
    onAuthChange() {
      const token = localStorage.getItem("token")
      if (token) {
        this.getUser()
      }
    },
    getUser() {
      axios_mod.get("/users/me").then((res) => {
        this.user = res.data
      })
    },
    logout() {
      axios_mod.post("/users/logout").then(() => {
        localStorage.removeItem("token")
        this.user = null
        this.$router.push("/signin")
      })
    },
  },
  created() {
    this.onAuthChange()
  },
}
</script>
