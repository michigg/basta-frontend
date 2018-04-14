<template>
  <div>
    <div id="rating" class=""><strong>Rating:</strong>
      <fa-rating :glyph="star"
                 :spacing="-1"
                 :inactive-color="'#cfcfcf'"
                 :active-color="'#878787'"
                 :increment="0.5"
                 :fixed-points="2"
                 :show-rating="false"
                 :item-size="15"
                 :inline="true"
                 :read-only="true"
                 v-model="globalRating">
      </fa-rating>
    </div>
    <div v-if="isAuthenticated()" id="user-rating" class=""><strong>Dein Rating:</strong>
      <fa-rating :glyph="star"
                 :spacing="-1"
                 :inactive-color="'#cfcfcf'"
                 :active-color="'#0074D9'"
                 :increment="0.5"
                 :fixed-points="2"
                 :show-rating="false"
                 :item-size="15"
                 :inline="true"
                 v-model="userRating">
      </fa-rating>
    </div>
  </div>
</template>

<script>
  import router from '../../../router'
  import {FaRating} from 'vue-rate-it';
  import Star from 'vue-rate-it/glyphs/star';
  import authentication from '../../../authentication'
  import * as CONFIG from '../../../config'

  export default {
    name: "RatingCombined",
    components: {FaRating},
    data() {
      return {
        star: Star,
        userRating: 0.0,
        loaded: false,
      };
    },
    computed: {
      foodID() {
        return this.$store.getters.getDetailedFoodID
      },
      globalRating() {
        return this.$store.getters.getDetailedFoodRating
      },
    },
    created() {
      if (window.authentication.authenticated() && this.foodID) {
        this.loadUserRating();
        this.loaded = true;
      }
    },
    watch: {
      foodID: function () {
        this.loadUserRating();
        this.loaded = true;
      },
      userRating: function (newRating) {
        if (authentication.authenticated() && this.loaded) {
          let url = CONFIG.API_ROOT_FOOD + '/meals/' + this.$route.params.id + '/rating';
          window.axios
            .post(url, {rating: newRating})
            .then(response => {
                this.$store.dispatch('loadDetailedFood', {foodId: this.$route.params.id}).then()
              }
            )
            .catch();
        } else {
          router.push({name: 'login'})
        }
      }
    },
    methods: {
      isAuthenticated: function () {
        return authentication.authenticated();
      },
      loadUserRating: function () {
        if (authentication.authenticated()) {
          let url = CONFIG.API_ROOT_ACCOUNT + '/food/ratings/?food_id=' + this.$route.params.id;
          window.axios
            .get(url)
            .then(response => {
                if (response.data.length > 0) {
                  this.userRating = response.data[0].rating;
                }
              }
            )
            .catch();
        }
      },
    },
  }
</script>

<style scoped>

</style>
