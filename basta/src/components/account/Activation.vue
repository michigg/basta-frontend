<template>
  <b-row>
    <b-col class="justify-content-md-center text-center">
      <div v-if="activated">
        <p>Dein Account ist nun aktiviert.</p>
        <router-link :to="{name: 'home'}">Home</router-link>
      </div>
      <div v-else>
        <p v-if="!error">Account wird aktiviert.</p>
        <p v-if="error">Leider konnte der Account nicht aktiviert werden.</p>
        <router-link :to="{name: 'home'}">Home</router-link>
      </div>
    </b-col>
  </b-row>
</template>

<script>
  import * as CONFIG from '../../config'

  export default {
    name: "Activation",
    data() {
      return {
        activated: false,
        error: false,
      }
    },
    created() {
      let url = CONFIG.API_ROOT.concat('/token-auth/users/activate/');
      let post_data = {
        "uid": this.$route.params.uuid,
        "token": this.$route.params.token,
      };
      window.axios
        .post(url, post_data)
        .then(response => {
            this.activated = true;
          }
        )
        .catch(
          e => {
            this.error = true;
          }
        );
    },
  }
</script>

<style scoped>

</style>
