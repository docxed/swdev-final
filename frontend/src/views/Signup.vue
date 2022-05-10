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
      <div class="h3">บริการลงทะเบียนรับวัคซีนโควิด-19 โดย เอไอเอส</div>
      <div class="h5">
        จัดสรรโดย กรมการแพทย์ กระทรวงสาธารณสุข และกระทรวงคมนาคม
      </div>
      <div class="h3">ระบุหมายเลขโทรศัพท์ และ รหัสผ่าน</div>
      <div class="mb-2">เพื่อล็อกอินลงทะเบียนรับวัคซีน</div>
      <div>
        <form @submit.prevent="validateSignup()">
          <div class="mb-2">
            <input
              type="text"
              v-model="signup.phone"
              class="form-control"
              :class="{ 'is-invalid': v$.signup.phone.$error }"
              placeholder="0XXXXXXXXX"
              maxlength="10"
              name="phone"
              aria-describedby="phone"
            />
            <div v-if="v$.signup.phone.$error" class="my-2 text-danger">
              โปรดป้อนเบอร์ติดต่อให้ถูกต้อง
            </div>
          </div>
          <div class="mb-2">ตั้งรหัสผ่าน</div>
          <div class="mb-2">
            <input
              type="password"
              v-model="signup.password"
              class="form-control"
              :class="{ 'is-invalid': v$.signup.password.$error }"
              placeholder="รหัสผ่าน"
              maxlength="18"
              name="password"
            />
            <div v-if="v$.signup.password.$error" class="my-2 text-danger">
              โปรดป้อนรหัสผ่านให้ถูกต้อง (5 - 20 ตัวอักษร)
            </div>
          </div>
          <div class="mb-3">
            <input
              type="password"
              v-model="signup.c_password"
              class="form-control"
              :class="{ 'is-invalid': v$.signup.c_password.$error }"
              placeholder="ยืนยันรหัสผ่าน"
              maxlength="18"
              name="c_password"
            />
            <div v-if="v$.signup.c_password.$error" class="my-2 text-danger">
              โปรดป้อนรหัสผ่านให้ถูกต้อง (เหมือนกับรหัสผ่าน)
            </div>
          </div>
          <div class="mb-3 text-center">
            <button type="submit" class="btn" style="background-color: #b1d334">
              ลงทะเบียนเข้าใช้งาน
            </button>
          </div>
          <div class="mb-3 text-center">
            ลงทะเบียนแล้วใช่ไหม คลิกที่นี่เพื่อ
            <router-link to="/signin">ลงชื่อเข้าใช้งาน</router-link>
          </div>
        </form>
      </div>
      <div class="h3" style="color: #b1d334">
        ข้อควรรู้ก่อนลงทะเบียนรับวัคซีน
      </div>
      <div>
        <ul>
          <li>กลุ่มอายุ 12-17 ปี</li>
          <ul>
            <li>รับวัคซีนเข็ม 3: ฉีด 2 เข็ม ครบ 120 วัน</li>
          </ul>
        </ul>
      </div>
      <div>
        <ul>
          <li>กลุ่มอายุ 18 ปี ขึ้นไป</li>
          <ul>
            <li>รับวัคซีนเข็ม 3: ฉีด 2 เข็ม ครบ 90 วัน</li>
            <li>รับวัคซีนเข็ม 4: ฉีด 3 เข็ม ครบ 120 วัน</li>
          </ul>
        </ul>
      </div>
      <div>
        <ul>
          <li>สถานที่: สถานีกลางบางซื่อ</li>
        </ul>
      </div>
      <div>
        <ul>
          <li>รอรับ SMS แจ้งผลลงทะเบียนภายใน 2 ชม.</li>
          <li>1 หมายเลข (ค่ายใดก็ได้) / 5 บัตรประชาชน บัตรชมพู หรือพาสปอร์ต</li>
        </ul>
      </div>
      <div class="mb-3 text-center">
        <a href="https://m.ais.co.th/vaccine-faq" target="_blank">
          <button
            class="btn btn-sm text-light"
            style="background-color: #5c8e26"
          >
            ดูคำถามเพิ่มเติม
          </button>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2"
import axios from "axios"
import useVuelidate from "@vuelidate/core"
import {
  required,
  email,
  minLength,
  maxLength,
  numeric,
  sameAs,
} from "@vuelidate/validators"
import Nprogress from "nprogress"
export default {
  name: "Signup",
  data() {
    return {
      v$: useVuelidate(),
      signup: {
        phone: "",
        password: "",
        c_password: "",
      },
    }
  },
  validations() {
    return {
      signup: {
        phone: { required, maxLength: maxLength(10) },
        password: {
          required,
          minLength: minLength(5),
          maxLength: maxLength(20),
        },
        c_password: {
          required,
          sameAs: sameAs(this.signup.password),
        },
      },
    }
  },
  methods: {
    submitSignup() {
      Nprogress.start()
      axios
        .post(`http://159.223.45.216:2016/users/signup`, this.signup)
        .then((res) => {
          Nprogress.done()
          if (res.data.status) {
            Swal.fire({
              title: "สำเร็จ",
              text: res.data.message,
              icon: "success",
              timer: 3000,
              showConfirmButton: false,
            }).then(() => {
              this.$router.push("/signin")
            })
          } else {
            Swal.fire({
              title: "ไม่สำเร็จ",
              text: res.data.message,
              icon: "error",
              timer: 3000,
              showConfirmButton: false,
            })
            this.signup.password = ""
            this.signup.c_password = ""
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    validateSignup() {
      this.v$.$validate()
      if (!this.v$.$error) {
        this.submitSignup()
      }
    },
  },
}
</script>
