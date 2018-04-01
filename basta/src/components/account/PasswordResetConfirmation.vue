<template>
  <b-row class="justify-content-center text-center ml-md-auto mt-2">
    <b-col cols="11" sm="10" md="7" lg="5" xl="4" class="border pb-2 pt-2">
      <h2>Passwort Reset</h2>
      <p v-if="error">Das Passwort konnte nicht zurück gesetzt werden.</p>
      <b-form @submit="onSubmit" v-if="show">
        <b-form-group id="password"
                      label="Password:"
                      label-for="password">
          <b-form-input id="password"
                        type="password"
                        v-model="form.password"
                        required
                        placeholder="Enter password">
          </b-form-input>
        </b-form-group>
        <b-form-group id="passwordSafety"
                      label-for="passwordSafety">
          <b-form-input id="passwordSafety"
                        type="password"
                        v-model="form.passwordSafety"
                        required
                        placeholder="Enter password again">
          </b-form-input>
        </b-form-group>
        <div v-if="error" class="error">
          <p v-for="error in errorMsgs">{{error}}</p>
        </div>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
      <div v-if="!show">
        <p>Passwort wurde erfolgreich zurückgesetzt.</p>
        <p>Zurück zum
          <router-link :to="{name: 'login'}">Login</router-link>
          .
        </p>
      </div>
    </b-col>
  </b-row>
</template>

<script>
  import * as CONFIG from "../../config";

  export default {
    name: "PasswordResetMail",
    data() {
      return {
        form: {
          password: '',
          passwordSafety: ''
        },
        show: true,
        error: false,
        errorMsgs: []
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault();
        this.errorMsgs = [];
        let url = CONFIG.API_ROOT.concat('/token-auth/password/reset/confirm/');
        let post_data = {
          "new_password": this.form.password,
          "re_new_password": this.form.passwordSafety,
          "uid": this.$route.params.uuid,
          "token": this.$route.params.token,
        };
        window.axios
          .post(url, post_data)
          .then(response => {
              this.show = false;
              this.error = false;
            }
          )
          .catch(
            e => {
              this.error = true;
              console.log(e);
              if (e.response.data.new_password) {
                for (const error of e.response.data.new_password) {
                  this.errorMsgs.push(error);
                }
              }
              if (e.response.data.non_field_errors) {
                this.errorMsgs.push(e.response.data.non_field_errors[0]);
              }
              console.log(this.errorMsgs)
            }
          );
      },
    },
  }
</script>

<style scoped>
  .error {
    font-size: 13px;
    color: #ff253a;
  }
</style>
