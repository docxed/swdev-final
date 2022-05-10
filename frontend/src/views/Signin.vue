<template>
  <div>
    <div class="col-lg-7 col-md-7 col-sm-12 m-auto">
      <div class="m-auto mb-3">
        <img
          class="w-100"
          src="https://vaccineforthais.ais.th/Images/MicrosoftTeams-image.png"
          alt=""
        />
      </div>
      <br /><br />
      <div class="h3">บริการลงชื่อเข้าใช้งานรับวัคซีนโควิด-19 โดย เอไอเอส</div>
      <div>
        <form @submit.prevent="validateSignin()">
          <div class="mb-2">
            <label class="form-label" for="phone"
              >ระบุหมายเลขโทรศัพท์ที่ได้ลงทะเบียน</label
            >
            <input
              type="text"
              v-model="signin.phone"
              class="form-control"
              :class="{ 'is-invalid': v$.signin.phone.$error }"
              placeholder="0XXXXXXXXX"
              maxlength="10"
              name="phone"
              aria-describedby="phone"
            />
            <div v-if="v$.signin.phone.$error" class="my-2 text-danger">
              โปรดป้อนเบอร์ติดต่อให้ถูกต้อง
            </div>
          </div>
          <div class="mb-2">
            <label class="form-label" for="password">ระบุรหัสผ่าน</label>
            <input
              type="password"
              v-model="signin.password"
              class="form-control"
              :class="{ 'is-invalid': v$.signin.password.$error }"
              placeholder="รหัสผ่าน"
              maxlength="18"
              name="password"
            />
            <div v-if="v$.signin.password.$error" class="my-2 text-danger">
              โปรดป้อนรหัสผ่านให้ถูกต้อง (5 - 20 ตัวอักษร)
            </div>
          </div>
          <div class="mb-3 text-center">
            <button type="submit" class="btn" style="background-color: #b1d334">
              ลงชื่อเข้าใช้งาน
            </button>
          </div>
          <div class="mb-3 text-center">
            ไม่ได้ลงทะเบียนใช่ไหม คลิกที่นี่เพื่อ
            <router-link to="/signup">ลงทะเบียน</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2"
import axios from "axios"
import useVuelidate from "@vuelidate/core"
import { required, minLength, maxLength } from "@vuelidate/validators"
import Nprogress from "nprogress"
export default {
  name: "Signin",
  data() {
    return {
      v$: useVuelidate(),
      signin: {
        phone: "",
        password: "",
      },
    }
  },
  validations() {
    return {
      signin: {
        phone: { required },
        password: {
          required,
          minLength: minLength(5),
          maxLength: maxLength(18),
        },
      },
    }
  },
  methods: {
    submitSignin() {
      Nprogress.start()
      axios
        .post(`http://localhost:3001/users/signin`, this.signin)
        .then((res) => {
          Nprogress.done()
          if (res.data.status) {
            localStorage.setItem("token", res.data.token)
            this.$emit("auth-change")
            this.$router.push("/reserve")
          } else {
            Swal.fire({
              title: "ไม่สำเร็จ",
              text: res.data.message,
              icon: "error",
              timer: 3000,
              showConfirmButton: false,
            })
            this.signin.password = ""
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    validateSignin() {
      this.v$.$validate()
      if (!this.v$.$error) {
        this.submitSignin()
      }
    },
  },
}
</script>
