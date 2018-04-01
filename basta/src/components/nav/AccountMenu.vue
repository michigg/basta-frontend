<template>
  <div>
    <div v-if="isAuthenticated()">
      <b-nav pills>
        <b-nav-item-dropdown id="nav7_ddown" text="Account" extra-toggle-classes="nav-link-custom" right>
          <b-dropdown-item>
            <router-link :to="{name: 'account'}" class="dropdown-item">
              <icon :name="'user'" :scale="1"></icon>
              Profile
            </router-link>
          </b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item>
            <router-link :to="{name:'logout'}" class="dropdown-item">
              <icon :name="'sign-out'" :scale="1"></icon>
              Logout
            </router-link>
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-nav>
    </div>
    <div v-else>
      <router-link :to="{name:'login'}" class="dropdown-item">
        <icon :name="'sign-in'" :scale="1"></icon>
        Login
      </router-link>
    </div>
  </div>
  <!--<div class="dropdown">-->
  <!--<button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton"-->
  <!--data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">-->
  <!--<i class="fa fa-user" aria-hidden="true"></i>-->
  <!--</button>-->
  <!--<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">-->
  <!--<router-link :to="{name: 'login'}" class="dropdown-item">-->
  <!--<i class="fa fa-user" aria-hidden="true"></i>-->
  <!--Profile-->
  <!--</router-link>-->
  <!--<router-link :to="{name:'logout'}" class="dropdown-item">-->
  <!--<i class="fa fa-sign-out" aria-hidden="true"></i>-->
  <!--Logout-->
  <!--</router-link>-->
  <!--</div>-->
  <!--</div>-->
  <!--{% else %}-->
  <!--<a href="{{ url('login') }}"><i class="fa fa-sign-in" aria-hidden="true"></i></a>-->
</template>

<script>
  import Icon from 'vue-awesome/components/Icon'
  import 'vue-awesome/icons/user';
  import authentication from "../../authentication";

  export default {
    name: "AccountMenu",
    components: {Icon},
    data() {
      return {
        auth: authentication.user.authenticated,
      };
    },
    methods: {
      isAuthenticated: function () {
        return authentication.authenticated();
      }
    },
  }
</script>

<style scoped>

</style>
