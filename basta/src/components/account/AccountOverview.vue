<template>
  <div>
    <b-tabs>
      <b-tab title="Account Details" active>
        <account-details :user="user"></account-details>
      </b-tab>
      <b-tab title="Food App">
        <food></food>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
  import * as CONFIG from '../../config.js';
  import AccountDetails from '@/components/account/utils/AccountDetails';
  import Food from '@/components/account/utils/Food';

  export default {
    name: "AccountOverview",
    components: {AccountDetails, Food,},
    data() {
      return {
        user: {},
      }
    },
    created() {
      window.axios
        .get(CONFIG.API_ROOT_ACCOUNT.concat('/'))
        .then((response) => {
          console.log(response.data);
          this.user = response.data[0];
        })
        .catch(e => console.error(e));
    },
  }
</script>

<style scoped>

</style>
