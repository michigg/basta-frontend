<template>
  <div>
    <div v-if="!showFormular" class="row p-1">
      <b-col cols="12" sm="12" md="12" lg="8" xl="8" class="p-3 bg-light text-dark">
        <h3>{{user.username}}</h3>
        <p><strong>Vorname:</strong> {{ user.first_name }}</p>
        <p><strong>Nachname:</strong> {{ user.last_name }}</p>
        <p><strong>E-Mail:</strong> {{ user.email }}</p>
        <!--<a href="{{ url('change-account') }}">Bearbeiten</a>-->
        <b-button :pressed.sync="showFormular" variant="primary">{{this.formularButtonLabel}}</b-button>
      </b-col>
      <div class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 text-center p-3">
        <div class="p-3 bg-light text-dark">
          <p>Date joined: {{ user.date_joined | formatDate}}</p>
          <p>Last Login: {{ user.last_login | formatDate}}</p>
        </div>
      </div>
    </div>
    <div v-if="showFormular" class="row">
      <account-formular :user="user"></account-formular>
      <b-button :pressed.sync="showFormular" variant="primary">{{this.formularButtonLabel}}</b-button>
    </div>
  </div>
</template>

<script>
  import * as CONFIG from '../../../config.js';
  import AccountFormular from '@/components/account/utils/AccountFormular';

  export default {
    name: "AccountDetails",
    components: {AccountFormular},
    props: ['user'],
    data() {
      return {
        account: {},
        showFormular: false,
        formularButtonLabel: 'Bearbeiten',
      }
    },

    watch: {
      showFormular: function (newShowFormular) {
        if (newShowFormular) {
          this.formularButtonLabel = 'Fertig'
        } else {
          this.formularButtonLabel = 'Bearbeiten'
        }
      },
    },
  }
</script>

<style scoped>

</style>
