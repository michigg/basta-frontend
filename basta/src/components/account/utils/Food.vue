<template>
  <div>
    <h4>Essen</h4>
    <div class="row p-1">
      <div v-for="food in foods" class="col col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 p-2 bg-light text-dark">
        <b-row class="food p-2">
          <b-col cols="4" class="image">
            <a v-if="food.image" :href="food.image.image">
              <img :src="food.image.thumb" class="media-object" alt="Bild" width="100%">
            </a>
            <a v-else :href="defaultImageUrl">
              <img :src="defaultImageUrl" class="media-object"
                   alt="Bild" width="100%">
            </a>
          </b-col>
          <b-col cols="4" class="title-rating">
            <b-row>
              <b-col cols="12">
                <h5>{{food.name}}</h5>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <div v-if="food.rating">
                  Rating: {{food.rating}}
                </div>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="4" class="comment">
            <div v-if="food.comment">
              <h5>{{food.comment.title}}</h5>
              <div class="">
                <p>{{food.comment.description}}</p>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
  import * as CONFIG from '../../../config.js'

  export default {
    name: "Food",
    data() {
      return {
        images: [],
        ratings: [],
        comments: [],
        foods: [],
        defaultImageUrl: '',
      }
    },
    created() {
      window.axios
        .get(CONFIG.API_ROOT_ACCOUNT.concat('/food/ratings/'))
        .then((response) => {
          this.ratings = response.data;
          this.mergeArrays();
        })
        .catch(e => console.error(e));

      window.axios
        .get(CONFIG.API_ROOT_ACCOUNT.concat('/food/images/'))
        .then((response) => {
          this.images = response.data;
          this.mergeArrays();
        })
        .catch(e => console.error(e));

      window.axios
        .get(CONFIG.API_ROOT_ACCOUNT.concat('/food/comments/'))
        .then((response) => {
          this.comments = response.data;
          this.mergeArrays();
        })
        .catch(e => console.error(e));
      axios.get(CONFIG.API_ROOT_FOOD.concat('/meals/images/default'))
        .then(response => {
          this.defaultImageUrl = response.data.image;
        })
        .catch(e => {
          console.error(e)
        });
    },
    methods: {
      mergeArrays: function () {
        this.foods = [];
        let food_ids = [];
        let foods = {};

        if (this.images.length > 0) {
          for (const image of this.images) {
            food_ids.push(image.food.id);
            foods[image.food.id] = {};
            foods[image.food.id]['name'] = image.food.name;
            foods[image.food.id]['image'] = image.image;
          }
        }
        if (this.ratings.length > 0) {
          for (const rating of this.ratings) {
            food_ids.push(rating.food.id);
            if (!foods[rating.food.id]) {
              foods[rating.food.id] = {};
            }
            foods[rating.food.id]['name'] = rating.food.name;
            foods[rating.food.id]['rating'] = rating.rating;
          }
        }
        if (this.comments.length > 0) {
          for (const comment of this.comments) {
            food_ids.push(comment.food.id);
            if (!foods[comment.food.id]) {
              foods[comment.food.id] = {};
            }
            foods[comment.food.id]['name'] = comment.food.name;
            foods[comment.food.id]['comment'] = {};
            foods[comment.food.id]['comment']['title'] = comment.title;
            foods[comment.food.id]['comment']['description'] = comment.description;
          }
        }
        for (const key in foods) {
          this.foods.push(foods[key]);
        }
      },
    }
  }
</script>

<style scoped>
  .food {
    height: 100%;
    width: 100%;
  }
</style>
