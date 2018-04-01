<template>
  <b-row class="justify-content-center text-center ml-md-auto mt-2">
    <b-col cols="11" sm="10" md="7" lg="5" xl="4" class="border pb-2 pt-2">
      <h2>Registrierung</h2>
      <p v-if="error">Der Nutzer konnte nicht registriert werden, bitte versuche es erneut.</p>
      <ul>
        <li v-for="error in form.passwordError">{{error}}</li>
      </ul>
      <b-form @submit="onSubmit" v-if="show">
        <b-form-group id="username"
                      label="Nutzername"
                      label-for="username">
          <b-form-input id="username"
                        type="text"
                        v-model="form.username"
                        required
                        placeholder="Enter username">
          </b-form-input>
        </b-form-group>
        <b-form-group id="email"
                      label="Email Adresse"
                      label-for="email"
        >
          <b-form-input id="email"
                        type="email"
                        v-model="form.email"
                        :state="!$v.form.email.$invalid"
                        required
                        placeholder="Enter email">
          </b-form-input>
          <b-form-invalid-feedback id="input1LiveFeedback">
            Bitte gebe eine valide E-Mail an.
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group id="password"
                      label="Passwort"
                      label-for="password">
          <b-form-input id="password"
                        type="password"
                        :state="!$v.form.password"
                        v-model="form.password"
                        required
                        placeholder="Enter password">
          </b-form-input>
          <b-form-invalid-feedback id="input1LiveFeedback">
            <ul>
              <li v-for="error in form.passwordError.$invalid">{{error}}</li>
            </ul>

          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group id="passwordSafety"
                      label-for="passwordSafety">
          <b-form-input id="passwordSafety"
                        type="password"
                        v-model="form.passwordSafety"
                        :state="!$v.form.passwordSafety.$invalid"
                        required
                        placeholder="Enter password again">
          </b-form-input>
          <b-form-invalid-feedback id="input1LiveFeedback">
            Die Passwörter müssen identisch sein
          </b-form-invalid-feedback>
        </b-form-group>
        <b-button type="submit" variant="primary" :disabled="$v.form.$invalid">Submit</b-button>
      </b-form>
      <div v-if="!show && response">
        Dein Account wurde erfolgreich angelegt.
        Bitte bestätige deinen Account über die Aktivierungsmail.
      </div>
      <div v-if="!show && !response">
        Die Account daten werden übermittelt.
      </div>
    </b-col>
  </b-row>
</template>

<script>
  import * as CONFIG from '../../config'
  import {validationMixin} from "vuelidate"
  import {required, minLength, sameAs, email} from "vuelidate/lib/validators"


  export default {
    name: "Registration",
    data() {
      return {
        form: {
          username: '',
          email: '',
          password: '',
          passwordError: ['Ein Passwort darf nicht zu ähnlich zum Benutzernamen sein.', ' Ein Passwort muss mindestens 8 Zeichen enthalten.'],
          passwordSafety: '',
        },
        response: false,
        show: true,
        error: false,
      }
    },
    mixins: [validationMixin],
    validations: {
      form: {
        username: {
          required,
        },
        email: {
          required,
          email,
        },
        password: {
          required,
          minLength: minLength(8),
        },
        passwordSafety: {
          required,
          sameAsPassword: sameAs('password'),
        },
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault();
        this.show = false;
        this.error = false;
        let url = CONFIG.API_ROOT.concat('/token-auth/users/create/');
        let post_data = {
          "username": this.form.username,
          "email": this.form.email,
          "password": this.form.password,
          // "re_new_password": this.form.passwordSafety,
        };
        window.axios
          .post(url, post_data)
          .then(response => {
              this.error = false;
              this.response = true;
            }
          )
          .catch(
            e => {
              if (e.response.data.password) {
                this.form.passwordError = e.response.data.password;
              }
              this.error = true;
              this.show = true;
            }
          );
      },
    },
  }
</script>

<style scoped>

</style>
