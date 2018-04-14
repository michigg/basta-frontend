import router from '@/router'
import {API_ROOT} from '@/config.js'

export default {
  user: {
    authenticated: false
  },

  // authentication status
  authenticated() {
    return (localStorage.getItem('user') !== null && JSON.parse(localStorage.getItem('user')).data.token !== '')
  },

  // Send a request to the login URL and save the returned JWT
  login(creds, store) {
    console.log(store);
    console.log('LOGIN');
    window.axios.post(API_ROOT.concat('/token-auth/token/create/'), creds)
      .then((response) => {
        this.user.authenticated = true;
        store.dispatch('login').then();
        console.log(response);
        localStorage.setItem('user', JSON.stringify(response));
        // Redirect to a specified route
        window.axios.defaults.headers.common = {
          'Authorization': ('Token ' + JSON.parse(localStorage.getItem('user')).data.auth_token)
        };
        location.reload();
      })
      .catch(function (error) {
        console.log(error);
        alert(error.response.data.non_field_errors[0]);
      })
  },

  // To log out
  logout: function (store) {
    window.axios.post(API_ROOT.concat('/token-auth/token/destroy/'),)
      .then((response) => {
        this.user.authenticated = false;
        store.dispatch('logout').then();
        localStorage.removeItem('user');
        console.log(response);

        window.axios.defaults.headers.common = {
          'Authorization': '',
        };
        location.reload();
      })
      .catch(function (error) {
        console.log(error);
        alert(error.response.data);
      });
  }
}
