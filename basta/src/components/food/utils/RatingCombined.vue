<template>
  <div>
    <div id="rating" class="mt-3"><strong>Rating:</strong>
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
    <div v-if="isAuthenticated()" id="user-rating" class="mt-3"><strong>Dein Rating:</strong>
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
    props: ['globalRating', 'foodId'],
    data() {
      return {
        star: Star,
        userRating: 0.0,
        loaded: false,
      };
    },
    created() {
      if (window.authentication.authenticated() && this.foodId) {
        this.loadUserRating();
        this.loaded = true;
      }
    },
    watch: {
      foodId: function () {
        this.loadUserRating();
        this.loaded = true;
      },
      userRating: function (newRating) {
        if (authentication.authenticated() && this.loaded) {
          let url = CONFIG.API_ROOT_FOOD.concat('/meals/').concat(this.foodId).concat('/rating');
          window.axios
            .post(url, {rating: newRating})
            .then(response => {
                this.$emit('updateFood');
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
        console.log('LOAD USER RATING');
        if (authentication.authenticated()) {
          console.log(this.foodId);
          let url = CONFIG.API_ROOT_ACCOUNT.concat('/food/ratings/?food_id=').concat(this.foodId);
          window.axios
            .get(url)
            .then(response => {
                if (response.data.length > 0) {
                  console.log('RATING');
                  console.log(response.data);
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
