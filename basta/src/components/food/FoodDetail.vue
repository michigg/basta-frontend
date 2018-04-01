<template>
  <b-row>
    <b-col cols="12" class="text-center border pt-2">
      <b-row align-v="center">
        <b-col cols="1"></b-col>
        <b-col cols="10">
          <h4>Detailansicht</h4>
          <h5>{{food.name}}</h5>
        </b-col>
        <b-col cols="1">
          <router-link :to="{name: 'food'}">Back</router-link>
        </b-col>
      </b-row>
    </b-col>
    <b-col cols="7" class="border">
      <b-row>
        <b-col class="border  pt-2">
          <allergens-overview :allergens="food.allergens"></allergens-overview>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="border  pt-2">
          <price-overview :student="food.price_student" :employee="food.price_employee"
                          :guest="food.price_guest"></price-overview>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="border  pt-2">
          <rating-combined v-on:updateFood="loadFood" :globalRating="food.rating" :foodId="food_id"></rating-combined>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="border  pt-2">
          <comments-overview :comments="comments"></comments-overview>
        </b-col>
      </b-row>
    </b-col>
    <b-col cols="5" class="border">
      <food-picture :image="food.image" :userFoodImage="userFoodImage"></food-picture>
      <food-picture-upload v-on:updateImage="loadUserImage"></food-picture-upload>
      <comment-box v-on:updateFood="loadFood" :foodId="food_id"></comment-box>
    </b-col>
  </b-row>
</template>

<script>
  import * as CONFIG from '../../config';
  import authentication from "../../authentication";
  import AllergensOverview from "@/components/food/utils/AllergensOverview";
  import PriceOverview from "@/components/food/utils/PriceOverview";
  import RatingCombined from "@/components/food/utils/RatingCombined";
  import FoodPicture from "@/components/food/utils/FoodPicture";
  import FoodPictureUpload from "@/components/food/utils/PictureUpload";
  import CommentBox from "@/components/food/utils/CommentBox";
  import CommentsOverview from "@/components/food/utils/CommentsOverview";


  export default {
    name: "FoodDetail",
    components: {
      AllergensOverview,
      PriceOverview,
      RatingCombined,
      FoodPicture,
      FoodPictureUpload,
      CommentBox,
      CommentsOverview
    },
    data() {
      return {
        food_id: '',
        food: {},
        comments: '',
        show: true,
        images: '',
        form: {
          file: '',
        },
        userFoodImage: '',
      };
    }, created() {
      this.loadFood();
      this.loadUserImage();
    },
    methods: {
      loadFood() {
        window.axios.get(CONFIG.API_ROOT_FOOD
          .concat('/meals/').concat(this.$route.params.id))
          .then(response => {
            // JSON responses are automatically parsed.

            console.log(JSON.parse(JSON.stringify(response.data)));
            this.food = response.data;
            this.food_id = this.food.id;
          })
          .catch(e => {
          });
        window.axios.get(CONFIG.API_ROOT_FOOD
          .concat('/meals/').concat(this.$route.params.id).concat('/comments'))
          .then(response => {
            console.log(JSON.parse(JSON.stringify(response.data)));
            this.comments = response.data;
          })
          .catch(e => {
          });
      },
      loadUserImage() {
        if (authentication.authenticated()) {
          let url = CONFIG.API_ROOT_ACCOUNT + '/food/images/?food_id=' + this.$route.params.id;
          window.axios
            .get(url)
            .then(response => {
              console.log('LOG IMAGE');
              if (response.data.length > 0) {
                this.userFoodImage = response.data[0].image.image;
              }
            })
            .catch()
        }
      },
      isAuthenticated: function () {
        return authentication.authenticated();
      },
    }
  }
</script>

<style scoped>

</style>
