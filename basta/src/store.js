import Vue from 'vue'
import Vuex from 'vuex'
import * as CONFIG from './config'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: {
      authenticated: true,
    },
    foodAppStudWue: {
      locations: [],
      defaultImage: '',
      currentFood: {},
      currentFoodComments: [],
      currentFoodUserImage: '',
    },
  },
  getters: {
    isAuthenticated: state => {
      return state.user.authenticated
    },
    getStudWuerzburgLocations: state => {
      return state.foodAppStudWue.locations
    },
    getDefaultImageLocation: state => {
      return state.foodAppStudWue.defaultImage
    },
    getDetailedFood: state => {
      return state.foodAppStudWue.currentFood
    },
    getDetailedFoodID: state => {
      return state.foodAppStudWue.currentFood.id
    },
    getDetailedFoodRating: state => {
      return state.foodAppStudWue.currentFood.rating
    },
    getDetailedFoodImage: state => {
      return state.foodAppStudWue.currentFood.image
    },
    getDetailedFoodUserImage: state => {
      return state.foodAppStudWue.currentFoodUserImage
    },
    getDetailedFoodUserAllergens: state => {
      return state.foodAppStudWue.currentFood.allergens
    },
    getDetailedFoodPrices: state => {
      return {
        employee: state.foodAppStudWue.currentFood.price_employee,
        guest: state.foodAppStudWue.currentFood.price_guest,
        student: state.foodAppStudWue.currentFood.price_student,
      }
    },
    getDetailedFoodComments: state => {
      return state.foodAppStudWue.currentFoodComments
    },
  },
  mutations: {
    logout(state) {
      state.user.authenticated = false;
    },
    login(state) {
      state.user.authenticated = true;
    },
    loadLocations(state) {
      window.axios.get(CONFIG.API_ROOT_FOOD.concat('/menus/locations'))
        .then(response => {
          state.foodAppStudWue.locations = response.data;
        })
        .catch(e => {
          console.error(e)
        });
    },
    loadDefaultImageLocation(state) {
      window.axios.get(CONFIG.API_ROOT_FOOD.concat('/meals/images/default'))
        .then(response => {
          state.foodAppStudWue.defaultImage = response.data.image;
        })
        .catch(e => {
          console.error(e)
        });
    },
    loadDetailedFood(state, {foodId}) {
      window.axios.get(CONFIG.API_ROOT_FOOD
        .concat('/meals/').concat(foodId))
        .then(response => {
          state.foodAppStudWue.currentFood = response.data;
        })
        .catch(e => {
        });
      window.axios.get(CONFIG.API_ROOT_FOOD
        .concat('/meals/').concat(foodId).concat('/comments'))
        .then(response => {
          state.foodAppStudWue.currentFoodComments = response.data;
        })
        .catch(e => {
        });
      if (state.user.authenticated) {
        state.foodAppStudWue.currentFoodUserImage = '';
        let url = CONFIG.API_ROOT_ACCOUNT + '/food/images/?food_id=' + foodId;
        window.axios
          .get(url)
          .then(response => {
            if (response.data.length > 0) {
              state.foodAppStudWue.currentFoodUserImage = response.data[0].image.image;
            }
          })
          .catch(e => {
            console.error(e)
          })
      }
    },
    loadUserImage(state, {foodId}) {
      if (state.user.authenticated) {
        let url = CONFIG.API_ROOT_ACCOUNT + '/food/images/?food_id=' + foodId;
        window.axios
          .get(url)
          .then(response => {
            if (response.data.length > 0) {
              state.foodAppStudWue.currentFoodUserImage = response.data[0].image.image;
            }
          })
          .catch(e => {
            console.error(e)
          })
      }
    },
    setUserImage(state, {image}) {
      state.foodAppStudWue.currentFoodUserImage = image;
    }
  },
  actions: {
    login(context) {
      context.commit('login')
    },

    logout(context) {
      context.commit('logout')
    },
    loadLocations(context) {
      context.commit('loadLocations')
    },
    loadDefaultImageLocation(context) {
      context.commit('loadDefaultImageLocation')
    },
    loadDetailedFood(context, foodId) {
      context.commit('loadDetailedFood', foodId)
    },
    loadUserImage(context, foodId) {
      context.commit('loadUserImage', foodId)
    },
    setUserImage(context, image) {
      context.commit('setUserImage', image)
    },
  },
});
