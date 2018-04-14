<template>
  <b-row class="justify-content-center text-center ml-md-auto mt-2">
    <b-col cols="11" sm="10" md="7" lg="5" xl="4" class="border pb-2 pt-2">
      Du wurdest erfolgreich ausgeloggt.
    </b-col>
  </b-row>
</template>

<script>
  import Auth from '../../authentication'
  import router from '../../router'

  export default {
    name: "Logout",
    created() {
      if (Auth.authenticated()) {
        Auth.logout(this.$store);
      }
      setTimeout(function () {
        router.go(-1);
      }, 3000);
    }
  }
</script>

<style scoped>

</style>
