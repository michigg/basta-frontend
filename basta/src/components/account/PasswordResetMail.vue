<template>
  <b-row class="justify-content-center text-center ml-md-auto mt-2">
    <b-col cols="11" sm="10" md="7" lg="5" xl="4" class="border pb-2 pt-2">
      <h2>Passwort Reset</h2>
      <b-form @submit="onSubmit" v-if="show">
        <b-form-group id="email"
                      label="Email-Adresse"
                      label-for="email"
        >
          <b-form-input id="email"
                        type="email"
                        v-model="form.email"
                        :state="!form.emailErrorVal"
                        required
                        placeholder="Enter email">
          </b-form-input>
          <b-form-invalid-feedback id="input1LiveFeedback">
            <p v-for="error in form.emailError">{{error}}</p>
          </b-form-invalid-feedback>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
      <div v-if="!show">
        Die E-Mail wurde erfolgreich versandt.
        <p>Zurück zu
          <router-link :to="{name: 'home'}">Home</router-link>
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
          email: '',
          emailError: '',
          emailErrorVal: false,
        },
        show: true,
        error: false,
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault();
        this.form.emailErrorVal = false;
        let url = CONFIG.API_ROOT.concat('/token-auth/password/reset/');
        let post_data = {
          "email": this.form.email,
        };
        window.axios
          .post(url, post_data)
          .then(response => {
              this.show = false;
            }
          )
          .catch(
            e => {
              this.form.emailError = e.response.data.email;
              this.form.emailErrorVal = true;
            }
          );
      },
    },
  }
</script>

<style scoped>

</style>
