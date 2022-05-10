<template>
  <div>
    <div class="text-center">
      <div class="mb-3">
        <img
          src="https://www.ais.th/vaccinesforthais/images/vaccines-logo.png"
          alt=""
        />
      </div>
      <br /><br />
      <div class="h2">ประวัติการจองของฉัน</div>
      <br />
      <div
        class="content animate__animated animate__fadeIn"
        v-if="reserve.length"
      >
        <table class="table table-striped table-hover table-responsive">
          <thead>
            <tr>
              <td class="text-center"><b>วันทำรายการ</b></td>
              <td class="text-center"><b>สถานที่</b></td>
              <td class="text-center"><b>วันนัด</b></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(reserv, index) in reserve" :key="index">
              <td>{{ convertDate(reserv.timestamp) }}</td>
              <td>{{ reserv.location }}</td>
              <td>
                <span class="badge bg-info text-dark">{{
                  convertDate(reserv.reserveDate)
                }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="content text-center fs-4 animate__animated animate__fadeIn"
        v-else
      >
        ยังไม่มีข้อมูล
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment"
import Swal from "sweetalert2"
import axios_mod from "../plugins/axios"
import Nprogress from "nprogress"
export default {
  name: "Success",
  components: {},
  props: {
    user: { type: Object },
  },
  data() {
    return {
      reserve: {},
    }
  },
  methods: {
    convertDate(date) {
      moment.locale("th")
      return moment(date).format("LL")
    },
    getReserve() {
      axios_mod
        .get("/reserve/selectByMy")
        .then((res) => {
          this.reserve = res.data.reserve
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  mounted() {
    this.getReserve()
  },
  created() {},
}
</script>
<style scoped></style>
