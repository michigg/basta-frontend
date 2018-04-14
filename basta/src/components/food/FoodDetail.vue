<template>
  <b-row>
    <b-col cols="12">
      <b-row align-v="center" class="bg-light text-dark">
        <b-col cols="12" class="mb-0 mt-2 text-center">
          <h5>{{food.name}}</h5>
        </b-col>
      </b-row>
      <div v-if="!mobile" class="row">
        <b-col cols="8">
          <b-row>
            <b-col cols="12">
              <food-picture></food-picture>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <comments-overview></comments-overview>
            </b-col>
          </b-row>
        </b-col>

        <b-col cols="4">
          <b-row class="m-0">
            <b-col cols="12" class="bg-light text-dark mb-2 mt-2 pt-2 pb-2">
              <rating-combined></rating-combined>
            </b-col>
            <b-col cols="12" class="bg-light text-dark mb-2 pt-2 pb-2">
              <price-overview></price-overview>
            </b-col>
            <b-col cols="12" class="bg-light text-dark pt-2 pb-2">
              <allergens-overview></allergens-overview>
            </b-col>
          </b-row>
        </b-col>
      </div>
      <div v-else class="row">
        <b-col cols="12">
          <food-picture></food-picture>
        </b-col>
        <b-col cols="12" class="bg-light text-dark mb-2 mt-2 pt-2 pb-2">
          <rating-combined></rating-combined>
        </b-col>
        <b-col cols="12" class="bg-light text-dark mb-2 pt-2 pb-2">
          <price-overview></price-overview>
        </b-col>
        <b-col cols="12" class="bg-light text-dark mb-2 pt-2 pb-2">
          <allergens-overview></allergens-overview>
        </b-col>
        <b-col cols="12" class="bg-light text-dark pt-2 pb-2">
          <comments-overview></comments-overview>
        </b-col>
      </div>
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
  import CommentsOverview from "@/components/food/utils/CommentsOverview";


  export default {
    name: "FoodDetail",
    components: {
      AllergensOverview,
      PriceOverview,
      RatingCombined,
      FoodPicture,
      CommentsOverview,
    },
    data() {
      return {
        mobile: false,
      };
    }, created() {
      this.addMobileChecker();
      this.$store
        .dispatch('loadDetailedFood', {foodId: this.$route.params.id})
        .then();
      this.$store.dispatch('loadDefaultImageLocation').then();
    },
    computed: {
      food() {
        return this.$store.getters.getDetailedFood;
      },
    },
    methods: {
      isAuthenticated: function () {
        return authentication.authenticated();
      },
      addMobileChecker() {
        this.mobile = window.innerWidth < 768;
        window.addEventListener('resize', () => {
          this.mobile = window.innerWidth < 768;
        }, true);
      },
    }
  }
</script>

<style scoped>

</style>
