<template>
  <div>
    <div class="text-center">
      <div class="mb-3">
        <img
          src="https://www.ais.th/vaccinesforthais/images/vaccines-logo.png"
          alt=""
        />
      </div>
      <div class="h2">เชื่อมต่อ ช่วยเหลือ เพื่อคนไทยสู้ภัยโควิด</div>
      <div class="h3">Connecting All Thais in the Fight Agianst COVID</div>
      <div class="w-50 m-auto mb-3">
        <img
          class="w-100"
          src="https://www.ais.th/vaccinesforthais/images/vaccine28-04-2022.png"
          alt=""
        />
      </div>
      <div class="text-center mb-3">
        <router-link to="/signup">
          <button class="btn btn-lg" style="background-color: #b1d334">
            ลงทะเบียนจองคิว - Register
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Home",
  components: {},
  props: {
    user: { type: Object },
  },
  data() {
    return {}
  },
  methods: {},
  created() {},
}
</script>
<style scoped></style>
