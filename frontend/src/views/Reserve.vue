<template>
  <div>
    <div class="text-center">
      <img
        class="w-100"
        src="https://vaccineforthais.ais.th/Images/MicrosoftTeams-image.png"
        alt=""
      />
    </div>
    <br /><br />
    <div class="h3" style="color: #b1d334">ข้อมูลผู้ลงทะเบียนรับวัคซีน</div>
    <hr />
    <div>
      <form @submit.prevent="validateReserve()">
        <div class="row mb-3">
          <div class="col">คำนำหน้า*</div>
          <div class="col">
            <select class="form-select" v-model="reserve.pre">
              <option v-for="(pre, index) in pres" :key="index" :value="pre">
                {{ pre }}
              </option>
            </select>
            <div v-if="v$.reserve.pre.$error" class="my-2 text-danger">
              โปรดป้อนคำนำหน้าให้ถูกต้อง
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">ชื่อ*</div>
          <div class="col">
            <input
              type="text"
              v-model="reserve.fname"
              class="form-control"
              :class="{ 'is-invalid': v$.reserve.fname.$error }"
              maxlength="100"
            />
            <div v-if="v$.reserve.fname.$error" class="my-2 text-danger">
              โปรดป้อนชื่อให้ถูกต้อง
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">นามสกุล*</div>
          <div class="col">
            <input
              type="text"
              v-model="reserve.lname"
              class="form-control"
              :class="{ 'is-invalid': v$.reserve.lname.$error }"
              maxlength="100"
            />
            <div v-if="v$.reserve.lname.$error" class="my-2 text-danger">
              โปรดป้อนนามสกุลให้ถูกต้อง
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">เพศ*</div>
          <div class="col">
            <select class="form-select" v-model="reserve.sex">
              <option v-for="(sex, index) in sexs" :key="index" :value="sex">
                {{ sex }}
              </option>
            </select>
            <div v-if="v$.reserve.sex.$error" class="my-2 text-danger">
              โปรดป้อนเพศให้ถูกต้อง
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">วัน-เดือน-ปี เกิด*</div>
          <div class="col">
            <input
              type="date"
              v-model="reserve.born"
              class="form-control"
              :class="{ 'is-invalid': v$.reserve.born.$error }"
            />
            <div v-if="v$.reserve.lname.$error" class="my-2 text-danger">
              โปรดป้อนวัน-เดือน-ปี เกิดให้ถูกต้อง
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">บัตรประจำตัว*</div>
          <div class="col">
            <select class="form-select" v-model="reserve.card">
              <option v-for="(card, index) in cards" :key="index" :value="card">
                {{ card }}
              </option>
            </select>
            <div v-if="v$.reserve.card.$error" class="my-2 text-danger">
              โปรดป้อนบัตรประจำตัวให้ถูกต้อง
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">หมายเลขบัตรประจำตัว*</div>
          <div class="col">
            <input
              type="text"
              v-model="reserve.idcard"
              class="form-control"
              maxlength="13"
              :class="{ 'is-invalid': v$.reserve.idcard.$error }"
            />
            <div v-if="v$.reserve.idcard.$error" class="my-2 text-danger">
              โปรดป้อนหมายเลขบัตรประจำตัวให้ถูกต้อง
            </div>
          </div>
        </div>

        <br />
        <div class="h3" style="color: #b1d334">ข้อมูลการติดต่อ</div>
        <hr />
        <div class="row mb-3">
          <div class="col">หมายเลขโทรศัพท์ของผู้รับวัคซีน *</div>
          <div class="col">
            <input
              type="text"
              v-model="reserve.phone"
              class="form-control"
              maxlength="10"
              :class="{ 'is-invalid': v$.reserve.phone.$error }"
              readonly
            />
            <div v-if="v$.reserve.phone.$error" class="my-2 text-danger">
              โปรดป้อนหมายเลขโทรศัพท์ของผู้รับวัคซีนให้ถูกต้อง
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">Line ID</div>
          <div class="col">
            <input
              type="text"
              v-model="reserve.lineid"
              class="form-control"
              maxlength="100"
              :class="{ 'is-invalid': v$.reserve.lineid.$error }"
            />
            <div v-if="v$.reserve.lineid.$error" class="my-2 text-danger">
              โปรดป้อน Line ID ให้ถูกต้อง
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">อีเมล</div>
          <div class="col">
            <input
              type="text"
              v-model="reserve.email"
              class="form-control"
              maxlength="100"
              :class="{ 'is-invalid': v$.reserve.email.$error }"
            />
            <div v-if="v$.reserve.email.$error" class="my-2 text-danger">
              โปรดป้อนอีเมลให้ถูกต้อง
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">สถานที่ฉีดวัคซีน</div>
          <div class="col">
            <input
              type="text"
              v-model="reserve.location"
              class="form-control"
              maxlength="100"
              :class="{ 'is-invalid': v$.reserve.location.$error }"
              readonly
            />
            <div v-if="v$.reserve.location.$error" class="my-2 text-danger">
              โปรดป้อนสถานที่ฉีดวัคซีนให้ถูกต้อง
            </div>
          </div>
        </div>

        <br />
        <div class="h3" style="color: #b1d334">วัน-เวลารับวัคซีน</div>
        <hr />
        <div class="row mb-3 col-lg-5 col-md-5 col-sm-12 m-auto">
          <input
            type="date"
            v-model="reserve.reserveDate"
            class="form-control"
            :class="{ 'is-invalid': v$.reserve.reserveDate.$error }"
          />
          <div v-if="v$.reserve.reserveDate.$error" class="my-2 text-danger">
            โปรดป้อนวัน-เวลารับวัคซีนให้ถูกต้อง
          </div>
        </div>
        <div class="mb-3 text-center">
          <button type="submit" class="btn" style="background-color: #b1d334">
            ทำรายการ
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2"
import axios_mod from "../plugins/axios"
import useVuelidate from "@vuelidate/core"
import { required, minLength, maxLength } from "@vuelidate/validators"
import Nprogress from "nprogress"
export default {
  name: "Reserve",
  components: {},
  props: {
    user: { type: Object },
  },
  data() {
    return {
      v$: useVuelidate(),
      pres: ["นาย", "นาง", "นางสาว", "เด็กชาย", "เด็กหญิง"],
      sexs: ["ชาย", "หญิง"],
      cards: ["บัตรประชาชน", "บัตรชมพู", "พาสปอร์ต"],
      reserve: {
        pre: "",
        fname: "",
        lname: "",
        sex: "",
        born: "",
        card: "",
        idcard: "",
        phone: "",
        lineid: "",
        email: "",
        address: "",
        location: "สถานีกลางบางซื่อ",
        reserveDate: "",
      },
    }
  },
  validations() {
    return {
      reserve: {
        pre: { required },
        fname: { required, maxLength: maxLength(100) },
        lname: { required, maxLength: maxLength(100) },
        sex: { required },
        born: { required },
        card: { required },
        idcard: { required, maxLength: maxLength(100) },
        phone: { required, maxLength: maxLength(100) },
        lineid: { required, maxLength: maxLength(100) },
        email: { required, maxLength: maxLength(100) },
        location: { required, maxLength: maxLength(100) },
        reserveDate: { required },
      },
    }
  },
  methods: {
    submitReserve() {
      Nprogress.start()
      axios_mod
        .post(`/reserve/add`, this.reserve)
        .then((res) => {
          Nprogress.done()
          if (res.data.status) {
            Swal.fire({
              title: res.data.message,
              icon: "success",
              timer: 3000,
              showConfirmButton: false,
            }).then(() => {
              this.$router.push("/success")
            })
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
    getMe() {
      axios_mod
        .get("/users/me")
        .then((res) => {
          this.reserve.phone = res.data.phone
        })
        .catch((error) => {
          console.log(error)
        })
    },
    validateReserve() {
      this.v$.$validate()
      if (!this.v$.$error) {
        this.submitReserve()
      }
    },
  },
  mounted() {
    this.getMe()
  },
  created() {},
}
</script>
<style scoped></style>
