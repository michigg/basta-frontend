<template>
  <b-row class="justify-content-center text-center ml-md-auto mt-2">
    <b-col cols="11" sm="10" md="7" lg="5" xl="4" class="border pb-2 pt-2 text-left">
      <b-form @submit="onSubmit">
        <b-form-input id="username"
                      type="text"
                      v-model="form.username"
                      required
                      placeholder="Nutzername">
        </b-form-input>
        <b-form-input id="firstName"
                      type="text"
                      v-model="form.firstName"
                      placeholder="Vorname">
        </b-form-input>
        <b-form-input id="lastName"
                      type="text"
                      v-model="form.lastName"
                      placeholder="Nachname">
        </b-form-input>
        <b-form-input id="email"
                      type="email"
                      v-model="form.email"
                      :state="!$v.form.email.$invalid"
                      placeholder="Email Adresse">
        </b-form-input>
        <multiselect
          v-model="form.fakultaet"
          :options="fakultaetOptions"
          :multiple="false"
          :custom-label="optionLabel"
          track-by="text"
          placeholder="Fakultät"
        >
        </multiselect>
        <b-form-checkbox id="fakultaetsNews"
                         v-model="form.fakultaetsNews"
                         value=true
                         unchecked-value=false>
          Fakultätsnachrichten
        </b-form-checkbox>
        <multiselect
          v-model="form.allergens"
          :options="allergensOptions"
          :multiple="true"
          :custom-label="optionLabel"
          track-by="text"
          placeholder="Allergene"
        >
        </multiselect>
        <b-button type="submit" variant="primary" :disabled="$v.form.$invalid">Submit</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
  import * as CONFIG from '../../../config';
  import {validationMixin} from "vuelidate";
  import {required, minLength, sameAs, email} from "vuelidate/lib/validators";
  import Multiselect from 'vue-multiselect';

  export default {
    name: "AccountFormular",
    props: ['user'],
    components: {Multiselect,},
    data() {
      return {
        form: {
          username: '',
          firstName: '',
          lastName: '',
          email: '',
          fakultaet: '',
          fakultaetsNews: false,
          allergens: '',
        },
        fakultaetOptions: [
          {value: 1, text: 'SoWi'},
          {value: 2, text: 'GuK'},
          {value: 3, text: 'HuWi'},
          {value: 4, text: 'WIAI'},
        ],
        allergensOptions: [
          {value: 1, text: 'Gluten'},
          {value: 2, text: 'Schwein'},
          {value: 3, text: 'Rind'},
          {value: 4, text: 'KA'},
        ],
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
      }
    },
    created() {
      this.updateFormular();
    },
    watch: {
      user: function (newUser) {
        this.updateFormular();
      }
    },
    methods: {
      updateFormular() {
        this.form.username = this.user.username;
        this.form.firstName = this.user.firstName;
        this.form.lastName = this.user.lastName;
        this.form.email = this.user.email;
      },
      optionLabel(option) {
        return option.text;
      },
      onSubmit(evt) {
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

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>

</style>
