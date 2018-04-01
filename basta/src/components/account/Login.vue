<template>
  <div v-if="!isAuthenticated()">
    <b-row class="justify-content-center text-center ml-md-auto mt-2">
      <b-col cols="11" sm="10" md="7" lg="5" xl="4" class="border pb-2 pt-2">
        <h2>Login</h2>
        <b-form @submit="onSubmit" v-if="show">
          <b-form-group id="username"
                        label="User Name:"
                        label-for="username">
            <b-form-input id="username"
                          type="text"
                          v-model="form.username"
                          required
                          placeholder="Enter username">
            </b-form-input>
          </b-form-group>
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
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
      </b-col>
      <b-col cols="12" class="">
        <br/>
        <p>
          <router-link :to="{name: 'password-reset-mail'}">Passwort vergessen?</router-link>
        </p>
        <p>
          <router-link :to="{name: 'registration'}">Noch keinen Account?</router-link>
        </p>
      </b-col>
    </b-row>
  </div>
  <div v-else>
    <b-row class="justify-content-center text-center ml-md-auto mt-2">
      <b-col cols="11" sm="10" md="7" lg="5" xl="4" class="border pb-2 pt-2">
        Du wurdest erfolgreich eingeloggt.
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import authentication from "../../authentication";
  import router from '../../router'

  export default {
    name: "Login",
    data() {
      return {
        form: {
          username: '',
          password: '',
        },
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault();
        authentication.login({"username": this.form.username, "password": this.form.password}, -1);
      },
      isAuthenticated: function () {
        if (authentication.authenticated()) {
          router.go(-1);
          return true;
        } else {
          return false;
        }
      },
    }
  }
</script>

<style scoped>

</style>
