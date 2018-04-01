<template>
  <b-col>
    <b-row>
      <b-col cols="3">
        <a v-if="food.image" :href="food.image.thumb" :data-lightbox="title"
           :data-title="food.name">
          <img :src="food.image.thumb" class="media-object" alt="Bild" width="80px">
        </a>
        <a v-else :href="defaultImageUrl">
          <!--:data-lightbox="title"-->
          <!--:data-title="food.name ">-->
          <img :src="defaultImageUrl" class="media-object"
               alt="Bild" width="80px">
        </a>
      </b-col>
      <b-col cols="7" class="media-body">
        <div class="food-name">
          <router-link :to="{name: 'food-detail', params:{id: food.id}}">{{ food.name }}</router-link>
        </div>
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
      </b-col>
      <div v-if="food.price_student" class="col-2"><span class="float-right">{{ food.price_student }}</span></div>
    </b-row>
  </b-col>
</template>

<script>
  import {FaRating} from 'vue-rate-it';
  import Star from 'vue-rate-it/glyphs/star';
  import authentication from "../../authentication";
  import * as CONFIG from '../../config'
  import router from '../../router'

  export default {
    name: "SingleMenu",
    props: ['food', 'title', 'defaultImageUrl'],
    components: {FaRating},
    data() {
      return {
        userRating: this.food.rating,
        star: '',
      };
    }, created() {
      // register the icon
      this.star = Star;
      // console.log(this.food.rating);
      // this.userRating = this.food.rating;
    },
    watch: {
      userRating: function (newRating) {
        if (authentication.authenticated()) {
          let url = CONFIG.API_ROOT_FOOD.concat('/meals/').concat(this.food.id).concat('/rating');
          window.axios
            .post(url, {rating: newRating})
            .then(response => {
                // TODO: Reload Data
                //router.go()
              }
            )
            .catch();
        } else {
          router.push({name: 'login'})
        }
      }
    }
  }
</script>

<style scoped>

</style>
